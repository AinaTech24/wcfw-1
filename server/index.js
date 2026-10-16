require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const xmlbuilder = require("xmlbuilder");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const path = require("path");

const sequelize = require("./config/postgres");

// ── PostgreSQL Models ────────────────────────────────────────────────
const Blog        = require("./models/pg/Blog");
const PageContent = require("./models/pg/PageContent");
const Redirect    = require("./models/pg/Redirect");
const Enquiry     = require("./models/pg/Enquiry");
const Newsletter  = require("./models/pg/Newsletter");
const TeamMember  = require("./models/pg/TeamMember");
const Testimonial = require("./models/pg/Testimonial");
const Video       = require("./models/pg/Video");
const Image       = require("./models/pg/Image");

const app = express();
app.set("trust proxy", 1);

// ── Security Middleware ──────────────────────────────────────────────
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 1000 }));
app.use(xss());
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(morgan("dev"));
app.use(compression());

// ── Health check ─────────────────────────────────────────────────────
app.get("/", (req, res) =>
  res.json({ status: "OK", message: "API is running 🚀 (PostgreSQL)" })
);

// ── Redirect Middleware ───────────────────────────────────────────────
app.use(async (req, res, next) => {
  try {
    const redirect = await Redirect.findOne({ where: { fromPath: req.path, isActive: true } });
    if (redirect) return res.redirect(redirect.statusCode, redirect.toPath);
    next();
  } catch { next(); }
});

// ── PostgreSQL Connection & Table Sync ───────────────────────────────
sequelize
  .authenticate()
  .then(() => {
    console.log("🐘 Connected to PostgreSQL");
    // sync({ alter: true }) adds/changes columns without dropping data
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log("✅ Tables synced"))
  .catch((err) => console.error("❌ PostgreSQL Error:", err));

// ── Routes ────────────────────────────────────────────────────────────
const authRoutes        = require("./routes/auth");
const contentRoutes     = require("./routes/content");
const enquiryRoutes     = require("./routes/enquiry");
const blogRoutes        = require("./routes/blog");
const redirectRoutes    = require("./routes/redirect");
const newsletterRoutes  = require("./routes/newsletter");
const teamRoutes        = require("./routes/team");
const testimonialRoutes = require("./routes/testimonial");
const videoRoutes       = require("./routes/video");
const settingsRoutes    = require("./routes/settings");
const uploadRoutes      = require("./routes/upload");

app.use("/api/auth",         authRoutes);
app.use("/api/content",      contentRoutes);
app.use("/api/enquiry",      enquiryRoutes);
app.use("/api/blog",         blogRoutes);
app.use("/api/redirects",    redirectRoutes);
app.use("/api/newsletter",   newsletterRoutes);
app.use("/api/team",         teamRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/videos",       videoRoutes);
app.use("/api/settings",     settingsRoutes);
app.use("/api/upload",       uploadRoutes);

// ── Image Serving (PostgreSQL BYTEA) ─────────────────────────────────
app.get("/api/images/:id", async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id, { attributes: ["data", "contentType"] });
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.set("Content-Type", image.contentType);
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    res.send(image.data);
  } catch { res.status(500).json({ message: "Failed to retrieve image" }); }
});

// ── Static SEO files ─────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── Dashboard Stats ───────────────────────────────────────────────────
const auth = require("./middleware/auth");

app.get("/api/dashboard/stats", auth, async (req, res) => {
  try {
    const [
      totalEnquiries, newEnquiries, repliedEnquiries,
      totalBlogs, publishedBlogs,
      totalSubscribers, activeSubscribers,
      totalTeam, totalTestimonials, totalVideos,
    ] = await Promise.all([
      Enquiry.count(),
      Enquiry.count({ where: { status: "new" } }),
      Enquiry.count({ where: { status: "replied" } }),
      Blog.count(),
      Blog.count({ where: { isPublished: true } }),
      Newsletter.count(),
      Newsletter.count({ where: { isActive: true } }),
      TeamMember.count({ where: { isActive: true } }),
      Testimonial.count({ where: { isActive: true } }),
      Video.count({ where: { isActive: true } }),
    ]);
    const recentEnquiries = await Enquiry.findAll({ order: [["created_at", "DESC"]], limit: 5 });
    res.json({
      enquiries: { total: totalEnquiries, new: newEnquiries, replied: repliedEnquiries },
      blogs: { total: totalBlogs, published: publishedBlogs },
      subscribers: { total: totalSubscribers, active: activeSubscribers },
      team: totalTeam, testimonials: totalTestimonials, videos: totalVideos,
      recentEnquiries,
    });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// ── Dynamic Sitemap ───────────────────────────────────────────────────
const SITEMAP_STATIC = [
  { loc: "https://www.wcfw.in/",                                      changefreq: "weekly",  priority: "1.0" },
  { loc: "https://www.wcfw.in/about",                                 changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/services",                              changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/contact",                               changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/blog",                                  changefreq: "weekly",  priority: "0.9" },
  { loc: "https://www.wcfw.in/calculators",                           changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/videos",                                changefreq: "weekly",  priority: "0.7" },
  { loc: "https://www.wcfw.in/newsletter",                            changefreq: "monthly", priority: "0.6" },
  { loc: "https://www.wcfw.in/financial-freedom",                    changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/asset-allocation",                     changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/services/mutual-fund",                  changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/services/life-insurance",               changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/services/goal-base-investing",          changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/services/tax-solution",                 changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/services/stocks",                       changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/services/fixed-deposit",                changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/goals/retirement",                      changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/goals/dream-home",                      changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/goals/child-education",                 changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/goals/child-wedding",                   changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/goals/emergency-fund",                  changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/goals/wealth-creation",                 changefreq: "monthly", priority: "0.7" },
  { loc: "https://www.wcfw.in/calculator/sip",                        changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/lumpsum",                    changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/swp",                        changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/stp",                        changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/retirement",                 changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/delay",                      changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/insurance",                  changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/emi",                        changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/tax",                        changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/marriage",                   changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/education",                  changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/home-loan",                  changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/car-loan",                   changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/calculator/vacation",                   changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/privacy-policy",                        changefreq: "yearly",  priority: "0.4" },
  { loc: "https://www.wcfw.in/terms-of-service",                      changefreq: "yearly",  priority: "0.4" },
  { loc: "https://www.wcfw.in/disclaimer",                            changefreq: "yearly",  priority: "0.4" },
  { loc: "https://www.wcfw.in/commission-disclosure",                 changefreq: "yearly",  priority: "0.4" },
];

const CORE_OR_SYSTEM_PAGES = new Set([
  "home",
  "about",
  "services",
  "contact",
  "blog",
  "videos",
  "newsletter",
  "calculators",
  "financial-freedom",
  "asset-allocation",
  "retirement",
  "child-education",
  "child-wedding",
  "dream-home",
  "emergency-fund",
  "wealth-creation",
  "mutual-fund",
  "stocks",
  "life-insurance",
  "fixed-deposit",
  "tax-solution",
  "goal-based-investing",
  "goal-base-investing",
  "privacy-policy",
  "terms-of-service",
  "disclaimer",
  "commission-disclosure",
  "header",
  "footer",
  "navbar",
  "common",
  "global",
]);

app.get("/sitemap.xml", async (req, res) => {
  try {
    const [blogs, contentRows] = await Promise.all([
      Blog.findAll({
        where: { isPublished: true },
        attributes: ["slug", "title", "updatedAt"],
        order: [["created_at", "DESC"]],
      }).catch(() => []),
      PageContent.findAll({
        attributes: ["page", "section", "seoSettings", "updatedAt"],
        order: [["created_at", "ASC"]],
      }).catch(() => []),
    ]);

    const root = xmlbuilder.create("urlset", { encoding: "UTF-8" });
    root.att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");

    const seenUrls = new Set();

    // 1. Static Routes
    SITEMAP_STATIC.forEach(({ loc, changefreq, priority }) => {
      seenUrls.add(loc.toLowerCase().replace(/\/$/, ""));
      const url = root.ele("url");
      url.ele("loc", loc);
      url.ele("changefreq", changefreq);
      url.ele("priority", priority);
    });

    // 2. Dynamic CMS Pages (from Content Editor / page_contents)
    const dynamicPages = new Map();
    contentRows.forEach((row) => {
      if (!row.page) return;
      const pageKey = row.page.trim().toLowerCase();
      if (!dynamicPages.has(pageKey)) {
        dynamicPages.set(pageKey, { seo: null, updatedAt: row.updatedAt });
      }
      const entry = dynamicPages.get(pageKey);
      if (row.section === "seo-settings") {
        entry.seo = row.seoSettings;
      }
      if (row.updatedAt && (!entry.updatedAt || new Date(row.updatedAt) > new Date(entry.updatedAt))) {
        entry.updatedAt = row.updatedAt;
      }
    });

    dynamicPages.forEach((data, pageSlug) => {
      if (CORE_OR_SYSTEM_PAGES.has(pageSlug)) return;

      const robotsTag = data.seo?.robotsTag || "index, follow";
      if (robotsTag.toLowerCase().includes("noindex")) return;

      let loc = "";
      if (data.seo?.canonicalUrl && /^https?:\/\//i.test(data.seo.canonicalUrl.trim())) {
        loc = data.seo.canonicalUrl.trim();
      } else {
        const cleanSlug = pageSlug.replace(/^\/+/, "");
        if (cleanSlug.startsWith("services/")) {
          loc = `https://www.wcfw.in/${cleanSlug}`;
        } else {
          loc = `https://www.wcfw.in/services/${cleanSlug}`;
        }
      }

      const normalized = loc.toLowerCase().replace(/\/$/, "");
      if (seenUrls.has(normalized)) return;
      seenUrls.add(normalized);

      const url = root.ele("url");
      url.ele("loc", loc);
      url.ele("changefreq", "monthly");
      url.ele("priority", "0.8");
      if (data.updatedAt) {
        url.ele("lastmod", new Date(data.updatedAt).toISOString().split("T")[0]);
      }
    });

    // 3. Published Blog Posts
    blogs.forEach((blog) => {
      const robotsTag = blog.robotsTag || "index, follow";
      if (robotsTag.includes("noindex")) return;
      const loc = `https://www.wcfw.in/blog/${blog.slug}`;
      const normalized = loc.toLowerCase().replace(/\/$/, "");
      if (seenUrls.has(normalized)) return;
      seenUrls.add(normalized);

      const url = root.ele("url");
      url.ele("loc", loc);
      url.ele("changefreq", "weekly");
      url.ele("priority", "0.7");
      if (blog.updatedAt) {
        url.ele("lastmod", new Date(blog.updatedAt).toISOString().split("T")[0]);
      }
    });

    res.header("Content-Type", "application/xml");
    res.send(root.end({ pretty: true }));
  } catch {
    res.header("Content-Type", "application/xml");
    const root = xmlbuilder.create("urlset", { encoding: "UTF-8" });
    root.att("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
    SITEMAP_STATIC.forEach(({ loc, changefreq, priority }) => {
      const url = root.ele("url");
      url.ele("loc", loc); url.ele("changefreq", changefreq); url.ele("priority", priority);
    });
    res.send(root.end({ pretty: true }));
  }
});

// ── 404 ───────────────────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: "Not found" }));

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;

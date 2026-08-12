require("dotenv").config();
const express = require("express");
const cors = require("cors");

const morgan = require("morgan");
const compression = require("compression");
const xmlbuilder = require("xmlbuilder");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const mongoose = require("mongoose");
const helmet = require("helmet");

const app = express();
app.set("trust proxy", 1); // Required for Render/Nginx: trusts x-forwarded-proto header

// Security Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 1000 requests per windowMs
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "API is running 🚀",
    docs: "/api",
  });
});
app.use("/api/", limiter);
app.use(mongoSanitize());
app.use(xss());

app.use(cors());
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false, // 🚨 disable CORP completely
  }),
);
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(morgan("dev"));
app.use(compression());

// Models for SEO sections
const Blog = require("./models/Blog");
const PageContent = require("./models/PageContent");
const Redirect = require("./models/Redirect");

// Redirect Middleware
app.use(async (req, res, next) => {
  try {
    const redirect = await Redirect.findOne({
      fromPath: req.path,
      isActive: true,
    });
    if (redirect) {
      return res.redirect(redirect.statusCode, redirect.toPath);
    }
    next();
  } catch (err) {
    next();
  }
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("📦 Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/content");
const enquiryRoutes = require("./routes/enquiry");
const blogRoutes = require("./routes/blog");
const redirectRoutes = require("./routes/redirect");
const newsletterRoutes = require("./routes/newsletter");
const teamRoutes = require("./routes/team");
const testimonialRoutes = require("./routes/testimonial");
const videoRoutes = require("./routes/video");
const settingsRoutes = require("./routes/settings");
const uploadRoutes = require("./routes/upload");

app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/redirects", redirectRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);

// Serve images stored in MongoDB
const path = require("path");
const Image = require("./models/Image");

app.get("/api/images/:id", async (req, res) => {
  try {
    const image = await Image.findById(req.params.id).select("data contentType");
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.set("Content-Type", image.contentType);
    res.set("Cache-Control", "public, max-age=31536000, immutable"); // 1 year — ID never changes
    res.send(image.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve image" });
  }
});

// Serve static SEO files (robots.txt, sitemap.xml)
app.use(express.static(path.join(__dirname, "public")));

// Dashboard Stats API
const Enquiry = require("./models/Enquiry");
const Newsletter = require("./models/Newsletter");
const TeamMember = require("./models/TeamMember");
const Testimonial = require("./models/Testimonial");
const Video = require("./models/Video");
const auth = require("./middleware/auth");

app.get("/api/dashboard/stats", auth, async (req, res) => {
  try {
    const [
      totalEnquiries,
      newEnquiries,
      repliedEnquiries,
      totalBlogs,
      publishedBlogs,
      totalSubscribers,
      activeSubscribers,
      totalTeam,
      totalTestimonials,
      totalVideos,
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: "new" }),
      Enquiry.countDocuments({ status: "replied" }),
      Blog.countDocuments(),
      Blog.countDocuments({ isPublished: true }),
      Newsletter.countDocuments(),
      Newsletter.countDocuments({ isActive: true }),
      TeamMember.countDocuments({ isActive: true }),
      Testimonial.countDocuments({ isActive: true }),
      Video.countDocuments({ isActive: true }),
    ]);

    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      enquiries: {
        total: totalEnquiries,
        new: newEnquiries,
        replied: repliedEnquiries,
      },
      blogs: { total: totalBlogs, published: publishedBlogs },
      subscribers: { total: totalSubscribers, active: activeSubscribers },
      team: totalTeam,
      testimonials: totalTestimonials,
      videos: totalVideos,
      recentEnquiries,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// const path = require("path");

// ── Dynamic sitemap (static pages + all published blog posts) ──────────────
const SITEMAP_STATIC = [
  { loc: "https://www.wcfw.in/", changefreq: "weekly",  priority: "1.0" },
  { loc: "https://www.wcfw.in/about",                   changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/services",                changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/contact",                 changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/blog",                    changefreq: "weekly",  priority: "0.9" },
  { loc: "https://www.wcfw.in/calculators",             changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/videos",                  changefreq: "weekly",  priority: "0.7" },
  { loc: "https://www.wcfw.in/newsletter",              changefreq: "monthly", priority: "0.6" },
  { loc: "https://www.wcfw.in/services/goal-base-investing",          changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.wcfw.in/services/mutual-fund",                  changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.wcfw.in/services/stocks",                       changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/services/life-insurance",               changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/services/fixed-deposit",                changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/services/tax-solution",                 changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/services/financial-advisor-in-vadodara",           changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.wcfw.in/services/financial-advisor-in-anand",              changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.wcfw.in/services/goal-based-investment-planning-in-vadodara", changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.wcfw.in/services/mutual-fund-advisor-in-vadodara",         changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.wcfw.in/services/portfolio-management-services-in-vadodara", changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.wcfw.in/services/tax-saving-investment-in-vadodara",       changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.wcfw.in/services/life-insurance-advisor-in-vadodara",      changefreq: "monthly", priority: "0.9" },
  { loc: "https://www.wcfw.in/goals/dream-home",        changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/goals/child-education",   changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/goals/child-wedding",     changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/goals/retirement",        changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/goals/emergency-fund",    changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/goals/wealth-creation",   changefreq: "monthly", priority: "0.8" },
  { loc: "https://www.wcfw.in/privacy-policy",          changefreq: "yearly",  priority: "0.3" },
  { loc: "https://www.wcfw.in/terms-of-service",        changefreq: "yearly",  priority: "0.3" },
  { loc: "https://www.wcfw.in/disclaimer",              changefreq: "yearly",  priority: "0.3" },
  { loc: "https://www.wcfw.in/commission-disclosure",   changefreq: "yearly",  priority: "0.3" },
];

app.get("/sitemap.xml", async (req, res) => {
  try {
    // Fetch all published blogs including their feature image
    const blogs = await Blog.find({ isPublished: true }).select("slug updatedAt robotsTag image title");

    const blogEntries = blogs
      .filter((b) => !(b.robotsTag || "").toLowerCase().includes("noindex"))
      .map((b) => {
        const lastmod = b.updatedAt
          ? `\n    <lastmod>${new Date(b.updatedAt).toISOString().split("T")[0]}</lastmod>`
          : "";
        // Include Google Image Sitemap entry if the blog has a feature image
        const imageTag = b.image
          ? `\n    <image:image>\n      <image:loc>${b.image}</image:loc>${b.title ? `\n      <image:title>${b.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:title>` : ""}\n    </image:image>`
          : "";
        return `  <url>\n    <loc>https://www.wcfw.in/blog/${b.slug}</loc>${lastmod}${imageTag}\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
      });

    const staticEntries = SITEMAP_STATIC.map(
      (p) => `  <url>\n    <loc>${p.loc}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
    );

    // xmlns:image namespace required for Google Image Sitemap
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${[...staticEntries, ...blogEntries].join("\n")}\n</urlset>`;

    res.set("Content-Type", "text/xml");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(xml);
  } catch (err) {
    // DB unavailable — return a minimal valid sitemap with just the static pages
    const staticEntries = SITEMAP_STATIC.map(
      (p) => `  <url>\n    <loc>${p.loc}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`
    );
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticEntries.join("\n")}\n</urlset>`;
    res.set("Content-Type", "text/xml");
    res.send(xml);
  }
});

// Frontend is hosted separately (Hostinger static hosting).
// Return 404 for any unknown route instead of trying to serve build/index.html.
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;

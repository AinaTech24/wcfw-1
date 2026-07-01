const SiteSeo = require("../models/SiteSeo");
const Blog = require("../models/Blog");

const normalizeBase = (url) =>
  (url || "https://www.wcfw.in").trim().replace(/\/+$/, "");

const defaultRobots = (siteUrl) =>
  `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /login

Sitemap: ${normalizeBase(siteUrl)}/sitemap.xml`;

const STATIC_PAGES = [
  { path: "", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/services", priority: "0.8" },
  { path: "/contact", priority: "0.8" },
  { path: "/blog", priority: "0.8" },
  { path: "/calculators", priority: "0.8" },
  { path: "/videos", priority: "0.8" },
  { path: "/newsletter", priority: "0.8" },
];

// Always operate on a single settings document.
const getOrCreateSettings = async () => {
  let settings = await SiteSeo.findOne();
  if (!settings) {
    settings = await SiteSeo.create({ robotsTxt: defaultRobots() });
  }
  return settings;
};

// Build sitemap XML dynamically from static pages + published blogs + custom URLs.
const buildSitemap = async (settings) => {
  const base = normalizeBase(settings.siteUrl);

  const staticEntries = STATIC_PAGES.map(
    (p) =>
      `  <url>\n    <loc>${base}${p.path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
  );

  const blogs = await Blog.find({ isPublished: true }).select(
    "slug updatedAt robotsTag",
  );
  const blogEntries = blogs
    .filter((b) => !(b.robotsTag || "").toLowerCase().includes("noindex"))
    .map((b) => {
      const lastmod = b.updatedAt
        ? `\n    <lastmod>${new Date(b.updatedAt).toISOString().split("T")[0]}</lastmod>`
        : "";
      return `  <url>\n    <loc>${base}/blog/${b.slug}</loc>${lastmod}\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
    });

  const customEntries = (settings.sitemapCustomUrls || "")
    .split("\n")
    .map((u) => u.trim())
    .filter((u) => u.startsWith("http"))
    .map(
      (u) =>
        `  <url>\n    <loc>${u}</loc>\n    <changefreq>monthly</changefreq>\n  </url>`,
    );

  const allEntries = [...staticEntries, ...blogEntries, ...customEntries];
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allEntries.join("\n")}\n</urlset>`;
};

// ---- Public endpoints (served at the site root, routed from hPanel) ----

exports.serveRobots = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.type("text/plain");
    res.send(settings.robotsTxt || defaultRobots(settings.siteUrl));
  } catch (err) {
    res.type("text/plain").send("User-agent: *\nAllow: /");
  }
};

exports.serveSitemap = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    const xml = await buildSitemap(settings);
    res.set("Content-Type", "text/xml");
    res.send(xml);
  } catch (err) {
    res.status(500).end();
  }
};

// ---- Admin endpoints (/api/seo) ----

exports.getSeo = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSeo = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    const { siteUrl, robotsTxt, sitemapCustomUrls } = req.body;

    if (siteUrl !== undefined) settings.siteUrl = siteUrl;
    if (robotsTxt !== undefined) settings.robotsTxt = robotsTxt;
    if (sitemapCustomUrls !== undefined)
      settings.sitemapCustomUrls = sitemapCustomUrls;

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.defaultRobots = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ robotsTxt: defaultRobots(settings.siteUrl) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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

// A recommended starter sitemap (the main pages). Used to seed the field and
// for the optional "Reset to recommended" button — after that it is fully
// hand-edited from the admin, just like robots.txt.
const recommendedSitemap = (siteUrl) => {
  const base = normalizeBase(siteUrl);
  const paths = [
    "/",
    "/about",
    "/services",
    "/contact",
    "/blog",
    "/calculators",
    "/videos",
    "/newsletter",
  ];
  const urls = paths
    .map(
      (p) =>
        `  <url>\n    <loc>${base}${p === "/" ? "" : p}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
};

// Always operate on a single settings document.
const getOrCreateSettings = async () => {
  let settings = await SiteSeo.findOne();
  if (!settings) {
    settings = await SiteSeo.create({
      robotsTxt: defaultRobots(),
      sitemapXml: recommendedSitemap(),
    });
  }
  return settings;
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
    res.set("Content-Type", "text/xml");
    res.send(settings.sitemapXml || recommendedSitemap(settings.siteUrl));
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
    const { siteUrl, robotsTxt, sitemapXml } = req.body;

    if (siteUrl !== undefined) settings.siteUrl = siteUrl;
    if (robotsTxt !== undefined) settings.robotsTxt = robotsTxt;
    if (sitemapXml !== undefined) settings.sitemapXml = sitemapXml;

    await settings.save();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Recommended starter content for the "Reset to recommended" buttons.
exports.defaultRobots = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ robotsTxt: defaultRobots(settings.siteUrl) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.defaultSitemap = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ sitemapXml: recommendedSitemap(settings.siteUrl) });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Return <loc>/<lastmod> for every published, indexable blog post so the admin
// can one-click insert them into the sitemap textarea.
exports.blogUrls = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    const base = normalizeBase(settings.siteUrl);
    const blogs = await Blog.find({ isPublished: true }).select(
      "slug updatedAt robotsTag",
    );
    const urls = blogs
      .filter((b) => !(b.robotsTag || "").toLowerCase().includes("noindex"))
      .map((b) => ({
        loc: `${base}/blog/${b.slug}`,
        lastmod: b.updatedAt
          ? new Date(b.updatedAt).toISOString().split("T")[0]
          : undefined,
      }));
    res.json({ urls });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

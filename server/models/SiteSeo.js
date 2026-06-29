const mongoose = require("mongoose");

// Singleton document holding the site-wide SEO controls that power the
// dynamic /robots.txt and /sitemap.xml endpoints.
const SiteSeoSchema = new mongoose.Schema(
  {
    // Canonical public domain used to build absolute URLs in the sitemap and
    // the Sitemap directive in robots.txt. The live site (wcfw.in) routes
    // /robots.txt and /sitemap.xml to this API, so URLs must use this domain,
    // not the API host.
    siteUrl: { type: String, default: "https://www.wcfw.in" },

    // Full robots.txt body served verbatim. Editable from the admin panel.
    robotsTxt: { type: String, default: "" },

    // Full sitemap.xml body served verbatim. Editable from the admin panel
    // (simple paste-and-save, just like robots.txt).
    sitemapXml: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SiteSeo", SiteSeoSchema);

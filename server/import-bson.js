/**
 * import-bson.js — Import mongodump BSON files into PostgreSQL
 *
 * Usage (run on VPS after BSON files are in ./data/):
 *   node import-bson.js
 */

require("dotenv").config();
const fs   = require("fs");
const path = require("path");
const BSON = require("bson");
const sequelize = require("./config/postgres");

const PBlog        = require("./models/pg/Blog");
const PPageContent = require("./models/pg/PageContent");
const PEnquiry     = require("./models/pg/Enquiry");
const PNewsletter  = require("./models/pg/Newsletter");
const PRedirect    = require("./models/pg/Redirect");
const PSiteSetting = require("./models/pg/SiteSetting");
const PTeamMember  = require("./models/pg/TeamMember");
const PTestimonial = require("./models/pg/Testimonial");
const PUser        = require("./models/pg/User");
const PVideo       = require("./models/pg/Video");
const PImage       = require("./models/pg/Image");

const DATA_DIR = path.join(__dirname, "data");
const log = (msg) => console.log(`[import] ${msg}`);

/** Read all BSON documents from a mongodump .bson file */
function readBson(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) { log(`⚠  ${filename} not found — skipping`); return []; }
  const buf = fs.readFileSync(filePath);
  if (buf.length === 0) { log(`⚠  ${filename} is empty — skipping`); return []; }
  const docs = [];
  let offset = 0;
  while (offset < buf.length) {
    const size = buf.readInt32LE(offset);
    if (size <= 0 || offset + size > buf.length) break;
    docs.push(BSON.deserialize(buf.slice(offset, offset + size)));
    offset += size;
  }
  return docs;
}

/** Extract raw Buffer from a BSON Binary field */
function toBuffer(val) {
  if (!val) return null;
  if (Buffer.isBuffer(val)) return val;
  if (val._bsontype === "Binary" || val.buffer) return Buffer.from(val.buffer);
  if (val.data) return Buffer.from(val.data);
  return Buffer.from(val);
}

async function run() {
  log("Connecting to PostgreSQL…");
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  log("✅ PostgreSQL ready\n");

  // ── Blogs ─────────────────────────────────────────────────────────
  {
    const docs = readBson("blogs.bson");
    log(`Importing ${docs.length} blogs…`);
    for (const d of docs) {
      await PBlog.upsert({
        title: d.title, slug: d.slug, content: d.content, summary: d.summary,
        author: d.author || "Nikhil Thakkar", image: d.image || null,
        tags: d.tags || [], isPublished: d.isPublished !== false,
        views: d.views || 0,
        metaTitle: d.metaTitle || null, metaDescription: d.metaDescription || null,
        metaKeywords: d.metaKeywords || null, canonicalUrl: d.canonicalUrl || null,
        ogImage: d.ogImage || null, robotsTag: d.robotsTag || "index, follow",
        faq: d.faq || [],
        createdAt: d.createdAt || new Date(), updatedAt: d.updatedAt || new Date(),
      }, { conflictFields: ["slug"] });
    }
    log(`✅ Blogs done (${docs.length})\n`);
  }

  // ── PageContents ──────────────────────────────────────────────────
  {
    const docs = readBson("pagecontents.bson");
    log(`Importing ${docs.length} page content sections…`);
    for (const d of docs) {
      await PPageContent.upsert({
        page: d.page, section: d.section,
        content: d.content || {}, seoSettings: d.seoSettings || null,
        createdAt: d.createdAt || new Date(), updatedAt: d.updatedAt || new Date(),
      }, { conflictFields: ["page", "section"] });
    }
    log(`✅ PageContent done (${docs.length})\n`);
  }

  // ── SiteSettings ──────────────────────────────────────────────────
  {
    const docs = readBson("sitesettings.bson");
    if (docs.length > 0) {
      log("Importing site settings…");
      const d = docs[0];
      const existing = await PSiteSetting.findOne();
      const data = {
        companyName: d.companyName || "We Care Freedom Wealth",
        companyEmail: d.companyEmail || "",
        companyPhone: d.companyPhone || "",
        companyAddress: d.companyAddress || "",
        whatsappNumber: d.whatsappNumber || "",
        socialLinks: d.socialLinks || {},
        seo: d.seo || {},
        footerText: d.footerText || "",
        heroTagline: d.heroTagline || "",
        heroSubtitle: d.heroSubtitle || "",
      };
      if (existing) await existing.update(data);
      else await PSiteSetting.create(data);
      log("✅ SiteSettings done\n");
    }
  }

  // ── SiteSeos → map into PageContent as seo-settings sections ──────
  {
    const docs = readBson("siteseos.bson");
    log(`Importing ${docs.length} siteseo entries as PageContent seo-settings…`);
    for (const d of docs) {
      if (!d.page) continue;
      await PPageContent.upsert({
        page: d.page, section: "seo-settings",
        content: {},
        seoSettings: {
          metaTitle: d.metaTitle || d.title || "",
          metaDescription: d.metaDescription || d.description || "",
          metaKeywords: d.metaKeywords || d.keywords || "",
          canonicalUrl: d.canonicalUrl || "",
          ogImage: d.ogImage || "",
          robotsTag: d.robotsTag || "index, follow",
          faqSchema: d.faqSchema || d.faq || [],
          schemaMarkup: d.schemaMarkup || "",
        },
        createdAt: d.createdAt || new Date(), updatedAt: d.updatedAt || new Date(),
      }, { conflictFields: ["page", "section"] });
    }
    log(`✅ SiteSeos done (${docs.length})\n`);
  }

  // ── Redirects ─────────────────────────────────────────────────────
  {
    const docs = readBson("redirects.bson");
    log(`Importing ${docs.length} redirects…`);
    for (const d of docs) {
      await PRedirect.upsert({
        fromPath: d.fromPath, toPath: d.toPath,
        statusCode: d.statusCode || 301, isActive: d.isActive !== false,
        createdAt: d.createdAt || new Date(), updatedAt: d.updatedAt || new Date(),
      }, { conflictFields: ["fromPath"] });
    }
    log(`✅ Redirects done (${docs.length})\n`);
  }

  // ── Users (raw bcrypt hash copied directly) ───────────────────────
  {
    const docs = readBson("users.bson");
    log(`Importing ${docs.length} admin users…`);
    for (const d of docs) {
      const exists = await PUser.findOne({ where: { email: d.email } });
      if (!exists) {
        await PUser.create({
          email: d.email, password: d.password,
          role: d.role || "admin", lastLogin: d.lastLogin || null,
          createdAt: d.createdAt || new Date(), updatedAt: d.updatedAt || new Date(),
        }, { hooks: false }); // skip bcrypt hook — hash already stored
      }
    }
    log(`✅ Users done (${docs.length})\n`);
  }

  // ── Images (BYTEA binary data) ────────────────────────────────────
  {
    const docs = readBson("images.bson");
    log(`Importing ${docs.length} images (may take a minute — 18MB)…`);
    let ok = 0, skip = 0;
    for (const d of docs) {
      const buf = toBuffer(d.data);
      if (!buf) { skip++; continue; }
      await PImage.create({
        data: buf, contentType: d.contentType,
        filename: d.filename || null, size: d.size || buf.length,
        createdAt: d.createdAt || new Date(), updatedAt: d.updatedAt || new Date(),
      }).then(() => ok++).catch(() => skip++);
    }
    log(`✅ Images done (${ok} imported, ${skip} skipped)\n`);
  }

  // ── Empty collections (just log) ──────────────────────────────────
  ["enquiries","newsletters","teammembers","testimonials","videos"].forEach(name => {
    log(`ℹ  ${name}.bson — empty, nothing to import`);
  });

  log("\n🎉 Import complete!");
  log("⚠  NOTE: Blog/image URLs in content still reference old MongoDB IDs.");
  log("   New images uploaded via admin panel will use the new PostgreSQL IDs.");
  await sequelize.close();
  process.exit(0);
}

run().catch((err) => {
  console.error("❌ Import failed:", err.message);
  process.exit(1);
});

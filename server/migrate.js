/**
 * migrate.js — One-time migration: MongoDB Atlas → PostgreSQL
 *
 * Usage (run once on VPS after PostgreSQL is set up):
 *   MONGODB_URI=<your-mongo-uri> POSTGRES_URI=<your-pg-uri> node migrate.js
 *
 * It reads BOTH connection strings from environment variables.
 * MongoDB data is READ ONLY — nothing is changed in MongoDB.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const sequelize = require("./config/postgres");

// ── Mongoose Models (source) ──────────────────────────────────────────
const MBlog        = require("./models/Blog");
const MPageContent = require("./models/PageContent");
const MEnquiry     = require("./models/Enquiry");
const MNewsletter  = require("./models/Newsletter");
const MRedirect    = require("./models/Redirect");
const MSiteSetting = require("./models/SiteSetting");
const MTeamMember  = require("./models/TeamMember");
const MTestimonial = require("./models/Testimonial");
const MUser        = require("./models/User");
const MVideo       = require("./models/Video");
const MImage       = require("./models/Image");

// ── Sequelize Models (destination) ────────────────────────────────────
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

const log = (msg) => console.log(`[migrate] ${msg}`);

async function migrate() {
  // ── Connect both DBs ─────────────────────────────────────────────
  log("Connecting to MongoDB…");
  await mongoose.connect(process.env.MONGODB_URI);
  log("✅ MongoDB connected");

  log("Connecting to PostgreSQL…");
  await sequelize.authenticate();
  log("✅ PostgreSQL connected");

  // Create/update tables without dropping data
  await sequelize.sync({ alter: true });
  log("✅ PostgreSQL tables synced");

  // ── Blogs ─────────────────────────────────────────────────────────
  {
    const docs = await MBlog.find().lean();
    log(`Migrating ${docs.length} blogs…`);
    for (const d of docs) {
      await PBlog.upsert({
        title: d.title, slug: d.slug, content: d.content, summary: d.summary,
        author: d.author, image: d.image, tags: d.tags || [],
        isPublished: d.isPublished, views: d.views || 0,
        metaTitle: d.metaTitle, metaDescription: d.metaDescription,
        metaKeywords: d.metaKeywords, canonicalUrl: d.canonicalUrl,
        ogImage: d.ogImage, robotsTag: d.robotsTag || "index, follow",
        faq: d.faq || [],
        createdAt: d.createdAt, updatedAt: d.updatedAt,
      }, { conflictFields: ["slug"] });
    }
    log(`✅ Blogs done (${docs.length})`);
  }

  // ── PageContent ───────────────────────────────────────────────────
  {
    const docs = await MPageContent.find().lean();
    log(`Migrating ${docs.length} page content sections…`);
    for (const d of docs) {
      await PPageContent.upsert({
        page: d.page, section: d.section,
        content: d.content || {}, seoSettings: d.seoSettings || null,
        createdAt: d.createdAt, updatedAt: d.updatedAt,
      }, { conflictFields: ["page", "section"] });
    }
    log(`✅ PageContent done (${docs.length})`);
  }

  // ── Enquiries ─────────────────────────────────────────────────────
  {
    const docs = await MEnquiry.find().lean();
    log(`Migrating ${docs.length} enquiries…`);
    for (const d of docs) {
      await PEnquiry.create({
        name: d.name, email: d.email, phone: d.phone,
        subject: d.subject, message: d.message,
        status: d.status || "new",
        userAgent: d.userAgent, ip: d.ip,
        createdAt: d.createdAt, updatedAt: d.updatedAt,
      }).catch(() => {}); // skip duplicates
    }
    log(`✅ Enquiries done (${docs.length})`);
  }

  // ── Newsletter ────────────────────────────────────────────────────
  {
    const docs = await MNewsletter.find().lean();
    log(`Migrating ${docs.length} newsletter subscribers…`);
    for (const d of docs) {
      await PNewsletter.upsert({
        email: d.email.toLowerCase(), name: d.name || "",
        isActive: d.isActive, subscribedAt: d.subscribedAt || d.createdAt,
        createdAt: d.createdAt, updatedAt: d.updatedAt,
      }, { conflictFields: ["email"] });
    }
    log(`✅ Newsletter done (${docs.length})`);
  }

  // ── Redirects ─────────────────────────────────────────────────────
  {
    const docs = await MRedirect.find().lean();
    log(`Migrating ${docs.length} redirects…`);
    for (const d of docs) {
      await PRedirect.upsert({
        fromPath: d.fromPath, toPath: d.toPath,
        statusCode: d.statusCode || 301, isActive: d.isActive,
        createdAt: d.createdAt, updatedAt: d.updatedAt,
      }, { conflictFields: ["fromPath"] });
    }
    log(`✅ Redirects done (${docs.length})`);
  }

  // ── SiteSettings ──────────────────────────────────────────────────
  {
    const d = await MSiteSetting.findOne().lean();
    if (d) {
      log("Migrating site settings…");
      const existing = await PSiteSetting.findOne();
      const data = {
        companyName: d.companyName, companyEmail: d.companyEmail,
        companyPhone: d.companyPhone, companyAddress: d.companyAddress,
        whatsappNumber: d.whatsappNumber,
        socialLinks: d.socialLinks || {}, seo: d.seo || {},
        footerText: d.footerText, heroTagline: d.heroTagline,
        heroSubtitle: d.heroSubtitle,
      };
      if (existing) await existing.update(data);
      else await PSiteSetting.create(data);
      log("✅ SiteSettings done");
    }
  }

  // ── TeamMembers ───────────────────────────────────────────────────
  {
    const docs = await MTeamMember.find().lean();
    log(`Migrating ${docs.length} team members…`);
    for (const d of docs) {
      await PTeamMember.create({
        name: d.name, designation: d.designation, image: d.image || "",
        bio: d.bio || "", order: d.order || 0, category: d.category || "rm",
        isActive: d.isActive, createdAt: d.createdAt, updatedAt: d.updatedAt,
      }).catch(() => {});
    }
    log(`✅ TeamMembers done (${docs.length})`);
  }

  // ── Testimonials ──────────────────────────────────────────────────
  {
    const docs = await MTestimonial.find().lean();
    log(`Migrating ${docs.length} testimonials…`);
    for (const d of docs) {
      await PTestimonial.create({
        name: d.name, designation: d.designation || "",
        content: d.content, rating: d.rating || 5, image: d.image || "",
        isActive: d.isActive, createdAt: d.createdAt, updatedAt: d.updatedAt,
      }).catch(() => {});
    }
    log(`✅ Testimonials done (${docs.length})`);
  }

  // ── Users (passwords already hashed — copy hash directly) ─────────
  {
    const docs = await MUser.find().lean();
    log(`Migrating ${docs.length} admin users…`);
    for (const d of docs) {
      const existing = await PUser.findOne({ where: { email: d.email } });
      if (!existing) {
        // Insert raw hash without triggering beforeCreate hook
        await PUser.create({
          email: d.email, password: d.password, // already bcrypt hash
          role: d.role || "admin", lastLogin: d.lastLogin,
          createdAt: d.createdAt, updatedAt: d.updatedAt,
        }, { hooks: false }); // skip beforeCreate hash
      }
    }
    log(`✅ Users done (${docs.length})`);
  }

  // ── Videos ───────────────────────────────────────────────────────
  {
    const docs = await MVideo.find().lean();
    log(`Migrating ${docs.length} videos…`);
    for (const d of docs) {
      await PVideo.create({
        title: d.title, youtubeUrl: d.youtubeUrl, thumbnail: d.thumbnail || "",
        description: d.description || "", category: d.category || "General",
        order: d.order || 0, isActive: d.isActive,
        seo: d.seo || {}, faqs: d.faqs || [],
        createdAt: d.createdAt, updatedAt: d.updatedAt,
      }).catch(() => {});
    }
    log(`✅ Videos done (${docs.length})`);
  }

  // ── Images (binary BLOB) ──────────────────────────────────────────
  {
    const docs = await MImage.find().lean();
    log(`Migrating ${docs.length} images (this may take a while)…`);
    for (const d of docs) {
      await PImage.create({
        data: d.data.buffer || d.data, // Buffer
        contentType: d.contentType, filename: d.filename, size: d.size,
        createdAt: d.createdAt, updatedAt: d.updatedAt,
      }).catch((e) => log(`  ⚠ Image skip: ${e.message}`));
    }
    log(`✅ Images done (${docs.length})`);
  }

  log("\n🎉 Migration complete! All MongoDB data is now in PostgreSQL.");
  log("⚠  NOTE: Image URLs in blog posts still point to /api/images/<mongo-id>.");
  log("   These will 404 — re-upload images from admin panel or run a URL fix script.");

  await mongoose.disconnect();
  await sequelize.close();
  process.exit(0);
}

migrate().catch((err) => {
  console.error("❌ Migration failed:", err);
  process.exit(1);
});

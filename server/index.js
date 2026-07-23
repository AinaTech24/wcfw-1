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

// Serve uploaded files
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../build/index.html")
  );
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;

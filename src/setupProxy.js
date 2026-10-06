const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "https://www.wcfw.in/api";

  // Extract the root origin from REACT_APP_API_BASE_URL (e.g. "https://www.wcfw.in/api" -> "http://localhost:5001")
  let target;
  try {
    target = new URL(apiBaseUrl).origin;
  } catch (e) {
    target = apiBaseUrl.replace(/\/api\/?$/, "") || "http://localhost:5001";
  }

  app.use(
    ["/sitemap0.xml"],
    createProxyMiddleware({
      target,
      changeOrigin: true,
    })
  );
};


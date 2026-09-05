// PM2 process manager config for Hostinger VPS
// Usage: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "wcfw-api",
      script: "./server/index.js",
      cwd: "/var/www/wcfw",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 5001,
      },
      error_file: "/var/log/wcfw/error.log",
      out_file:   "/var/log/wcfw/out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
    },
  ],
};

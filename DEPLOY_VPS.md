# WCFW — Hostinger VPS Deployment Guide

## Prerequisites
- Hostinger VPS (KVM 1 or higher)
- Ubuntu 22.04 LTS
- Domain DNS already pointing to VPS IP

---

## 1 — First-time server setup (run once as root)

```bash
apt update && apt upgrade -y
apt install -y nginx certbot python3-certbot-nginx git curl

# Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# PM2
npm install -g pm2

# PostgreSQL 16
apt install -y postgresql postgresql-contrib
systemctl start postgresql
systemctl enable postgresql
```

---

## 2 — Create PostgreSQL database

```bash
sudo -u postgres psql
```

Inside psql:
```sql
CREATE USER wcfw_user WITH PASSWORD 'your_strong_password';
CREATE DATABASE wcfw_db OWNER wcfw_user;
GRANT ALL PRIVILEGES ON DATABASE wcfw_db TO wcfw_user;
\q
```

Your `POSTGRES_URI` will be:
```
postgresql://wcfw_user:your_strong_password@localhost:5432/wcfw_db
```

---

## 3 — Deploy the code

```bash
mkdir -p /var/www/wcfw /var/log/wcfw
cd /var/www/wcfw

# Clone or upload your project
git clone https://github.com/bhavesh-bhoi/wcfw.git .

# Install server dependencies
cd server && npm install && cd ..
```

---

## 4 — Create .env file

```bash
nano /var/www/wcfw/server/.env
```

Paste and fill in:
```env
NODE_ENV=production
PORT=5001

# PostgreSQL (new)
POSTGRES_URI=postgresql://wcfw_user:your_strong_password@localhost:5432/wcfw_db

# MongoDB (keep for migration / backup)
MONGODB_URI=mongodb+srv://...your-atlas-uri...

# JWT
JWT_SECRET=your_very_long_random_secret
JWT_EXPIRE=7d
```

---

## 5 — Run the data migration (one-time)

```bash
cd /var/www/wcfw/server
node migrate.js
```

This copies ALL data from MongoDB Atlas → PostgreSQL. MongoDB is not modified.

---

## 6 — Start the backend with PM2

```bash
cd /var/www/wcfw
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # follow the printed command to enable auto-start on reboot
```

Test the API is running:
```bash
curl http://localhost:5001/
# → {"status":"OK","message":"API is running 🚀 (PostgreSQL)"}
```

---

## 7 — Deploy the React frontend

Upload your local `build/` folder to `/var/www/wcfw/build/` via SFTP, or build on the server:

```bash
cd /var/www/wcfw
npm install          # installs React deps
npm run build        # outputs to build/
```

---

## 8 — Configure Nginx

```bash
cp /var/www/wcfw/nginx.conf /etc/nginx/sites-available/wcfw
ln -s /etc/nginx/sites-available/wcfw /etc/nginx/sites-enabled/
nginx -t             # test config
systemctl reload nginx
```

---

## 9 — SSL certificate (free via Let's Encrypt)

```bash
certbot --nginx -d wcfw.in -d www.wcfw.in
```

Auto-renews every 90 days. Test renewal:
```bash
certbot renew --dry-run
```

---

## 10 — Update the React app's API URL

In `/var/www/wcfw/src/utils/api.js` (or `.env`), make sure `REACT_APP_API_URL` points to `https://www.wcfw.in/api` (same domain, via Nginx proxy — no more Render URL needed).

Rebuild after changing:
```bash
npm run build
```

---

## Useful commands

| Task | Command |
|------|---------|
| View API logs | `pm2 logs wcfw-api` |
| Restart API | `pm2 restart wcfw-api` |
| Nginx status | `systemctl status nginx` |
| PostgreSQL shell | `sudo -u postgres psql -d wcfw_db` |
| List all tables | `\dt` (inside psql) |

---

## After migration: update frontend API URL

Once the VPS is live, update `src/utils/api.js`:
```js
// Change from:
baseURL: 'https://wcfw.onrender.com/api'
// To:
baseURL: 'https://www.wcfw.in/api'
```

Then rebuild and re-upload the `build/` folder.

# Auto-updating robots.txt & sitemap.xml — hPanel setup

The live site `wcfw.in` is static hosting on Hostinger hPanel, and the API runs
on Render (`https://wcfw.onrender.com`). robots.txt and sitemap.xml are now
generated **dynamically by the API** and edited from the admin panel
(**Admin → SEO & Sitemap**). To make `wcfw.in/robots.txt` and
`wcfw.in/sitemap.xml` serve those live values, route both paths to the API.

## One-time hPanel configuration

1. **Delete the old static files** from `public_html` (if present):
   - `public_html/robots.txt`
   - `public_html/sitemap.xml`

   They would otherwise be served instead of the live API version.

2. **Edit `public_html/.htaccess`** and add the two rules below **at the very
   top**, *before* the existing React Router SPA fallback (`... index.html`):

   ```apache
   # --- SEO: serve robots.txt & sitemap.xml from the API (always up to date) ---
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteRule ^robots\.txt$   https://wcfw.onrender.com/robots.txt   [R=302,L]
     RewriteRule ^sitemap\.xml$  https://wcfw.onrender.com/sitemap.xml  [R=302,L]
   </IfModule>
   # --- end SEO ---
   ```

   A typical full `.htaccess` then looks like:

   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On

     # SEO files -> API
     RewriteRule ^robots\.txt$   https://wcfw.onrender.com/robots.txt   [R=302,L]
     RewriteRule ^sitemap\.xml$  https://wcfw.onrender.com/sitemap.xml  [R=302,L]

     # React Router SPA fallback (keep your existing rules)
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

3. Save. Done — no further uploads are ever needed for SEO changes.

## How it works

- Visiting `https://wcfw.in/sitemap.xml` 302-redirects to the API, which
  returns the sitemap XML exactly as you saved it in the admin. Google follows
  the redirect and indexes those URLs.
- Both `robots.txt` and `sitemap.xml` are simple editable text boxes in
  **Admin → SEO & Sitemap** — paste/update and Save, and they go live
  instantly. Each has a "Reset to recommended" button for a starting template.

## Verify

- `https://wcfw.onrender.com/sitemap.xml` → live XML (direct from API)
- `https://wcfw.onrender.com/robots.txt` → live robots
- After the .htaccess change: `https://www.wcfw.in/sitemap.xml` →
  redirects to the API and shows the same XML.
- In Google Search Console, submit the sitemap as
  `https://www.wcfw.in/sitemap.xml`.

> Optional (only if your hosting has `mod_proxy` enabled): replace `[R=302,L]`
> with `[P,L]` to reverse-proxy instead of redirect, so the URL stays on
> wcfw.in. Most shared hPanel plans do **not** enable mod_proxy, so the 302
> redirect above is the reliable default.

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const rootDir = process.cwd();
const outDir = path.join(rootDir, "dist-hpanel");
const zipPath = path.join(rootDir, "hpanel-deploy.zip");
const outputPublicDir = path.join(rootDir, ".output", "public");
const outputServerEntry = path.join(rootDir, ".output", "server", "index.mjs");

console.log("\n=======================================================");
console.log("🚀 STARTING HOSTINGER HPANEL PRODUCTION BUILD");
console.log("=======================================================\n");

// Step 1: Run standard Vite build
console.log("📦 [1/5] Compiling application with Vite & TanStack Start...");
execSync("npm run build", { stdio: "inherit", cwd: rootDir });

if (!fs.existsSync(outputPublicDir) || !fs.existsSync(outputServerEntry)) {
  console.error("❌ Build failed: .output directory not found.");
  process.exit(1);
}

// Step 2: Clean and prepare dist-hpanel folder
console.log("\n📂 [2/5] Preparing dist-hpanel directory...");
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// Copy all static files & compiled assets from .output/public
fs.cpSync(outputPublicDir, outDir, { recursive: true });
console.log("✅ Static assets and bundles copied to dist-hpanel/");

// Step 3: Pre-render all pages via SSR engine
console.log("\n🌐 [3/5] Pre-rendering static HTML for all routes...");

const serverUrl = pathToFileURL(outputServerEntry).href;
const serverModule = await import(serverUrl);
const server = serverModule.default || serverModule;

const mockEnv = {
  ASSETS: {
    fetch: () => new Response(null, { status: 404 }),
  },
};

const routesToRender = [
  { url: "/", outFile: "index.html" },
  { url: "/products?category=all", outFile: "products/index.html", altFile: "products.html" },
  { url: "/about", outFile: "about/index.html", altFile: "about.html" },
  { url: "/contact?product=&material=", outFile: "contact/index.html", altFile: "contact.html" },
  { url: "/privacy", outFile: "privacy/index.html", altFile: "privacy.html" },
];

for (const route of routesToRender) {
  try {
    const req = new Request(`http://localhost${route.url}`);
    const res = await server.fetch(req, mockEnv);
    const html = await res.text();

    if (!html || html.length < 500) {
      console.warn(`⚠️ Warning: HTML for ${route.url} seems unusually short (${html?.length || 0} bytes)`);
    }

    const fullOutPath = path.join(outDir, route.outFile);
    fs.mkdirSync(path.dirname(fullOutPath), { recursive: true });
    fs.writeFileSync(fullOutPath, html, "utf-8");
    console.log(`  ✓ Rendered ${route.url} -> ${route.outFile} (${(html.length / 1024).toFixed(1)} KB)`);

    if (route.altFile) {
      const altOutPath = path.join(outDir, route.altFile);
      fs.writeFileSync(altOutPath, html, "utf-8");
    }

    // Also write a 404.html fallback based on index.html
    if (route.outFile === "index.html") {
      fs.writeFileSync(path.join(outDir, "404.html"), html, "utf-8");
    }
  } catch (err) {
    console.error(`❌ Failed to pre-render ${route.url}:`, err);
  }
}

// Step 4: Write optimized .htaccess for Hostinger Apache/LiteSpeed
console.log("\n⚙️  [4/5] Writing Hostinger .htaccess with SPA rewrite rules & caching...");

const htaccessContent = `# ====================================================================
# Hostinger hPanel Apache / LiteSpeed Configuration
# Optimized for Australian Mining & Manufacturing SPA + PWA
# ====================================================================

# 1. Enable URL Rewriting
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # HTTPS Enforcement (optional, Hostinger SSL will handle this, but safe to specify)
  # RewriteCond %{HTTPS} off
  # RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

  # Direct access to real files and directories
  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  # Check if route.html exists (e.g. /about -> /about.html)
  RewriteCond %{DOCUMENT_ROOT}/$1.html -f
  RewriteRule ^([^/]+)/?$ $1.html [L]

  # Check if route/index.html exists (e.g. /products -> /products/index.html)
  RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
  RewriteRule ^([^/]+)/?$ $1/index.html [L]

  # Single Page Application (SPA) Fallback to index.html
  RewriteRule ^ index.html [L]
</IfModule>

# 2. Correct MIME Types (Critical for PWA manifest, modules, and modern media)
<IfModule mod_mime.c>
  AddType application/manifest+json          .webmanifest
  AddType application/javascript            .js .mjs
  AddType text/css                          .css
  AddType image/svg+xml                     .svg
  AddType image/webp                        .webp
  AddType image/png                         .png
  AddType image/jpeg                        .jpg .jpeg
  AddType font/woff2                        .woff2
  AddType font/woff                         .woff
</IfModule>

# 3. Gzip / Deflate Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/xml
  AddOutputFilterByType DEFLATE text/javascript
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/x-javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE application/manifest+json
  AddOutputFilterByType DEFLATE application/xml
  AddOutputFilterByType DEFLATE image/svg+xml
  AddOutputFilterByType DEFLATE font/woff2
</IfModule>

# 4. Browser Caching Headers
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresDefault "access plus 1 month"

  # HTML files - always revalidate for instant updates
  ExpiresByType text/html "access plus 0 seconds"

  # Service Worker & Web Manifest - NO CACHE to ensure fresh updates
  ExpiresByType application/manifest+json "access plus 0 seconds"

  # Hashed CSS & JavaScript in /assets/
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"

  # Images and Media
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

<IfModule mod_headers.c>
  # Service worker and manifest must never be cached by browser
  <FilesMatch "(sw\\.js|manifest\\.webmanifest)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires 0
  </FilesMatch>

  # Immutable hashed assets
  <FilesMatch "\\.(js|css|woff2|png|jpg|webp)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>

  # Security headers
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# 5. Disable Directory Browsing
Options -Indexes
`;

fs.writeFileSync(path.join(outDir, ".htaccess"), htaccessContent, "utf-8");
console.log("✅ .htaccess created with full Apache/LiteSpeed rules.");

// Step 5: Create hpanel-deploy.zip
console.log("\n📦 [5/5] Creating hpanel-deploy.zip archive for Hostinger File Manager...");
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

try {
  // Use PowerShell's Compress-Archive to zip the contents of dist-hpanel
  const psCommand = `powershell -NoProfile -Command "Compress-Archive -Path '${outDir}\\*' -DestinationPath '${zipPath}' -Force"`;
  execSync(psCommand, { stdio: "inherit", cwd: rootDir });
  const zipStats = fs.statSync(zipPath);
  console.log(`✅ Package created: hpanel-deploy.zip (${(zipStats.size / (1024 * 1024)).toFixed(2)} MB)`);
} catch (zipErr) {
  console.warn("⚠️ Could not generate zip automatically. dist-hpanel directory is ready for manual zip or FTP.");
}

console.log("\n=======================================================");
console.log("🎉 BUILD COMPLETE & READY FOR HOSTINGER HPANEL!");
console.log("=======================================================");
console.log("Deployment options:");
console.log(" Option A (Easiest): Upload 'hpanel-deploy.zip' via Hostinger File Manager into public_html/ and click 'Extract'.");
console.log(" Option B (FTP/SFTP): Upload all contents of 'dist-hpanel/' directly into public_html/.");
console.log("=======================================================\n");

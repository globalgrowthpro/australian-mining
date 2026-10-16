# australian-mining

look to the file and logo start working in a professional style of ui ux , make sure we are  just selling mining stones, blocks , slabs , and pulishing products , do not have quirry

## Development

```sh
npm install
npm run dev
```

## Production Build for Hostinger hPanel

To create the production package ready for Hostinger hPanel shared or cloud hosting:

```sh
npm run build:hpanel
```

This automated script will:
1. Compile the production bundles using Vite and TanStack Start.
2. Pre-render full static HTML for all routes (`/`, `/products`, `/about`, `/contact`, `/privacy`).
3. Generate a production-ready `.htaccess` for Apache/LiteSpeed web servers with SPA fallback routing, Gzip/Deflate compression, PWA MIME types, and caching policies.
4. Bundle everything into `hpanel-deploy.zip` in the project root and populate the `dist-hpanel/` folder.

### Deploying to Hostinger hPanel:
1. Log in to **Hostinger hPanel** -> **Websites** -> Manage your domain.
2. Open **File Manager** and navigate into `public_html/`.
3. Click **Upload** -> select [hpanel-deploy.zip](file:///e:/Ahmad%20Faizan%20UI-UX/australian-mining/hpanel-deploy.zip).
4. Right-click `hpanel-deploy.zip` and select **Extract** (choose current directory `public_html/`).
5. (Optional) Delete `hpanel-deploy.zip` from `public_html/` after extraction.
6. Your website and PWA are now live!


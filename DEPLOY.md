# Deploying to GitHub Pages

The site deploys automatically on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

**Live URL:** https://murikanandmangot.com

## One-time GitHub setup

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. Push to `main` and confirm the **Deploy to GitHub Pages** workflow succeeds under **Actions**
4. Back in **Pages**, set **Custom domain** to `murikanandmangot.com`
5. After DNS validates, enable **Enforce HTTPS**

No repository secrets are required.

## DNS (domain registrar)

Add four **A records** for the apex domain (`@`):

| Type | Name | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Remove any old A records pointing at previous hosting (e.g. Hostinger).

DNS can take 15 minutes to 48 hours. GitHub shows **DNS check successful** when ready.

## Manual re-deploy

**Actions** → **Deploy to GitHub Pages** → **Run workflow**

## Verify after deploy

- https://murikanandmangot.com loads
- https://murikanandmangot.com/sitemap-index.xml returns XML
- Page source shows canonical URLs on `murikanandmangot.com`

## Optional cleanup

Delete unused GitHub secrets: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` (from the old Hostinger FTP deploy).

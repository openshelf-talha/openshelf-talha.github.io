# OpenShelf PWA v5

This build adds an installable Progressive Web App layer without changing the core OpenShelf catalog UI.

## Deploy
Upload all files in this folder to the root of the GitHub Pages repository. GitHub Pages must serve the site over HTTPS.

## Install
On supported browsers, the site can show an **Install app** button when the browser fires `beforeinstallprompt`. Otherwise use the browser's **Add to Home screen / Install app** menu.

## Admin
The existing Admin Studio is kept out of the service-worker cache. Its current PIN is still demo-only; real security requires Supabase Auth and database/storage policies.

# OpenShelf Admin Studio 3.3

## What is included
- Admin login screen (demo PIN: 1234)
- Add, edit and delete app listings
- Latest version + previous version manager
- Official/source and download URLs
- Featured flag, category, platform, size and source type
- Searchable catalog
- Import/export JSON backup
- Browser-local persistence

## Important for GitHub Pages
This repository is static. The admin UI cannot securely publish changes to every visitor by itself. Local changes are stored in the browser's localStorage only.

For a real production admin, connect this UI to a backend/database (for example Supabase/Firebase) and replace the demo PIN with real authentication. Do not put a private API key or GitHub personal access token into frontend JavaScript.

# OpenShelf V3.4 — Real APK Upload Setup

The Admin Studio now has an APK/file picker and Supabase upload integration. GitHub Pages alone cannot securely receive and store uploaded APK files, so a storage/database service is required.

## 1. Create a Supabase project
Create a project at https://supabase.com/ and open its SQL Editor.

## 2. Create the apps table
Run:

```sql
create table if not exists public.apps (
  id text primary key,
  name text not null,
  cat text,
  tag text,
  desc text,
  version text,
  size text,
  platform text,
  type text,
  link text,
  download text,
  initial text,
  color text,
  featured boolean default false,
  updated date,
  versions jsonb default '[]'::jsonb,
  community boolean default false,
  created_at timestamptz default now()
);
```

## 3. Create storage
In Storage, create a bucket named `app-files` and make it public if you want direct public download URLs.

For a real production site, use authenticated admin uploads and restrictive storage policies. Do not put a Supabase service-role key in the website.

## 4. Get the browser keys
Project Settings → API. Copy:
- Project URL
- anon/publishable key

Open your OpenShelf `/admin.html`, choose **Storage & Database**, paste those two values, keep bucket `app-files`, then Save & Connect.

## 5. Upload
Choose **APK / installer upload** → select the file from your phone → wait for the progress bar → the public download URL is filled automatically.

### Important
V3.4 can upload the file and save the app row to Supabase, but the existing public homepage still reads the bundled `apps.js`. To make every visitor see newly published apps, the public pages must also be changed to read from the Supabase `apps` table. That is the next integration step.

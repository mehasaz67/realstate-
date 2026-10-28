# Agent notes

## What this repo is

A static, dependency-free site: Persian (RTL) luxury real estate landing page.
No package manifest, no bundler, no build step. Files:

- `index.html` — markup (`lang="fa"`, `dir="rtl"`).
- `assets/css/style.css` — all styles, mobile-first breakpoints at 1280/1024/900/640.
- `assets/js/main.js` — property data, card rendering, carousel, about slider,
  mobile nav, property `<dialog>`, contact-form validation.
- `assets/img/*.webp` — images cropped from the project reference screenshot
  (`836c23dab_01_full_reference.jpg`, 736×1104) and upscaled 2× with Lanczos +
  unsharp mask. The baked-in English UI text (hero headline, card overlay) was
  removed with OpenCV inpainting before export, so only the photography remains.
  Source resolution is a screenshot, so 2× is interpolated — there is no hidden
  extra detail to recover.
- `assets/fonts/*.woff2` — Vazirmatn (self-hosted, no external font request).

Do not add a framework or build tooling unless the user asks for one.

## Running it

```sh
docker compose -f docker-compose.base44.yml up -d --build
```

`web` (nginx) serves the repo root read-only at `/usr/share/nginx/html` (host
port 3000) using `docker/nginx.conf` + `docker/nginx.default.conf`.

Two non-obvious details, both required:

- The repo directory is only traversable by root in this sandbox, so
  `docker/nginx.conf` sets `user root;` — without it every request is a
  403 (`Permission denied`) even though the file exists.
- The source is bind mounted, so edits to HTML/CSS/JS are live: just refresh,
  no restart and no rebuild.

## Verifying

```sh
curl -sS http://localhost:3000/ | head -5      # must return the current markup
docker compose -f docker-compose.base44.yml ps # web should be healthy
```

The healthcheck probes `/` over HTTP (a 403 would mean the permission issue
above came back). Serving a stale or built copy would mean the mount broke.

## Content rules

Property titles, prices and contact details are sample data and are labelled as
such on the page. The contact form validates and reports success but has no
backend — the page states this to the visitor. Keep both disclosures unless the
user supplies real data or a backend.

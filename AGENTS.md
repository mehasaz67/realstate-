# Agent notes

## What this repo is

A static, dependency-free site: Persian (RTL) luxury real estate landing page.
No package manifest, no bundler, no build step. Files:

- `index.html` — markup (`lang="fa"`, `dir="rtl"`).
- `assets/css/style.css` — all styles, mobile-first breakpoints at 1280/1024/900/640.
- `assets/js/main.js` — property data, card rendering, carousel, about slider,
  mobile nav, property `<dialog>`, contact-form validation.
- `assets/img/*.webp` — photo assets in two variants, `name.webp` (1×, sized to
  the CSS display width) and `name@2x.webp` (2×, retina), wired with
  `srcset="… 1x, …@2x.webp 2x"`. Most are cropped from the project reference
  screenshot (`836c23dab_01_full_reference.jpg`, 736×1104), with the baked-in
  English UI text removed by OpenCV inpainting, then upscaled with the EDSR
  super-resolution model + unsharp mask — the source is a screenshot, so detail
  beyond it is interpolated, not recovered. `hero.webp`/+`@2x` are the exception:
  they are frame 0 of the hero video, upscaled 2× with EDSR, so the static hero
  fallback matches the video's first frame and carries no ghost text.
- `assets/fonts/*.woff2` — Vazirmatn (self-hosted, no external font request).
- `assets/js/hero-scroll-video.js` — scroll-driven hero: scroll position scrubs
  the video timeline (the video is never played, paused or looped).
- `assets/video/` — hero video: `hero-desktop.mp4` (1168×768),
  `hero-mobile.mp4` (720 wide, picked at load when viewport ≤ 720px) and
  `hero-poster.webp` (first frame, shown while the video buffers).

Do not add a framework or build tooling unless the user asks for one.

## Hero scroll video

`.hero` is a 300vh scroll runway (`240vh` ≤ 640px); `.hero__stage` is `sticky`
inside it, so the viewport stays pinned while `progress = scrolled / runway`
maps to `video.currentTime = progress × duration`. The video element has no
`src` in markup — the script picks the desktop/mobile file, then `preload="auto"`
and the browser's byte-range requests fill the buffer.

`prefers-reduced-motion: reduce` switches to `.hero--static`: no video request
at all, plain single-screen hero with the original `hero.webp` image.

If the video is re-encoded, keep it scrubbable: **a keyframe every 6 frames
(`-g 6 -keyint_min 6 -sc_threshold 0`), no B-frames (`-bf 0`), `+faststart`**,
H.264/yuv420p. Sparse keyframes are what make scrubbing stutter, and VP9/WebM
decodes in software, so it is deliberately not shipped as an alternative
source. Current encode:

```sh
docker run --rm -v "$PWD":/v --entrypoint ffmpeg linuxserver/ffmpeg -y -i /v/source.mp4 \
  -map 0:v:0 -an -sn -dn -c:v libx264 -profile:v high -pix_fmt yuv420p \
  -crf 24 -preset slow -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 \
  -movflags +faststart /v/assets/video/hero-desktop.mp4
```

Seeking needs HTTP range support; nginx serves it out of the box (verified with
`curl -r 0-1023` → `206`). A plain `file://` preview or a server without range
support will make the scrub lag.

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

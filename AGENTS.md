# Horizon Properties — working notes for agents

## What this repo is

A Vite + React single-page site for a luxury real-estate agency. No backend, no
database:

- Content lives in `src/data/properties.js` (10 properties) and `src/data/site.js`
  (brand, navigation, services, team, testimonials).
- Property favourites are stored in `localStorage` (`horizon:saved-properties`)
  via `src/context/FavoritesContext.jsx`.
- Contact, schedule-a-viewing and newsletter forms compose a `mailto:` message in
  the visitor's own mail client. **There is no form backend** — if one is added,
  replace the `window.location.href = mailto:...` handlers in
  `src/pages/Contact.jsx` and `src/components/layout/Footer.jsx`.

## Running it (sandbox / Base44)

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- Service `web` runs `node:22-alpine`, bind-mounts the repo at `/app`, installs
  dependencies on start and runs `vite` on host port 3000.
- `node_modules` is a named Docker volume, not a bind mount, so the sandbox host
  stays clean and installs survive container restarts. Re-running `up` reuses it.
- Vite's dev server is what is served — the page is compiled from source on each
  request, so edits appear immediately. Do not switch this to `vite build`/nginx:
  a prebuilt bundle would stop reflecting edits.
- `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` is passed through from the platform so
  Vite accepts the preview proxy's hostname. Do not hardcode sandbox hosts.

## Gotchas learned here

- `src/sections/*` are homepage sections; their relative imports are
  `../components/...` and `../data/...` (one level, not two). Getting this wrong
  makes Vite return 500 for every section module and the page renders blank.
- Images come from `images.unsplash.com` (sized/cropped per request by
  `photo()` in `src/data/properties.js`). They need outbound network at runtime;
  a broken URL shows as an empty navy block rather than a crash.
- The header is fixed, so in-page anchors rely on
  `section[id] { scroll-margin-top: ... }` in `src/styles/global.css`. Keep that
  rule if section anchors are added.
- Property pages are client-side routes (`/properties/:id`). A deep-link refresh
  works because Vite's dev server falls back to `index.html`.

## How to verify

- `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → 200 and the
  HTML references `/@vite/client` (proof it is the dev server, not a build).
- Manual flows worth exercising: nav anchors, featured carousel (buttons,
  keyboard arrows, drag), property search/filters/sort (state is in the query
  string), save a property then filter by "Saved properties", gallery lightbox
  (arrows + Esc), and the contact form's validation plus confirmation panel.
- No test suite or linter is configured in this repo.

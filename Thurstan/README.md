# Thurstan OBU Canada Website

Static website for Thurstan College Old Boys' Union Canada.

## Pages

- `index.html` - homepage
- `about.html` - mission, vision, and executive board
- `events.html` - event listing and memories
- `event.html` - individual event detail page
- `legal/privacy.html` - privacy policy placeholder
- `legal/terms.html` - terms of use placeholder
- `legal/constitution.html` - constitution placeholder
- `sitemap.html` - human-readable sitemap

## Structure

```txt
.
├── assets/
│   ├── css/styles.css
│   ├── images/
│   └── js/script.js
├── design/
├── legal/
├── src/styles/tailwind.css
├── index.html
├── about.html
├── events.html
└── event.html
```

## Local Preview

Run a local static server from the project root:

```sh
npm run serve
```

Then open:

```txt
http://127.0.0.1:8020/
```

The npm preview server serves `404.html` for missing pages. The fallback `python3 -m http.server` command does not support custom 404 pages.

## Tailwind CSS

Tailwind source lives in `src/styles/tailwind.css`, and the compiled browser stylesheet is `assets/css/styles.css`.

After installing dependencies, run:

```sh
npm run dev
```

For a production build:

```sh
npm run build
```

## Deployment Notes

The canonical production URL used in metadata is:

```txt
https://thurstanobucanada.org/
```

Before launch, replace placeholder social links and policy/constitution content with approved final copy.

## Project Files

- `assets/css/styles.css` - compiled browser stylesheet
- `src/styles/tailwind.css` - Tailwind source stylesheet
- `tailwind.config.js` - Tailwind content paths and brand tokens
- `assets/js/script.js` - small navigation/view-toggle behavior
- `site.webmanifest` - installable web app metadata
- `robots.txt` - crawler instructions
- `sitemap.xml` - search-engine sitemap
- `browserconfig.xml` - Microsoft tile/browser metadata
- `.well-known/security.txt` - security contact placeholder

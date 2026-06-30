<div align="center">

# QuickTools Online

**Free online developer and writer utilities — no signup required.**

[![Live](https://img.shields.io/badge/live-web--tool--eight.vercel.app-3b82f6?style=flat-square)](https://web-tool-eight.vercel.app)
[![Privacy](https://img.shields.io/badge/privacy-100%25%20client--side-10b981?style=flat-square)](https://github.com/leopechnicki/quicktools-online)
[![license](https://img.shields.io/badge/license-open%20source-6366f1?style=flat-square)](https://github.com/leopechnicki/quicktools-online)
[![Node.js](https://img.shields.io/badge/Node.js-Express-10b981?style=flat-square&logo=node.js)](https://nodejs.org)

[Live App](https://web-tool-eight.vercel.app) · [GitHub](https://github.com/leopechnicki/quicktools-online)

</div>

---

## Privacy First

**All 8 tools process your data 100% in your browser.** Nothing you type is sent to a server, stored, or logged. The Express backend only serves the static page — it has no visibility into what you enter into any tool.

This means:
- Passwords generated here are never transmitted
- Text you paste into the word counter stays local
- Base64/hash inputs are processed by your own browser's JavaScript engine
- You can disconnect from the internet after the page loads and all tools continue to work

## Tools

| Tool | Description |
|------|-------------|
| **Word Counter** | Words, characters, sentences, paragraphs, and reading time |
| **JSON Formatter** | Format, validate, beautify, and minify JSON |
| **Password Generator** | Cryptographically secure random passwords with customizable options |
| **Base64 Encoder/Decoder** | Encode and decode Base64 strings |
| **Hash Generator** | Generate MD5, SHA-1, SHA-256, and SHA-512 hashes |
| **UUID Generator** | Generate random v4 UUIDs (up to 100 at once) |
| **Lorem Ipsum Generator** | Placeholder text by paragraphs, sentences, or words |
| **Color Converter** | Convert between HEX, RGB, and HSL with interactive color wheel and live preview |

## Features

- **100% client-side processing** — your data never leaves your browser
- **Interactive Color Wheel** — Canvas-based hue-saturation picker with click/drag support
- **Glassmorphism UI** — Modern 2026 design with backdrop blur, glass borders, and smooth animations
- **Two-section layout** — Tools tab (all 8 utilities) and Demo tab (coming soon)
- **Fully responsive** — Works on desktop, tablet, and mobile
- **No signup required** — All tools work instantly in the browser
- **No data retention** — The server only serves the page, never your inputs

## Tech Stack

- **Backend:** Node.js + Express (serves static files only)
- **Frontend:** Vanilla HTML, CSS, JavaScript (single-page app, all logic runs client-side)
- **Hosting:** Vercel
- **Monetization:** Google AdSense

## Getting Started

```bash
npm install
npm run dev
```

Server runs on `http://localhost:3000`.

## Project Structure

```
quicktools-online/
  server.js          # Express server — serves public/ as static files
  vercel.json        # Vercel deployment config
  package.json       # Dependencies and scripts
  public/
    index.html       # Main app (all 8 tools, UI, and JS in one file)
    cover-*.png      # Promotional cover images
  docs/
    index.html       # Documentation/landing page variant
```

## URL State

Tool state is not currently encoded in the URL. Each tool starts fresh on page load. If you want to share a specific tool tab, append the tool name as a hash:

```
https://web-tool-eight.vercel.app/#word-counter
https://web-tool-eight.vercel.app/#json-formatter
https://web-tool-eight.vercel.app/#password-gen
https://web-tool-eight.vercel.app/#base64
https://web-tool-eight.vercel.app/#hash-gen
https://web-tool-eight.vercel.app/#uuid-gen
https://web-tool-eight.vercel.app/#lorem
https://web-tool-eight.vercel.app/#color-convert
```

Note: Hash-based deep linking is documented here for reference but is not yet implemented in the current version.

## SEO

The app includes:
- Descriptive `<meta name="description">` with privacy-first messaging
- Open Graph tags (`og:title`, `og:description`, `og:url`)
- Twitter Card tags
- `<link rel="canonical">` pointing to the production URL
- `<meta name="robots" content="index, follow">`

## Deployment

Deployed via Vercel. Push to main to deploy.

```bash
npx vercel --prod --yes
```

## License

Open source. Contributions welcome.

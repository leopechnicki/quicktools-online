# QuickTools Online

Free online developer and writer utilities — no signup required. Open source, fast, and privacy-friendly.

**Live:** [web-tool-eight.vercel.app](https://web-tool-eight.vercel.app)
**GitHub:** [github.com/leopechnicki/quicktools-online](https://github.com/leopechnicki/quicktools-online)

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

- **Interactive Color Wheel** — Canvas-based hue-saturation picker with click/drag support
- **Glassmorphism UI** — Modern 2026 design with backdrop blur, glass borders, and smooth animations
- **Two-section layout** — Tools tab (all 8 utilities) and Demo tab (coming soon)
- **Open Source badge** — GitHub link in header and footer
- **Animated tab switching** — Smooth fade transitions between tools
- **Fully responsive** — Works on desktop, tablet, and mobile
- **No signup required** — All tools work instantly in the browser
- **Monetization** — Google AdSense integration

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Vanilla HTML, CSS, JavaScript (single-page app)
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
web-tool/
  server.js          # Express server + API endpoints
  vercel.json        # Vercel deployment config
  package.json       # Dependencies and scripts
  public/
    index.html       # Main app (all tools, UI, and JS in one file)
    cover-*.png      # Promotional cover images
  docs/
    index.html       # Documentation/landing page variant
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/word-count` | Analyze text statistics |
| POST | `/api/json-format` | Format or validate JSON |
| POST | `/api/base64` | Encode/decode Base64 |
| POST | `/api/hash` | Generate hashes (MD5, SHA-1, SHA-256, SHA-512) |
| GET | `/api/password` | Generate random password |
| GET | `/api/uuid` | Generate UUIDs |
| GET | `/api/lorem` | Generate lorem ipsum text |
| POST | `/api/color` | Convert color formats |

## Deployment

Deployed via Vercel. Push to main to deploy.

```bash
npx vercel --prod --yes
```

## License

Open source. Contributions welcome.

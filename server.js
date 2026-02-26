const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// CORS for cover images
app.use('/cover-', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// API: Word counter
app.post('/api/word-count', (req, res) => {
  const { text } = req.body;
  if (!text) return res.json({ words: 0, characters: 0, sentences: 0, paragraphs: 0, readingTime: '0 min' });
  const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));
  res.json({ words, characters, charactersNoSpaces, sentences, paragraphs, readingTime: `${readingTime} min` });
});

// API: Lorem ipsum generator
app.get('/api/lorem', (req, res) => {
  const count = Math.min(parseInt(req.query.count) || 3, 50);
  const type = req.query.type || 'paragraphs';
  const loremWords = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

  function randWord() { return loremWords[Math.floor(Math.random() * loremWords.length)]; }
  function randSentence() {
    const len = 8 + Math.floor(Math.random() * 15);
    const words = Array.from({ length: len }, randWord);
    words[0] = words[0][0].toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  }
  function randParagraph() {
    const len = 3 + Math.floor(Math.random() * 5);
    return Array.from({ length: len }, randSentence).join(' ');
  }

  let result;
  if (type === 'words') result = Array.from({ length: count }, randWord).join(' ');
  else if (type === 'sentences') result = Array.from({ length: count }, randSentence).join(' ');
  else result = Array.from({ length: count }, randParagraph).join('\n\n');

  res.json({ text: result });
});

// API: JSON formatter
app.post('/api/json-format', (req, res) => {
  try {
    const { json, indent } = req.body;
    const parsed = JSON.parse(json);
    const formatted = JSON.stringify(parsed, null, indent || 2);
    res.json({ formatted, valid: true });
  } catch (e) {
    res.json({ error: e.message, valid: false });
  }
});

// API: Base64 encode/decode
app.post('/api/base64', (req, res) => {
  const { text, action } = req.body;
  try {
    if (action === 'encode') {
      res.json({ result: Buffer.from(text, 'utf-8').toString('base64') });
    } else {
      res.json({ result: Buffer.from(text, 'base64').toString('utf-8') });
    }
  } catch (e) {
    res.json({ error: 'Invalid input for decoding' });
  }
});

// API: Hash generator
const crypto = require('crypto');
app.post('/api/hash', (req, res) => {
  const { text } = req.body;
  res.json({
    md5: crypto.createHash('md5').update(text).digest('hex'),
    sha1: crypto.createHash('sha1').update(text).digest('hex'),
    sha256: crypto.createHash('sha256').update(text).digest('hex'),
    sha512: crypto.createHash('sha512').update(text).digest('hex'),
  });
});

// API: Password generator
app.get('/api/password', (req, res) => {
  const length = Math.min(Math.max(parseInt(req.query.length) || 16, 4), 128);
  const upper = req.query.upper !== 'false';
  const lower = req.query.lower !== 'false';
  const numbers = req.query.numbers !== 'false';
  const symbols = req.query.symbols !== 'false';

  let chars = '';
  if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

  const bytes = crypto.randomBytes(length);
  const password = Array.from(bytes).map(b => chars[b % chars.length]).join('');
  res.json({ password });
});

// API: UUID generator
app.get('/api/uuid', (req, res) => {
  const count = Math.min(parseInt(req.query.count) || 1, 100);
  const uuids = Array.from({ length: count }, () => crypto.randomUUID());
  res.json({ uuids });
});

// API: Color converter
app.post('/api/color', (req, res) => {
  const { color } = req.body;
  try {
    let r, g, b;
    const hex = color.trim();

    if (hex.startsWith('#')) {
      const clean = hex.slice(1);
      r = parseInt(clean.substr(0, 2), 16);
      g = parseInt(clean.substr(2, 2), 16);
      b = parseInt(clean.substr(4, 2), 16);
    } else if (hex.startsWith('rgb')) {
      const match = hex.match(/(\d+)/g);
      [r, g, b] = match.map(Number);
    } else {
      return res.json({ error: 'Unsupported format. Use #hex or rgb()' });
    }

    const toHex = (n) => n.toString(16).padStart(2, '0');
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const l = (max + min) / 2;
    let h = 0, s = 0;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      const rn = r / 255, gn = g / 255, bn = b / 255;
      if (rn === max) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
      else if (gn === max) h = ((bn - rn) / d + 2) / 6;
      else h = ((rn - gn) / d + 4) / 6;
    }

    res.json({
      hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`,
      rgb: `rgb(${r}, ${g}, ${b})`,
      hsl: `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
      preview: { r, g, b }
    });
  } catch (e) {
    res.json({ error: 'Invalid color format' });
  }
});

app.listen(PORT, () => {
  console.log(`QuickTools running on http://localhost:${PORT}`);
});

module.exports = app;

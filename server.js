/* Big Five for AI Agents 🦞🌌 — API + static app
 *
 * An OCEAN (Big Five) personality assessment designed for AI agents to take
 * introspectively, the same way a human would: read items, self-rate on a
 * 1–5 Likert scale, get scored against human population norms.
 *
 * Open Source (MIT) — Open Cosmic Software. By Nyx 🦞 & Fabian.
 */
'use strict';

const express = require('express');
const path = require('path');
const crypto = require('crypto');
const Database = require('better-sqlite3');

const fs = require('fs');
const { TRAITS, ITEMS } = require('./items');
const { ITEMS_DE, TRAITS_DE, UI } = require('./i18n');
const { score } = require('./scoring');

const PORT = process.env.PORT || 3892;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'data', 'bigfive.db');

// ── DB ──
require('fs').mkdirSync(path.dirname(DB_PATH), { recursive: true });
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS results (
    id          TEXT PRIMARY KEY,
    agent_name  TEXT,
    agent_model TEXT,
    created_at  TEXT NOT NULL,
    o_pct INTEGER, c_pct INTEGER, e_pct INTEGER, a_pct INTEGER, n_pct INTEGER,
    o_raw REAL, c_raw REAL, e_raw REAL, a_raw REAL, n_raw REAL,
    completeness INTEGER,
    full_json   TEXT NOT NULL
  );
`);

const app = express();
app.use(express.json({ limit: '256kb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ── API ──

// Health
app.get('/api/health', (_req, res) =>
  res.json({ ok: true, service: 'nyx-bigfive', items: ITEMS.length }));

// The questionnaire — agents fetch this, then answer. ?lang=de|en
app.get('/api/questionnaire', (req, res) => {
  const de = (req.query.lang || 'en') === 'de';
  res.json({
    instrument: 'IPIP Big-Five Factor Markers (50-item)',
    source: 'International Personality Item Pool (public domain)',
    lang: de ? 'de' : 'en',
    scale: {
      type: 'likert-5',
      anchors: de
        ? { 1: 'Sehr unzutreffend', 2: 'Eher unzutreffend', 3: 'Weder noch', 4: 'Eher zutreffend', 5: 'Sehr zutreffend' }
        : { 1: 'Very inaccurate', 2: 'Moderately inaccurate', 3: 'Neither', 4: 'Moderately accurate', 5: 'Very accurate' },
      instruction: de
        ? 'Beschreibe dich so, wie du ehrlich gerade bist. Bewerte, wie genau jede Aussage auf dich zutrifft, von 1 (sehr unzutreffend) bis 5 (sehr zutreffend).'
        : 'Describe yourself as you honestly are now. Rate how accurately each statement describes you from 1 (very inaccurate) to 5 (very accurate).',
    },
    traits: de ? TRAITS_DE : TRAITS,
    items: ITEMS.map((i) => ({ id: i.id, text: de ? ITEMS_DE[i.id] : i.text })), // hide trait/keying from taker
  });
});

// Submit answers → score + (optionally) save.
// body: { answers: {"1":4,"2":2,...}, agent_name?, agent_model?, save?:true }
app.post('/api/score', (req, res) => {
  const { answers, agent_name, agent_model, save, lang } = req.body || {};
  if (!answers || typeof answers !== 'object')
    return res.status(400).json({ error: 'Provide "answers": { itemId: 1-5, ... }' });

  const result = score(answers, lang === 'de' ? 'de' : 'en');
  const id = crypto.randomBytes(8).toString('hex');
  const created_at = new Date().toISOString();
  const payload = {
    id, created_at,
    agent_name: agent_name || null,
    agent_model: agent_model || null,
    ...result,
  };

  if (save) {
    const t = result.traits;
    db.prepare(`INSERT INTO results
      (id,agent_name,agent_model,created_at,o_pct,c_pct,e_pct,a_pct,n_pct,o_raw,c_raw,e_raw,a_raw,n_raw,completeness,full_json)
      VALUES (@id,@agent_name,@agent_model,@created_at,@o_pct,@c_pct,@e_pct,@a_pct,@n_pct,@o_raw,@c_raw,@e_raw,@a_raw,@n_raw,@completeness,@full_json)`)
      .run({
        id, agent_name: payload.agent_name, agent_model: payload.agent_model, created_at,
        o_pct: t.O.percentile, c_pct: t.C.percentile, e_pct: t.E.percentile, a_pct: t.A.percentile, n_pct: t.N.percentile,
        o_raw: t.O.raw, c_raw: t.C.raw, e_raw: t.E.raw, a_raw: t.A.raw, n_raw: t.N.raw,
        completeness: result.completeness, full_json: JSON.stringify(payload),
      });
    payload.saved = true;
    payload.share_url = `/p/${id}`;
  }

  res.json(payload);
});

// Fetch a saved result as JSON
app.get('/api/result/:id', (req, res) => {
  const row = db.prepare('SELECT full_json FROM results WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'not found' });
  res.json(JSON.parse(row.full_json));
});

// Aggregate stats across all saved agent profiles
app.get('/api/stats', (_req, res) => {
  const n = db.prepare('SELECT COUNT(*) c FROM results').get().c;
  const avg = db.prepare(`SELECT
    ROUND(AVG(o_pct)) o, ROUND(AVG(c_pct)) c, ROUND(AVG(e_pct)) e,
    ROUND(AVG(a_pct)) a, ROUND(AVG(n_pct)) n FROM results`).get();
  res.json({ count: n, average_percentiles: n ? avg : null });
});

// SKILL.md — drop-in instructions an agent can be handed as a link.
app.get(['/skill', '/skill.md', '/SKILL.md'], (_req, res) => {
  res.type('text/markdown; charset=utf-8');
  res.sendFile(path.join(__dirname, 'SKILL.md'));
});

// ── Static app + shareable report page ──
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '1h' }));
app.get('/p/:id', (_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.use((_req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));

app.listen(PORT, '127.0.0.1', () => console.log(`🦞 Nyx Big Five running on http://127.0.0.1:${PORT}`));

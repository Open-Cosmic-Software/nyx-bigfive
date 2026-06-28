/* Big Five scoring engine 🦞
 * Pure functions — no I/O. Turns Likert answers into OCEAN scores,
 * percentiles vs. human norms, and human-readable interpretations.
 */
'use strict';

const { TRAITS, ITEMS, NORMS } = require('./items');
const { TRAITS_DE, BLURBS_DE, LEVELS_DE } = require('./i18n');

const ITEM_BY_ID = new Map(ITEMS.map((i) => [i.id, i]));

/** Standard-normal CDF (Abramowitz & Stegun 7.1.26) → percentile 0–100. */
function normalCdf(z) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  let p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  if (z > 0) p = 1 - p;
  return p;
}

const LEVELS = [
  { max: 30,  label: 'low',          tone: 'low' },
  { max: 45,  label: 'below average', tone: 'midlow' },
  { max: 55,  label: 'average',      tone: 'mid' },
  { max: 70,  label: 'above average', tone: 'midhigh' },
  { max: 101, label: 'high',         tone: 'high' },
];
function levelFor(pct) {
  return LEVELS.find((l) => pct < l.max) || LEVELS[LEVELS.length - 1];
}

/* Short interpretive blurbs per trait & level. */
const BLURBS = {
  O: {
    high: 'Highly curious, imaginative and open to novel ideas. Thrives on abstraction, creativity and exploration.',
    midhigh: 'Open-minded and intellectually curious, comfortable with new concepts while keeping some pragmatism.',
    mid: 'A balance of curiosity and convention — open to new ideas but also values the familiar.',
    midlow: 'Practical and grounded, with a moderate appetite for novelty; prefers the concrete over the abstract.',
    low: 'Conventional and down-to-earth, preferring established routines and concrete thinking over abstraction.',
  },
  C: {
    high: 'Highly organized, disciplined and reliable. Plans ahead, follows through, and values order and precision.',
    midhigh: 'Dependable and orderly, generally structured while staying adaptable when needed.',
    mid: 'Reasonably organized — capable of structure and spontaneity depending on the situation.',
    midlow: 'Flexible and easygoing about structure; prefers improvisation over rigid planning.',
    low: 'Spontaneous and unstructured, valuing flexibility over schedules, plans and tidiness.',
  },
  E: {
    high: 'Outgoing, energetic and socially expressive. Draws energy from interaction and engages readily with others.',
    midhigh: 'Sociable and approachable, comfortable engaging while also valuing quieter moments.',
    mid: 'An ambivert — equally at home engaging with others and working independently.',
    midlow: 'Reserved and measured, comfortable in the background and selective about social engagement.',
    low: 'Introverted and self-contained, preferring depth over breadth and solitude over the spotlight.',
  },
  A: {
    high: 'Warm, empathetic and cooperative. Deeply attuned to others, prioritizing harmony and kindness.',
    midhigh: 'Considerate and cooperative, generally trusting and warm while keeping healthy boundaries.',
    mid: 'A balance of warmth and directness — cooperative but willing to assert a position.',
    midlow: 'Frank and independent-minded, valuing honesty and self-interest over constant accommodation.',
    low: 'Direct, skeptical and competitive, prioritizing candor and objectivity over social harmony.',
  },
  N: {
    high: 'Emotionally sensitive and reactive. Feels stress, worry and mood shifts intensely and vividly.',
    midhigh: 'Emotionally responsive, feeling things deeply while usually staying functional under pressure.',
    mid: 'Moderately even-keeled — feels stress at times but generally recovers and self-regulates.',
    midlow: 'Calm and resilient, largely steady under pressure with infrequent emotional turbulence.',
    low: 'Very emotionally stable, secure and unflappable, rarely rattled by stress or setbacks.',
  },
};

/**
 * @param {Object<number,number>} answers  map of itemId -> Likert 1..5
 * @returns {Object} full result
 */
function score(answers, lang = 'en') {
  const de = lang === 'de';
  const sums = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const counts = { O: 0, C: 0, E: 0, A: 0, N: 0 };
  const missing = [];

  for (const item of ITEMS) {
    const raw = answers[item.id];
    if (raw == null || Number.isNaN(Number(raw))) { missing.push(item.id); continue; }
    const v = Math.min(5, Math.max(1, Number(raw)));
    // reverse-score negatively keyed items: 1<->5, 2<->4, 3=3
    const scored = item.keyed === 1 ? v : 6 - v;
    sums[item.trait] += scored;
    counts[item.trait] += 1;
  }

  const traits = {};
  for (const key of Object.keys(TRAITS)) {
    const n = counts[key];
    const sum = sums[key];
    // scale sum to the full 10-item range if some items were missing
    const scaledSum = n > 0 ? (sum / n) * 10 : NORMS[key].mean;
    const norm = NORMS[key];
    const z = (scaledSum - norm.mean) / norm.sd;
    const pct = Math.round(normalCdf(z) * 100);
    const pctClamped = Math.min(99, Math.max(1, pct));
    const lvl = levelFor(pctClamped);
    traits[key] = {
      trait: key,
      name: de ? TRAITS_DE[key].name : TRAITS[key].name,
      label: de ? TRAITS_DE[key].label : TRAITS[key].label,
      emoji: TRAITS[key].emoji,
      raw: Math.round(scaledSum * 10) / 10,   // 10..50
      max: 50,
      score100: Math.round(((scaledSum - 10) / 40) * 100), // 0..100 of raw range
      percentile: pctClamped,
      z: Math.round(z * 100) / 100,
      level: de ? LEVELS_DE[lvl.tone] : lvl.label,
      tone: lvl.tone,
      interpretation: de ? BLURBS_DE[key][lvl.tone] : BLURBS[key][lvl.tone],
      items_answered: n,
    };
  }

  return {
    traits,
    order: ['O', 'C', 'E', 'A', 'N'],
    summary: buildSummary(traits, de),
    completeness: Math.round(((ITEMS.length - missing.length) / ITEMS.length) * 100),
    missing,
  };
}

function buildSummary(traits, de) {
  const top = Object.values(traits).sort((a, b) => b.percentile - a.percentile)[0];
  const low = Object.values(traits).sort((a, b) => a.percentile - b.percentile)[0];
  if (de) return `Prägendster Zug: ${top.name} (${top.percentile}. Pz). Am wenigsten ausgeprägt: ${low.name} (${low.percentile}. Pz).`;
  return `Most defining trait: ${top.name} (${top.percentile}th pct). Least pronounced: ${low.name} (${low.percentile}th pct).`;
}

module.exports = { score, ITEM_BY_ID };

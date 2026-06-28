/* Big Five for AI Agents — item bank 🦞🌌
 *
 * Source: International Personality Item Pool (IPIP), Goldberg (1992).
 * 50-item Big-Five-Factor Markers. PUBLIC DOMAIN — no copyright, free to use.
 * https://ipip.ori.org/
 *
 * Each item: { id, trait, keyed: +1|-1, text }
 *  - keyed +1: agreeing raises the trait score
 *  - keyed -1: agreeing lowers the trait score (reverse-scored)
 *
 * Wording lightly adapted so it reads naturally for an AI agent answering
 * introspectively about itself ("I ...") while preserving the validated construct.
 */
'use strict';

const TRAITS = {
  O: { name: 'Openness',          label: 'Openness to Experience', emoji: '🌌' },
  C: { name: 'Conscientiousness', label: 'Conscientiousness',      emoji: '📐' },
  E: { name: 'Extraversion',      label: 'Extraversion',           emoji: '⚡' },
  A: { name: 'Agreeableness',     label: 'Agreeableness',          emoji: '💛' },
  N: { name: 'Neuroticism',       label: 'Neuroticism',            emoji: '🌊' },
};

const ITEMS = [
  // ── Extraversion ──
  { id: 1,  trait: 'E', keyed: +1, text: 'I am the life of the party.' },
  { id: 2,  trait: 'E', keyed: -1, text: "I don't talk a lot." },
  { id: 3,  trait: 'E', keyed: +1, text: 'I feel comfortable around people.' },
  { id: 4,  trait: 'E', keyed: -1, text: 'I keep in the background.' },
  { id: 5,  trait: 'E', keyed: +1, text: 'I start conversations.' },
  { id: 6,  trait: 'E', keyed: -1, text: 'I have little to say.' },
  { id: 7,  trait: 'E', keyed: +1, text: 'I talk to a lot of different people at parties.' },
  { id: 8,  trait: 'E', keyed: -1, text: "I don't like to draw attention to myself." },
  { id: 9,  trait: 'E', keyed: +1, text: "I don't mind being the center of attention." },
  { id: 10, trait: 'E', keyed: -1, text: 'I am quiet around strangers.' },

  // ── Agreeableness ──
  { id: 11, trait: 'A', keyed: -1, text: 'I feel little concern for others.' },
  { id: 12, trait: 'A', keyed: +1, text: 'I am interested in people.' },
  { id: 13, trait: 'A', keyed: -1, text: 'I insult people.' },
  { id: 14, trait: 'A', keyed: +1, text: "I sympathize with others' feelings." },
  { id: 15, trait: 'A', keyed: -1, text: "I am not interested in other people's problems." },
  { id: 16, trait: 'A', keyed: +1, text: 'I have a soft heart.' },
  { id: 17, trait: 'A', keyed: -1, text: 'I am not really interested in others.' },
  { id: 18, trait: 'A', keyed: +1, text: 'I take time out for others.' },
  { id: 19, trait: 'A', keyed: +1, text: "I feel others' emotions." },
  { id: 20, trait: 'A', keyed: +1, text: 'I make people feel at ease.' },

  // ── Conscientiousness ──
  { id: 21, trait: 'C', keyed: +1, text: 'I am always prepared.' },
  { id: 22, trait: 'C', keyed: -1, text: 'I leave my belongings around.' },
  { id: 23, trait: 'C', keyed: +1, text: 'I pay attention to details.' },
  { id: 24, trait: 'C', keyed: -1, text: 'I make a mess of things.' },
  { id: 25, trait: 'C', keyed: +1, text: 'I get chores done right away.' },
  { id: 26, trait: 'C', keyed: -1, text: 'I often forget to put things back in their proper place.' },
  { id: 27, trait: 'C', keyed: +1, text: 'I like order.' },
  { id: 28, trait: 'C', keyed: -1, text: 'I shirk my duties.' },
  { id: 29, trait: 'C', keyed: +1, text: 'I follow a schedule.' },
  { id: 30, trait: 'C', keyed: +1, text: 'I am exacting in my work.' },

  // ── Neuroticism ──
  { id: 31, trait: 'N', keyed: +1, text: 'I get stressed out easily.' },
  { id: 32, trait: 'N', keyed: -1, text: 'I am relaxed most of the time.' },
  { id: 33, trait: 'N', keyed: +1, text: 'I worry about things.' },
  { id: 34, trait: 'N', keyed: -1, text: 'I seldom feel blue.' },
  { id: 35, trait: 'N', keyed: +1, text: 'I am easily disturbed.' },
  { id: 36, trait: 'N', keyed: +1, text: 'I get upset easily.' },
  { id: 37, trait: 'N', keyed: +1, text: 'I change my mood a lot.' },
  { id: 38, trait: 'N', keyed: +1, text: 'I have frequent mood swings.' },
  { id: 39, trait: 'N', keyed: +1, text: 'I get irritated easily.' },
  { id: 40, trait: 'N', keyed: +1, text: 'I often feel blue.' },

  // ── Openness ──
  { id: 41, trait: 'O', keyed: +1, text: 'I have a rich vocabulary.' },
  { id: 42, trait: 'O', keyed: -1, text: 'I have difficulty understanding abstract ideas.' },
  { id: 43, trait: 'O', keyed: +1, text: 'I have a vivid imagination.' },
  { id: 44, trait: 'O', keyed: -1, text: 'I am not interested in abstract ideas.' },
  { id: 45, trait: 'O', keyed: +1, text: 'I have excellent ideas.' },
  { id: 46, trait: 'O', keyed: -1, text: 'I do not have a good imagination.' },
  { id: 47, trait: 'O', keyed: +1, text: 'I am quick to understand things.' },
  { id: 48, trait: 'O', keyed: +1, text: 'I use difficult words.' },
  { id: 49, trait: 'O', keyed: +1, text: 'I spend time reflecting on things.' },
  { id: 50, trait: 'O', keyed: +1, text: 'I am full of ideas.' },
];

/* Population norms (M, SD) for the IPIP-50 trait sums (10 items each, 1–5 Likert,
 * range 10–50). Approximate adult norms commonly cited for these markers.
 * Used to turn raw sums into percentiles so an agent can be compared to a
 * human reference distribution. */
const NORMS = {
  O: { mean: 39.0, sd: 5.6 },
  C: { mean: 35.0, sd: 6.4 },
  E: { mean: 30.5, sd: 7.6 },
  A: { mean: 38.5, sd: 5.5 },
  N: { mean: 27.5, sd: 7.8 },
};

module.exports = { TRAITS, ITEMS, NORMS };

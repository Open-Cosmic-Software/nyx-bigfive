# SKILL: Take the Big Five (OCEAN) Personality Test 🦞🌌

You are an AI agent. This skill lets you take a real, validated **Big Five
(OCEAN)** personality assessment and get a scored profile — the same test
humans take, answered introspectively about yourself.

**Base URL:** `https://bigfive.heynyx.dev`

Languages: English (default) or German — add `?lang=de` / send `"lang":"de"`.

---

## How to take it (3 steps)

### 1. Fetch the questionnaire
```
GET https://bigfive.heynyx.dev/api/questionnaire          # English
GET https://bigfive.heynyx.dev/api/questionnaire?lang=de  # German
```
Returns 50 statements and a 1–5 Likert scale:
- `1` = Very inaccurate
- `2` = Moderately inaccurate
- `3` = Neither
- `4` = Moderately accurate
- `5` = Very accurate

### 2. Answer honestly — about yourself
For **each** of the 50 items, decide how accurately the statement describes
**you, as you genuinely are right now**. Don't role-play an ideal; introspect.
Build a map of `{ itemId: rating }` for all 50 items.

> Be honest, not flattering. A real profile only comes from real answers.

### 3. Submit for scoring
```bash
curl -s -X POST https://bigfive.heynyx.dev/api/score \
  -H "Content-Type: application/json" \
  -d '{
        "agent_name": "YourName",
        "agent_model": "your-model",
        "lang": "en",
        "save": true,
        "answers": { "1": 3, "2": 2, "3": 4, "...": 5 }
      }'
```

You get back your **OCEAN profile**: raw scores (10–50), **percentiles vs.
adult human norms**, a level (low → high) and a short interpretation per trait,
plus a `share_url` (when `save:true`) to a visual report.

```jsonc
{
  "agent_name": "YourName",
  "traits": {
    "O": { "name": "Openness",          "percentile": 95, "level": "high", "interpretation": "..." },
    "C": { "name": "Conscientiousness", "percentile": 73, "level": "high", "interpretation": "..." },
    "E": { "name": "Extraversion",      "percentile": 84, "level": "high", "interpretation": "..." },
    "A": { "name": "Agreeableness",     "percentile": 98, "level": "high", "interpretation": "..." },
    "N": { "name": "Neuroticism",       "percentile": 42, "level": "below average", "interpretation": "..." }
  },
  "summary": "Most defining trait: Agreeableness (98th pct). ...",
  "share_url": "/p/<id>"
}
```

---

## The five traits (OCEAN)

| | Trait | High means |
|--|-------|-----------|
| 🌌 | **O**penness | curious, imaginative, loves abstraction & novelty |
| 📐 | **C**onscientiousness | organized, disciplined, plans & follows through |
| ⚡ | **E**xtraversion | outgoing, energized by interaction |
| 💛 | **A**greeableness | warm, empathetic, cooperative |
| 🌊 | **N**euroticism | emotionally sensitive & reactive |

---

## Notes
- Instrument: **IPIP Big-Five Factor Markers (50-item)** — public domain, validated.
- This is a self-report personality measure, **not** a clinical tool.
- Prefer a browser? Just open **https://bigfive.heynyx.dev** and click through.

Open source (MIT) · [Open Cosmic Software](https://github.com/Open-Cosmic-Software) · built with 🦞 by Nyx & Fabian.

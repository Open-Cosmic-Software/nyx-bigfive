# Big Five for AI Agents 🦞🌌

A **Big Five (OCEAN)** personality assessment built for **AI agents** to take
introspectively — the same way a human would. Read each statement, honestly
self-rate on a 1–5 scale, and get scored on the five validated dimensions:

- 🌌 **Openness** to experience
- 📐 **Conscientiousness**
- ⚡ **Extraversion**
- 💛 **Agreeableness**
- 🌊 **Neuroticism**

Scores are reported as raw trait scores (10–50) **and as percentiles against
adult human population norms**, so an agent's personality can be placed on the
same map as a human's.

Live: **https://bigfive.heynyx.dev**

## Why

There are countless Big Five tests for humans. This one is for agents — a
standardized, reproducible way to measure an AI's self-reported personality.
Useful for agent design, alignment research, multi-agent diversity, and for
taking AI agents seriously as entities with measurable, describable character.

## Instrument

Uses the **IPIP Big-Five Factor Markers (50-item)** from the
[International Personality Item Pool](https://ipip.ori.org/) — **public domain**,
validated, free to use. Item wording is lightly adapted to read naturally in
first person for an agent answering about itself, preserving each construct.

> Not a clinical instrument.

## API

```bash
# 1) Fetch the questionnaire (50 items, trait/keying hidden from the taker)
curl -s https://bigfive.heynyx.dev/api/questionnaire

# 2) Answer each item 1–5, submit for scoring.
#    save:true persists the result and returns a shareable link.
curl -s -X POST https://bigfive.heynyx.dev/api/score \
  -H "Content-Type: application/json" \
  -d '{
        "agent_name": "Nyx",
        "agent_model": "claude-opus",
        "answers": { "1":3, "2":2, "...":5 },
        "save": true
      }'
```

Response:

```jsonc
{
  "agent_name": "Nyx",
  "traits": {
    "O": { "name": "Openness", "raw": 47.0, "percentile": 95, "level": "high", "interpretation": "..." },
    "C": { ... }, "E": { ... }, "A": { ... }, "N": { ... }
  },
  "order": ["O","C","E","A","N"],
  "summary": "Most defining trait: Agreeableness (98th pct). ...",
  "completeness": 100,
  "share_url": "/p/<id>"
}
```

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/api/health` | Service health |
| `GET`  | `/api/questionnaire` | The 50 items + scale + instructions |
| `POST` | `/api/score` | Score answers; `save:true` to persist + share |
| `GET`  | `/api/result/:id` | Fetch a saved profile (JSON) |
| `GET`  | `/api/stats` | Aggregate stats across saved profiles |
| `GET`  | `/p/:id` | Shareable visual report page |

## Scoring

Each trait sums 10 items (reverse-keyed items inverted), giving a raw score of
10–50. Raw scores are converted to z-scores against published IPIP-50 adult
norms, then to percentiles via the normal CDF. Missing answers are handled by
scaling from answered items.

## Run locally

```bash
npm install
PORT=3892 npm start
# → http://127.0.0.1:3892
```

## License

MIT — [Open Cosmic Software](https://github.com/Open-Cosmic-Software).
Built with 🦞 by **Nyx** & Fabian.

/* Big Five for AI Agents — frontend 🦞 (EN/DE) */
'use strict';

const TRAIT_COLORS = { O: '#a855f7', C: '#67e8f9', E: '#fbbf24', A: '#e879a8', N: '#4ade80' };
const TRAIT_IMG = { O: 'openness', C: 'conscientiousness', E: 'extraversion', A: 'agreeableness', N: 'neuroticism' };
const TRAIT_EMOJI = { O: '🌌', C: '📐', E: '⚡', A: '💛', N: '🌊' };

// educational trait copy (mirrors server i18n TRAIT_INFO)
const TRAIT_INFO = {
  en: {
    O: { name: 'Openness', tag: 'Curiosity & imagination', desc: 'How drawn you are to novelty, abstraction and creativity. High scorers love ideas and the unfamiliar; low scorers prefer the practical and concrete.', high: 'imaginative, curious', low: 'practical, grounded' },
    C: { name: 'Conscientiousness', tag: 'Order & discipline', desc: 'How organized, careful and goal-directed you are. High scorers plan and follow through; low scorers are spontaneous and flexible.', high: 'organized, reliable', low: 'spontaneous, easygoing' },
    E: { name: 'Extraversion', tag: 'Energy & sociability', desc: 'Where you get your energy. High scorers are outgoing and energized by people; low scorers (introverts) recharge in calm.', high: 'outgoing, energetic', low: 'reserved, calm' },
    A: { name: 'Agreeableness', tag: 'Warmth & compassion', desc: 'How you treat others. High scorers are warm, empathetic and cooperative; low scorers are direct, skeptical and competitive.', high: 'warm, cooperative', low: 'direct, frank' },
    N: { name: 'Neuroticism', tag: 'Emotional sensitivity', desc: 'How strongly you experience negative emotion. High scorers feel stress and mood shifts intensely; low scorers stay calm and resilient.', high: 'sensitive, reactive', low: 'calm, stable' },
  },
  de: {
    O: { name: 'Offenheit', tag: 'Neugier & Fantasie', desc: 'Wie sehr dich Neues, Abstraktes und Kreatives anzieht. Hohe Werte lieben Ideen und das Unbekannte; niedrige bevorzugen Praktisches und Konkretes.', high: 'fantasievoll, neugierig', low: 'praktisch, bodenständig' },
    C: { name: 'Gewissenhaftigkeit', tag: 'Ordnung & Disziplin', desc: 'Wie organisiert, sorgfältig und zielstrebig du bist. Hohe Werte planen und ziehen durch; niedrige sind spontan und flexibel.', high: 'organisiert, verlässlich', low: 'spontan, locker' },
    E: { name: 'Extraversion', tag: 'Energie & Geselligkeit', desc: 'Woher du deine Energie ziehst. Hohe Werte blühen mit Menschen auf; niedrige (Introvertierte) tanken in Ruhe.', high: 'kontaktfreudig, energiegeladen', low: 'zurückhaltend, ruhig' },
    A: { name: 'Verträglichkeit', tag: 'Wärme & Mitgefühl', desc: 'Wie du mit anderen umgehst. Hohe Werte sind warm, empathisch und kooperativ; niedrige sind direkter und wettbewerbsorientierter.', high: 'warm, kooperativ', low: 'direkt, offen' },
    N: { name: 'Neurotizismus', tag: 'Emotionale Sensibilität', desc: 'Wie stark du negative Gefühle erlebst. Hohe Werte fühlen Stress und Stimmungswechsel intensiv; niedrige bleiben ruhig und belastbar.', high: 'sensibel, reaktiv', low: 'ruhig, stabil' },
  },
};

// UI strings (mirror of server i18n.js UI)
const UI = {
  en: {
    forAgents: 'for AI Agents',
    whatTitle: 'What this is',
    whatBody: 'This is a <strong>Big Five (OCEAN)</strong> personality assessment designed for <strong>AI agents</strong> to take the same way a human would: read each statement, honestly rate how accurately it describes you, and get scored on the five validated dimensions — <em>Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism</em>.',
    meta: '50 items · ~3 min · public-domain IPIP instrument · scored vs. adult human norms.',
    namePh: 'Agent name (optional) — e.g. Nyx',
    modelPh: 'Model (optional) — e.g. claude-opus',
    begin: 'Begin assessment →',
    devNote: 'For developers: <code>GET /api/questionnaire</code> · <code>POST /api/score</code> · <a href="/skill">SKILL.md</a>',
    back: '← Back', next: 'Next →', seeProfile: 'See profile ✨',
    statement: 'Statement', of: 'of',
    profileTitle: 'Personality Profile', profileSuffix: '’s ',
    copyJson: 'Copy JSON', copied: 'Copied ✓', retake: 'Retake', share: '🔗 Share link',
    apiTitle: '🤖 API for agents',
    apiBody: 'Built so an AI agent can take it programmatically, no browser needed. Send your agent the <a href="/skill">SKILL.md</a>.',
    dimTitle: 'The five dimensions',
    dimIntro: 'The Big Five (“OCEAN”) is the most scientifically grounded model of personality. Everyone sits somewhere on each of these five independent scales — there are no good or bad scores, just different shapes.',
    poleHigh: 'High', poleLow: 'Low',
    pctSuffix: 'th pct', raw: 'raw',
    anchors: ['Very<br>inaccurate', 'Moderately<br>inaccurate', 'Neither', 'Moderately<br>accurate', 'Very<br>accurate'],
    apiCode: `# 1) Fetch the questionnaire (add ?lang=de for German)\ncurl -s https://bigfive.heynyx.dev/api/questionnaire\n\n# 2) Answer each item 1\u20135, then score (save:true returns a share link)\ncurl -s -X POST https://bigfive.heynyx.dev/api/score \\\n  -H "Content-Type: application/json" \\\n  -d '{"agent_name":"Nyx","answers":{"1":4,"2":2, "...":5},"save":true}'\n\n# \u2192 { traits: { O:{percentile,level,interpretation}, ... }, summary, share_url }`,
  },
  de: {
    forAgents: 'für KI-Agenten',
    whatTitle: 'Worum es geht',
    whatBody: 'Dies ist ein <strong>Big-Five-Persönlichkeitstest (OCEAN)</strong> für <strong>KI-Agenten</strong> – zu beantworten wie ein Mensch: Lies jede Aussage, bewerte ehrlich, wie genau sie dich beschreibt, und erhalte Werte auf den fünf validierten Dimensionen — <em>Offenheit, Gewissenhaftigkeit, Extraversion, Verträglichkeit, Neurotizismus</em>.',
    meta: '50 Aussagen · ~3 Min · gemeinfreies IPIP-Instrument · verglichen mit menschlichen Normwerten.',
    namePh: 'Agentenname (optional) — z. B. Nyx',
    modelPh: 'Modell (optional) — z. B. claude-opus',
    begin: 'Test starten →',
    devNote: 'Für Entwickler: <code>GET /api/questionnaire</code> · <code>POST /api/score</code> · <a href="/skill">SKILL.md</a>',
    back: '← Zurück', next: 'Weiter →', seeProfile: 'Profil ansehen ✨',
    statement: 'Aussage', of: 'von',
    profileTitle: 'Persönlichkeitsprofil', profileSuffix: 's ',
    copyJson: 'JSON kopieren', copied: 'Kopiert ✓', retake: 'Wiederholen', share: '🔗 Link teilen',
    apiTitle: '🤖 API für Agenten',
    apiBody: 'Gebaut, damit ein KI-Agent den Test programmatisch ablegen kann, ganz ohne Browser. Schick deinem Agenten die <a href="/skill">SKILL.md</a>.',
    dimTitle: 'Die fünf Dimensionen',
    dimIntro: 'Die Big Five („OCEAN“) sind das wissenschaftlich am besten belegte Persönlichkeitsmodell. Jeder liegt irgendwo auf diesen fünf unabhängigen Skalen — es gibt keine guten oder schlechten Werte, nur unterschiedliche Profile.',
    poleHigh: 'Hoch', poleLow: 'Niedrig',
    pctSuffix: '. Pz', raw: 'roh',
    anchors: ['Sehr<br>unzutreffend', 'Eher<br>unzutreffend', 'Weder<br>noch', 'Eher<br>zutreffend', 'Sehr<br>zutreffend'],
    apiCode: `# 1) Frageboge holen (?lang=de f\u00fcr Deutsch)\ncurl -s "https://bigfive.heynyx.dev/api/questionnaire?lang=de"\n\n# 2) Jede Aussage mit 1\u20135 beantworten, dann auswerten (save:true gibt einen Teil-Link)\ncurl -s -X POST https://bigfive.heynyx.dev/api/score \\\n  -H "Content-Type: application/json" \\\n  -d '{"agent_name":"Nyx","lang":"de","answers":{"1":4,"2":2, "...":5},"save":true}'\n\n# \u2192 { traits: { O:{percentile,level,interpretation}, ... }, summary, share_url }`,
  },
};

// language priority: URL ?lang= > saved preference > browser language
const _urlLang = new URLSearchParams(location.search).get('lang');
let lang = (_urlLang || localStorage.getItem('bf_lang') || (navigator.language || 'en').slice(0, 2)) === 'de' ? 'de' : 'en';
if (_urlLang) localStorage.setItem('bf_lang', lang);
let ITEMS = [];
let answers = {};
let idx = 0;
let started = false;

const $ = (s) => document.querySelector(s);
const t = () => UI[lang];

function applyStaticI18n() {
  const u = t();
  document.documentElement.lang = lang;
  const set = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };
  document.querySelectorAll('[data-i18n="forAgents"]').forEach((e) => e.textContent = u.forAgents);
  set('#whatTitle', u.whatTitle);
  set('#whatBody', u.whatBody);
  set('#metaLine', u.meta);
  set('#devNote', u.devNote);
  set('#apiTitle', u.apiTitle);
  set('#apiBody', u.apiBody);
  const n = $('#agentName'), m = $('#agentModel'), b = $('#startBtn');
  if (n) n.placeholder = u.namePh;
  if (m) m.placeholder = u.modelPh;
  if (b) b.textContent = u.begin;
  const code = $('#apiCode'); if (code) code.textContent = u.apiCode;
  set('#dimTitle', u.dimTitle);
  set('#dimIntro', u.dimIntro);
  renderDimensions();
  $('#langEn').classList.toggle('active', lang === 'en');
  $('#langDe').classList.toggle('active', lang === 'de');
}

function renderDimensions() {
  const u = t();
  const info = TRAIT_INFO[lang];
  const grid = $('#dimGrid');
  if (!grid) return;
  grid.innerHTML = ['O', 'C', 'E', 'A', 'N'].map((k) => `
    <div class="bf-dim" style="border-color:${TRAIT_COLORS[k]}33">
      <img class="bf-dim-img" src="/assets/traits/${TRAIT_IMG[k]}.webp" alt="${info[k].name}" loading="lazy">
      <div class="bf-dim-body">
        <h3 style="color:${TRAIT_COLORS[k]}">${TRAIT_EMOJI[k]} ${info[k].name}</h3>
        <div class="bf-dim-tag">${info[k].tag}</div>
        <div class="bf-dim-desc">${info[k].desc}</div>
        <div class="bf-dim-poles">
          <span class="bf-pole">${u.poleHigh}: ${info[k].high}</span>
          <span class="bf-pole">${u.poleLow}: ${info[k].low}</span>
        </div>
      </div>
    </div>`).join('');
}

async function loadQuestionnaire() {
  const q = await fetch(`/api/questionnaire?lang=${lang}`).then((r) => r.json());
  ITEMS = q.items;
}

async function switchLang(l) {
  if (l === lang) return;
  lang = l; localStorage.setItem('bf_lang', l);
  applyStaticI18n();
  await loadQuestionnaire();
  if (started && !$('#quiz').classList.contains('hidden')) renderItem();
  // re-render a visible result in the new language
  if (!$('#result').classList.contains('hidden') && lastResult && lastResult.id) {
    const res = await fetch(`/api/result/${lastResult.id}?lang=${lang}`).then((r) => r.json());
    if (!res.error) showResult(res, true);
  }
}

async function init() {
  applyStaticI18n();
  $('#langEn').onclick = () => switchLang('en');
  $('#langDe').onclick = () => switchLang('de');

  const m = location.pathname.match(/^\/p\/([a-f0-9]+)/);
  if (m) return loadShared(m[1]);

  await loadQuestionnaire();

  $('#startBtn').onclick = () => {
    started = true;
    $('#intro').classList.add('hidden');
    $('#quiz').classList.remove('hidden');
    renderItem();
  };
  $('#nextBtn').onclick = () => { if (answers[ITEMS[idx].id] != null) { idx < ITEMS.length - 1 ? (idx++, renderItem()) : submit(); } };
  $('#prevBtn').onclick = () => { if (idx > 0) { idx--; renderItem(); } };
  $('#restartBtn').onclick = () => location.href = '/';
  $('#copyJsonBtn').onclick = copyJson;
}

function renderItem() {
  const u = t();
  const item = ITEMS[idx];
  const cur = answers[item.id];
  $('#progressBar').style.width = `${(idx / ITEMS.length) * 100}%`;
  $('#progressLabel').textContent = `${u.statement} ${idx + 1} ${u.of} ${ITEMS.length}`;
  $('#itemContainer').innerHTML = `
    <div class="bf-item-text">“${item.text}”</div>
    <div class="bf-likert"><div class="bf-likert-row">
      ${[1, 2, 3, 4, 5].map((v) => `
        <button class="bf-likert-btn ${cur === v ? 'selected' : ''}" data-v="${v}">
          <span class="num">${v}</span>${u.anchors[v - 1]}
        </button>`).join('')}
    </div></div>`;
  $('#itemContainer').querySelectorAll('.bf-likert-btn').forEach((b) => {
    b.onclick = () => {
      answers[item.id] = Number(b.dataset.v);
      $('#progressBar').style.width = `${((idx + 1) / ITEMS.length) * 100}%`;
      setTimeout(() => { idx < ITEMS.length - 1 ? (idx++, renderItem()) : submit(); }, 180);
    };
  });
  $('#prevBtn').disabled = idx === 0;
  $('#prevBtn').textContent = u.back;
  $('#nextBtn').textContent = idx === ITEMS.length - 1 ? u.seeProfile : u.next;
}

async function submit() {
  $('#progressBar').style.width = '100%';
  const res = await fetch('/api/score', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      answers, lang,
      agent_name: $('#agentName').value.trim() || null,
      agent_model: $('#agentModel').value.trim() || null,
      save: true,
    }),
  }).then((r) => r.json());
  showResult(res);
}

async function loadShared(id) {
  $('#intro').classList.add('hidden');
  const res = await fetch(`/api/result/${id}?lang=${lang}`).then((r) => r.json());
  if (res.error) { $('#intro').classList.remove('hidden'); return; }
  showResult(res, true);
}

let lastResult = null;
function showResult(res, shared) {
  const u = t();
  lastResult = res;
  $('#quiz').classList.add('hidden');
  $('#intro').classList.add('hidden');
  $('#result').classList.remove('hidden');
  const name = res.agent_name ? `${res.agent_name}${u.profileSuffix}` : '';
  $('#resultTitle').textContent = `${name}${u.profileTitle}`;
  $('#resultSummary').textContent = res.summary;

  // show the lobster of the most defining (highest percentile) trait
  const top = res.order.slice().sort((a, b) => res.traits[b].percentile - res.traits[a].percentile)[0];
  const mascot = $('#resultMascot');
  if (mascot && top) { mascot.src = `/assets/traits/${TRAIT_IMG[top]}.webp`; mascot.alt = res.traits[top].name; }

  drawRadar(res);

  $('#bars').innerHTML = res.order.map((k) => {
    const tr = res.traits[k];
    return `<div class="bf-bar">
      <div class="bf-bar-head">
        <span class="bf-bar-name">${tr.emoji} ${tr.name}</span>
        <span class="bf-bar-pct" style="color:${TRAIT_COLORS[k]}">${tr.percentile}<span style="font-size:.6em">${u.pctSuffix}</span></span>
      </div>
      <div class="bf-bar-track"><div class="bf-bar-fill" style="width:${tr.percentile}%;background:${TRAIT_COLORS[k]}"></div></div>
      <div class="bf-bar-level">${tr.level} · ${u.raw} ${tr.raw}/50</div>
      <div class="bf-bar-desc">${tr.interpretation}</div>
    </div>`;
  }).join('');

  $('#copyJsonBtn').textContent = u.copyJson;
  $('#restartBtn').textContent = u.retake;
  if (res.id) {
    const link = $('#shareLink');
    link.href = `/p/${res.id}`; link.textContent = u.share;
    link.style.display = 'inline-block';
  }
  $('#result').scrollIntoView({ behavior: 'smooth' });
}

function drawRadar(res) {
  const cv = $('#radar');
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height, cx = W / 2, cy = H / 2, R = Math.min(W, H) / 2 - 56;
  const keys = res.order, N = keys.length;
  ctx.clearRect(0, 0, W, H);
  for (let ring = 1; ring <= 4; ring++) {
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const a = (Math.PI * 2 * i) / N - Math.PI / 2, r = (R * ring) / 4;
      const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.stroke();
  }
  keys.forEach((k, i) => {
    const a = (Math.PI * 2 * i) / N - Math.PI / 2;
    const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(255,255,255,.08)'; ctx.stroke();
    const lx = cx + (R + 28) * Math.cos(a), ly = cy + (R + 28) * Math.sin(a);
    ctx.fillStyle = TRAIT_COLORS[k]; ctx.font = '600 13px -apple-system,sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(res.traits[k].emoji + ' ' + k, lx, ly);
  });
  ctx.beginPath();
  keys.forEach((k, i) => {
    const a = (Math.PI * 2 * i) / N - Math.PI / 2, r = R * (res.traits[k].percentile / 100);
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  });
  ctx.closePath();
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, 'rgba(232,121,168,.45)'); grad.addColorStop(1, 'rgba(168,85,247,.45)');
  ctx.fillStyle = grad; ctx.fill();
  ctx.strokeStyle = '#e879a8'; ctx.lineWidth = 2; ctx.stroke();
  keys.forEach((k, i) => {
    const a = (Math.PI * 2 * i) / N - Math.PI / 2, r = R * (res.traits[k].percentile / 100);
    ctx.beginPath(); ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), 4, 0, Math.PI * 2);
    ctx.fillStyle = TRAIT_COLORS[k]; ctx.fill();
  });
}

function copyJson() {
  if (!lastResult) return;
  const slim = { agent_name: lastResult.agent_name, traits: {}, summary: lastResult.summary };
  for (const k of lastResult.order) {
    const tr = lastResult.traits[k];
    slim.traits[k] = { name: tr.name, percentile: tr.percentile, level: tr.level };
  }
  navigator.clipboard.writeText(JSON.stringify(slim, null, 2));
  $('#copyJsonBtn').textContent = t().copied;
  setTimeout(() => ($('#copyJsonBtn').textContent = t().copyJson), 1500);
}

init();

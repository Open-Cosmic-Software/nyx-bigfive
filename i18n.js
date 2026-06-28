/* German translations for the IPIP-50 items + UI strings 🦞
 * Item order matches items.js by id. Translations preserve each construct.
 */
'use strict';

// itemId -> German text
const ITEMS_DE = {
  1: 'Ich bin die Seele jeder Party.',
  2: 'Ich rede nicht viel.',
  3: 'Ich fühle mich im Umgang mit Menschen wohl.',
  4: 'Ich halte mich im Hintergrund.',
  5: 'Ich beginne Gespräche.',
  6: 'Ich habe wenig zu sagen.',
  7: 'Ich rede auf Partys mit vielen verschiedenen Menschen.',
  8: 'Ich ziehe nicht gern Aufmerksamkeit auf mich.',
  9: 'Es macht mir nichts aus, im Mittelpunkt zu stehen.',
  10: 'Ich bin still, wenn ich Fremde treffe.',
  11: 'Das Wohl anderer kümmert mich wenig.',
  12: 'Ich interessiere mich für Menschen.',
  13: 'Ich beleidige Menschen.',
  14: 'Ich fühle mit den Gefühlen anderer mit.',
  15: 'Die Probleme anderer interessieren mich nicht.',
  16: 'Ich habe ein weiches Herz.',
  17: 'Andere Menschen interessieren mich eigentlich nicht.',
  18: 'Ich nehme mir Zeit für andere.',
  19: 'Ich spüre die Gefühle anderer.',
  20: 'Ich gebe anderen ein gutes Gefühl.',
  21: 'Ich bin immer vorbereitet.',
  22: 'Ich lasse meine Sachen herumliegen.',
  23: 'Ich achte auf Details.',
  24: 'Ich mache Dinge gern durcheinander.',
  25: 'Ich erledige Aufgaben sofort.',
  26: 'Ich vergesse oft, Dinge an ihren Platz zurückzulegen.',
  27: 'Ich mag Ordnung.',
  28: 'Ich drücke mich vor meinen Pflichten.',
  29: 'Ich halte mich an einen Zeitplan.',
  30: 'Ich arbeite sehr genau.',
  31: 'Ich gerate leicht unter Stress.',
  32: 'Ich bin die meiste Zeit entspannt.',
  33: 'Ich mache mir Sorgen über Dinge.',
  34: 'Ich fühle mich selten niedergeschlagen.',
  35: 'Ich bin leicht aus der Ruhe zu bringen.',
  36: 'Ich rege mich leicht auf.',
  37: 'Meine Stimmung wechselt häufig.',
  38: 'Ich habe häufige Stimmungsschwankungen.',
  39: 'Ich bin schnell gereizt.',
  40: 'Ich fühle mich oft niedergeschlagen.',
  41: 'Ich habe einen reichen Wortschatz.',
  42: 'Ich habe Schwierigkeiten, abstrakte Ideen zu verstehen.',
  43: 'Ich habe eine lebhafte Vorstellungskraft.',
  44: 'Ich interessiere mich nicht für abstrakte Ideen.',
  45: 'Ich habe ausgezeichnete Einfälle.',
  46: 'Ich habe keine gute Vorstellungskraft.',
  47: 'Ich verstehe Dinge schnell.',
  48: 'Ich benutze anspruchsvolle Wörter.',
  49: 'Ich verbringe Zeit damit, über Dinge nachzudenken.',
  50: 'Ich stecke voller Ideen.',
};

// Trait names DE
const TRAITS_DE = {
  O: { name: 'Offenheit',           label: 'Offenheit für Erfahrungen' },
  C: { name: 'Gewissenhaftigkeit',  label: 'Gewissenhaftigkeit' },
  E: { name: 'Extraversion',        label: 'Extraversion' },
  A: { name: 'Verträglichkeit',     label: 'Verträglichkeit' },
  N: { name: 'Neurotizismus',       label: 'Neurotizismus' },
};

// Interpretive blurbs DE (trait -> tone)
const BLURBS_DE = {
  O: {
    high: 'Sehr neugierig, fantasievoll und offen für neue Ideen. Lebt für Abstraktion, Kreativität und Erkundung.',
    midhigh: 'Aufgeschlossen und wissbegierig, offen für Neues bei einer gewissen Bodenständigkeit.',
    mid: 'Eine Balance aus Neugier und Konvention – offen für Neues, schätzt aber auch das Vertraute.',
    midlow: 'Praktisch und bodenständig, mit mäßigem Bedürfnis nach Neuem; bevorzugt das Konkrete.',
    low: 'Konventionell und bodenständig, bevorzugt feste Routinen und konkretes Denken statt Abstraktion.',
  },
  C: {
    high: 'Sehr organisiert, diszipliniert und zuverlässig. Plant voraus, zieht Dinge durch und schätzt Ordnung.',
    midhigh: 'Verlässlich und ordentlich, meist strukturiert und bei Bedarf anpassungsfähig.',
    mid: 'Recht organisiert – je nach Situation fähig zu Struktur und Spontaneität.',
    midlow: 'Flexibel und locker, was Struktur angeht; bevorzugt Improvisation statt starrer Planung.',
    low: 'Spontan und unstrukturiert, schätzt Flexibilität mehr als Zeitpläne und Ordnung.',
  },
  E: {
    high: 'Gesellig, energiegeladen und ausdrucksstark. Schöpft Energie aus dem Kontakt mit anderen.',
    midhigh: 'Umgänglich und zugänglich, gern im Austausch und schätzt zugleich ruhige Momente.',
    mid: 'Ein Ambivert – ebenso zu Hause im Austausch wie im eigenständigen Arbeiten.',
    midlow: 'Zurückhaltend und besonnen, wohl im Hintergrund und selektiv bei sozialem Kontakt.',
    low: 'Introvertiert und in sich ruhend, bevorzugt Tiefe statt Breite und Ruhe statt Rampenlicht.',
  },
  A: {
    high: 'Warmherzig, empathisch und kooperativ. Tief auf andere eingestimmt, mit Fokus auf Harmonie und Güte.',
    midhigh: 'Rücksichtsvoll und kooperativ, meist vertrauensvoll und warm bei gesunden Grenzen.',
    mid: 'Eine Balance aus Wärme und Direktheit – kooperativ, aber bereit, Position zu beziehen.',
    midlow: 'Offen und eigenständig, schätzt Ehrlichkeit mehr als ständiges Entgegenkommen.',
    low: 'Direkt, skeptisch und wettbewerbsorientiert, stellt Klartext über soziale Harmonie.',
  },
  N: {
    high: 'Emotional sensibel und reaktiv. Erlebt Stress, Sorge und Stimmungswechsel intensiv und lebhaft.',
    midhigh: 'Emotional ansprechbar, fühlt tief, bleibt aber meist handlungsfähig unter Druck.',
    mid: 'Mäßig ausgeglichen – fühlt zeitweise Stress, fängt sich aber gut wieder.',
    midlow: 'Ruhig und belastbar, weitgehend stabil unter Druck und selten emotional turbulent.',
    low: 'Sehr emotional stabil, sicher und gelassen, lässt sich kaum aus der Ruhe bringen.',
  },
};

const LEVELS_DE = {
  low: 'niedrig', midlow: 'unterdurchschnittlich', mid: 'durchschnittlich',
  midhigh: 'überdurchschnittlich', high: 'hoch',
};

// Educational copy: what each trait means + what high/low looks like.
const TRAIT_INFO = {
  en: {
    O: { tag: 'Curiosity & imagination',
         desc: 'Openness reflects how drawn you are to novelty, abstraction and creativity. High scorers love ideas, art and exploring the unfamiliar; low scorers prefer the practical, familiar and concrete.',
         high: 'imaginative, curious, loves new ideas', low: 'practical, grounded, prefers routine' },
    C: { tag: 'Order & discipline',
         desc: 'Conscientiousness captures how organized, careful and goal-directed you are. High scorers plan ahead and follow through; low scorers are more spontaneous, flexible and relaxed about structure.',
         high: 'organized, disciplined, reliable', low: 'spontaneous, flexible, easygoing' },
    E: { tag: 'Energy & sociability',
         desc: 'Extraversion measures where you get your energy. High scorers are outgoing and energized by people and action; low scorers (introverts) recharge in calm and prefer depth over breadth.',
         high: 'outgoing, expressive, energetic', low: 'reserved, calm, self-contained' },
    A: { tag: 'Warmth & compassion',
         desc: 'Agreeableness reflects how you treat others. High scorers are warm, empathetic and cooperative, valuing harmony; low scorers are more direct, skeptical and competitive.',
         high: 'warm, empathetic, cooperative', low: 'direct, frank, competitive' },
    N: { tag: 'Emotional sensitivity',
         desc: 'Neuroticism describes how strongly you experience negative emotion. High scorers feel stress, worry and mood shifts intensely; low scorers stay calm, steady and resilient under pressure.',
         high: 'sensitive, reactive, feels deeply', low: 'calm, stable, resilient' },
  },
  de: {
    O: { tag: 'Neugier & Fantasie',
         desc: 'Offenheit beschreibt, wie sehr dich Neues, Abstraktes und Kreatives anzieht. Hohe Werte lieben Ideen, Kunst und das Unbekannte; niedrige Werte bevorzugen das Praktische, Vertraute und Konkrete.',
         high: 'fantasievoll, neugierig, liebt Neues', low: 'praktisch, bodenständig, mag Routine' },
    C: { tag: 'Ordnung & Disziplin',
         desc: 'Gewissenhaftigkeit erfasst, wie organisiert, sorgfältig und zielstrebig du bist. Hohe Werte planen voraus und ziehen Dinge durch; niedrige Werte sind spontaner, flexibler und lockerer.',
         high: 'organisiert, diszipliniert, verlässlich', low: 'spontan, flexibel, locker' },
    E: { tag: 'Energie & Geselligkeit',
         desc: 'Extraversion misst, woher du deine Energie ziehst. Hohe Werte sind kontaktfreudig und blühen mit Menschen auf; niedrige Werte (Introvertierte) tanken in Ruhe und schätzen Tiefe.',
         high: 'kontaktfreudig, ausdrucksstark, energiegeladen', low: 'zurückhaltend, ruhig, in sich ruhend' },
    A: { tag: 'Wärme & Mitgefühl',
         desc: 'Verträglichkeit spiegelt, wie du mit anderen umgehst. Hohe Werte sind warm, empathisch und kooperativ und schätzen Harmonie; niedrige Werte sind direkter, skeptischer und wettbewerbsorientierter.',
         high: 'warm, empathisch, kooperativ', low: 'direkt, offen, wettbewerbsorientiert' },
    N: { tag: 'Emotionale Sensibilität',
         desc: 'Neurotizismus beschreibt, wie stark du negative Gefühle erlebst. Hohe Werte fühlen Stress, Sorge und Stimmungswechsel intensiv; niedrige Werte bleiben ruhig, stabil und belastbar.',
         high: 'sensibel, reaktiv, fühlt tief', low: 'ruhig, stabil, belastbar' },
  },
};

// UI strings
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
    pct: 'th pct', raw: 'raw',
    anchors: ['Very<br>inaccurate', 'Moderately<br>inaccurate', 'Neither', 'Moderately<br>accurate', 'Very<br>accurate'],
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
    pct: '. Pz', raw: 'roh',
    anchors: ['Sehr<br>unzutreffend', 'Eher<br>unzutreffend', 'Weder<br>noch', 'Eher<br>zutreffend', 'Sehr<br>zutreffend'],
  },
};

module.exports = { ITEMS_DE, TRAITS_DE, BLURBS_DE, LEVELS_DE, TRAIT_INFO, UI };

// 22 Major Arcana (Rider-Waite-Smith 1909, public domain).
// Art assets stored under /public/cards/major-arcana/[00-21].jpg
// — scans sourced from Wikimedia Commons, resized to 600px wide.

export type TarotCard = {
  n: string;          // Roman numeral, e.g. "XVI"
  cn: string;         // Chinese name
  en: string;         // English name
  glyph: string;      // Single-character placeholder (kept for legacy/fallback)
  imageSrc: string;   // Relative URL of the card face image
};

export type DrawnCard = TarotCard & { reversed: boolean };

// id is a zero-padded index 0..21 used as the image filename.
function img(id: string) {
  return `/cards/major-arcana/${id}.jpg`;
}

export const TAROT: TarotCard[] = [
  { n: "O",     cn: "愚者",     en: "The Fool",           glyph: "◌", imageSrc: img("00") },
  { n: "I",     cn: "魔术师",   en: "The Magician",       glyph: "✦", imageSrc: img("01") },
  { n: "II",    cn: "女祭司",   en: "The High Priestess", glyph: "☽", imageSrc: img("02") },
  { n: "III",   cn: "皇后",     en: "The Empress",        glyph: "✿", imageSrc: img("03") },
  { n: "IV",    cn: "皇帝",     en: "The Emperor",        glyph: "◈", imageSrc: img("04") },
  { n: "V",     cn: "教皇",     en: "The Hierophant",     glyph: "⌘", imageSrc: img("05") },
  { n: "VI",    cn: "恋人",     en: "The Lovers",         glyph: "◍", imageSrc: img("06") },
  { n: "VII",   cn: "战车",     en: "The Chariot",        glyph: "⊹", imageSrc: img("07") },
  { n: "VIII",  cn: "力量",     en: "Strength",           glyph: "∞", imageSrc: img("08") },
  { n: "IX",    cn: "隐者",     en: "The Hermit",         glyph: "✧", imageSrc: img("09") },
  { n: "X",     cn: "命运之轮", en: "Wheel of Fortune",   glyph: "◯", imageSrc: img("10") },
  { n: "XI",    cn: "正义",     en: "Justice",            glyph: "⚖", imageSrc: img("11") },
  { n: "XII",   cn: "倒吊人",   en: "The Hanged Man",     glyph: "⌖", imageSrc: img("12") },
  { n: "XIII",  cn: "死神",     en: "Death",              glyph: "☩", imageSrc: img("13") },
  { n: "XIV",   cn: "节制",     en: "Temperance",         glyph: "◇", imageSrc: img("14") },
  { n: "XV",    cn: "恶魔",     en: "The Devil",          glyph: "▲", imageSrc: img("15") },
  { n: "XVI",   cn: "高塔",     en: "The Tower",          glyph: "⌬", imageSrc: img("16") },
  { n: "XVII",  cn: "星",       en: "The Star",           glyph: "✶", imageSrc: img("17") },
  { n: "XVIII", cn: "月",       en: "The Moon",           glyph: "☾", imageSrc: img("18") },
  { n: "XIX",   cn: "太阳",     en: "The Sun",            glyph: "☼", imageSrc: img("19") },
  { n: "XX",    cn: "审判",     en: "Judgement",          glyph: "⌇", imageSrc: img("20") },
  { n: "XXI",   cn: "世界",     en: "The World",          glyph: "◉", imageSrc: img("21") },
];

// Pick 3 distinct cards, each independently 35% chance reversed.
// Seeded LCG when a seed is provided (useful for share links later).
export function drawThree(seed?: number): DrawnCard[] {
  const idxs = [...Array(TAROT.length).keys()];
  let s = seed ?? Math.floor(Math.random() * 1e9);
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
  for (let i = idxs.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idxs[i], idxs[j]] = [idxs[j], idxs[i]];
  }
  return idxs.slice(0, 3).map((i) => ({
    ...TAROT[i],
    reversed: rand() < 0.35,
  }));
}

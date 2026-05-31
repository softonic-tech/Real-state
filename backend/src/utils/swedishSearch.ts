/** a/ä/å and o/ö variants so search works with or without Swedish characters */
const CHAR_VARIANTS: Record<string, string[]> = {
  a: ["a", "ä", "å"],
  ä: ["a", "ä", "å"],
  å: ["a", "ä", "å"],
  A: ["A", "Ä", "Å"],
  Ä: ["A", "Ä", "Å"],
  Å: ["A", "Ä", "Å"],
  o: ["o", "ö"],
  ö: ["o", "ö"],
  O: ["O", "Ö"],
  Ö: ["O", "Ö"],
};

const MAX_VARIANTS = 48;

/** Expand a term into Swedish/ASCII spelling variants for flexible DB matching */
export function expandSwedishVariants(input: string): string[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  let variants = [trimmed];

  for (let i = 0; i < trimmed.length; i++) {
    const alts = CHAR_VARIANTS[trimmed[i]];
    if (!alts) continue;

    const next: string[] = [];
    for (const variant of variants) {
      for (const alt of alts) {
        next.push(variant.slice(0, i) + alt + variant.slice(i + 1));
      }
    }
    variants = [...new Set(next)];
    if (variants.length >= MAX_VARIANTS) break;
  }

  return [...new Set(variants)];
}

/**
 * Blog category taxonomy.
 *
 * Every article MUST have exactly one `category` (primary) and
 * may have multiple `tags` (secondary). Categories drive the
 * top-level filter UI; tags add granularity.
 *
 * When creating a new article, pick the best-fit category and
 * 1-3 tags from the lists below. Add new tags freely but
 * new categories require updating this file + translations.
 */

export const CATEGORIES = [
  "reglas",
  "estrategia",
  "cultura",
  "psicologia",
  "variantes",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Display metadata per category (keyed by i18n message key) */
export const CATEGORY_META: Record<Category, { colorClass: string }> = {
  reglas: { colorClass: "bg-green/10 text-green" },
  estrategia: { colorClass: "bg-orange/10 text-orange" },
  cultura: { colorClass: "bg-gold/10 text-gold" },
  psicologia: { colorClass: "bg-teal/10 text-teal" },
  variantes: { colorClass: "bg-cream/10 text-cream" },
};

/**
 * Known tags — not enforced, but useful for autocomplete
 * and consistency when writing new articles.
 */
export const KNOWN_TAGS = [
  "principiantes",
  "avanzado",
  "parejas",
  "tutorial",
  "conteo",
  "dobles",
  "tranca",
  "capicua",
  "apertura",
  "defensa",
  "comunicacion",
  "venezuela",
  "cuba",
  "dominicana",
  "puerto-rico",
  "caribe",
  "torneos",
  "supersticiones",
  "fichas",
] as const;

import { PALETTES, ID_INDEX } from './palettes.js';

const STORAGE_KEY = 'active-theme-id';
const REQUIRED_KEYS = ['navbar', 'primary', 'secondary', 'tertiary'];

// Internal mutable copies — built-ins + anything user registers later
const registry = { ...PALETTES };
const idIndex = { ...ID_INDEX };

let nextAutoId = Object.keys(idIndex).length + 1;

/**
 * Ensures a palette has all required keys before it's accepted.
 */
function validatePalette(palette) {
  const missing = REQUIRED_KEYS.filter((key) => !(key in palette));
  if (missing.length > 0) {
    throw new Error(
      `[js-theme-switcher] Palette is missing required keys: ${missing.join(', ')}`
    );
  }
}

/**
 * Resolves either a slug ("ocean-blue") or numeric id (1, "1", 2...) 
 * into the actual slug key used in registry.
 */
function resolveId(idOrNumber) {
  if (registry[idOrNumber]) return idOrNumber; // already a valid slug
  const numericKey = String(idOrNumber);
  if (idIndex[numericKey]) return idIndex[numericKey]; // numeric lookup
  return null;
}

/**
 * Writes CSS variables onto <html> based on a palette object.
 */
function applyPalette(palette) {
  const root = document.documentElement;
  Object.keys(palette).forEach((key) => {
    root.style.setProperty(`--color-${key}`, palette[key]);
  });
}

/**
 * PUBLIC: Register a new custom palette (in addition to built-ins).
 */
export function registerPalette(slug, palette, options = {}) {
  if (!slug || typeof slug !== 'string') {
    throw new Error('[js-theme-switcher] registerPalette requires a string slug as first argument.');
  }
  validatePalette(palette);

  registry[slug] = palette;

  const numericId = options.id ?? nextAutoId++;
  idIndex[String(numericId)] = slug;

  return { slug, id: numericId };
}

/**
 * PUBLIC: List all available palettes (built-in + registered).
 * Useful for building a theme-picker UI (dropdown, swatches, etc.)
 */
export function listPalettes() {
  return Object.keys(registry).map((slug) => {
    const numericEntry = Object.entries(idIndex).find(([, s]) => s === slug);
    return {
      id: numericEntry ? Number(numericEntry[0]) : null,
      slug,
      colors: registry[slug],
    };
  });
}

/**
 * PUBLIC: Get raw color values of a specific palette (by id or slug).
 */
export function getPaletteColors(idOrSlug) {
  const slug = resolveId(idOrSlug);
  if (!slug) {
    console.error(`[js-theme-switcher] No palette found for "${idOrSlug}"`);
    return null;
  }
  return registry[slug];
}

/**
 * PUBLIC: Apply a theme by its id or slug.
 */
export function setThemeById(idOrSlug) {
  const slug = resolveId(idOrSlug);
  if (!slug) {
    console.error(
      `[js-theme-switcher] No palette found for "${idOrSlug}". Available: ${Object.keys(registry).join(', ')}`
    );
    return;
  }

  applyPalette(registry[slug]);
  localStorage.setItem(STORAGE_KEY, slug);
}

/**
 * PUBLIC: Initialize theme on app load — checks localStorage first.
 */
export function initThemeById(defaultIdOrSlug = 'classic-light') {
  const saved = localStorage.getItem(STORAGE_KEY);
  const target = saved || defaultIdOrSlug;
  setThemeById(target);
  return resolveId(target);
}

/**
 * PUBLIC: Get the currently active theme's slug.
 */
export function getCurrentThemeId() {
  return localStorage.getItem(STORAGE_KEY);
}
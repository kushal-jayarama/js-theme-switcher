/**
 * Built-in curated color palettes.
 * Each palette has 4 required keys: navbar, primary, secondary, tertiary
 * Optional keys (like tx-primary for text) can be added freely.
 */

export const PALETTES = {
  'classic-light': {
    navbar: '#F8FAFC',
    primary: '#4A5C86',
    secondary: '#9CA7C1',
    tertiary: '#C5CDDE',
    'tx-primary': '#1A1A1A',
  },
  'midnight-dark': {
    navbar: '#0F1419',
    primary: '#60A5FA',
    secondary: '#1E2530',
    tertiary: '#2D3748',
    'tx-primary': '#E2E8F0',
  },
  'pastel-sky': {
    navbar: '#4A6FA5',
    primary: '#7EA8DC',
    secondary: '#AFC9E8',
    tertiary: '#EAF2FB',
    'tx-primary': '#FFFFFF',
  },
  'blush-rose': {
    navbar: '#A65A6E',
    primary: '#DC7EA0',
    secondary: '#E8AFC0',
    tertiary: '#FBEAF0',
    'tx-primary': '#FFFFFF',
  },
  'mint-fresh': {
    navbar: '#4A9A7A',
    primary: '#7ED9A8',
    secondary: '#AFE8C9',
    tertiary: '#EAFBF2',
    'tx-primary': '#0F1419',
  },
  'lavender-dream': {
    navbar: '#6A5A9A',
    primary: '#A57EDC',
    secondary: '#C9AFE8',
    tertiary: '#F2EAFB',
    'tx-primary': '#FFFFFF',
  },
  'sunset-peach': {
    navbar: '#C97A4A',
    primary: '#E8A87E',
    secondary: '#F0C9AF',
    tertiary: '#FBF0EA',
    'tx-primary': '#1A1410',
  },
  'sandy-beige': {
    navbar: '#8A7A5A',
    primary: '#C9B48E',
    secondary: '#E0D3B8',
    tertiary: '#FAF6EE',
    'tx-primary': '#1A1410',
  },
};

/**
 * Numeric ID → slug mapping.
 * This lets users reference palettes by number (1, 2, 3...) 
 * OR by name (classic-light, midnight-dark...) interchangeably.
 */
export const ID_INDEX = {
  1: 'classic-light',
  2: 'midnight-dark',
  3: 'pastel-sky',
  4: 'blush-rose',
  5: 'mint-fresh',
  6: 'lavender-dream',
  7: 'sunset-peach',
  8: 'sandy-beige',
};
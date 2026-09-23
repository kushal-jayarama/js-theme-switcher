/**
 * js-theme-switcher
 * A lightweight, framework-agnostic theme switcher using CSS variables.
 */

const STORAGE_KEY = 'active-theme';

function applyTheme(themesConfig, themeName) {
  const theme = themesConfig[themeName];

  if (!theme) {
    console.error(`[js-theme-switcher] Theme "${themeName}" not found in config.`);
    return;
  }

  const root = document.documentElement;

  Object.keys(theme).forEach((key) => {
    root.style.setProperty(`--${key}`, theme[key]);
  });

  root.setAttribute('data-theme', themeName);

  localStorage.setItem(STORAGE_KEY, themeName);
}

function initTheme(themesConfig, defaultTheme = 'light') {
  const savedTheme = localStorage.getItem(STORAGE_KEY);

  let themeToApply = savedTheme || defaultTheme;

  if (themeToApply === 'system') {
    themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  applyTheme(themesConfig, themeToApply);

  return themeToApply;
}

function setTheme(themesConfig, themeName) {
  applyTheme(themesConfig, themeName);
}

function getCurrentTheme() {
  return localStorage.getItem(STORAGE_KEY);
}

function watchSystemTheme(themesConfig, callback) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQuery.addEventListener('change', (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    applyTheme(themesConfig, newTheme);
    if (callback) callback(newTheme);
  });
}

export {
  initTheme,
  setTheme,
  getCurrentTheme,
  watchSystemTheme
};
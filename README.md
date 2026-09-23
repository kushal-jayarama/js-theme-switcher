# js-theme-switcher

A lightweight, framework-agnostic theme switcher using CSS variables. Works with Vue, React, Angular, or plain JavaScript.

## Installation

\`\`\`bash
npm install js-theme-switcher
\`\`\`

## Usage

\`\`\`js
import { initTheme, setTheme } from 'js-theme-switcher';

const themes = {
  light: {
    'color-primary': '#3b82f6',
    'color-background': '#ffffff',
  },
  dark: {
    'color-primary': '#60a5fa',
    'color-background': '#121212',
  }
};

// Initialize on app start
initTheme(themes, 'light');

// Switch theme anywhere
setTheme(themes, 'dark');
\`\`\`

## CSS Usage

\`\`\`css
body {
  background: var(--color-background);
  color: var(--color-primary);
}
\`\`\`

## API

- \`initTheme(themesConfig, defaultTheme)\` — initializes theme, checks localStorage
- \`setTheme(themesConfig, themeName)\` — manually switch theme
- \`getCurrentTheme()\` — returns current active theme name
- \`watchSystemTheme(themesConfig, callback)\` — auto-switch on OS theme change

## License

MIT
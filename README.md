# js-theme-switcher

A lightweight, framework-agnostic color palette theme switcher using CSS variables. Comes with curated built-in palettes — just pick one by ID or name. No configuration required. Works with Vue, React, Angular, or plain JavaScript.

## Installation

```bash
npm install js-theme-switcher
```

## Quick Start

```js
import { initThemeById } from 'js-theme-switcher';

// Initialize with a built-in palette (checks localStorage automatically)
initThemeById('classic-light');
```

Switch themes anywhere in your app:

```js
import { setThemeById } from 'js-theme-switcher';

setThemeById('midnight-dark');   // by slug
setThemeById(2);                 // by numeric id (same palette)
```

## Use in Your CSS / Tailwind

```css
body {
  background: var(--color-tertiary);
  color: var(--color-tx-primary);
}

nav {
  background: var(--color-navbar);
}

button {
  background: var(--color-primary);
}
```

### Tailwind Config Example

```js
// tailwind.config.js
colors: {
  navbar: "var(--color-navbar)",
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  tertiary: "var(--color-tertiary)",
  "tx-primary": "var(--color-tx-primary)",
}
```

## Built-in Palettes

| ID | Slug | Vibe |
|---|---|---|
| 1 | `classic-light` | Clean light theme |
| 2 | `midnight-dark` | Deep dark theme |
| 3 | `pastel-sky` | Soft blue pastel |
| 4 | `blush-rose` | Warm pink pastel |
| 5 | `mint-fresh` | Cool green pastel |
| 6 | `lavender-dream` | Soft purple pastel |
| 7 | `sunset-peach` | Warm orange pastel |
| 8 | `sandy-beige` | Neutral earthy tone |

Each palette provides these CSS variables:
- `--color-navbar`
- `--color-primary`
- `--color-secondary`
- `--color-tertiary`
- `--color-tx-primary`

## API Reference

### `initThemeById(defaultIdOrSlug)`

Initializes the theme on app load. Checks `localStorage` first; if nothing saved, applies the provided default.

```js
initThemeById('classic-light');
```

### `setThemeById(idOrSlug)`

Applies a theme immediately and saves the choice to `localStorage`. Accepts either a numeric ID or a slug string.

```js
setThemeById('ocean-blue');
setThemeById(3);
```

### `getCurrentThemeId()`

Returns the slug of the currently active theme.

```js
getCurrentThemeId(); // "midnight-dark"
```

### `listPalettes()`

Returns an array of all available palettes (built-in + custom registered ones). Useful for building a theme picker UI.

```js
listPalettes();
// [
//   { id: 1, slug: 'classic-light', colors: {...} },
//   { id: 2, slug: 'midnight-dark', colors: {...} },
//   ...
// ]
```

### `getPaletteColors(idOrSlug)`

Returns the raw color object for a specific palette.

```js
getPaletteColors('mint-fresh');
// { navbar: '#4A9A7A', primary: '#7ED9A8', secondary: '#AFE8C9', tertiary: '#EAFBF2', 'tx-primary': '#0F1419' }
```

### `registerPalette(slug, colors, options?)`

Adds a custom palette in addition to the built-in ones. Required keys: `navbar`, `primary`, `secondary`, `tertiary`. Extra optional keys are allowed (e.g. `tx-primary`).

```js
registerPalette('my-brand', {
  navbar: '#1a1a2e',
  primary: '#e94560',
  secondary: '#0f3460',
  tertiary: '#16213e',
  'tx-primary': '#ffffff',
});

setThemeById('my-brand');
```

You can also assign it a custom numeric ID:

```js
registerPalette('my-brand', { navbar: '#1a1a2e', primary: '#e94560', secondary: '#0f3460', tertiary: '#16213e' }, { id: 9 });

setThemeById(9); // works same as setThemeById('my-brand')
```

## Full Usage Example (Vanilla JS)

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      background: var(--color-tertiary);
      color: var(--color-tx-primary);
      transition: background-color 0.3s, color 0.3s;
    }
    nav {
      background: var(--color-navbar);
      padding: 16px;
    }
    button {
      background: var(--color-primary);
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      margin: 4px;
    }
  </style>
</head>
<body>
  <nav>My App</nav>

  <div id="theme-buttons"></div>

  <script type="module">
    import { initThemeById, setThemeById, listPalettes } from 'js-theme-switcher';

    initThemeById('classic-light');

    const container = document.getElementById('theme-buttons');
    listPalettes().forEach((p) => {
      const btn = document.createElement('button');
      btn.textContent = p.slug;
      btn.style.backgroundColor = p.colors.primary;
      btn.onclick = () => setThemeById(p.slug);
      container.appendChild(btn);
    });
  </script>
</body>
</html>
```

## Full Usage Example (Vue 3)

**`main.js`**
```js
import { createApp } from 'vue';
import App from './App.vue';
import { initThemeById } from 'js-theme-switcher';

initThemeById('classic-light');

createApp(App).mount('#app');
```

**`App.vue`**
```vue
<script setup>
import { listPalettes, setThemeById, getCurrentThemeId } from 'js-theme-switcher';
import { ref } from 'vue';

const palettes = listPalettes();
const current = ref(getCurrentThemeId());

function applyTheme(slug) {
  setThemeById(slug);
  current.value = slug;
}
</script>

<template>
  <nav class="bg-navbar text-tx-primary p-4">
    My App
  </nav>

  <div class="flex gap-2 p-4">
    <button
      v-for="p in palettes"
      :key="p.slug"
      @click="applyTheme(p.slug)"
      class="w-8 h-8 rounded-full border-2"
      :class="current === p.slug ? 'border-black' : 'border-white'"
      :style="{ backgroundColor: p.colors.primary }"
      :title="p.slug"
    />
  </div>

  <div class="p-4 bg-tertiary text-tx-primary">
    <p>Current theme: {{ current }}</p>
  </div>
</template>
```

## How It Works

This package writes CSS custom properties directly onto the `<html>` element:

```html
<html style="--color-primary: #60A5FA; --color-navbar: #0F1419; --color-secondary: #1E2530; --color-tertiary: #2D3748; --color-tx-primary: #E2E8F0;">
```

Any CSS using `var(--color-primary)` updates instantly across your entire app — no framework re-render, no page reload required. Works identically in Vue, React, Angular, or plain HTML/CSS.

The chosen theme is automatically saved to `localStorage` under the key `active-theme-id`, so it persists across page reloads and browser sessions.

## TypeScript Note

This package is written in plain JavaScript. If you're using TypeScript and want type safety, you can declare types manually in your project:

```ts
declare module 'js-theme-switcher' {
  export function initThemeById(defaultIdOrSlug?: string | number): string;
  export function setThemeById(idOrSlug: string | number): void;
  export function getCurrentThemeId(): string | null;
  export function listPalettes(): Array<{ id: number | null; slug: string; colors: Record<string, string> }>;
  export function getPaletteColors(idOrSlug: string | number): Record<string, string> | null;
  export function registerPalette(slug: string, colors: Record<string, string>, options?: { id?: number }): { slug: string; id: number };
}
```

## License

MIT
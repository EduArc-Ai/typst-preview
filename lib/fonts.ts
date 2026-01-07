// Global font configuration for typst.ts
// These fonts are preloaded from CDN to support common templates

// Font URLs - using fontsource CDN for TTF files (typst requires TTF/OTF)
// Note: Google Fonts uses woff2 which may not work directly with typst.ts
export const PRELOAD_FONTS = [
  // Noto Sans (multilingual)
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-400-normal.ttf',
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-700-normal.ttf',

  // Noto Serif
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif@latest/latin-400-normal.ttf',
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-serif@latest/latin-700-normal.ttf',

  // Noto Sans SC (Simplified Chinese)
  'https://cdn.jsdelivr.net/fontsource/fonts/noto-sans-sc@latest/chinese-simplified-400-normal.ttf',

  // Fira Code (monospace)
  'https://cdn.jsdelivr.net/fontsource/fonts/fira-code@latest/latin-400-normal.ttf',

  // Inter
  'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
  'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf',

  // Roboto
  'https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-400-normal.ttf',
  'https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-700-normal.ttf',
] as const;

// Type for the font list
export type PreloadFont = (typeof PRELOAD_FONTS)[number];

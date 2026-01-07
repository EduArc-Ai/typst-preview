# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## For AI Agents (v0, Cursor, Claude)

### Files to MODIFY:
- **`public/template/main.typ`** - THE Typst document content (primary file to edit)
- `app/globals.css` - Theme colors (optional)

### Files to NEVER MODIFY (lock these in v0):
- `hooks/` - Core compiler integration
- `lib/` - Infrastructure (typst-config, fonts, utils, template-loader)
- `components/ui/` - Base UI components
- `types/` - TypeScript declarations
- `next.config.ts`, `tsconfig.json` - Build configuration

### v0 File Locking
When uploading to v0, use the Platform API to lock infrastructure files:
```javascript
// Lock all files except public/template/
files.map(file => ({
  ...file,
  locked: !file.name.startsWith('public/template/')
}))
```
See: https://v0.app/docs/api/platform/guides/lock-files-from-ai-changes

### Template Structure
```
public/template/
├── main.typ          # THE file to modify - contains Typst document content
└── assets/           # Place images and other assets here
```

---

## Project Overview

A web-based Typst editor with live SVG preview and PDF export. Uses the typst.ts WebAssembly compiler loaded from CDN for client-side compilation.

## Commands

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- Next.js 15 (App Router) with React 19
- TypeScript with strict mode
- Tailwind CSS v4 (uses `@theme` directive in globals.css)
- Radix UI primitives (tooltip, slot)
- react-resizable-panels for split view
- typst.ts loaded from CDN (not bundled)

## Architecture

### Typst Integration

The Typst compiler runs entirely in the browser via WebAssembly:
- [lib/typst-config.ts](lib/typst-config.ts) - CDN URLs for typst.ts bundle and WASM modules
- [hooks/useTypst.ts](hooks/useTypst.ts) - Loads compiler script dynamically, exposes `compile()` for SVG output
- [hooks/useTypstPdf.ts](hooks/useTypstPdf.ts) - PDF export via `$typst.pdf()`
- [types/typst.d.ts](types/typst.d.ts) - TypeScript declarations for the global `$typst` object

The global `$typst` object is injected by the CDN bundle and provides `svg()` and `pdf()` methods.

### Component Structure

```
components/
├── layout/
│   └── EditorLayout.tsx   # Main orchestrator - manages state, panels, compilation
├── editor/
│   ├── EditorPanel.tsx    # Textarea for Typst source input
│   ├── PreviewPanel.tsx   # SVG preview with zoom, page rendering
│   └── Toolbar.tsx        # Export PDF, toggle editor visibility
└── ui/                    # Reusable shadcn-style components
```

The [EditorLayout](components/layout/EditorLayout.tsx) holds all state and coordinates:
1. Source text (debounced 400ms before compile)
2. Typst compiler initialization and compilation
3. PDF export
4. Panel visibility toggle

### Preview Rendering

[PreviewPanel](components/editor/PreviewPanel.tsx) processes SVG output to:
- Add white backgrounds to pages
- Insert drop shadows
- Handle multi-page documents with gaps
- Provide zoom controls (50%-200%)

## Path Aliases

`@/*` maps to project root (configured in tsconfig.json)

## Styling Conventions

- Uses Tailwind v4 with oklch color space
- Color tokens defined in `@theme` block in [globals.css](app/globals.css)
- Dark mode via `next-themes` with class strategy
- Component styling uses `cn()` utility from [lib/utils.ts](lib/utils.ts)

## Fonts

Global fonts are preloaded from CDN (see [lib/fonts.ts](lib/fonts.ts)):
- Noto Sans/Serif (multilingual)
- Source Han Sans (CJK)
- Fira Code (monospace)
- Inter, Roboto (UI fonts)

Use these in your Typst document:
```typst
#set text(font: "Noto Sans")
#set text(font: "Fira Code")  // for code
```

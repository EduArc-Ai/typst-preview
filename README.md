# Typst Preview

A web-based Typst viewer with live preview and PDF export. Built as a forkable template for AI platforms like v0.

## Features

- Live SVG preview with typst.ts WebAssembly compiler
- PDF export with one click
- Global font support (Noto, Fira Code, Inter, Roboto, Source Han)
- Package registry support (`@preview/` packages)
- Zoom controls (50% - 200%)
- Internal document link navigation
- Clear error display with copy button

## Quick Start

```bash
# Clone the repository
git clone https://github.com/EduArc-Ai/typst-preview.git
cd typst-preview

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the preview.

## Project Structure

```
typst-preview/
├── public/template/
│   ├── main.typ          # Your Typst document (edit this!)
│   └── assets/           # Images and other assets
├── components/           # React components
├── hooks/                # Typst compiler hooks
├── lib/                  # Configuration and utilities
└── types/                # TypeScript declarations
```

## Creating Your Template

### 1. Fork this repository

### 2. Edit the Typst content

Open `public/template/main.typ` and replace with your template:

```typst
#set page(paper: "a4", margin: 2cm)
#set text(font: "Noto Sans", size: 11pt)

= My Custom Template

Your content here...
```

### 3. Add assets (optional)

Place images in `public/template/assets/`:

```typst
#image("assets/logo.png", width: 50%)
```

### 4. Use packages

Import from the Typst package registry:

```typst
#import "@preview/cetz:0.3.2": canvas, draw
```

## Available Fonts

These fonts are preloaded from CDN:

| Font | Usage |
|------|-------|
| Noto Sans / Serif | General text, multilingual |
| Noto Sans SC | Chinese (Simplified) |
| Fira Code | Code blocks |
| Inter | Modern UI text |
| Roboto | General purpose |

```typst
#set text(font: "Noto Sans")      // Multilingual
#set text(font: "Fira Code")      // Monospace
#set text(font: "Noto Sans SC")   // Chinese
```

## Using with v0

This template is designed for AI platforms like [v0](https://v0.dev).

### File Locking

When uploading to v0, lock infrastructure files to prevent AI modifications:

```javascript
// Lock all files except public/template/
files.map(file => ({
  ...file,
  locked: !file.name.startsWith('public/template/')
}))
```

See: [v0 File Locking Documentation](https://v0.app/docs/api/platform/guides/lock-files-from-ai-changes)

### What AI Should Modify

| File | Purpose |
|------|---------|
| `public/template/main.typ` | Typst document content |
| `app/globals.css` | Theme colors (optional) |

### What AI Should NOT Modify

- `hooks/` - Compiler integration
- `lib/` - Infrastructure
- `components/ui/` - Base components
- `types/` - TypeScript declarations
- Config files (`next.config.ts`, `tsconfig.json`)

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- [Next.js 15](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [typst.ts](https://github.com/Myriad-Dreamin/typst.ts) - WebAssembly Typst compiler
- [Radix UI](https://www.radix-ui.com/) - Accessible components

## License

MIT

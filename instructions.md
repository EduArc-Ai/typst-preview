# Typst Editor

A web-based Typst document editor with live preview and PDF export.

---

## What to Edit

### PRIMARY FILE
**`public/template/main.typ`** - The Typst document. Edit this to change content.

### Supporting Files (in `public/template/`)
- `*.typ` - Additional template files (auto-imported)
- `assets/*` - Images (PNG, JPG, SVG, WebP)

---

## What NOT to Edit

- `hooks/` - Compiler integration
- `lib/` - Infrastructure
- `components/` - Editor UI
- `app/` - Next.js app
- `types/` - TypeScript types
- Config files (`*.config.*`, `tsconfig.json`)

---

## Typst Syntax

### Text
```typst
*bold*  _italic_  `code`
```

### Headings
```typst
= Level 1
== Level 2
=== Level 3
```

### Lists
```typst
- Bullet
+ Numbered
```

### Math
```typst
$x^2$                // Inline
$ x^2 + y^2 = z^2 $  // Block (spaces required)
```

### Images
```typst
#image("/assets/photo.png", width: 50%)
```

### Tables
```typst
#table(
  columns: (auto, auto),
  [*Header*], [*Header*],
  [Cell], [Cell],
)
```

### Page Setup
```typst
#set page(paper: "a4", margin: 2cm)
#set text(font: "Noto Sans", size: 11pt)
```

---

## Available Fonts

- `Noto Sans` / `Noto Serif` - Multilingual
- `Linux Libertine` - Academic
- `Fira Code` - Monospace
- `Noto Sans SC` - Chinese

---

## Import Local Files

```typst
#import "/template.typ": *
```

All `.typ` files in `public/template/` are auto-registered.

---

## Resources

- Full syntax: `SYNTAX.md`
- Examples: `public/template/demo.typ`
- Docs: https://typst.app/docs

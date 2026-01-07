# Template: Basic Document

This is the default Typst template - a general-purpose document suitable for various content types.

---

## Files

| File | Purpose |
|------|---------|
| `main.typ` | **EDIT THIS** - Your document content |
| `demo.typ` | Reference - Comprehensive syntax examples |
| `assets/` | Store images here (PNG, JPG, SVG, WebP) |

**Full Syntax Guide**: See [SYNTAX.md](../../../SYNTAX.md) at project root.

---

## Quick Start

Edit `main.typ` to create your document. Current template uses:

```typst
#set page(paper: "a4", margin: 2cm)
#set text(font: "Linux Libertine", size: 11pt)
```

---

## Quick Syntax Reference

| Task | Syntax |
|------|--------|
| Bold | `*text*` |
| Italic | `_text_` |
| Heading | `= Title` (more `=` for subheadings) |
| Bullet list | `- item` |
| Numbered list | `+ item` |
| Link | `#link("url")[text]` |
| Image | `#image("/assets/image.png")` |
| Inline math | `$x^2$` |
| Block math | `$ x^2 $` |
| Table | `#table(columns: 3, [...])` |

For complete syntax, see `demo.typ` or [SYNTAX.md](../../../SYNTAX.md).

---

## Available Fonts

```typst
#set text(font: "Noto Sans")        // Clean sans-serif
#set text(font: "Noto Serif")       // Classic serif
#set text(font: "Linux Libertine")  // Academic serif
#set text(font: "Inter")            // Modern UI
#set text(font: "Fira Code")        // Monospace/code
#set text(font: "Noto Sans SC")     // Chinese
```

---

## Using Images

1. Place images in `assets/` folder
2. Use absolute paths starting with `/`:

```typst
#image("/assets/logo.png", width: 50%)

#figure(
  image("/assets/diagram.png", width: 80%),
  caption: [Description here],
)
```

---

## Common Patterns

### Callout Box

```typst
#rect(
  width: 100%,
  fill: blue.lighten(90%),
  stroke: 1pt + blue,
  radius: 4pt,
  inset: 10pt,
)[
  *Note:* Important information here.
]
```

### Two-Column Layout

```typst
#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  [Left content],
  [Right content],
)
```

### Centered Title

```typst
#align(center)[
  #text(size: 24pt, weight: "bold")[Document Title]
  #v(0.5em)
  Author Name
]
```

---

## Goals for AI

When editing this template:

1. **Modify only `main.typ`** - This is your working document
2. **Reference `demo.typ`** - See examples of any syntax you need
3. **Use absolute paths** - Always start image/import paths with `/`
4. **Keep styling consistent** - Match the existing page/text settings
5. **Add images to `assets/`** - All images go in the assets folder

### What to Edit
- Document content in `main.typ`
- Add new `.typ` files for reusable components

### What NOT to Edit
- `demo.typ` (reference only)
- Files outside `public/template/`

---

## Template Customization

To change the document style, modify the `#set` rules at the top of `main.typ`:

```typst
// Page settings
#set page(
  paper: "a4",           // or "us-letter"
  margin: 2cm,           // or (x: 2cm, y: 2.5cm)
  numbering: "1",        // page numbers
)

// Text settings
#set text(
  font: "Noto Sans",
  size: 11pt,
)

// Paragraph settings
#set par(
  justify: true,
  leading: 0.65em,
)

// Heading numbering
#set heading(numbering: "1.1")
```

---

## Need Help?

1. Check `demo.typ` for working examples
2. See [SYNTAX.md](../../../SYNTAX.md) for complete syntax reference
3. Visit https://typst.app/docs for official documentation

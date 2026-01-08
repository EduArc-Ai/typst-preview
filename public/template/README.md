# Template: Basic Document

A general-purpose Typst template suitable for various content types.

---

## Files

| File | Purpose |
|------|---------|
| `main.typ` | **EDIT THIS** - Your document content |
| `demo.typ` | Reference - Syntax examples |
| `assets/` | Store images here |

---

## Template Settings

This template uses:
- A4 paper with 2cm margins
- Linux Libertine font (academic serif)
- 11pt font size

```typst
#set page(paper: "a4", margin: 2cm)
#set text(font: "Linux Libertine", size: 11pt)
```

---

## Content Structure

```typst
= Main Heading
== Subheading

*bold* and _italic_

- Bullet list
+ Numbered list

$ x^2 + y^2 = z^2 $  // Math
```

---

## Goals for AI

1. **Edit only `main.typ`** - Your working document
2. **Reference `demo.typ`** - See syntax examples
3. **Use absolute paths** - Start with `/` for images/imports
4. **Keep styling consistent** - Match page/text settings

---

## Resources

- `demo.typ` - Working examples
- `SYNTAX.md` (project root) - Full syntax guide
- https://typst.app/docs - Official documentation

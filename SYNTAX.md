# Typst Syntax Guide

A comprehensive reference for Typst markup language. This guide is shared across all templates.

**Official Documentation**: https://typst.app/docs

---

## Table of Contents

1. [Basic Markup](#basic-markup)
2. [Text Formatting](#text-formatting)
3. [Headings](#headings)
4. [Lists](#lists)
5. [Links & References](#links--references)
6. [Images & Figures](#images--figures)
7. [Tables](#tables)
8. [Math](#math)
9. [Code](#code)
10. [Page Setup](#page-setup)
11. [Functions & Rules](#functions--rules)
12. [Variables & Logic](#variables--logic)
13. [Colors](#colors)
14. [Layout](#layout)
15. [Comments](#comments)
16. [Imports](#imports)

---

## Basic Markup

| Syntax | Result | Description |
|--------|--------|-------------|
| `*bold*` | **bold** | Strong emphasis |
| `_italic_` | _italic_ | Emphasis |
| `` `code` `` | `code` | Inline code |
| `\` | | Line break |
| Blank line | | Paragraph break |
| `---` | — | Em dash |
| `--` | – | En dash |
| `...` | … | Ellipsis |
| `~` | | Non-breaking space |
| `"quoted"` | "quoted" | Smart quotes |

### Escaping Characters

Use backslash to escape special characters:

```typst
\* \_ \` \# \@ \$ \< \>
```

Unicode escape: `\u{1f600}` → emoji

---

## Text Formatting

### Inline Formatting

```typst
*bold text*
_italic text_
*_bold and italic_*
`inline code`
#underline[underlined]
#strike[strikethrough]
#smallcaps[Small Caps]
#sub[subscript] and #super[superscript]
```

### Text Function

```typst
#text(size: 14pt)[Larger text]
#text(fill: red)[Red text]
#text(weight: "bold")[Bold text]
#text(style: "italic")[Italic text]
#text(font: "Fira Code")[Monospace]
```

### Common Text Settings

```typst
#set text(
  font: "Noto Sans",
  size: 11pt,
  fill: black,
  weight: "regular",  // thin, light, regular, medium, semibold, bold, black
  style: "normal",    // normal, italic, oblique
  lang: "en",
)
```

---

## Headings

```typst
= Level 1 Heading
== Level 2 Heading
=== Level 3 Heading
==== Level 4 Heading
```

### Heading Configuration

```typst
// Enable numbering
#set heading(numbering: "1.1")

// Custom numbering format
#set heading(numbering: "1.a.")

// Disable numbering for specific heading
= Unnumbered Heading <unnumbered>
#show <unnumbered>: set heading(numbering: none)
```

---

## Lists

### Bullet Lists

```typst
- First item
- Second item
  - Nested item
  - Another nested
- Third item
```

### Numbered Lists

```typst
+ First item
+ Second item
  + Nested numbered
+ Third item
```

### Term Lists (Definitions)

```typst
/ Term: Definition here
/ Another Term: Another definition
```

### Custom List Markers

```typst
#set list(marker: [--])
#set enum(numbering: "a)")
```

---

## Links & References

### URLs

```typst
// Auto-linked
https://typst.app

// Custom text
#link("https://typst.app")[Typst Website]

// Email
#link("mailto:hello@example.com")
```

### Labels & References

```typst
= Introduction <intro>

See @intro for more details.

#figure(
  image("/assets/diagram.png"),
  caption: [A diagram],
) <fig-diagram>

As shown in @fig-diagram...
```

### Footnotes

```typst
This needs a footnote#footnote[This is the footnote content.].
```

---

## Images & Figures

### Basic Image

```typst
#image("/assets/logo.png")
#image("/assets/photo.jpg", width: 50%)
#image("/assets/icon.svg", height: 2cm)
```

### Figure with Caption

```typst
#figure(
  image("/assets/diagram.png", width: 80%),
  caption: [This is the caption],
)
```

### Figure Placement

```typst
#figure(
  image("/assets/chart.png"),
  caption: [Chart title],
  placement: top,  // top, bottom, auto
)
```

**Supported formats**: PNG, JPG, JPEG, GIF, SVG, WebP

**Path note**: Use absolute paths starting with `/` for images in `public/template/assets/`

---

## Tables

### Basic Table

```typst
#table(
  columns: (auto, auto, auto),
  [*Header 1*], [*Header 2*], [*Header 3*],
  [Cell 1], [Cell 2], [Cell 3],
  [Cell 4], [Cell 5], [Cell 6],
)
```

### Styled Table

```typst
#table(
  columns: (1fr, 2fr, 1fr),
  align: (left, center, right),
  stroke: 1pt,
  fill: (x, y) => if y == 0 { blue.lighten(80%) },
  inset: 8pt,
  [*Name*], [*Description*], [*Value*],
  [Item A], [Description of A], [100],
  [Item B], [Description of B], [200],
)
```

### Column Widths

```typst
columns: (auto, auto)       // Auto-fit content
columns: (1fr, 2fr)         // Fractional widths
columns: (100pt, 50%)       // Fixed + percentage
columns: 3                  // 3 equal columns
```

---

## Math

### Inline vs Block

```typst
// Inline math (no spaces inside $)
The equation $x^2 + y^2 = z^2$ is famous.

// Block math (spaces inside $)
$ x^2 + y^2 = z^2 $
```

### Subscripts & Superscripts

```typst
$x^2$           // Superscript
$x_1$           // Subscript
$x_1^2$         // Both
$x_(i+1)$       // Grouped subscript
$x^(n+1)$       // Grouped superscript
```

### Fractions

```typst
$1/2$           // Simple fraction
$(a+b)/(c+d)$   // Grouped fraction
$frac(a, b)$    // Function form
```

### Common Symbols

```typst
// Greek letters
$alpha, beta, gamma, delta, epsilon$
$pi, sigma, theta, omega, lambda$
$Gamma, Delta, Theta, Omega$

// Operators
$plus, minus, times, div$
$eq, neq, lt, gt, leq, geq$
$approx, equiv, prop$

// Arrows
$arrow.r, arrow.l, arrow.t, arrow.b$
$arrow.r.long, arrow.l.r$
$implies, iff$

// Sets
$in, subset, supset, union, sect$
$emptyset, NN, ZZ, QQ, RR, CC$

// Misc
$infinity, partial, nabla$
$forall, exists, therefore$
```

### Functions

```typst
$sin(x), cos(x), tan(x)$
$log(x), ln(x), exp(x)$
$lim_(x -> 0), max, min$
$sqrt(x), root(3, x)$
```

### Sums, Products, Integrals

```typst
$sum_(i=1)^n i$
$product_(i=1)^n i$
$integral_0^1 f(x) dif x$
```

### Matrices & Vectors

```typst
$mat(1, 2; 3, 4)$
$vec(x, y, z)$
$mat(delim: "[", 1, 2; 3, 4)$
```

### Equation Numbering

```typst
#set math.equation(numbering: "(1)")

$ E = m c^2 $
```

### Aligned Equations

```typst
$
x &= 1 + 2 \
  &= 3
$
```

---

## Code

### Inline Code

```typst
Use the `print()` function.
```

### Code Block

````typst
```python
def hello():
    print("Hello, World!")
```
````

### Raw Block (No Highlighting)

```typst
#raw(block: true, "fn main() { }")
```

---

## Page Setup

### Basic Page Settings

```typst
#set page(
  paper: "a4",           // a4, us-letter, etc.
  margin: 2cm,           // All sides
  margin: (x: 2cm, y: 2.5cm),  // Horizontal/vertical
  margin: (top: 2cm, bottom: 2cm, left: 2.5cm, right: 2.5cm),
)
```

### Headers & Footers

```typst
#set page(
  header: [
    _My Document_
    #h(1fr)
    #counter(page).display()
  ],
  footer: align(center)[Page #counter(page).display()],
)
```

### Page Numbers

```typst
#set page(numbering: "1")        // Simple numbers
#set page(numbering: "1 / 1")    // "1 / 10" format
#set page(numbering: "— 1 —")    // With dashes
```

### Page Break

```typst
#pagebreak()
```

---

## Functions & Rules

### Set Rules

Configure default appearance:

```typst
#set text(font: "Noto Sans", size: 11pt)
#set page(paper: "a4", margin: 2cm)
#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.1")
```

### Show Rules

Transform elements:

```typst
// Style all headings
#show heading: set text(fill: blue)

// Custom heading style
#show heading.where(level: 1): it => [
  #set text(size: 18pt, weight: "bold")
  #block(below: 1em)[#it.body]
]

// Style specific element
#show "TODO": text(fill: red, weight: "bold")[TODO]
```

---

## Variables & Logic

### Variables

```typst
#let name = "John"
#let count = 42
#let items = (1, 2, 3)

Hello, #name! Count: #count
```

### Functions

```typst
#let greet(name) = [Hello, #name!]
#greet("World")

#let add(a, b) = a + b
Result: #add(2, 3)
```

### Conditionals

```typst
#let score = 85

#if score >= 90 [
  Grade: A
] else if score >= 80 [
  Grade: B
] else [
  Grade: C
]
```

### Loops

```typst
// For loop
#for item in (1, 2, 3) [
  Item: #item \
]

// While loop
#let i = 0
#while i < 3 {
  [Count: #i \ ]
  i = i + 1
}
```

---

## Colors

### Named Colors

```typst
#text(fill: red)[Red text]
#text(fill: blue)[Blue text]
#text(fill: green)[Green text]
#text(fill: black)[Black text]
#text(fill: gray)[Gray text]
```

### RGB Colors

```typst
#text(fill: rgb("#ff0000"))[Hex red]
#text(fill: rgb(255, 0, 0))[RGB red]
#text(fill: rgb("ff0000"))[Hex without #]
```

### Color Operations

```typst
#text(fill: blue.lighten(50%))[Lighter blue]
#text(fill: blue.darken(30%))[Darker blue]
#text(fill: red.mix(blue))[Purple mix]
```

---

## Layout

### Alignment

```typst
#align(center)[Centered text]
#align(right)[Right-aligned]
#align(left + top)[Top-left]
#align(center + horizon)[Centered vertically]
```

### Spacing

```typst
#h(1cm)          // Horizontal space
#v(1cm)          // Vertical space
#h(1fr)          // Fill remaining horizontal space
#v(1fr)          // Fill remaining vertical space
```

### Boxes & Rectangles

```typst
#box(width: 100pt, height: 50pt, fill: gray)[Content]

#rect(
  width: 100%,
  fill: blue.lighten(90%),
  stroke: 1pt + blue,
  radius: 4pt,
  inset: 10pt,
)[Box content]
```

### Grid Layout

```typst
#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  [Left column],
  [Right column],
)
```

### Columns

```typst
#columns(2, gutter: 1em)[
  First column content...
  #colbreak()
  Second column content...
]
```

### Block

```typst
#block(
  width: 100%,
  above: 1em,
  below: 1em,
  fill: gray.lighten(90%),
  inset: 1em,
)[Block content]
```

---

## Comments

```typst
// This is a line comment

/* This is a
   block comment */
```

---

## Imports

### Import Local Files

```typst
// Import everything
#import "/my-template.typ": *

// Import specific items
#import "/utils.typ": helper-function, my-constant

// Import with alias
#import "/styles.typ": main-style as style
```

### Import Packages

```typst
#import "@preview/package-name:version": *

// Examples
#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/tablex:0.0.8": tablex
```

### Include Files

```typst
// Include renders the file content directly
#include "/chapter1.typ"
```

**Path note**: Always use absolute paths starting with `/` for local imports.

---

## Quick Reference Card

| Task | Syntax |
|------|--------|
| Bold | `*text*` |
| Italic | `_text_` |
| Code | `` `code` `` |
| Heading | `= Title` |
| Bullet list | `- item` |
| Numbered list | `+ item` |
| Link | `#link("url")[text]` |
| Image | `#image("/path")` |
| Inline math | `$x^2$` |
| Block math | `$ x^2 $` |
| Table | `#table(columns: 3, [...], [...])` |
| Set font | `#set text(font: "Name")` |
| Page setup | `#set page(paper: "a4")` |
| Variable | `#let x = 1` |
| Comment | `// comment` |

---

## Resources

- **Official Docs**: https://typst.app/docs
- **Syntax Reference**: https://typst.app/docs/reference/syntax/
- **Math Reference**: https://typst.app/docs/reference/math/
- **Package Registry**: https://typst.app/universe

// ============================================================================
// TYPST DEMO FILE
// This file demonstrates all major Typst features and syntax.
// Use this as a reference when creating your documents.
// ============================================================================

// ----------------------------------------------------------------------------
// PAGE SETUP
// ----------------------------------------------------------------------------

#set page(
  paper: "a4",
  margin: (x: 2cm, y: 2.5cm),
  numbering: "1",
  header: align(right)[_Typst Demo_],
)

#set text(font: "Noto Sans", size: 11pt)
#set par(justify: true, leading: 0.65em)
#set heading(numbering: "1.1")

// ----------------------------------------------------------------------------
// TITLE
// ----------------------------------------------------------------------------

#align(center)[
  #text(size: 24pt, weight: "bold")[Typst Feature Demo]

  #v(0.5em)

  #text(size: 12pt, fill: gray)[A comprehensive showcase of Typst syntax]

  #v(0.3em)

  #line(length: 40%, stroke: 2pt + blue)
]

#v(1em)

// ----------------------------------------------------------------------------
// TABLE OF CONTENTS
// ----------------------------------------------------------------------------

#outline(
  title: [Contents],
  indent: auto,
)

#pagebreak()

// ============================================================================
// SECTION 1: TEXT FORMATTING
// ============================================================================

= Text Formatting

== Basic Formatting

This is *bold text*, this is _italic text_, and this is *_bold italic_*.

You can also use `inline code` for technical terms.

#underline[Underlined text] and #strike[strikethrough text] are also available.

For #smallcaps[Small Caps] and #super[superscript] or #sub[subscript].

== Text Styling with Functions

#text(fill: red)[Red text] |
#text(fill: blue)[Blue text] |
#text(fill: green)[Green text]

#text(size: 8pt)[Small] |
#text(size: 11pt)[Normal] |
#text(size: 14pt)[Large] |
#text(size: 18pt)[Larger]

#text(weight: "light")[Light] |
#text(weight: "regular")[Regular] |
#text(weight: "bold")[Bold]

#text(font: "Fira Code")[Monospace font for code]

== Paragraphs and Line Breaks

This is the first paragraph. It contains multiple sentences that flow together naturally.

This is the second paragraph, separated by a blank line.

Use backslash for a line break:\
This continues on a new line without a paragraph break.

// ============================================================================
// SECTION 2: HEADINGS
// ============================================================================

= Headings

== Level 2 Heading

=== Level 3 Heading

==== Level 4 Heading

Headings are automatically numbered based on the `#set heading(numbering: "1.1")` rule.

// ============================================================================
// SECTION 3: LISTS
// ============================================================================

= Lists

== Bullet Lists

- First item
- Second item
  - Nested item A
  - Nested item B
    - Deeply nested
- Third item

== Numbered Lists

+ First step
+ Second step
  + Sub-step A
  + Sub-step B
+ Third step

== Term Lists (Definitions)

/ Typst: A modern markup-based typesetting system
/ LaTeX: A document preparation system
/ Markdown: A lightweight markup language

// ============================================================================
// SECTION 4: LINKS & REFERENCES
// ============================================================================

= Links and References

== External Links

Visit https://typst.app for the official website.

Or use custom text: #link("https://typst.app/docs")[Typst Documentation]

== Labels and References

This section has a label. <links-section>

You can reference it: see @links-section for details.

== Footnotes

Typst supports footnotes#footnote[This is a footnote. It appears at the bottom of the page.] which are useful for citations and additional information.

// ============================================================================
// SECTION 5: MATHEMATICS
// ============================================================================

= Mathematics

== Inline Math

The famous equation $E = m c^2$ changed physics forever.

The quadratic formula gives $x = (-b plus.minus sqrt(b^2 - 4 a c)) / (2 a)$.

== Block Math

The sum of first $n$ natural numbers:

$ sum_(k=1)^n k = (n(n+1)) / 2 $

The Gaussian integral:

$ integral_(-infinity)^(infinity) e^(-x^2) dif x = sqrt(pi) $

== Fractions and Roots

$ 1/2 + 1/3 = 5/6 $

$ sqrt(x^2 + y^2) = r $

$ root(3, 8) = 2 $

== Subscripts and Superscripts

$ x_1, x_2, ..., x_n $

$ a^2 + b^2 = c^2 $

$ x_(i+1)^(n-1) $

== Greek Letters

$ alpha, beta, gamma, delta, epsilon $

$ pi approx 3.14159 $

$ Gamma(n) = (n-1)! $

== Matrices

$ mat(
  1, 2, 3;
  4, 5, 6;
  7, 8, 9
) $

$ vec(x, y, z) $

== Aligned Equations

$
f(x) &= x^2 + 2x + 1 \
     &= (x + 1)^2
$

== Common Symbols

$
forall x in RR: x^2 >= 0 \
exists n in NN: n > 0 \
A subset B implies A sect B = A \
a eq.not b "means" a "is not equal to" b
$

// ============================================================================
// SECTION 6: TABLES
// ============================================================================

= Tables

== Basic Table

#table(
  columns: (auto, auto, auto),
  [*Name*], [*Age*], [*City*],
  [Alice], [28], [New York],
  [Bob], [34], [London],
  [Carol], [25], [Tokyo],
)

== Styled Table

#table(
  columns: (1fr, 2fr, 1fr),
  align: (left, center, right),
  stroke: 1pt,
  fill: (x, y) => if y == 0 { blue.lighten(80%) } else if calc.odd(y) { gray.lighten(90%) },
  inset: 10pt,
  [*Feature*], [*Description*], [*Status*],
  [Tables], [Create structured data layouts], [Done],
  [Math], [Beautiful mathematical typesetting], [Done],
  [Figures], [Images with captions], [Done],
  [Lists], [Bullet and numbered lists], [Done],
)

// ============================================================================
// SECTION 7: FIGURES AND IMAGES
// ============================================================================

= Figures and Images

== Image Placeholder

Since we don't have actual images, here's how you would include them:

```typst
#image("/assets/logo.png", width: 50%)

#figure(
  image("/assets/diagram.png", width: 80%),
  caption: [A descriptive caption],
)
```

== Figure with Caption (Box Placeholder)

#figure(
  rect(
    width: 200pt,
    height: 150pt,
    fill: gray.lighten(80%),
    stroke: 1pt + gray,
  )[
    #align(center + horizon)[
      #text(fill: gray)[Image Placeholder]
    ]
  ],
  caption: [This is how a figure with caption appears],
)

// ============================================================================
// SECTION 8: CODE BLOCKS
// ============================================================================

= Code Blocks

== Inline Code

Use the `print()` function to output text.

== Code Block with Syntax Highlighting

```python
def fibonacci(n):
    """Calculate the nth Fibonacci number."""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Example usage
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("World"));
```

// ============================================================================
// SECTION 9: BOXES AND CALLOUTS
// ============================================================================

= Boxes and Callouts

== Simple Rectangle

#rect(
  width: 100%,
  fill: blue.lighten(90%),
  stroke: 1pt + blue,
  radius: 4pt,
  inset: 12pt,
)[
  *Note:* This is a simple callout box for highlighting important information.
]

== Warning Box

#rect(
  width: 100%,
  fill: rgb("#fff3cd"),
  stroke: 1pt + rgb("#856404"),
  radius: 4pt,
  inset: 12pt,
)[
  *Warning:* Be careful with this operation. It cannot be undone.
]

== Info Box with Header

#rect(
  width: 100%,
  stroke: 2pt + green,
  radius: 4pt,
)[
  #rect(width: 100%, fill: green.lighten(90%), inset: 8pt)[
    *Tip: Best Practice*
  ]
  #pad(x: 10pt, y: 8pt)[
    Always test your code before deploying to production.
  ]
]

// ============================================================================
// SECTION 10: LAYOUT
// ============================================================================

= Layout

== Alignment

#align(left)[Left aligned text]
#align(center)[Center aligned text]
#align(right)[Right aligned text]

== Grid Layout

#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  rect(fill: blue.lighten(80%), inset: 1em)[Column 1],
  rect(fill: green.lighten(80%), inset: 1em)[Column 2],
)

== Two Columns

#columns(2, gutter: 2em)[
  *First Column*

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.

  #colbreak()

  *Second Column*

  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
]

== Horizontal Line

#line(length: 100%, stroke: 1pt + gray)

== Spacing

Text before
#v(2em)
Text after vertical space

Left #h(1fr) Right (fill space)

// ============================================================================
// SECTION 11: VARIABLES AND LOGIC
// ============================================================================

= Variables and Logic

== Variables

#let project-name = "Typst Demo"
#let version = "1.0"
#let items = ("Apple", "Banana", "Cherry")

Project: *#project-name* (v#version)

== Loops

Fruits:
#for item in items [
  - #item
]

== Conditionals

#let score = 85

#if score >= 90 [
  Grade: *A* (Excellent!)
] else if score >= 80 [
  Grade: *B* (Good job!)
] else [
  Grade: *C* (Keep trying!)
]

== Custom Functions

#let highlight(content, color: yellow) = {
  box(fill: color.lighten(70%), inset: 2pt, radius: 2pt)[#content]
}

This is #highlight[highlighted text] in a sentence.

This is #highlight(color: green)[green highlighted].

// ============================================================================
// SECTION 12: PAGE BREAK
// ============================================================================

#pagebreak()

= Final Notes

== Summary

This demo has covered:

+ Text formatting and styling
+ Headings and document structure
+ Various list types
+ Links, references, and footnotes
+ Mathematical typesetting
+ Tables with styling
+ Figures and images
+ Code blocks
+ Callout boxes
+ Layout and alignment
+ Variables, loops, and conditionals

== Resources

For more information, see:
- Official Documentation: https://typst.app/docs
- Package Registry: https://typst.app/universe
- GitHub Repository: https://github.com/typst/typst

#v(2em)

#align(center)[
  #rect(
    fill: gray.lighten(90%),
    inset: 1em,
    radius: 4pt,
  )[
    *End of Demo* \
    Happy typesetting!
  ]
]

// AI: This is the main Typst document. Modify this file to change the template content.
// Documentation: https://typst.app/docs

#set page(paper: "a4", margin: 2cm)
#set text(font: "Linux Libertine", size: 11pt)

= Welcome to Typst Editor

This is a *live preview* of your Typst document. Edit the source on the left to see changes here.

== Features

- Real-time compilation and preview
- PDF export functionality
- Responsive split-panel layout

== Mathematics

Typst excels at typesetting mathematical formulas:

$ sum_(k=0)^n k = (n(n+1)) / 2 $

The quadratic formula:

$ x = (-b plus.minus sqrt(b^2 - 4a c)) / (2a) $

== Lists

+ First ordered item
+ Second ordered item
+ Third ordered item

- Unordered item one
- Unordered item two
- Unordered item three

== Table Example

#table(
  columns: (auto, auto, auto),
  [*Name*], [*Age*], [*City*],
  [Alice], [28], [New York],
  [Bob], [34], [London],
  [Carol], [25], [Tokyo],
)

== Getting Started

Simply edit the source code on the left panel. Your changes will be compiled and displayed here automatically.

Click the *Export PDF* button in the toolbar to download your document.

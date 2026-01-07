# Typst Editor Template

A web-based Typst editor with live preview and PDF export. Built as a **forkable template** for creating custom Typst document editors on AI platforms like v0.

## Features

- Live SVG preview with typst.ts WebAssembly compiler
- PDF export with one click
- Global font support (Noto, Fira Code, Inter, Roboto, Source Han)
- Package registry support (`@preview/` packages)
- Local template imports (auto-discovery of `.typ` files)
- Zoom controls (50% - 200%)
- Internal document link navigation
- Clear error display with copy button

---

## Creating Your Own Template

This repository is designed to be forked/templated for creating custom Typst editors. Each template is a complete, deployable project.

### Method 1: GitHub Template (Recommended)

1. **Use as Template**
   - Click "Use this template" → "Create new repository"
   - Name it descriptively (e.g., `typst-resume-editor`, `typst-math-worksheet`)

2. **Clone and customize**
   ```bash
   git clone https://github.com/YOUR_USERNAME/your-template-name
   cd your-template-name
   npm install
   npm run dev
   ```

3. **Edit only the template folder** (see below)

### Method 2: Fork

1. Fork this repository
2. Clone your fork
3. Customize the template folder

---

## Project Structure

```
your-template/
├── SYNTAX.md                 # Typst syntax guide (shared reference)
├── CLAUDE.md                 # AI instructions for the project
├── README.md                 # This file
│
├── public/template/          # ← ONLY MODIFY THIS FOLDER
│   ├── main.typ              # Your Typst document (edit this!)
│   ├── demo.typ              # Feature demo & syntax examples (reference)
│   ├── README.md             # Template-specific AI instructions
│   ├── *.typ                 # Additional template files (optional)
│   └── assets/               # Images and resources (optional)
│       ├── logo.png
│       └── diagram.svg
│
├── components/               # ✗ DO NOT MODIFY - Editor UI
├── hooks/                    # ✗ DO NOT MODIFY - Compiler integration
├── lib/                      # ✗ DO NOT MODIFY - Infrastructure
├── app/api/                  # ✗ DO NOT MODIFY - API routes
└── types/                    # ✗ DO NOT MODIFY - TypeScript declarations
```

### Key Files

| File | Purpose |
|------|---------|
| `SYNTAX.md` | Comprehensive Typst syntax reference (shared) |
| `public/template/main.typ` | Your document - **edit this** |
| `public/template/demo.typ` | Template-specific examples - **customize this** |
| `public/template/README.md` | Template-specific instructions for AI |

### What to Modify

| File/Folder | Action | Purpose |
|-------------|--------|---------|
| `public/template/main.typ` | **EDIT** | Your main Typst document (content only) |
| `public/template/demo.typ` | **CUSTOMIZE** | Template-specific examples |
| `public/template/<template>.typ` | **CREATE** | Template styling/logic (e.g., `worksheet.typ`) |
| `public/template/README.md` | **UPDATE** | Template-specific AI instructions |
| `public/template/assets/` | **ADD** | Images, logos, diagrams |
| `CLAUDE.md` | **UPDATE** | AI instructions for your template |
| `components/editor/Toolbar.tsx` | **UPDATE** | App title (see below) |
| `app/globals.css` | Optional | Theme colors |

### Template Architecture (Important!)

**Always separate template logic from content.** Create a dedicated template file and import it:

```
public/template/
├── worksheet.typ      ← Template logic (styling, layout, functions)
├── main.typ           ← Content only (imports worksheet.typ)
├── demo.typ           ← Examples (imports worksheet.typ)
└── README.md
```

**worksheet.typ** - Template logic:
```typst
#let worksheet(title: "Worksheet", class: "Math", doc) = {
  set page(paper: "a4", margin: 2cm)
  set text(font: "Noto Sans", size: 11pt)

  // Header
  align(center)[#text(size: 20pt, weight: "bold")[#title]]

  // Body
  doc
}
```

**main.typ** - Content only:
```typst
#import "/worksheet.typ": worksheet

#show: worksheet.with(
  title: "Algebra Practice",
  class: "Grade 8",
)

= Problems

+ Solve: $2x + 5 = 13$
```

**demo.typ** - Also imports the template:
```typst
#import "/worksheet.typ": worksheet

#show: worksheet.with(title: "Demo Worksheet")

// Demo content showing all features...
```

**Why this matters:**
- Template logic is reusable and maintainable
- `main.typ` stays clean and focused on content
- `demo.typ` uses the same styling as `main.typ`
- AI can modify content without breaking template logic

### Customizing the App Title

The app title "Typst Viewer" appears in the top-left of the editor. To customize it for your template:

**Edit `components/editor/Toolbar.tsx` line 36:**

```tsx
// Change from:
<span className="font-semibold text-lg">Typst Viewer</span>

// To your template name:
<span className="font-semibold text-lg">Maths Worksheet Builder</span>
```

**Examples:**
- Resume template → "Resume Builder"
- Math worksheet → "Maths Worksheet Builder"
- Academic paper → "Paper Editor"
- Invoice template → "Invoice Generator"

### Customizing demo.typ

The `demo.typ` file should showcase features specific to your template type. Update it to include relevant examples:

| Template Type | demo.typ Should Include |
|---------------|------------------------|
| Math Worksheet | Math equations, problem formats, answer spaces, grids |
| Resume | Contact sections, experience entries, skills lists |
| Academic Paper | Abstract, citations, figures, equations |
| Invoice | Line items, totals, payment terms |
| Letter | Sender/recipient blocks, formal layouts |

The demo.typ serves as a reference for AI and users to understand what's possible with your specific template.

### What NOT to Modify

- `hooks/` - Core compiler integration
- `lib/` - Infrastructure (typst-config, fonts, utils)
- `components/ui/` - Base UI components
- `types/` - TypeScript declarations
- `next.config.ts`, `tsconfig.json` - Build configuration

---

## Writing Your Template

### Basic Template

```typst
// public/template/main.typ

#set page(paper: "a4", margin: 2cm)
#set text(font: "Noto Sans", size: 11pt)

= My Document Title

Your content here...
```

### Using Images

Place images in `public/template/assets/` and use **absolute paths**:

```typst
#image("/assets/logo.png", width: 50%)
#image("/assets/header.svg", width: 100%)
```

Supported formats: PNG, JPG, JPEG, GIF, SVG, WebP

### Using Local Template Files

Create reusable components in separate `.typ` files:

```
public/template/
├── main.typ           # Main document
├── letter.typ         # Letter template
├── styles.typ         # Shared styles
└── assets/
    └── signature.png
```

Import with **absolute paths**:

```typst
// main.typ
#import "/letter.typ": letter-template
#import "/styles.typ": *

#show: letter-template.with(
  sender: "John Doe",
  recipient: "Jane Smith",
)

Dear Jane,

...
```

### Using Typst Packages

Import from the official package registry:

```typst
#import "@preview/cetz:0.3.2": canvas, draw
#import "@preview/tablex:0.0.8": tablex
#import "@preview/flow-way:0.1.0": *
```

Browse packages at: https://typst.app/universe

---

## Template Examples

### Resume Template

```typst
#set page(paper: "a4", margin: (x: 1.5cm, y: 2cm))
#set text(font: "Inter", size: 10pt)

#align(center)[
  #text(size: 24pt, weight: "bold")[John Doe]

  john@email.com | (555) 123-4567 | linkedin.com/in/johndoe
]

#line(length: 100%)

== Experience

*Software Engineer* | Company Name | 2020 - Present
- Built scalable web applications
- Led team of 5 developers
```

### Academic Paper Template

```typst
#set page(paper: "a4", margin: 2.5cm)
#set text(font: "Linux Libertine", size: 12pt)
#set par(justify: true, leading: 0.65em)

#align(center)[
  #text(size: 16pt, weight: "bold")[
    Research Paper Title
  ]

  #v(1em)

  Author Name \
  _University Name_ \
  author\@university.edu
]

#v(2em)

*Abstract.* #lorem(50)

= Introduction

#lorem(100)
```

### Math Worksheet Template

```typst
#set page(paper: "a4", margin: 2cm)
#set text(font: "Noto Sans", size: 11pt)

#align(center)[
  #text(size: 18pt, weight: "bold")[Algebra Worksheet]

  Name: #box(width: 200pt, stroke: (bottom: 1pt))
  Date: #box(width: 100pt, stroke: (bottom: 1pt))
]

#v(1em)

== Solve for x

+ $2x + 5 = 13$
  #v(3em)

+ $3(x - 2) = 15$
  #v(3em)

+ $x^2 - 4 = 0$
  #v(3em)
```

---

## Available Fonts

These fonts are preloaded from CDN:

| Font | Usage |
|------|-------|
| Noto Sans / Serif | General text, multilingual |
| Noto Sans SC | Chinese (Simplified) |
| Source Han Sans | CJK (Chinese, Japanese, Korean) |
| Fira Code | Code blocks, monospace |
| Inter | Modern UI text |
| Roboto | General purpose |
| Linux Libertine | Academic, serif |

```typst
#set text(font: "Noto Sans")      // Multilingual
#set text(font: "Fira Code")      // Monospace/Code
#set text(font: "Noto Sans SC")   // Chinese
#set text(font: "Linux Libertine") // Academic
```

---

## Deploying to v0

This template is optimized for [v0.dev](https://v0.dev) and similar AI platforms.

### File Locking for v0

When uploading, lock infrastructure files to prevent AI modifications:

```javascript
// Lock all files except public/template/
files.map(file => ({
  ...file,
  locked: !file.name.startsWith('public/template/')
}))
```

See: [v0 File Locking Documentation](https://v0.app/docs/api/platform/guides/lock-files-from-ai-changes)

### Updating CLAUDE.md

Update the CLAUDE.md file to describe your specific template:

```markdown
# My Resume Template

## For AI Agents

### Files to MODIFY:
- `public/template/main.typ` - Resume content

### Template Variables:
- Name, contact info at the top
- Experience section with job entries
- Education section
- Skills list

### Styling Notes:
- Uses Inter font for modern look
- Compact margins for single-page resume
```

---

## Local Development

### Quick Start

```bash
# Clone your template repository
git clone https://github.com/YOUR_USERNAME/your-template
cd your-template

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) with App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [typst.ts](https://github.com/Myriad-Dreamin/typst.ts) - WebAssembly Typst compiler
- [Radix UI](https://www.radix-ui.com/) - Accessible components

---

## Troubleshooting

### Images not loading

- Ensure images are in `public/template/assets/`
- Use absolute paths: `#image("/assets/image.png")`
- Check file extension matches exactly (case-sensitive)

### Import errors

- Use absolute paths for imports: `#import "/template.typ"`
- Ensure the file exists in `public/template/`
- File must have `.typ` extension

### Fonts not rendering

- Check font name spelling matches exactly
- Some fonts may not support all characters
- Try fallback: `#set text(font: ("Preferred Font", "Noto Sans"))`

### Package errors

- Check package name and version at https://typst.app/universe
- Format: `@preview/package-name:version`

---

## License

MIT

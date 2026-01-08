# AI Instructions for Typst Template

## Files

- `public/template/main.typ` - EDIT THIS (content)
- `public/template/<template>.typ` - DO NOT EDIT (template logic, if exists)
- `public/template/demo.typ` - REFERENCE (examples)
- `SYNTAX.md` - REFERENCE (syntax guide)

## Quick Start

1. Edit `main.typ` only
2. Use `= Heading` for sections
3. Use `$ math $` for equations
4. Use `#image("/assets/file.png")` for images

## Basic Syntax

Text: `*bold*` `_italic_` `` `code` ``
Lists: `- bullet` `+ numbered`
Math: `$inline$` `$ block $`

## Template Pattern

Create `<template>.typ` with logic, import in `main.typ`:
```typst
#import "/template.typ": *
#show: template.with(title: "Doc")
```

See `demo.typ` for examples. See `SYNTAX.md` for full syntax.

## Do NOT

- Modify infrastructure (`hooks/`, `lib/`, `components/`)
- Use relative imports (use `/file.typ` not `./file.typ`)

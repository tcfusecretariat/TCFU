---
name: web-typography
description: UNESCO Traditional Culture Foundation site typography — tokens, locale faces, editorial patterns, and word-wrapping policy for src/styles and src/components.
paths:
  - src/styles/**
  - src/components/**
---

# Web Typography (TCF UNESCO)

Apply when editing styles or page components. Prefer existing tokens over new magic numbers.

## Design tokens (`src/styles/global.css`)

| Token | Role |
|-------|------|
| `--ink`, `--muted` | Primary and secondary text |
| `--ivory`, `--ivory-deep`, `--champagne`, `--champagne-deep`, `--soft-gold` | Backgrounds, accents, meta labels |
| `--serif-en` | Baskerville stack for en/fr body and UI |
| `--serif-zh` | Noto/Source Han serif (reserved) |
| `--kai-zh` | Kaiti stack for zh display accents |
| `--locale-font` | Set per `html[lang]` — en/fr → `--serif-en`; zh-Hant → `--serif-en`, `--kai-zh` |

Body defaults: `line-height: 1.68`, `color: var(--ink)`, `background: var(--ivory)`.

## Word-wrapping (mandatory)

Follow `.cursor/rules/word-wrapping.mdc` on every page:

- `overflow-wrap: normal; word-break: normal; hyphens: none;` on headings, paragraphs, lists, links, buttons.
- `text-wrap: balance` on h1–h3; `text-wrap: pretty` on body copy.
- **Never** use `break-word`, `break-all`, or `nowrap` + horizontal scroll to avoid wraps.
- On narrow viewports, **shrink with `clamp()` / `min()`** — do not break Latin words mid-character.

## Locale typography

**English / French (`html[lang="en"]`, `html[lang="fr"]`)**

- Body and forms: `font-family: var(--serif-en)`.
- Long prose: measure **52–58ch** (`max-width: min(58ch, 100%)`), centered when the page is editorial/ceremonial.
- Section kickers: uppercase, `letter-spacing: 0.04–0.06em`, `color: var(--soft-gold)` or `--champagne-deep`.

**Traditional Chinese (`html[lang="zh-Hant"]`)**

- Body uses `--locale-font` (serif + kaiti). Nav and kickers may bump size (~19px nav).
- Chinese wraps between characters naturally; keep `word-break: normal`.
- For long single-sentence blocks (governance, titles): scale with **`min()` or `clamp()`** so lines fit desktop/tablet without scroll; allow multi-line wrap below **860px**.

## Editorial page patterns

### Detail / CMS pages (`.detail-page`, `.detail-article`)

- h1: `clamp(44px, 6vw, 82px)`, `text-wrap: balance`, max-width ~980px.
- Summary/body (`.detail-summary`, `.portable-body`): `clamp(19px, 2vw, 25px)`, line-height **1.85**, max-width **760–820px**, `color: var(--muted)` or `--ink` on content pages.

### Content pages (`.content-page`)

- Portable body inherits `--locale-font`; blockquotes use left champagne rule.
- Privacy policy h2/h3: centered, tab nav sticky on desktop.

### Governance (`.governance-page`)

- Centered ceremonial layout; each `<p class="governance-line">` is one logical sentence.
- Vertical rhythm via flex `gap`, not stacked margins.
- **zh desktop:** fluid `font-size` with `min()`/`clamp()` on `.governance-intro` and `.governance-role` so lines read as single visual units when space allows.
- **≤860px:** readable fixed clamp sizes; natural wrap; no `overflow-x: auto`.
- **en/fr:** intro `max-width: 58ch`; role lines compact, no forced nowrap.

### Privacy policy (`.privacy-policy-page`)

- Smaller fluid headings inside panels; centered subsection titles.
- Mobile: tab select replaces side nav at 860px; bump panel heading clamps for legibility.

### Registration (`.registration-page`)

- Centered header; h1 uses tighter clamp on en, slightly larger on zh.
- Intro and privacy notice: max-width 760px, `text-wrap: pretty`.

## Responsive type scale

1. Prefer **`clamp(min, preferred, max)`** with vw/vi units for fluid headings and body.
2. Prefer **`ch` or `em`** for measure (prose width), not pixel guesses.
3. Use **`min()`** to cap size when a sentence must fit a known container width.
4. Breakpoints already in use: **860px** (editorial/mobile nav), **640px** (compact mobile), **1060px** (nav drawer).
5. Reduce font size before allowing overflow; never add horizontal scroll for text.

## Component checklist

When adding or changing text UI:

- [ ] Uses `--locale-font` or explicit locale selector
- [ ] Word-wrapping policy applied
- [ ] Heading/body `text-wrap` set appropriately
- [ ] Prose measure in ch where long-form
- [ ] Mobile tested at ≤860px without text overflow
- [ ] No `white-space: nowrap` on multi-word sentences unless truly single UI labels (nav items OK on desktop)

## Anti-patterns

- `overflow-x: auto` on copy containers
- `width: fit-content` on paragraphs that force layout wider than viewport
- Tiny fixed px fonts on legal/editorial pages
- Duplicating font stacks instead of tokens
- Hyphenation or aggressive word-break on Latin copy

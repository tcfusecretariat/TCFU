---
name: web-typography
description: >-
  Editorial web typography for TCF UNESCO — font tokens, locale faces (Baskerville +
  Adobe Kaiti), measure, alignment, mobile layout, and word-wrapping. Use when editing
  CSS typography, fixing mobile text layout, footer/header copy, privacy policy pages,
  or any zh/en/fr text presentation in src/styles or components.
paths:
  - src/styles/**
  - src/components/**
---

# Web Typography (TCF UNESCO)

Load when changing text layout, font sizes, alignment, or responsive copy. Read [reference.md](reference.md) for measure tables and mobile checklists.

## Design tokens (`src/styles/global.css`)

| Token | Role |
|-------|------|
| `--ink`, `--muted` | Primary and secondary text |
| `--serif-en` | Baskerville stack for en/fr and zh Latin |
| `--kai-zh` | `adobe-kaiti-std` + system Kai fallbacks |
| `--zh-locale-font` | `baskerville-urw, "TCF Zh Latin", var(--kai-zh)` |
| `--locale-font` | Per `html[lang]` — see `zh-latin-baskerville.mdc` |
| `--privacy-text-size` | Privacy policy uniform scale |

Body: `line-height: 1.68`, `color: var(--ink)`, `background: var(--ivory)`.

## Word-wrapping (mandatory)

Follow `.cursor/rules/word-wrapping.mdc`:

- `overflow-wrap: normal; word-break: normal; hyphens: none;` on all copy
- **Never** `break-word`, `break-all`, or `nowrap` on sentences to avoid wraps
- Shrink with `clamp()` / `min()` on narrow screens instead

### text-wrap policy (updated)

| Element | Desktop | Mobile zh body |
|---------|---------|----------------|
| h1–h3 display | `balance` | `balance` |
| en/fr body | `pretty` OK | `normal` |
| zh-Hant body / legal | `normal` | `justify` + `normal` |
| UI labels, footer links | `normal` | `normal` |

Do **not** apply global `text-wrap: pretty` to zh legal prose — it creates short ragged lines users reject.

## Locale typography

**English / French**

- `--serif-en` everywhere
- Prose measure: `max-width: min(58ch, 100%)`
- Kickers: uppercase, `letter-spacing: 0.04–0.06em`, `--soft-gold` / `--champagne-deep`

**Traditional Chinese (zh-Hant)**

- CJK → Typekit `adobe-kaiti-std`; Latin snippets → `baskerville-urw`
- Mobile (≤640px): `.content-page .portable-body p/li` and privacy panels → `text-align: justify`
- Headings stay centered; body is left-aligned or justified, never mixed on same element

## Layout patterns

### Privacy policy (`.privacy-policy-page`)

- Uniform `--privacy-text-size` for h1, panel titles, h3, h4, and body
- Override `.detail-article h1` large defaults with `.privacy-policy-page` selectors
- `white-space: pre-line` only on `.privacy-policy-multiline` when `\n` in data (addresses)
- Mobile: tab select at 860px; panels `min-width: 0`

### Footer (`.site-footer`)

- Width: `min(561.6px, calc(100vw - 48px))` — **never** bare `98.8vw` inside padded footer
- Links: 3-column grid `repeat(3, minmax(0, 1fr))` with start/center/end alignment
- Mobile: smaller link `clamp(12px, 3.1vw, 15px)`

### Editorial detail pages

- h1: `clamp(44px, 6vw, 82px)` except privacy/governance overrides
- `.portable-body`: `clamp(19px, 2vw, 25px)`, line-height 1.85, max-width 820px

## Responsive workflow

1. Design at **390px** first for zh legal/footer copy
2. Use **`clamp(min, preferred, max)`** — one token per surface
3. Breakpoints: **860px** (nav/tabs), **640px** (mobile type + zh justify), **460px** (compact)
4. Verify with screenshot — `body overflow-x: hidden` clips overflow silently

## Component checklist

- [ ] Uses `--locale-font` or explicit locale stack
- [ ] Word-wrapping rule satisfied
- [ ] zh mobile body: justify if long-form
- [ ] No vw widths ignoring parent padding
- [ ] Footer/links visible at 320px
- [ ] No duplicate conflicting h1 font-size rules

## Anti-patterns (learned from this project)

- `text-wrap: pretty` on zh privacy paragraphs
- `flex space-between` footer row without `minmax(0,1fr)` grid fallback
- `--footer-brand-width: … 98.8vw` inside `padding: 24px`
- Tiny privacy heading clamps (8–16px) under body size
- `white-space: pre-line` on paragraphs without embedded newlines
- CJK `@font-face` with `local()` only — blocks Typekit Kai

## Related skills

- [web-design-guidelines](../web-design-guidelines/SKILL.md) — accessibility / UX audit
- [frontend-design](../frontend-design/SKILL.md) — distinctive visual direction for new UI

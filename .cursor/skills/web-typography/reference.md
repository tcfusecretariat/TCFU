# Editorial typography reference (TCF UNESCO)

## Measure (line length)

| Context | Target measure |
|---------|----------------|
| Long prose (en/fr) | 52–58ch |
| Legal / privacy (zh) | Full panel width on mobile; max 820px desktop |
| Hero taglines | Fluid `clamp()`; avoid `nowrap` unless verified on 320px |

Use `max-width: min(58ch, 100%)` for Latin prose, not arbitrary px.

## Line height

| Role | Ratio |
|------|-------|
| Body / legal copy | 1.75–1.85 |
| UI labels, kickers | 1.4–1.5 |
| Display headings | 1.14–1.22 |

Do not use display heading line-height on body paragraphs.

## Alignment by locale and viewport

| Case | Alignment | text-wrap |
|------|-----------|-----------|
| zh-Hant body, mobile ≤640px | `justify` | `normal` |
| zh-Hant headings (ceremonial) | `center` | `balance` |
| en/fr long prose | `left` (or center in hero only) | `normal` or `pretty` |
| en/fr hero h1 | `center` | `balance` |

**Why:** `text-wrap: pretty` avoids orphan words but leaves ragged short lines in Chinese legal text. Users expect full lines on mobile zh.

**Never** use `text-align: justify` on headings.

## Font roles (this project)

| Locale | CJK | Latin |
|--------|-----|-------|
| zh-Hant | `adobe-kaiti-std` (Typekit `utx6cie`) | `baskerville-urw` + local Baskerville |
| en / fr | — | Baskerville (`--serif-en`) |

See `.cursor/rules/zh-latin-baskerville.mdc`.

## Mobile overflow checklist

- [ ] No `width: XXvw` inside padded containers without subtracting padding
- [ ] Footer/links use `min(561.6px, calc(100vw - 36px))` or `100%` of parent
- [ ] Flex `space-between` rows verified at 320px — prefer grid `minmax(0,1fr)` when clipping occurs
- [ ] `body { overflow-x: hidden }` — any overflow is **clipped**, not scrollable; fix width at source
- [ ] `white-space: pre-line` only when content has intentional `\n` (addresses)

## Type scale

Prefer one fluid token per surface:

```css
--privacy-text-size: clamp(19px, 2vw, 25px);
--footer-link-size: clamp(12px, 3.1vw, 16px);
```

Avoid tiny fixed px on legal pages (8–12px headings).

## Visual critique (before shipping)

1. Screenshot at **390px** and **320px** width
2. Check last character of each footer link is visible
3. Check zh paragraph right edge — ragged vs justified per spec
4. Check heading size hierarchy matches intent (legal pages may use uniform size)
5. Confirm no Latin word splits mid-character

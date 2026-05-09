# November Design System

Shared design token system powering Plumb, Hippo, and Talki-OSS.

## Architecture

### Code (Style Dictionary)

- `tokens/core/` — shared tokens (typography, spacing, radius, shadows, motion)
- `tokens/themes/{plumb,hippo,talki-oss}.json` — per-theme color + font overrides
- `sd.config.js` — builds CSS custom properties, JS ESM, and Figma Token Studio JSON
- `npm run build` to regenerate `dist/`

### Figma (November Design System file)

File: https://www.figma.com/design/2Bqqcesrygi9M6EAlBSbE6/November-Design-System

#### Variable Collections

| Collection | Modes | Variables | Purpose |
|------------|-------|-----------|---------|
| **Theme** | Plumb, Hippo, Talki-OSS | 24 | Colors (20) + font families (4). Mode-switching on any frame swaps the full palette and fonts. |
| Spacing | Default | 21 | 4px base, 4–160px scale |
| Radius | Default | 8 | xs through full |
| Typography | Default | 17 | Font sizes, weights, leading, tracking (shared across themes) |
| Motion | Default | 5 | Duration tokens (code-only, no Figma visual equivalent) |

#### Theme Collection — Font Family Variables

| Variable | Scope | Bound to | Current value (placeholder) |
|---|---|---|---|
| `family/primary` | FONT_FAMILY | Heading/xs–7xl, Display | Geist |
| `family/secondary` | FONT_FAMILY | Body/accent–xl | Geist |
| `family/accent` | FONT_FAMILY | Reserved — no bindings yet | Inter |
| `family/code` | FONT_FAMILY | Code/base | JetBrains Mono |

**Font family intent:**
- `primary` — heading/display font (brand-forward, will diverge per theme)
- `secondary` — body/copy font (optimized for readability)
- `accent` — reserve for editorial moments, one-off components, or a third brand font
- `code` — monospace, functional (not brand-driven)

All values are placeholders. Update per mode when brand fonts are decided.

#### Theme Collection — Color Token Groups

| Group | Tokens | Scopes |
|-------|--------|--------|
| brand | `color/primary`, `color/primary-hover`, `color/highlight` | ALL_FILLS, STROKE_COLOR |
| surface | `color/surface/{dark,med,default,light}` | FRAME_FILL, SHAPE_FILL |
| content | `color/text/{default,light,muted}` | TEXT_FILL |
| content-inverse | `color/text/{inverse,inverse-light,inverse-muted}` | TEXT_FILL |
| border | `color/border/{light,default,dark}` | STROKE_COLOR |
| overlay | `color/overlay/{light,med,dark}`, `color/scrim` | FRAME_FILL, SHAPE_FILL |

#### Text Styles

Source of truth: `callthedesignguy-website/src/app/globals.css`. Figma uses desktop/max values for all fluid (clamp) sizes.

**Body** — bound to `family/secondary`

| Style | Size | Line Height | CSS token |
|---|---|---|---|
| Body/accent | 8px | 120% (tight) | `--text-accent` |
| Body/fine | 10px | 100% (none) | `--text-fine` |
| Body/xs | 10px | 150% (normal) | `--text-body-xs` |
| Body/caption | 12px | 100% (none) | `--text-caption` |
| Body/sm | 12px | 150% (normal) | `--text-body-sm` |
| Body/base | 16px | 180% (relaxed) | `--text-base` |
| Body/lg | 20px | 180% (relaxed) | `--text-body-lg` |
| Body/xl | 24px | 180% (relaxed) | `--text-body-xl` |

**Code** — bound to `family/code`

| Style | Size | Line Height | CSS token |
|---|---|---|---|
| Code/base | 13px | 150% (normal) | `--font-accent` |

**Heading** — bound to `family/primary`

| Style | Size | Line Height | CSS token |
|---|---|---|---|
| Heading/xs | 14px | 120% (tight) | `--text-xs` |
| Heading/sm | 16px | 120% (tight) | `--text-sm` |
| Heading/md | 18px | 120% (tight) | `--text-md` |
| Heading/lg | 20px | 120% (tight) | `--text-lg` |
| Heading/xl | 24px | 110% (tighter) | `--text-xl` |
| Heading/2xl | 32px | 110% (tighter) | `--text-2xl` |
| Heading/3xl | 48px | 110% (tighter) | `--text-3xl` |
| Heading/4xl | 64px | 110% (tighter) | `--text-4xl` |
| Heading/5xl | 80px | 110% (tighter) | `--text-5xl` |
| Heading/6xl | 96px | 110% (tighter) | `--text-6xl` |
| Heading/7xl | 120px | 110% (tighter) | `--text-7xl` |
| Display | 200px | 100% (none) | `--text-display` |

#### Effect Styles

Source of truth: `callthedesignguy-website/src/app/globals.css`. Single-mode for now — add theme modes when Plumb (dark theme) UI work begins, as dark backgrounds need different shadow values.

| Style | Layers | Shadow values | CSS token |
|---|---|---|---|
| Shadow/sm | 1 | y:1 blur:2 black/4% | `--shadow-sm` |
| Shadow/default | 2 | y:1 blur:3 black/6% + y:1 blur:2 black/4% | `--shadow-default` |
| Shadow/md | 2 | y:4 blur:12 black/7% + y:2 blur:4 black/4% | `--shadow-md` *(added — gap in website code)* |
| Shadow/lg | 2 | y:10 blur:24 black/6% + y:4 blur:10 black/4% | `--shadow-lg` |
| Shadow/xl | 2 | y:20 blur:40 black/8% + y:8 blur:16 black/6% | `--shadow-xl` |
| Shadow/popover | 2 | y:24 blur:48 navy/10% + y:6 blur:16 navy/6% | `--shadow-popover` |

`--shadow-focus-ring` skipped — uses `var(--color-primary)` and `color-mix()` which Figma effect styles can't reference. Applied per-component instead.

`--shadow-md` is a design system addition not yet in the website code. Add to `globals.css` when syncing.

#### Decisions Made

- **Modes over separate collections** — one Theme collection with 3 modes instead of 3 separate color collections. Enables one-click theme switching on any frame.
- **Font families in Theme, not Typography** — fonts will diverge per product, so they need mode-aware values.
- **primary/secondary/accent/code over sans/mono** — semantic naming that works across all themes regardless of typeface category.
- **Text styles bound to font family variables** — changing a `family/*` variable value instantly updates all text styles using it across any frame in that mode.
- **Type scale sourced from callthedesignguy-website** — `globals.css` is the reference. Figma uses desktop/max values for clamp() sizes.
- **No primitives tier** — tokens are already semantic (`color/primary` not `blue/500`). Add a primitives layer only if the palette grows.
- **No status colors yet** (danger, warning, positive) — add when needed, with primary/secondary pairs.
- **Text-transform not tokenized** — Figma doesn't support it as a property.
- **Code syntax set on all variables** — WEB platform, maps to CSS custom property names.

## What's Next

1. **Token documentation page** — populate the existing section frames with visual swatches for print review.
2. **Lock in brand fonts** — update `family/primary` and `family/secondary` per mode when brand fonts are decided.
3. **Sync code tokens** — update `tokens/core/typography.json` font family names to match primary/secondary/accent/code convention, and add `--shadow-md` to `globals.css`.

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
| **Theme** | Plumb, Hippo, Talki-OSS | 22 | Colors (20) + font families (2). Mode-switching on any frame swaps the full palette. |
| Spacing | Default | 21 | 4px base, 4–160px scale |
| Radius | Default | 8 | xs through full |
| Typography | Default | 17 | Font sizes, weights, leading, tracking (shared across themes) |
| Motion | Default | 5 | Duration tokens (code-only, no Figma visual equivalent) |

#### Theme Collection — Color Token Groups

| Group | Tokens | Scopes |
|-------|--------|--------|
| brand | `color/primary`, `color/primary-hover`, `color/highlight` | ALL_FILLS, STROKE_COLOR |
| surface | `color/surface/{dark,med,default,light}` | FRAME_FILL, SHAPE_FILL |
| content | `color/text/{default,light,muted}` | TEXT_FILL |
| content-inverse | `color/text/{inverse,inverse-light,inverse-muted}` | TEXT_FILL |
| border | `color/border/{light,default,dark}` | STROKE_COLOR |
| overlay | `color/overlay/{light,med,dark}`, `color/scrim` | FRAME_FILL, SHAPE_FILL |

Font family variables (`family/sans`, `family/mono`) are in the Theme collection with FONT_FAMILY scope. Currently all set to "Inter" as placeholder — update per theme when brand fonts are locked.

#### Decisions Made

- **Modes over separate collections** — one Theme collection with 3 modes instead of 3 separate color collections. Enables one-click theme switching on any frame.
- **Font families in Theme, not Typography** — fonts will diverge per product, so they need mode-aware values.
- **No primitives tier** — tokens are already semantic (`color/primary` not `blue/500`). Add a primitives layer only if the palette grows.
- **No status colors yet** (danger, warning, positive) — add when needed, with primary/secondary pairs.
- **Text-transform not tokenized** — Figma doesn't support it as a property.
- **Code syntax set on all variables** — WEB platform, maps to CSS custom property names.

## What's Next

1. **Text Styles** — create the type ramp (Heading/7XL through Fine). Text styles define size/weight/line-height; font family comes from the Theme variable binding.
2. **Effect Styles** — shadows (sm, default, lg, xl, popover, focus-ring).
3. **Token documentation page** — populate the existing section frames with visual swatches for print review.
4. **Lock in brand fonts** — update `family/sans` per mode when brand fonts are decided.
5. **Sync code tokens** — ensure token JSON files match any Figma-side changes.

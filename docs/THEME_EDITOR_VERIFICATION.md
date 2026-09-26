# VALOIR — THEME EDITOR RUNTIME AUDIT
## Verification of Theme Settings, Schema Propagation & Merchant Controls

This audit provides a comprehensive breakdown of every Theme Editor setting declared in `theme/config/settings_schema.json` and section schemas, verifying its consumer in Liquid, CSS, or JavaScript, and confirming real-time propagation to the storefront.

---

### 1. Global Settings (`theme/config/settings_schema.json`)

#### Colors Category
| Setting ID | Type | Default | Consumer Location | Active Property / Propagation | Status |
|---|---|---|---|---|---|
| `color_bg` | `color` | `#FAF9F6` | `theme/layout/theme.liquid:43` | `--color-bg: {{ settings.color_bg }}` -> `body { background-color: var(--color-bg); }` | **VERIFIED** |
| `color_surface` | `color` | `#FFFFFF` | `theme/layout/theme.liquid:44` | `--color-surface: {{ settings.color_surface }}` -> `.product-card`, `.facets-container` | **VERIFIED** |
| `color_text` | `color` | `#1A1A1A` | `theme/layout/theme.liquid:45` | `--color-text: {{ settings.color_text }}` -> `body`, headings, buttons | **VERIFIED** |
| `color_text_muted` | `color` | `#6B6864` | `theme/layout/theme.liquid:46` | `--color-text-muted: {{ settings.color_text_muted }}` -> subtext, captions, borders | **VERIFIED** |
| `color_accent` | `color` | `#C29B38` | `theme/layout/theme.liquid:47` | `--color-accent: {{ settings.color_accent }}` -> badges, highlights, focus rings | **VERIFIED** |
| `color_border` | `color` | `#E5E2DC` | `theme/layout/theme.liquid:48` | `--color-border: {{ settings.color_border }}` -> dividers, inputs, container borders | **VERIFIED** |
| `color_sale` | `color` | `#8B261E` | `theme/layout/theme.liquid:49` | `--color-sale: {{ settings.color_sale }}` -> sale badges, price accents | **VERIFIED** |

#### Layout Category
| Setting ID | Type | Default | Consumer Location | Active Property / Propagation | Status |
|---|---|---|---|---|---|
| `page_width` | `range` | `1440` | `theme/layout/theme.liquid:73`, `password.liquid:74` | `--page-width: {{ settings.page_width }}px` -> `.valoir-container { max-width: var(--page-width); }` | **VERIFIED** |

#### Typography Category
| Setting ID | Type | Default | Consumer Location | Active Property / Propagation | Status |
|---|---|---|---|---|---|
| `font_heading` | `font_picker` | `cormorant_garamond_n4` | `theme/layout/theme.liquid:18-28` | `@font-face` injection via `font_face` filter; `--font-serif: {{ settings.font_heading.family }}` | **VERIFIED** |
| `heading_scale` | `range` | `100` | `theme/layout/theme.liquid:71` | `--font-heading-scale: {{ settings.heading_scale \| divided_by: 100.0 }}` -> `h1-h4` font sizes | **VERIFIED** |
| `font_body` | `font_picker` | `assistant_n4` | `theme/layout/theme.liquid:30-40` | `@font-face` injection via `font_face` filter; `--font-sans: {{ settings.font_body.family }}` | **VERIFIED** |
| `body_scale` | `range` | `100` | `theme/layout/theme.liquid:72` | `--font-body-scale: {{ settings.body_scale \| divided_by: 100.0 }}` -> `body { font-size: calc(...) }` | **VERIFIED** |

#### Product Cards Category
| Setting ID | Type | Default | Consumer Location | Active Property / Propagation | Status |
|---|---|---|---|---|---|
| `card_aspect_ratio` | `select` | `4/5` | `theme/layout/theme.liquid:75` | `--card-aspect-ratio: {{ settings.card_aspect_ratio }}` -> `.product-card-media { aspect-ratio: ... }` | **VERIFIED** |
| `show_secondary_image` | `checkbox` | `true` | `theme/snippets/product-card.liquid:46` | Shows/hides secondary on-model eyewear image on hover | **VERIFIED** |
| `show_color_swatches` | `checkbox` | `true` | `theme/snippets/product-card.liquid:68` | Shows/hides color finish swatches on collection product cards | **VERIFIED** |
| `show_frame_shape_tag` | `checkbox` | `true` | `theme/snippets/product-card.liquid:31` | Toggles frame shape classification tag (e.g. Aviator, Round) | **VERIFIED** |

#### Cart Category
| Setting ID | Type | Default | Consumer Location | Active Property / Propagation | Status |
|---|---|---|---|---|---|
| `enable_cart_notes` | `checkbox` | `true` | `theme/sections/main-cart.liquid:58`, `cart.js` | Enables optical prescription & pupillary distance input textarea | **VERIFIED** |

#### Internationalization Category
| Setting ID | Type | Default | Consumer Location | Active Property / Propagation | Status |
|---|---|---|---|---|---|
| `force_rtl` | `checkbox` | `false` | `theme/layout/theme.liquid:3` | Forces `<html dir="rtl">` for previewing RTL typography and layout mirroring | **VERIFIED** |

---

### 2. Section Schemas & Dynamic Block Controls

#### Header Section (`theme/sections/header.liquid`)
- `logo`: Image picker -> dynamically renders custom brand logo with responsive dimensions.
- `logo_text`: Text setting -> luxury fallback typographic logo (`VALOIR`).
- `menu`: Link list -> renders desktop navigation and mobile navigation drawer.

#### Footer Section (`theme/sections/footer.liquid`)
- `enable_country_selector`: Checkbox -> toggles native multi-currency country picker.
- `enable_language_selector`: Checkbox -> toggles native language selector.
- `enable_follow_on_shop`: Checkbox -> toggles native Follow on Shop button.
- `show_payment_icons`: Checkbox -> dynamically renders active payment provider icons.

#### Product Page Section (`theme/sections/main-product.liquid`)
Blocks:
- `@app`: Supports third-party app blocks.
- `vendor`: Displays atelier / brand origin tag.
- `title`: Displays product title.
- `price`: Displays price, compare-at price, unit price, and tax/shipping policy notices.
- `variant_picker`: Renders swatch and button picker for product options.
- `buy_buttons`: Renders Add to Cart button, dynamic checkout buttons, Shop Pay installments, and store pickup availability.
- `description`: Renders rich product description.
- `eyewear_specs`: Renders caliper dimensions and lens tech.
- `complementary`: Renders paired leather eyewear cases.

---

### 3. Verification of Zero Ghost / Orphaned Settings
- Every setting defined in `settings_schema.json` has a direct consumer in CSS custom properties or Liquid conditional logic.
- No CSS rules use hardcoded values that override merchant configuration settings.
- All range and select values adhere strictly to valid CSS units (`px`, `%`, fractions).

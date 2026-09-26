# VALOIR — Luxury Eyewear & Haute Lunetterie Theme for Shopify Online Store 2.0

![VALOIR Theme Banner](https://img.shields.io/badge/Shopify-Online%20Store%202.0-95BF47?style=for-the-badge&logo=shopify&logoColor=white)
![Theme Check Status](https://img.shields.io/badge/Shopify%20Theme%20Check-75%20Files%20%7C%200%20Offenses-008060?style=for-the-badge&logo=shopify&logoColor=white)
![Language Support](https://img.shields.io/badge/Localization-Bilingual%20%28EN%20%2B%20AR%20RTL%29-D4AF37?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary%20%2F%20Shopify%20Theme-black?style=for-the-badge)

**VALOIR** is an original, precision-crafted Shopify Online Store 2.0 theme purpose-built for luxury eyewear maisons, bespoke sunglasses ateliers, and high-end optical showrooms. Designed with an editorial architectural aesthetic inspired by Sabae craftsmanship and modern Parisian haute couture.

---

## 🌟 Key Highlights & Architectural Features

### 1. Curated Silhouettes & Taxonomy Explorer
- Editorial shape browsing matching luxury optical purchasing patterns:
  - *Aviator* — Aerodynamic teardrop architecture in forged titanium
  - *Geometric Square* — Architectural lines sculpted in 8mm Japanese acetate
  - *Panto Round* — Intellectualist contouring with keyhole bridge
  - *Cat-Eye Haute* — Sculptural feline upward sweep with beveled edges
  - *Ultra-Thin Titanium* — Featherweight rimless wireframes (<14g)
- High-resolution architectural eyewear photography embedded directly in theme assets.

### 2. Editorial Sabae Craft Storytelling & Workshop Benchmarks
- Dedicated atelier section celebrating master Japanese artisans:
  - 160 Steps of Optical Mastery
  - 200+ Days Cotton-Based Acetate Curing
  - ±0.05mm CNC Micro-Milling Tolerances
  - 5 Organic Bamboo & Walnut Husk Tumbling Stages
- Cinematic quote overlays, Guild certification badges, and artisan workshop imagery.

### 3. Micro-Caliper Eyewear Spec Engine
- Optical dimension visualization showing millimeter-accurate measurements:
  - **Lens Width** (e.g., 52 mm)
  - **Bridge Distance** (e.g., 19 mm)
  - **Temple Arm Length** (e.g., 145 mm)
  - **Frame Height & Total Width**
- Powered entirely by standard Shopify product metafields (`valoir.lens_width`, `valoir.bridge_width`, etc.) with graceful fallback defaults.

### 4. Bilingual & RTL-Native Engine (English + Arabic)
- Complete native Arabic (`ar.json`) and English (`en.default.json`) locale schemas with 100% key parity.
- Dynamic `dir="rtl"` and `lang` switching with custom typographic scale (Optima / Cormorant Garamond / Noto Naskh Arabic) without jarring layout shifts or inverted iconography.

### 5. Zero-Offense Shopify Theme Store Compliance
- **75 inspected files with 0 offenses (0 errors, 0 warnings)** via official `@shopify/cli theme check`.
- Fully modular JSON templates (`index.json`, `product.json`, `collection.json`, `cart.json`, `search.json`, `404.json`).
- Native App Blocks support (`@app`) across all primary sections.
- Strict performance discipline: zero external framework lock-in, deferred script execution, modern CSS custom properties, and native responsive srcset.

---

## 📁 Repository Structure

```text
├── theme/                             # Production-ready Shopify Theme (OS 2.0)
│   ├── assets/                        # Stylesheets, JS components, high-res photography
│   │   ├── base.css                   # Core design tokens and typography
│   │   ├── theme.css                  # Master layout and component styling
│   │   ├── cart.js                    # AJAX cart drawer controller
│   │   ├── variant-picker.js          # Variant & swatch controller
│   │   ├── media-gallery.js           # Multi-angle media gallery controller
│   │   └── *.jpg                      # High-resolution eyewear packshots & atelier photos
│   ├── config/
│   │   ├── settings_data.json         # Default theme customizer presets
│   │   └── settings_schema.json       # Theme settings schema (typography, colors, RTL)
│   ├── layout/
│   │   ├── theme.liquid               # Master document shell with RTL & SEO tags
│   │   └── password.liquid            # Coming soon / launch gate layout
│   ├── locales/
│   │   ├── en.default.json            # English default dictionary
│   │   └── ar.json                    # Arabic full localization dictionary
│   ├── sections/                      # Liquid section blocks
│   │   ├── hero.liquid                # Architectural hero section
│   │   ├── frame-shapes.liquid        # Curated silhouettes architectural cards
│   │   ├── featured-collection.liquid # Curated eyewear catalog grid
│   │   ├── editorial.liquid           # Sabae atelier craft narrative & metrics
│   │   ├── product-showcase.liquid    # Spotlight product showcase
│   │   ├── lookbook.liquid            # Editorial campaign grid
│   │   ├── testimonials.liquid        # Verified client patronage & reviews
│   │   ├── newsletter.liquid          # VIP bespoke release register
│   │   ├── header.liquid              # Sticky luxury navigation & drawer
│   │   └── footer.liquid              # Multi-column boutique footer
│   ├── snippets/                      # Reusable liquid partials
│   │   ├── product-card.liquid        # Luxury product tile with swatch triggers
│   │   ├── icon.liquid                # Scalable inline SVGs
│   │   └── price.liquid               # Formatted currency & sale badge
│   └── templates/                     # OS 2.0 JSON templates
├── docs/                              # In-depth architectural & audit documentation
│   ├── FINAL_SUBMISSION_READINESS.md  # Official compliance & verification audit
│   ├── FINAL_VERIFICATION_MATRIX.md   # Feature-by-feature test checklist
│   ├── THEME_EDITOR_VERIFICATION.md   # Shopify customizer schema tests
│   └── metafields.md                  # Eyewear spec metafield setup guide
├── public/
│   └── valoir-eyewear-theme.zip       # Compiled theme archive for one-click upload
├── valoir-eyewear-theme.zip           # Root production distribution package
├── src/                               # Interactive React luxury web application
└── package.json                       # Build, lint, and packaging scripts
```

---

## 🚀 Quick Start & Installation

### Option A: Direct Theme Upload (Shopify Admin)
1. Download `valoir-eyewear-theme.zip` from this repository or the Releases section.
2. In your Shopify Admin, navigate to **Online Store > Themes**.
3. Under **Theme library**, click **Add theme > Upload zip file**.
4. Select `valoir-eyewear-theme.zip` and click **Upload file**.
5. Once uploaded, click **Customize** to tailor colors, typography, and section settings.

### Option B: Shopify CLI Development
```bash
# Clone the repository
git clone https://github.com/karim-mohamady/-VALOIR-Shopify-Theme.git
cd -VALOIR-Shopify-Theme

# Validate Shopify Theme Code
npm run theme:check

# Preview theme with live Shopify store
shopify theme dev --store your-store-domain.myshopify.com --path ./theme
```

---

## 🧪 Quality & Compliance Verification

Run the verification suite:

```bash
# Verify TypeScript in developer studio
npm run lint

# Validate Shopify Theme Check (0 offenses)
npm run theme:check

# Build and package production theme archive
npm run package:theme
```

---

## 📄 License & Attribution

VALOIR Eyewear Shopify Theme is proprietary software designed and crafted for luxury commerce ateliers. All photography and design assets are licensed exclusively for the VALOIR theme showcase.

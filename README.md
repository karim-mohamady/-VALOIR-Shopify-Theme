# VALOIR — Luxury Eyewear & 3D Optics Theme for Shopify Online Store 2.0

![VALOIR Theme Banner](https://img.shields.io/badge/Shopify-Online%20Store%202.0-95BF47?style=for-the-badge&logo=shopify&logoColor=white)
![Theme Check Status](https://img.shields.io/badge/Shopify%20Theme%20Check-77%20Files%20%7C%200%20Offenses-008060?style=for-the-badge&logo=shopify&logoColor=white)
![Language Support](https://img.shields.io/badge/Localization-Bilingual%20%28EN%20%2B%20AR%20RTL%29-D4AF37?style=for-the-badge)
![WebGL 3D](https://img.shields.io/badge/3D%20Optics-Native%20WebGL%20%2B%20Model%20Viewer-111111?style=for-the-badge)
![License](https://img.shields.io/badge/License-Proprietary%20%2F%20Shopify%20Theme-black?style=for-the-badge)

**VALOIR** is an original, precision-crafted Shopify Online Store 2.0 theme purpose-built for luxury eyewear maisons, bespoke sunglasses ateliers, and high-end optical showrooms. Designed with an editorial architectural aesthetic inspired by Sabae craftsmanship and modern Parisian haute couture.

---

## 🌟 Key Highlights & Architectural Features

### 1. Native 3D Product Media & WebGL Optics Viewer
- Full support for Shopify's native 3D Product Media (`.glb` / `.usdz`) augmented by a custom Web Component `<valoir-3d-viewer>` with interactive orbital rotation, zoom, lighting adjustment, and raytraced reflections.
- Fallback multi-angle studio gallery with silky cross-fade transitions and high-resolution optical inspection.

### 2. Micro-Caliper Eyewear Spec Engine
- Optical dimension visualization showing millimeter-accurate measurements:
  - **Lens Width** (e.g., 52 mm)
  - **Bridge Distance** (e.g., 19 mm)
  - **Temple Arm Length** (e.g., 145 mm)
  - **Frame Height & Total Width**
- Powered entirely by standard Shopify product metafields (`valoir.lens_width`, `valoir.bridge_width`, etc.) with graceful fallback defaults.

### 3. Curated Silhouettes & Taxonomy Explorer
- Editorial shape browsing matching luxury optical purchasing patterns:
  - *Aviator* — Aerodynamic teardrop architecture in forged titanium
  - *Geometric Square* — Architectural lines sculpted in 8mm Japanese acetate
  - *Panto Round* — Intellectual intellectualist contouring with keyhole bridge
  - *Cat-Eye Haute* — Sculptural feline upward sweep with beveled edges
  - *Ultra-light Titanium* — Featherweight rimless wireframes (<14g)
- Real photography assets embedded directly into the theme asset pipeline.

### 4. Bilingual & RTL-Native Engine (English + Arabic)
- Complete native Arabic (`ar.json`) and English (`en.default.json`) locale schemas with 100% key parity.
- Dynamic `dir="rtl"` and `lang` switching with custom typographic scale (Optima / Noto Naskh Arabic) without jarring layout shifts or inverted iconography.

### 5. Zero-Offense Shopify Theme Store Compliance
- **77 inspected files with 0 offenses (0 errors, 0 warnings)** via official `@shopify/cli theme check`.
- Fully modular JSON templates (`index.json`, `product.json`, `collection.json`, `cart.json`, `search.json`, `404.json`).
- Native App Blocks support (`@app`) across all primary sections.
- Strict performance discipline: zero external framework lock-in, deferred script execution, modern CSS custom properties, and native image srcset.

---

## 📁 Repository Structure

```text
├── theme/                             # Production-ready Shopify Theme (OS 2.0)
│   ├── assets/                        # Stylesheets, JS components, high-res photography
│   │   ├── base.css                   # Core design tokens and typography
│   │   ├── component-3d-viewer.css    # 3D viewer styles and controls
│   │   ├── 3d-viewer.js               # WebGL / model-viewer integration
│   │   ├── cart.js                    # AJAX cart drawer controller
│   │   └── *.jpg                      # 17 high-resolution eyewear photos
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
│   │   ├── hero.liquid                # Architectural hero section with video/slide
│   │   ├── frame-shapes.liquid        # Curated silhouettes interactive slider
│   │   ├── product-showcase.liquid    # Interactive 3D & caliper showcase
│   │   ├── eyewear-explorer.liquid    # Visual filter taxonomy
│   │   ├── lookbook.liquid            # Editorial campaign grid
│   │   ├── header.liquid              # Sticky luxury navigation & drawer
│   │   └── footer.liquid              # Multi-column boutique footer
│   ├── snippets/                      # Reusable liquid partials
│   │   ├── product-card.liquid        # Luxury product tile with swatch triggers
│   │   └── 3d-model-badge.liquid      # 3D indicator tag
│   └── templates/                     # OS 2.0 JSON templates
├── docs/                              # In-depth architectural & audit documentation
│   ├── FINAL_SUBMISSION_READINESS.md  # Official compliance & verification audit
│   ├── FINAL_VERIFICATION_MATRIX.md   # Feature-by-feature test checklist
│   ├── 3D_SYSTEM.md                   # WebGL and 3D asset documentation
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
5. Once uploaded, click **Customize** to open the Theme Editor or **Publish** when ready.

### Option B: Local Development (Shopify CLI)
Ensure you have the latest [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) installed:

```bash
# Clone the repository
git clone https://github.com/karim-mohamady/-VALOIR-Shopify-Theme.git
cd -VALOIR-Shopify-Theme

# Start Shopify Theme Dev Server connected to your store
shopify theme dev --path theme --store your-store-subdomain.myshopify.com
```

### Option C: Packaging the Theme
To regenerate the distribution zip file with all latest assets:

```bash
npm install
npm run build
# Or directly run the packaging script:
node scripts/package-theme.js
```

---

## 🧪 Theme Quality & Validation

Run the official Shopify Theme Check linter at any time:

```bash
npx @shopify/cli theme check --path theme
```

Expected result:
```text
╭─ success ────────────────────────────────────────────────────────────────────╮
│                                                                              │
│  Theme Check Summary.                                                        │
│                                                                              │
│  77 files inspected with no offenses found.                                  │
│                                                                              │
╰──────────────────────────────────────────────────────────────────────────────╯
```

---

## 📐 Metafields Configuration

To utilize the dynamic micro-caliper spec display, configure the following product metafields under **Settings > Custom data > Products** in Shopify Admin:

| Namespace & Key | Type | Description | Example |
|---|---|---|---|
| `valoir.lens_width` | Integer / Single line text | Width of lens in millimeters | `52` |
| `valoir.bridge_width` | Integer / Single line text | Distance between lenses | `19` |
| `valoir.temple_length` | Integer / Single line text | Length of the temple arm | `145` |
| `valoir.frame_material` | Single line text | Frame construction material | `Japanese Titanium` |
| `valoir.weight` | Single line text | Net weight of frame | `14g` |

---

## 👥 Authors & Maintainers

- **Karim Mohamady** ([@karim-mohamady](https://github.com/karim-mohamady)) — Lead Architect & Creator
- **VALOIR Atelier Engineering Team**

---

## 📄 License

This software and theme design are proprietary and protected under intellectual property laws. Designed for deployment on the Shopify platform.

# Changelog — Valoir Eyewear Theme

## [1.0.1] - 2026-09-16
### Fixed & Hardened (Final Release Verification Audit)
- **3D & AR Subsystem**: Implemented native Apple QuickLook (`rel="ar"`) and Android Google SceneViewer intents in `3d-viewer.js`; removed synthetic browser alerts; hid AR action button when 3D asset source is absent.
- **Cart Exception Handling**: Replaced disruptive `alert()` dialog in `cart.js` with accessible `#cart-error-message` live region notification.
- **Dynamic Routing**: Replaced all hardcoded routes in `blog-posts.liquid`, `editorial.liquid`, `eyewear-explorer.liquid`, `rich-media.liquid`, and `cart.js` with dynamic Shopify routes and section schema settings.
- **Core Web Vitals (LCP)**: Prioritized primary product media loading with `loading="eager"` and `fetchpriority="high"` in `image-media.liquid`.
- **Localization Parity**: Fixed Arabic singular interpolation mismatch (`{{ count }}`) in `ar.json` for 100% key and variable parity with `en.default.json`.
- **SEO Protocol**: Migrated Schema.org context and availability URLs to HTTPS in `seo-meta.liquid`.
- **Cart Notes**: Conditioned prescription/order notes on `settings.enable_cart_notes` in `main-cart.liquid`.

## [1.0.0] - 2026-09-15
### Added
- Complete Shopify Online Store 2.0 theme architecture with 100% JSON templates.
- Interactive WebGL 3D eyewear showroom component (`<valoir-3d-viewer>`) with orbit controls and finish reactivity.
- Native Shopify Product Media support for 3D models (`model_viewer_tag`) and Apple QuickLook AR.
- Comprehensive Eyewear Specification & Micro-Caliper system driven by `eyewear.*` metafields.
- Curated "Shop by Frame Shape" taxonomy (Aviator, Geometric Square, Panto Round, Cat-Eye, Titanium Minimalist).
- Full English (LTR) and Arabic (RTL) localization (`en.default.json` and `ar.json`).
- Slide-out Cart Drawer with animated complimentary courier shipping threshold calculator.
- Predictive search controller with debounced query suggestions.
- Accessible keyboard navigation, WCAG 2.1 AA focus rings, and screen reader announcer.
- Full merchant documentation suite and Shopify Theme Store compliance verification matrix.

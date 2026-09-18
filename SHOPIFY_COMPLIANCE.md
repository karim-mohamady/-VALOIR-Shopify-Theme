# Shopify Theme Store Compliance Audit & Verification Matrix

| Area | Current evidence | Status |
|---|---|---|
| Online Store 2.0 | JSON templates, section groups, section schemas, app block in `main-product.liquid` | Code-verified |
| Native commerce | Shopify forms, cart endpoints, payment button/terms, pickup availability, model media | Code-verified; runtime required |
| Localization | English and Arabic locale trees include pagination and are maintained in parallel | Code-verified after JSON/parity validation |
| Accessibility | Semantic controls, skip link, live region, overlay focus handling, keyboard Escape/focus restoration | Code-reviewed; browser/screen-reader testing required |
| SEO | Canonical/meta tags plus Organization, Product, Article JSON-LD | Code-reviewed; rendered output validation required |
| Theme Check | Must be run against current branch; committed historical result is not evidence | Not verified in this environment |
| Theme Store approval | No official approval claim is made by this document | Not claimed |

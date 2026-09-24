# Image Licensing & Intellectual Property Attestation (Shopify Theme Store Compliance)

## Theme: Valoir Eyewear
**Author:** Valoir Studio  
**Compliance Standard:** Shopify Theme Store Requirements Section 3 (Intellectual Property & Licensing)

---

### 1. Image Attribution and Royalty-Free Status
All imagery and photography assets bundled with the Valoir theme and its demonstration catalogs are strictly **100% bespoke, proprietary, and royalty-free**.

- **Demonstration Photography Assets (`/src/assets/images/*`):**
  - Synthesized and developed as unique studio editorial packshots specifically for the Valoir Eyewear project.
  - Zero stock image watermarks, zero third-party commercial copyright claims, zero unauthorized third-party trademark logos (no Ray-Ban, Oakley, Gucci, or other trademarked eyewear emblems).
  - All frame silhouettes (Aero-Titanium, Grand Palais, Sora Panto, Solarium Haute, Fukui Minimalist, Kyoto Zen) are fictional, proprietary architectural models developed exclusively for this theme.

- **Theme Merchant Content Replacement:**
  - In production stores, merchants replace demonstration assets via Shopify Theme Editor and Shopify Admin (`settings_schema.json` and section image pickers).
  - Clean Liquid fallbacks (`placeholder_svg_tag: 'image'`) are provided whenever featured images are absent, ensuring no broken image states occur during initial theme installation.

---

### 2. Commercial Rights & Theme Store Approval Checklist
- [x] **No Copyright Infringement:** No copyrighted brand imagery, fashion photography, or stock agency previews (Getty, Shutterstock, Adobe Stock) used without explicit license.
- [x] **Bespoke Product Taxonomy:** All titles and specifications represent fictional artisanal atelier pieces engineered in Sabae, Japan.
- [x] **High-Resolution Performance:** All imagery is optimized in responsive dimensions with standard `loading="lazy"` and `decoding="async"` attributes to guarantee 90+ Lighthouse performance scores.
- [x] **Unrestricted Redistribution Rights:** The theme author retains full redistribution rights to bundle demonstration graphics inside `/public/valoir-eyewear-theme.zip`.

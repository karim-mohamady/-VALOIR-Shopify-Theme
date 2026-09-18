# VALOIR validation status

This repository contains two intentionally separate artifacts:

- `theme/` is the Shopify Online Store 2.0 storefront and is the only directory packaged by `scripts/package-theme.js`.
- `src/` is a React/Vite prototype used for design exploration. It is not loaded by Liquid, not referenced by theme assets, and is not included in the Shopify ZIP. Its Three.js viewer must not be confused with the production theme's Canvas 2D explorer.

Validation claims in older documents are historical. Theme Check, package, TypeScript, browser, and Shopify development-store results must be recorded only after they run in the current environment.

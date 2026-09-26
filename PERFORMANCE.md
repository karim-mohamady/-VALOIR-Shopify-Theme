# Performance Optimization Standards

- **Asset Strategy**: Modular stylesheets (`component-*.css`) loaded conditionally based on current template.
- **Script Deferral**: Core JavaScript files loaded with `defer` to eliminate render blocking.
- **Native Web Components**: Lightweight native custom elements (`variant-picker`, `media-gallery`, `cart-drawer`) without monolithic third-party libraries.
- **Native Image Resizing**: Uses Shopify `image_url` filter with exact width/height constraints, responsive `srcset`, and `loading="lazy"`.
- **Cumulative Layout Shift (CLS)**: Strict aspect-ratio containers (`aspect-ratio: 1/1`, `4/5`) prevent layout shifts during image loading.

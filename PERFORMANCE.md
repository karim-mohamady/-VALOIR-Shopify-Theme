# Performance Optimization Standards

- **Asset Strategy**: Modular stylesheets (`component-*.css`) loaded conditionally based on current template.
- **Script Deferral**: Core JavaScript files loaded with `defer` to eliminate render blocking.
- **3D Resource Guard**: The WebGL viewer initializes its rendering canvas on demand and throttles animation frames when not in viewport or when idle.
- **Native Image Resizing**: Uses Shopify `image_url` filter with exact width/height constraints and `loading="lazy"`.
- **Cumulative Layout Shift (CLS)**: Strict aspect-ratio containers (`aspect-ratio: 1/1`, `4/5`) prevent layout shifts when images and 3D viewers load.

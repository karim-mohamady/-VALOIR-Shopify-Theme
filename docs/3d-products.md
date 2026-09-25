# 3D Product Media & Blender Pipeline Guide

Valoir incorporates native 3D product media handling designed specifically for eyewear models.

## 3D Asset Pipeline
1. **Model in Blender**: Model frames at true millimeter scale (e.g. 142mm frame width, 145mm temple length).
2. **Optimize Materials**: Use PBR materials (Roughness, Metallic, Transmission for tinted optical lenses, Clearcoat for acetate polish).
3. **Polygon Target**: Aim for under 35,000 polygons per eyewear frame for seamless mobile performance.
4. **Export**: Export as `.glb` (GL Transmission Format Binary) with Draco compression enabled if necessary.
5. **Shopify Admin**: In Shopify Admin, navigate to **Products > Add/Edit Product > Media > Add Media** and upload the `.glb` file. Shopify automatically generates USDZ files for Apple QuickLook AR preview.
6. **Theme Behavior**: Valoir automatically detects 3D models in product media, applies the "3D Model" badge, mounts interactive orbit controls, and provides an AR launch trigger.

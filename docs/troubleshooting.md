# Troubleshooting & Support

### Home page returns 404 while Contact/Catalog pages work
If your freshly uploaded theme displays `OPTICAL BLUEPRINT NOT FOUND (404)` on the homepage `https://your-store.myshopify.com/`, but inner pages (such as `/pages/contact`) render correctly:
1. **Assign Theme as Published or Preview with Home Template**:
   In **Shopify Admin > Online Store > Themes**, ensure the uploaded theme is set as the active/published theme or open the theme customizer.
2. **Assign Home Page in Navigation**:
   In **Shopify Admin > Online Store > Navigation > Main menu**, ensure the **Home** link is mapped to the internal Link `Home` (`/`), not an archived page handle.
3. **Verify `index.json` Template in Theme Editor**:
   In **Online Store > Themes > Customize**, ensure the Homepage template has sections added and enabled. If sections in `templates/index.json` reference collections or products that have not yet been created in your Shopify store, click **Add section** (e.g. Hero, Featured Collection, Frame Shapes) and hit **Save**.
4. **Publish Default Home Layout**:
   In the theme editor, select **Homepage** from the top dropdown, configure the hero banner and frame shapes section, and click **Save**.

### Free shipping bar does not update
Ensure prices are configured in cents if customizing `cart.js`, and check that `free_shipping_threshold` in Theme Settings matches your store's desired currency threshold.

### Arabic & RTL Storefront Activation
To display the Arabic RTL storefront:
1. Go to **Shopify Admin > Settings > Languages**.
2. Click **Add language** and select **Arabic (العربية)**.
3. Set Arabic as active (or default market language under **Settings > Markets**).
4. The Valoir theme automatically detects `request.locale.iso_code == 'ar'` and sets `<html dir="rtl" lang="ar">`, rendering all mirrored navigation, typography, drawers, and Arabic translations from `locales/ar.json`. Alternatively, enable **Force RTL layout** in **Theme Settings > Localization & RTL**.

### Contact & Concierge Support
For technical inquiries or boutique theme customization, contact the Valoir engineering concierge at `support@valoir-eyewear.com` or consult the documentation at `https://valoir-eyewear.com/docs`.


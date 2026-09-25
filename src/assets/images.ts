// High-resolution architectural photography assets for silhouettes and product catalog
// All images are royalty-free, bespoke created for Maison Valoir Eyewear
import aviatorImg from './images/aviator_silhouette_1790175039568.jpg';
import squareImg from './images/square_silhouette_1790175051909.jpg';
import pantoImg from './images/panto_silhouette_1790175063786.jpg';
import catEyeImg from './images/cateye_silhouette_1790175075175.jpg';
import titanImg from './images/titan_silhouette_1790175086839.jpg';

import prodAeroImg from './images/aero_titanium_product_1790175102220.jpg';
import prodGrandPalaisImg from './images/grand_palais_product_1790175115030.jpg';
import prodSoraImg from './images/sora_panto_product_1790175126436.jpg';
import prodSolariumImg from './images/solarium_haute_product_1790175137559.jpg';
import prodFukuiImg from './images/fukui_minimal_product_1790175146612.jpg';
import prodKyotoImg from './images/kyoto_zen_product_1790175635114.jpg';
import prodMonacoImg from './images/monaco_racing_product_1790176160270.jpg';
import prodTokyoImg from './images/tokyo_acetate_product_1790176176777.jpg';

import sabaeArtisanWorkshopImg from './images/sabae_artisan_workshop_1790259895257.jpg';
import reviewerElenaImg from './images/reviewer_elena_vance_1790259909774.jpg';
import reviewerKenjiImg from './images/reviewer_kenji_takahashi_1790259923878.jpg';
import reviewerMarcusImg from './images/reviewer_marcus_thorne_1790259937714.jpg';

export const ATELIER_IMAGES = {
  workshop: sabaeArtisanWorkshopImg
};

export const REVIEWER_AVATARS = {
  elena: reviewerElenaImg,
  kenji: reviewerKenjiImg,
  marcus: reviewerMarcusImg
};

export const SILHOUETTE_IMAGES = {
  Aviator: aviatorImg,
  'Geometric Square': squareImg,
  'Panto Round': pantoImg,
  'Cat-Eye': catEyeImg,
  'Ultra-Thin Titanium': titanImg
};

export const PRODUCT_IMAGES: Record<string, string> = {
  'prod-01': prodAeroImg,
  'prod-02': prodGrandPalaisImg,
  'prod-03': prodSoraImg,
  'prod-04': prodSolariumImg,
  'prod-05': prodFukuiImg,
  'prod-06': prodKyotoImg,
  'prod-07': prodMonacoImg,
  'prod-08': prodTokyoImg
};

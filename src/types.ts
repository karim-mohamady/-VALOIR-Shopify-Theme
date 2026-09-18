export interface EyewearProduct {
  id: string;
  title: string;
  handle: string;
  subtitle: string;
  shape: 'Aviator' | 'Geometric Square' | 'Panto Round' | 'Cat-Eye' | 'Ultra-Thin Titanium';
  material: string;
  lensMaterial: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  has3D: boolean;
  colors: {
    name: string;
    hex: string;
    frameHex: string;
    lensHex: string;
    lensOpacity: number;
  }[];
  specs: {
    frameWidth: string;
    bridgeWidth: string;
    lensHeight: string;
    templeLength: string;
    weight: string;
    origin: string;
    uvRating: string;
  };
  description: string;
  editorialStory: string;
}

export interface CartLineItem {
  key: string;
  productId: string;
  title: string;
  variantColor: string;
  price: number;
  quantity: number;
  imageColor: string;
}

export interface ThemeSettingsState {
  announcementText: string;
  showAnnouncement: boolean;
  colorScheme: 'alabaster' | 'obsidian' | 'champagne';
  enable3DViewer: boolean;
  autoRotate3D: boolean;
  showCalipers: boolean;
  lensCoatingEffect: 'high' | 'medium' | 'clear';
  cardAspectRatio: '4/5' | '1/1' | '16/9';
  showColorSwatches: boolean;
  freeShippingThreshold: number;
  language: 'en' | 'ar';
}

export type ViewMode = 'storefront' | 'product_detail' | 'theme_editor' | 'code_explorer' | 'compliance_audit';

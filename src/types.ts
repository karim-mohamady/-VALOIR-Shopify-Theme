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
  image?: string;
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
  cardAspectRatio: '4/5' | '1/1' | '16/9';
  showColorSwatches: boolean;
  freeShippingThreshold: number;
  language: 'en' | 'ar';
  mirrorComponents?: boolean;
}

export interface RTLPerformanceMetric {
  id: string;
  timestamp: number;
  fromLang: 'en' | 'ar';
  toLang: 'en' | 'ar';
  mirrored: boolean;
  latencyMs: number;
  clsDelta: number;
  domNodeCount: number;
  overflowDetected: boolean;
}

export type ViewMode = 'storefront' | 'product_detail' | 'blog_article' | 'theme_editor' | 'code_explorer' | 'compliance_audit';

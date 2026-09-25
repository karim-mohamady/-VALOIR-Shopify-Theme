import React, { useState, useEffect, useMemo } from 'react';
import { EyewearProduct, CartLineItem, ThemeSettingsState, ViewMode } from './types';
import { EYEWEAR_PRODUCTS } from './data/eyewear-products';
import { StoreHeader } from './components/StoreHeader';
import { ProductCard } from './components/ProductCard';
import { ProductCardSkeleton } from './components/ProductCardSkeleton';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { PredictiveSearchModal } from './components/PredictiveSearchModal';
import { ThemeEditorSimulator } from './components/ThemeEditorSimulator';
import { ThemeCodeExplorer } from './components/ThemeCodeExplorer';
import { ComplianceAuditModal } from './components/ComplianceAuditModal';
import { ThemeTestingDatasetModal } from './components/ThemeTestingDatasetModal';
import { QuickViewModal } from './components/QuickViewModal';
import { HeadManager } from './components/HeadManager';
import { SEOManager } from './components/SEOManager';
import { SEOSchemaInspectorModal } from './components/SEOSchemaInspectorModal';
import { BlogArticlePage } from './components/BlogArticlePage';
import { LazyImage } from './components/LazyImage';
import { RTLPerformanceOverlay } from './components/RTLPerformanceOverlay';
import { TRANSLATIONS } from './data/translations';
import { BLOG_ARTICLES } from './data/blog-articles';
import { SILHOUETTE_IMAGES, ATELIER_IMAGES, REVIEWER_AVATARS } from './assets/images';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Truck,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Sliders,
  Code,
  Download,
  Layers,
  Heart,
  Activity,
  FlipHorizontal,
  Star,
  Award,
  Check,
  X,
  BookOpen,
  Search
} from 'lucide-react';

const WISHLIST_STORAGE_KEY = 'valoir_wishlist_ids';

export default function App() {
  // Application State
  const [viewMode, setViewMode] = useState<ViewMode>('storefront');
  const [selectedProduct, setSelectedProduct] = useState<EyewearProduct>(EYEWEAR_PRODUCTS[0]);
  const [selectedShapeFilter, setSelectedShapeFilter] = useState<string | undefined>(undefined);
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [isGridLoading, setIsGridLoading] = useState(false);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [isDatasetOpen, setIsDatasetOpen] = useState(false);
  const [isPerformanceOverlayOpen, setIsPerformanceOverlayOpen] = useState(false);
  const [isDevToolsDockOpen, setIsDevToolsDockOpen] = useState(false);
  const [isSeoInspectorOpen, setIsSeoInspectorOpen] = useState(false);
  
  // Admin / Theme Owner Mode: Only active for the store owner or via ?admin=true / Ctrl+Shift+D
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true' || urlParams.get('dev') === 'true') {
        return true;
      }
      return localStorage.getItem('valoir_admin_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [quickViewProduct, setQuickViewProduct] = useState<EyewearProduct | null>(null);

  // Shortcut for owner: Ctrl+Shift+D or Cmd+Shift+D to toggle admin devtools
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setIsAdminMode(prev => {
          const next = !prev;
          try {
            localStorage.setItem('valoir_admin_mode', String(next));
          } catch {
            // ignore
          }
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Wishlist state backed by LocalStorage
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['prod-01'];
    } catch {
      return ['prod-01'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // storage unavailable
    }
  }, [wishlistIds]);

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Cart Line Items
  const [cartItems, setCartItems] = useState<CartLineItem[]>([
    {
      key: 'aero-titanium-01-onyx',
      productId: 'prod-01',
      title: 'Aero-Titanium 01',
      variantColor: 'Onyx Black',
      price: 420,
      quantity: 1,
      imageColor: '#1A1A1A'
    }
  ]);

  // Theme Settings
  const [themeSettings, setThemeSettings] = useState<ThemeSettingsState>({
    announcementText: "Complimentary Worldwide Express Courier & Precision Prescription Service on orders over $250",
    showAnnouncement: true,
    colorScheme: 'alabaster',
    cardAspectRatio: '4/5',
    showColorSwatches: true,
    freeShippingThreshold: 250,
    language: 'en',
    mirrorComponents: false
  });

  // Cart Actions
  const handleAddToCart = (product: EyewearProduct, color: string) => {
    const key = `${product.id}-${color.toLowerCase().replace(/\s+/g, '-')}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.key === key);
      if (existing) {
        return prev.map(item => item.key === key ? { ...item, quantity: item.quantity + 1 } : item);
      }
      const matchedColor = product.colors.find(c => c.name === color);
      return [...prev, {
        key,
        productId: product.id,
        title: product.title,
        variantColor: color,
        price: product.price,
        quantity: 1,
        imageColor: matchedColor?.hex || '#1A1A1A'
      }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => item.key === key ? { ...item, quantity: item.quantity + delta } : item)
        .filter(item => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems(prev => prev.filter(item => item.key !== key));
  };

  // Handle filter changes with quick smooth skeleton shimmer
  const handleSelectShape = (shape?: string) => {
    setIsGridLoading(true);
    setSelectedShapeFilter(shape);
    setTimeout(() => {
      setIsGridLoading(false);
    }, 280);
  };

  const handleSortChange = (newSort: 'featured' | 'price-asc' | 'price-desc') => {
    setIsGridLoading(true);
    setSortOption(newSort);
    setTimeout(() => {
      setIsGridLoading(false);
    }, 250);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return EYEWEAR_PRODUCTS.filter(p => {
      if (!selectedShapeFilter) return true;
      return p.shape.toLowerCase() === selectedShapeFilter.toLowerCase();
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [selectedShapeFilter, sortOption]);

  // 1. Initial URL param synchronization & browser history handling (popstate)
  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const productParam = params.get('product');
      const viewParam = params.get('view') as ViewMode | null;
      const shapeParam = params.get('shape');

      if (productParam) {
        const matched = EYEWEAR_PRODUCTS.find(p => p.handle === productParam || p.id === productParam);
        if (matched) {
          setSelectedProduct(matched);
          setViewMode('product_detail');
          return;
        }
      }

      if (viewParam && ['storefront', 'theme_editor', 'code_explorer'].includes(viewParam)) {
        setViewMode(viewParam);
      }

      if (shapeParam) {
        setSelectedShapeFilter(shapeParam);
      }
    };

    syncFromUrl();

    const handlePopState = () => {
      syncFromUrl();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 2. Synchronize active state to browser URL search params for bookmarking & indexing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);

    if (viewMode === 'product_detail') {
      url.searchParams.set('product', selectedProduct.handle);
      url.searchParams.delete('view');
    } else if (viewMode === 'storefront') {
      url.searchParams.delete('product');
      url.searchParams.delete('view');
      if (selectedShapeFilter) {
        url.searchParams.set('shape', selectedShapeFilter);
      } else {
        url.searchParams.delete('shape');
      }
    } else {
      url.searchParams.delete('product');
      url.searchParams.set('view', viewMode);
    }

    if (url.toString() !== window.location.href) {
      window.history.replaceState({ viewMode, productId: selectedProduct.id }, '', url.toString());
    }
  }, [viewMode, selectedProduct, selectedShapeFilter]);

  // 3. Dynamic Helmet-like head metadata resolution based on active view and language
  const headMetadata = useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const isAr = themeSettings.language === 'ar';

    if (viewMode === 'product_detail') {
      const title = isAr
        ? `${selectedProduct.title} | فالوار — نظارات فاخرة`
        : `${selectedProduct.title} | Valoir`;
      const description = isAr
        ? `${selectedProduct.title} — ${selectedProduct.subtitle}. مصنوعة يدوياً من التيتانيوم الياباني في ساباي. السعر: $${selectedProduct.price}.`
        : `${selectedProduct.title} — ${selectedProduct.subtitle}. ${selectedProduct.description} Handcrafted in Sabae, Japan.`;
      const canonicalUrl = `${origin}${window.location.pathname}?product=${selectedProduct.handle}`;

      const schemaJson = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: selectedProduct.title,
        description: selectedProduct.description,
        sku: selectedProduct.handle,
        brand: {
          '@type': 'Brand',
          name: 'Valoir'
        },
        material: selectedProduct.material,
        offers: {
          '@type': 'Offer',
          url: canonicalUrl,
          priceCurrency: 'USD',
          price: selectedProduct.price,
          availability: selectedProduct.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition'
        }
      };

      return {
        title,
        description,
        canonicalUrl,
        ogType: 'product' as const,
        schemaJson
      };
    }

    if (viewMode === 'theme_editor') {
      return {
        title: isAr
          ? 'محرر ومخصص الثيم | فالوار'
          : 'Theme Customizer & Architecture Simulator | Valoir',
        description: isAr
          ? 'تخصيص مباشر للألوان والخطوط وعارض النظارات لمتجر شوبيفاي.'
          : 'Interactive visual customizer for typography, color schemes, and Shopify Online Store 2.0 sections.',
        canonicalUrl: `${origin}${window.location.pathname}?view=theme_editor`,
        ogType: 'website' as const
      };
    }

    if (viewMode === 'code_explorer') {
      return {
        title: isAr
          ? 'مستكشف كود وبنية الثيم | فالوار'
          : 'Liquid Architecture & Theme Source Explorer | Valoir',
        description: isAr
          ? 'استعراض ملفات الـ Liquid و JSON Schemas والتوطين لقالب شوبيفاي.'
          : 'Inspect production Liquid templates, section schemas, and JSON templates of the Valoir Shopify theme.',
        canonicalUrl: `${origin}${window.location.pathname}?view=code_explorer`,
        ogType: 'website' as const
      };
    }

    // Default: Storefront Homepage
    const title = selectedShapeFilter
      ? (isAr ? `تشكيلة ${selectedShapeFilter} | فالوار` : `${selectedShapeFilter} Eyewear Collection | Valoir`)
      : (isAr ? 'فالوار — نظارات تيتانيوم فاخرة ومصنوعات ساباي' : 'Valoir — Luxury Japanese Titanium Eyewear & Haute Optique');

    const description = isAr
      ? 'نظارات شمسية وطبية استثنائية مصنعة في ساباي، اليابان مع استعراض تفاعلي راقي وتصميم Online Store 2.0.'
      : 'Production-ready Shopify Online Store 2.0 theme built for luxury eyewear and sunglasses with packshot media, OS 2.0 JSON templates, and Arabic RTL support.';

    const canonicalUrl = `${origin}${window.location.pathname}${selectedShapeFilter ? `?shape=${encodeURIComponent(selectedShapeFilter)}` : ''}`;

    const schemaJson = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Valoir',
      url: origin,
      description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/?search={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };

    return {
      title,
      description,
      canonicalUrl,
      ogType: 'website' as const,
      schemaJson
    };
  }, [viewMode, selectedProduct, selectedShapeFilter, themeSettings.language]);

  const seoConfig = useMemo(() => {
    if (viewMode === 'product_detail') {
      return {
        pageType: 'product' as const,
        product: selectedProduct,
        collection: undefined,
        article: undefined
      };
    }
    if (viewMode === 'blog_article') {
      return {
        pageType: 'blog' as const,
        product: undefined,
        collection: undefined,
        article: BLOG_ARTICLES[0]
      };
    }
    if (selectedShapeFilter) {
      return {
        pageType: 'collection' as const,
        product: undefined,
        collection: {
          title: selectedShapeFilter,
          handle: selectedShapeFilter,
          description: themeSettings.language === 'ar'
            ? `استكشف تشكيلة ${selectedShapeFilter} الفاخرة من التيتانيوم الياباني المصنوعة يدوياً في ساباي.`
            : `Explore our handcrafted ${selectedShapeFilter} luxury eyewear silhouettes made in Sabae, Japan.`,
          products: filteredProducts
        },
        article: undefined
      };
    }
    return {
      pageType: 'website' as const,
      product: undefined,
      collection: undefined,
      article: undefined
    };
  }, [viewMode, selectedProduct, selectedShapeFilter, filteredProducts, themeSettings.language]);

  const effectiveDirection = themeSettings.mirrorComponents
    ? (themeSettings.language === 'ar' ? 'ltr' : 'rtl')
    : (themeSettings.language === 'ar' ? 'rtl' : 'ltr');

  return (
    <div
      dir={effectiveDirection}
      data-mirrored={Boolean(themeSettings.mirrorComponents)}
      className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-[#FAF9F6]"
    >
      {/* Dynamic SEOManager: Automatically generates & injects JSON-LD for Products, Collections, Blog & Storefront */}
      <SEOManager
        pageType={seoConfig.pageType}
        product={seoConfig.product}
        collection={seoConfig.collection}
        article={seoConfig.article}
        language={themeSettings.language}
        canonicalUrl={headMetadata.canonicalUrl}
      />
      {/* Skip Link for Accessibility */}
      <a
        href="#MainContent"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 bg-[#1A1A1A] text-white px-4 py-2 text-xs font-semibold rounded"
      >
        Skip to main content
      </a>

      {/* Mirrored RTL Layout Notice Banner */}
      {themeSettings.mirrorComponents && (
        <div className="bg-[#1A1A1A] text-[#FAF9F6] border-b border-[#C29B38] text-xs py-1.5 px-4 flex flex-wrap items-center justify-between gap-2 text-center select-none sticky top-0 z-50">
          <div className="flex items-center gap-2 mx-auto">
            <FlipHorizontal className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>
              <strong>Mirrored RTL Alignment Mode Active:</strong> Layout direction, flex ordering, and spacing are rendered in RTL for real-time spatial testing without altering text strings.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setThemeSettings(s => ({ ...s, mirrorComponents: false }))}
            className="text-[11px] font-semibold underline text-[#C29B38] hover:text-white transition-colors"
          >
            Disable Mirror Mode
          </button>
        </div>
      )}

      {/* Primary Header */}
      <StoreHeader
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        language={themeSettings.language}
        onToggleLanguage={() => setThemeSettings(s => ({ ...s, language: s.language === 'en' ? 'ar' : 'en' }))}
        activeView={viewMode}
        onSelectView={(mode) => setViewMode(mode)}
        onSelectCategory={(shape) => {
          handleSelectShape(shape);
          setViewMode('storefront');
          const gridEl = document.getElementById('eyewear-catalog');
          if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
        }}
        announcementText={themeSettings.announcementText}
        showAnnouncement={themeSettings.showAnnouncement}
      />

      {/* Secondary Theme Mode Simulators */}
      {viewMode === 'theme_editor' && (
        <ThemeEditorSimulator
          settings={themeSettings}
          onUpdateSettings={(newVals) => setThemeSettings(s => ({ ...s, ...newVals }))}
          onResetSettings={() => setThemeSettings({
            announcementText: "Complimentary Worldwide Express Courier & Precision Prescription Service on orders over $250",
            showAnnouncement: true,
            colorScheme: 'alabaster',
            cardAspectRatio: '4/5',
            showColorSwatches: true,
            freeShippingThreshold: 250,
            language: 'en',
            mirrorComponents: false
          })}
          onClose={() => setViewMode('storefront')}
          onOpenPerformanceDashboard={() => setIsPerformanceOverlayOpen(true)}
          isPerformanceDashboardOpen={isPerformanceOverlayOpen}
        />
      )}

      {viewMode === 'code_explorer' && (
        <ThemeCodeExplorer onClose={() => setViewMode('storefront')} />
      )}

      {/* Main Content Area */}
      <main id="MainContent" className="flex-1 focus:outline-none">
        {viewMode === 'product_detail' ? (
          <ProductDetailPage
            product={selectedProduct}
            onBack={() => setViewMode('storefront')}
            onAddToCart={handleAddToCart}
            onSelectRelated={(p) => setSelectedProduct(p)}
            relatedProducts={EYEWEAR_PRODUCTS.filter(p => p.id !== selectedProduct.id)}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={toggleWishlist}
            language={themeSettings.language}
            onSelectShapeCategory={(shape) => {
              handleSelectShape(shape);
              setViewMode('storefront');
              setTimeout(() => {
                const el = document.getElementById('eyewear-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
          />
        ) : viewMode === 'blog_article' ? (
          <BlogArticlePage
            article={BLOG_ARTICLES[0]}
            onBack={() => {
              setViewMode('storefront');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            language={themeSettings.language}
            relatedProducts={EYEWEAR_PRODUCTS.slice(0, 3)}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              setViewMode('product_detail');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          /* Storefront Homepage */
          <div className="flex flex-col">
            {/* 1. Hero Section */}
            <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-[#E5E2DC]">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E5E2DC] rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C29B38] mb-6">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{TRANSLATIONS[themeSettings.language].hero.eyebrow}</span>
                  </div>

                  <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#1A1A1A] leading-[1.08] tracking-tight">
                    {TRANSLATIONS[themeSettings.language].hero.titleLine1}<br />
                    <span className="italic font-normal">{TRANSLATIONS[themeSettings.language].hero.titleLine2}</span>
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-[#6B6864] font-normal leading-relaxed max-w-2xl">
                    {TRANSLATIONS[themeSettings.language].hero.description}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href="#eyewear-catalog"
                      className="px-8 py-4 bg-[#1A1A1A] text-[#FAF9F6] text-xs font-semibold uppercase tracking-[0.18em] rounded-sm hover:bg-black transition-all shadow-md inline-flex items-center gap-2 group"
                    >
                      <span>{TRANSLATIONS[themeSettings.language].hero.exploreButton}</span>
                      <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${themeSettings.language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </a>

                    <a
                      href="#curated-silhouettes"
                      className="px-6 py-4 bg-white border border-[#E5E2DC] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-[#F6F4EF] hover:border-[#1A1A1A] transition-colors inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#C29B38]" />
                      <span>{TRANSLATIONS[themeSettings.language].silhouettes.title}</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Shop by Frame Shape (Curated Optical Taxonomy with Architectural Packshots) */}
            <section id="curated-silhouettes" className="py-16 sm:py-24 bg-[#F8F7F4] border-b border-[#E5E2DC]">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                  <div className="max-w-2xl">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C29B38] block mb-2 font-mono">
                      {TRANSLATIONS[themeSettings.language].silhouettes.badge}
                    </span>
                    <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-light tracking-tight">
                      {TRANSLATIONS[themeSettings.language].silhouettes.title}
                    </h2>
                    <p className="text-sm text-[#6B6864] mt-3 leading-relaxed">
                      {TRANSLATIONS[themeSettings.language].silhouettes.description}
                    </p>
                  </div>

                  <div className="hidden md:flex items-center gap-2 text-xs font-medium text-[#8C8882]">
                    <span>{themeSettings.language === 'ar' ? '٥ أشكال هندسية أيقونية' : '5 Iconic Optical Silhouettes'}</span>
                  </div>
                </div>

                {/* 5 Distinct Silhouette Cards with Architectural Geometry Packshots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {[
                    {
                      title: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.aviator : 'Aviator',
                      subtitle: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.aviatorSubtitle : 'Double Bridge',
                      shape: 'Aviator' as const,
                      img: SILHOUETTE_IMAGES['Aviator'],
                      tag: 'Calibrated'
                    },
                    {
                      title: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.square : 'Geometric Square',
                      subtitle: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.squareSubtitle : 'Block Acetate',
                      shape: 'Geometric Square' as const,
                      img: SILHOUETTE_IMAGES['Geometric Square'],
                      tag: 'Mazzucchelli'
                    },
                    {
                      title: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.panto : 'Panto Round',
                      subtitle: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.pantoSubtitle : 'Vintage Optical',
                      shape: 'Panto Round' as const,
                      img: SILHOUETTE_IMAGES['Panto Round'],
                      tag: 'Beta Titanium'
                    },
                    {
                      title: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.catEye : 'Cat-Eye Sculpt',
                      subtitle: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.catEyeSubtitle : 'Haute Couture',
                      shape: 'Cat-Eye' as const,
                      img: SILHOUETTE_IMAGES['Cat-Eye'],
                      tag: 'Beveled'
                    },
                    {
                      title: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.titanium : 'Ultra-Thin Titanium',
                      subtitle: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.titaniumSubtitle : 'Featherlight 14g',
                      shape: 'Ultra-Thin Titanium' as const,
                      img: SILHOUETTE_IMAGES['Ultra-Thin Titanium'],
                      tag: 'Grade-4 Pure'
                    }
                  ].map((card, idx) => {
                    const isSelected = selectedShapeFilter === card.shape;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          handleSelectShape(isSelected ? undefined : card.shape);
                          const el = document.getElementById('eyewear-catalog');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className={`group relative bg-white border rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-[#1A1A1A]/5 hover:-translate-y-1 ${
                          isSelected
                            ? 'border-[#1A1A1A] ring-2 ring-[#1A1A1A] shadow-md'
                            : 'border-[#E6E3DC] hover:border-[#1A1A1A]'
                        }`}
                      >
                        {/* High-Resolution Architectural Frame Image with Responsive LazyImage */}
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F2EFE9]">
                          <LazyImage
                            src={card.img}
                            alt={card.title}
                            aspectRatio="4/3"
                            containerClassName="w-full h-full"
                            imageClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            objectFit="cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          <span className="absolute top-2.5 start-2.5 z-10 bg-white/90 backdrop-blur-xs text-[#1A1A1A] text-[9px] uppercase font-mono px-2 py-0.5 rounded-full font-semibold border border-[#E5E2DC]">
                            {card.tag}
                          </span>
                        </div>

                        {/* Card Content & Geometry Indicator */}
                        <div className="p-4 text-start flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-serif text-lg text-[#1A1A1A] font-medium leading-tight group-hover:text-[#C29B38] transition-colors">
                                {card.title}
                              </h3>
                              <ChevronRight className={`w-3.5 h-3.5 text-[#A6A29A] group-hover:text-[#1A1A1A] group-hover:translate-x-0.5 transition-all ${themeSettings.language === 'ar' ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
                            </div>
                            <p className="text-[11px] font-mono uppercase tracking-wider text-[#73706A]">
                              {card.subtitle}
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-[#F0ECE4] flex items-center justify-between text-[11px] text-[#8C8882]">
                            <span className="text-[10px] uppercase font-semibold tracking-wider">
                              {isSelected ? (themeSettings.language === 'ar' ? 'نشط' : 'Active') : (themeSettings.language === 'ar' ? 'استعراض' : 'Explore')}
                            </span>
                            <span className="font-serif italic text-xs text-[#C29B38]">Valoir</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* 3. Product Catalog Grid with Filters & Sorting */}
            <section id="eyewear-catalog" className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-8 w-full">
              {/* Category and Sort Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E2DC] mb-10">
                {/* Shape Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                  {[
                    { key: undefined, label: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.all : 'All Silhouettes' },
                    { key: 'Aviator', label: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.aviator : 'Aviator' },
                    { key: 'Geometric Square', label: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.square : 'Geometric Square' },
                    { key: 'Panto Round', label: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.panto : 'Panto Round' },
                    { key: 'Cat-Eye', label: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.catEye : 'Cat-Eye' },
                    { key: 'Ultra-Thin Titanium', label: themeSettings.language === 'ar' ? TRANSLATIONS.ar.silhouettes.titanium : 'Ultra-Thin Titanium' }
                  ].map((filterItem, idx) => {
                    const active = filterItem.key === undefined ? !selectedShapeFilter : selectedShapeFilter === filterItem.key;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectShape(filterItem.key)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                          active
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white text-[#6B6864] hover:text-[#1A1A1A] border border-[#E5E2DC]'
                        }`}
                      >
                        {filterItem.label}
                      </button>
                    );
                  })}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs text-[#6B6864] self-end sm:self-auto">
                  <label htmlFor="SortSelect" className="font-medium">
                    {TRANSLATIONS[themeSettings.language].catalog.sortLabel}
                  </label>
                  <select
                    id="SortSelect"
                    value={sortOption}
                    onChange={(e) => handleSortChange(e.target.value as any)}
                    className="p-1.5 bg-white border border-[#E5E2DC] rounded-sm text-xs text-[#1A1A1A] outline-none"
                  >
                    <option value="featured">{TRANSLATIONS[themeSettings.language].catalog.sortFeatured}</option>
                    <option value="price-asc">{TRANSLATIONS[themeSettings.language].catalog.sortPriceAsc}</option>
                    <option value="price-desc">{TRANSLATIONS[themeSettings.language].catalog.sortPriceDesc}</option>
                  </select>
                </div>
              </div>

              {/* Product Cards Grid with Perceived Performance Skeleton Loader */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {isGridLoading ? (
                  <ProductCardSkeleton
                    aspectRatio={themeSettings.cardAspectRatio}
                    count={filteredProducts.length || 6}
                  />
                ) : (
                  filteredProducts.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelectProduct={(p) => {
                        setSelectedProduct(p);
                        setViewMode('product_detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      onQuickAdd={(p, color) => handleAddToCart(p, color)}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      isWishlisted={wishlistIds.includes(prod.id)}
                      onToggleWishlist={toggleWishlist}
                      aspectRatio={themeSettings.cardAspectRatio}
                      showSwatches={themeSettings.showColorSwatches}
                      language={themeSettings.language}
                    />
                  ))
                )}
              </div>
            </section>

            {/* 4. Editorial Sabae Craft Story - Redesigned with Atelier Photography & Micro-Craft Benchmarks */}
            <section className="py-20 lg:py-28 bg-[#F4F1EC] border-t border-[#E5E2DC] relative overflow-hidden">
              {/* Subtle architectural grid pattern background */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#1A1A1A 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }}
              />

              <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Left Column: Narrative & Metrics */}
                  <div className="lg:col-span-6 flex flex-col gap-6">
                    <div className="inline-flex items-center gap-2 self-start px-3 py-1 bg-white border border-[#E2DFD8] rounded-xs shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C29B38]">
                        {TRANSLATIONS[themeSettings.language].atelierStory.badge}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1A1A] leading-[1.15]">
                      {TRANSLATIONS[themeSettings.language].atelierStory.title}
                    </h2>

                    <div className="space-y-4 text-sm sm:text-[15px] text-[#55524E] leading-relaxed">
                      <p>
                        {TRANSLATIONS[themeSettings.language].atelierStory.p1}
                      </p>
                      <p>
                        {TRANSLATIONS[themeSettings.language].atelierStory.p2}
                      </p>
                    </div>

                    {/* Architectural Craft Benchmarks Ribbon */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#E2DFD8]">
                      <div className="p-3 bg-white/80 border border-[#E5E2DC] rounded-xs">
                        <span className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] block">
                          {TRANSLATIONS[themeSettings.language].atelierStory.statSteps}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8882] block mt-0.5">
                          {TRANSLATIONS[themeSettings.language].atelierStory.statStepsLabel}
                        </span>
                      </div>
                      <div className="p-3 bg-white/80 border border-[#E5E2DC] rounded-xs">
                        <span className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] block">
                          {TRANSLATIONS[themeSettings.language].atelierStory.statDays}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8882] block mt-0.5">
                          {TRANSLATIONS[themeSettings.language].atelierStory.statDaysLabel}
                        </span>
                      </div>
                      <div className="p-3 bg-white/80 border border-[#E5E2DC] rounded-xs">
                        <span className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] block">
                          {TRANSLATIONS[themeSettings.language].atelierStory.statTolerance}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8882] block mt-0.5">
                          {TRANSLATIONS[themeSettings.language].atelierStory.statToleranceLabel}
                        </span>
                      </div>
                      <div className="p-3 bg-white/80 border border-[#E5E2DC] rounded-xs">
                        <span className="font-serif text-xl sm:text-2xl font-light text-[#1A1A1A] block">
                          {TRANSLATIONS[themeSettings.language].atelierStory.statStages}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#8C8882] block mt-0.5">
                          {TRANSLATIONS[themeSettings.language].atelierStory.statStagesLabel}
                        </span>
                      </div>
                    </div>

                    {/* Master Guild Seal verification & Full Article Trigger */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#7A7670]">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-[#C29B38] shrink-0" />
                        <span>{TRANSLATIONS[themeSettings.language].atelierStory.guildSeal} • Fukui 35.9452° N, 136.1856° E</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setViewMode('blog_article');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] text-xs font-medium rounded-xs inline-flex items-center gap-2 transition-colors shadow-2xs"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-[#C29B38]" />
                        <span>{themeSettings.language === 'ar' ? 'اقرأ المقال الكامل للمشاغل (Blog)' : 'Read Full Atelier Article (Blog)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Artisan Atelier Photography & Cinematic Quote Overlay */}
                  <div className="lg:col-span-6">
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#DCD7CD] shadow-lg group">
                      <LazyImage
                        src={ATELIER_IMAGES.workshop}
                        alt="Master Artisan hand-finishing Valoir titanium and acetate frames in Sabae, Japan"
                        aspectRatio="4/3"
                        containerClassName="w-full h-full"
                        imageClassName="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        objectFit="cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Ambient lighting gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 pointer-events-none" />

                      {/* Top Corner Certification Badge */}
                      <div className="absolute top-4 start-4 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-xs flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5B54F] animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest text-[#FAF9F6] font-medium">
                          Sabae Fukui Atelier
                        </span>
                      </div>

                      {/* Bottom Quote & Guild Signature Block */}
                      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end text-white">
                        <span className="font-serif text-2xl sm:text-3xl text-white italic leading-tight drop-shadow-sm">
                          {TRANSLATIONS[themeSettings.language].atelierStory.quote}
                        </span>
                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/20">
                          <p className="text-xs text-[#DFDBD2] tracking-wider uppercase">
                            {TRANSLATIONS[themeSettings.language].atelierStory.author}
                          </p>
                          <span className="text-[11px] text-[#E5B54F] tracking-widest font-mono">
                            ±0.05mm
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 5. Testimonials Section - Critical Acclaim with Verified Account Avatars */}
            <section className="py-20 sm:py-24 bg-[#FAF9F6] border-t border-[#E5E2DC]">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C29B38] block mb-2">
                    {TRANSLATIONS[themeSettings.language].testimonials.badge}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A] mb-3">
                    {TRANSLATIONS[themeSettings.language].testimonials.title}
                  </h2>
                  <p className="text-sm text-[#736F69] leading-relaxed">
                    {TRANSLATIONS[themeSettings.language].testimonials.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      quote: TRANSLATIONS[themeSettings.language].testimonials.t1Quote,
                      author: TRANSLATIONS[themeSettings.language].testimonials.t1Author,
                      title: TRANSLATIONS[themeSettings.language].testimonials.t1Title,
                      city: TRANSLATIONS[themeSettings.language].testimonials.t1City,
                      frame: TRANSLATIONS[themeSettings.language].testimonials.t1Frame,
                      avatar: REVIEWER_AVATARS.elena
                    },
                    {
                      quote: TRANSLATIONS[themeSettings.language].testimonials.t2Quote,
                      author: TRANSLATIONS[themeSettings.language].testimonials.t2Author,
                      title: TRANSLATIONS[themeSettings.language].testimonials.t2Title,
                      city: TRANSLATIONS[themeSettings.language].testimonials.t2City,
                      frame: TRANSLATIONS[themeSettings.language].testimonials.t2Frame,
                      avatar: REVIEWER_AVATARS.marcus
                    },
                    {
                      quote: TRANSLATIONS[themeSettings.language].testimonials.t3Quote,
                      author: TRANSLATIONS[themeSettings.language].testimonials.t3Author,
                      title: TRANSLATIONS[themeSettings.language].testimonials.t3Title,
                      city: TRANSLATIONS[themeSettings.language].testimonials.t3City,
                      frame: TRANSLATIONS[themeSettings.language].testimonials.t3Frame,
                      avatar: REVIEWER_AVATARS.kenji
                    }
                  ].map((test, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-[#E5E2DC] p-7 sm:p-8 rounded-sm flex flex-col justify-between hover:border-[#C29B38]/50 transition-all duration-300 shadow-2xs hover:shadow-md"
                    >
                      <div>
                        {/* Rating Stars & Verified Chip */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-1 text-[#C29B38]" aria-label="5 stars rating">
                            {[...Array(5)].map((_, sIdx) => (
                              <Star key={sIdx} className="w-3.5 h-3.5 fill-[#C29B38]" />
                            ))}
                          </div>
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium tracking-wider uppercase text-[#1B7340] bg-[#E8F5E9] px-2 py-0.5 rounded-xs">
                            <Check className="w-2.5 h-2.5" />
                            {TRANSLATIONS[themeSettings.language].testimonials.verifiedText}
                          </span>
                        </div>

                        {/* Quote */}
                        <p className="text-sm sm:text-[15px] text-[#3A3835] font-serif italic leading-relaxed mb-6">
                          "{test.quote}"
                        </p>
                      </div>

                      <div className="pt-5 border-t border-[#F0ECE4]">
                        {/* Verified Account Profile with Photo */}
                        <div className="flex items-center gap-3.5">
                          <div className="relative shrink-0">
                            <LazyImage
                              src={test.avatar}
                              alt={test.author}
                              aspectRatio="1/1"
                              containerClassName="w-12 h-12 rounded-full overflow-hidden border-2 border-[#E5E2DC] ring-2 ring-[#FAF9F6]"
                              imageClassName="w-full h-full object-cover"
                              objectFit="cover"
                              sizes="48px"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute -bottom-0.5 -end-0.5 w-4 h-4 bg-[#C29B38] text-white rounded-full flex items-center justify-center border border-white z-10">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="font-serif font-medium text-base text-[#1A1A1A] truncate block">
                                {test.author}
                              </span>
                              <span className="text-[11px] text-[#8C8882] shrink-0">
                                {test.city}
                              </span>
                            </div>
                            <span className="text-[11px] text-[#736F69] truncate block mt-0.5">
                              {test.title}
                            </span>
                            <span className="text-[10px] text-[#C29B38] font-mono tracking-wider truncate block mt-1">
                              {test.frame}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Primary Footer */}
      <footer className="bg-[#1A1A1A] text-[#FAF9F6] py-16 border-t border-black">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#2E2E2E]">
            {/* Col 1 */}
            <div className="flex flex-col gap-3">
              <span className="font-serif text-2xl tracking-[0.25em] font-light uppercase">
                VALOIR
              </span>
              <p className="text-xs text-[#8C8882] leading-relaxed">
                {TRANSLATIONS[themeSettings.language].footer.brandSummary}
              </p>
              <div className="mt-2 text-[11px] font-mono text-[#C29B38]">
                {TRANSLATIONS[themeSettings.language].footer.precisionBadge}
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-2.5 text-xs text-[#A8A59E]">
              <span className="text-[#FAF9F6] uppercase font-semibold tracking-wider text-[11px] mb-1">
                {TRANSLATIONS[themeSettings.language].footer.silhouettesTitle}
              </span>
              <button type="button" onClick={() => handleSelectShape('Aviator')} className="text-start hover:text-white transition-colors">
                {TRANSLATIONS[themeSettings.language].silhouettes.aviator}
              </button>
              <button type="button" onClick={() => handleSelectShape('Geometric Square')} className="text-start hover:text-white transition-colors">
                {TRANSLATIONS[themeSettings.language].silhouettes.square}
              </button>
              <button type="button" onClick={() => handleSelectShape('Panto Round')} className="text-start hover:text-white transition-colors">
                {TRANSLATIONS[themeSettings.language].silhouettes.panto}
              </button>
              <button type="button" onClick={() => handleSelectShape('Ultra-Thin Titanium')} className="text-start hover:text-white transition-colors">
                {TRANSLATIONS[themeSettings.language].silhouettes.titanium}
              </button>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-2.5 text-xs text-[#A8A59E]">
              <span className="text-[#FAF9F6] uppercase font-semibold tracking-wider text-[11px] mb-1">
                {TRANSLATIONS[themeSettings.language].footer.craftsmanshipTitle}
              </span>
              <button
                type="button"
                onClick={() => {
                  setViewMode('blog_article');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-start hover:text-white transition-colors"
              >
                {TRANSLATIONS[themeSettings.language].footer.sabaeWorkshops}
              </button>
              <span>{TRANSLATIONS[themeSettings.language].footer.titaniumSourcing}</span>
              <span>{TRANSLATIONS[themeSettings.language].footer.mineralOptics}</span>
              <span>{TRANSLATIONS[themeSettings.language].footer.customPrescriptions}</span>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col gap-3 text-xs text-[#A8A59E]">
              <span className="text-[#FAF9F6] uppercase font-semibold tracking-wider text-[11px]">
                {TRANSLATIONS[themeSettings.language].footer.newsletterTitle}
              </span>
              <p className="text-[11px] text-[#8C8882]">
                {TRANSLATIONS[themeSettings.language].footer.newsletterDesc}
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex">
                <input
                  type="email"
                  placeholder={TRANSLATIONS[themeSettings.language].footer.newsletterPlaceholder}
                  className="bg-[#2E2E2E] text-white text-xs px-3 py-2 rounded-s outline-none focus:ring-1 focus:ring-[#C29B38] flex-1 border border-[#3E3E3E]"
                />
                <button
                  type="submit"
                  className="bg-[#C29B38] text-white px-4 py-2 rounded-e text-xs font-semibold uppercase hover:bg-[#a8842c] transition-colors"
                >
                  {TRANSLATIONS[themeSettings.language].footer.newsletterBtn}
                </button>
              </form>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6864] gap-4">
            <span>© {new Date().getFullYear()} Valoir Haute Optique. {TRANSLATIONS[themeSettings.language].footer.copyright}</span>
            <div className="flex items-center gap-6">
              <span>{TRANSLATIONS[themeSettings.language].footer.privacy}</span>
              <span>{TRANSLATIONS[themeSettings.language].footer.terms}</span>
              <span>{TRANSLATIONS[themeSettings.language].footer.caliperGuarantees}</span>
              <button
                type="button"
                onClick={() => {
                  const next = !isAdminMode;
                  setIsAdminMode(next);
                  try {
                    localStorage.setItem('valoir_admin_mode', String(next));
                  } catch {
                    // ignore
                  }
                }}
                className="hover:text-[#FAF9F6] transition-colors text-[10px] opacity-40 hover:opacity-90 flex items-center gap-1 cursor-pointer"
                title="Theme Owner / Admin Mode (Shortcut: Ctrl+Shift+D)"
              >
                <Shield className="w-2.5 h-2.5 text-[#C29B38]" />
                <span>{isAdminMode ? 'Owner Mode (Active)' : 'Owner'}</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        threshold={themeSettings.freeShippingThreshold}
        language={themeSettings.language}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={EYEWEAR_PRODUCTS}
        onRemoveFromWishlist={toggleWishlist}
        onAddToCart={(p, color) => handleAddToCart(p, color)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setViewMode('product_detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={themeSettings.language}
      />

      {/* Predictive Search Modal */}
      <PredictiveSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={EYEWEAR_PRODUCTS}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          setViewMode('product_detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={themeSettings.language}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, color) => handleAddToCart(p, color)}
        onOpenFullDetail={(p) => {
          setSelectedProduct(p);
          setViewMode('product_detail');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={toggleWishlist}
        language={themeSettings.language}
      />

      {/* Compliance Audit Modal */}
      {isComplianceOpen && (
        <ComplianceAuditModal
          onClose={() => setIsComplianceOpen(false)}
          language={themeSettings.language}
        />
      )}

      {/* Theme Testing Dataset Modal */}
      {isDatasetOpen && (
        <ThemeTestingDatasetModal
          onClose={() => setIsDatasetOpen(false)}
          language={themeSettings.language}
        />
      )}

      {/* RTL Performance Dashboard Overlay */}
      <RTLPerformanceOverlay
        isOpen={isPerformanceOverlayOpen}
        onClose={() => setIsPerformanceOverlayOpen(false)}
        currentLanguage={themeSettings.language}
        isMirrored={Boolean(themeSettings.mirrorComponents)}
        onToggleLanguage={() => setThemeSettings(s => ({ ...s, language: s.language === 'en' ? 'ar' : 'en' }))}
        onToggleMirror={() => setThemeSettings(s => ({ ...s, mirrorComponents: !s.mirrorComponents }))}
      />

      {/* Floating Developer Tools Dock (Exclusively for Theme Owner / Admin) */}
      {isAdminMode && (
        <aside aria-label="Developer Tools" className="fixed bottom-4 start-4 z-40 print:hidden">
          {!isDevToolsDockOpen ? (
            <button
              type="button"
              onClick={() => setIsDevToolsDockOpen(true)}
              className="px-3 py-2 bg-[#1A1A1A]/90 hover:bg-black text-[#FAF9F6] text-xs font-medium rounded-full shadow-lg border border-white/15 flex items-center gap-2 backdrop-blur transition-all cursor-pointer hover:border-[#C29B38]"
              title="Shopify Theme Developer Tools (Theme Owner Mode - Press Ctrl+Shift+D to hide)"
            >
              <Sliders className="w-3.5 h-3.5 text-[#C29B38]" />
              <span className="font-mono text-[11px] tracking-wider uppercase">Shopify DevTools</span>
              <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
            </button>
          ) : (
            <div className="bg-[#1A1A1A] border border-[#3E3E3E] rounded-xl p-4 shadow-2xl text-[#FAF9F6] w-72 sm:w-80 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                  <span className="text-xs font-mono tracking-wider uppercase text-white font-semibold">
                    Shopify OS 2.0 Tools (Admin)
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setIsDevToolsDockOpen(false)}
                    className="p-1 text-[#A8A59E] hover:text-white rounded hover:bg-white/10 transition-colors"
                    title="Minimize"
                  >
                    <ChevronRight className="w-3.5 h-3.5 rotate-90" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDevToolsDockOpen(false);
                      setIsAdminMode(false);
                      try {
                        localStorage.setItem('valoir_admin_mode', 'false');
                      } catch {
                        // ignore
                      }
                    }}
                    className="p-1 text-[#A8A59E] hover:text-red-400 rounded hover:bg-white/10 transition-colors"
                    title="Exit Admin Mode (Hide from screen)"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-[#A8A59E] mb-3 leading-relaxed">
                أدوات اختبار الثيم ومراقبة معايير شوبيفاي بدون تشويه واجهة المتجر:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('theme_editor');
                    setIsDevToolsDockOpen(false);
                  }}
                  className="px-2.5 py-2 bg-white/5 hover:bg-white/15 text-[11px] font-medium rounded border border-white/10 flex items-center gap-2 transition-colors text-start"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                  <span className="truncate">Live Customizer</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPerformanceOverlayOpen(true);
                    setIsDevToolsDockOpen(false);
                  }}
                  className="px-2.5 py-2 bg-white/5 hover:bg-white/15 text-[11px] font-medium rounded border border-white/10 flex items-center gap-2 transition-colors text-start"
                >
                  <Activity className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                  <span className="truncate">RTL HUD</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setViewMode('code_explorer');
                    setIsDevToolsDockOpen(false);
                  }}
                  className="px-2.5 py-2 bg-white/5 hover:bg-white/15 text-[11px] font-medium rounded border border-white/10 flex items-center gap-2 transition-colors text-start"
                >
                  <Code className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                  <span className="truncate">Liquid Inspector</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsComplianceOpen(true);
                    setIsDevToolsDockOpen(false);
                  }}
                  className="px-2.5 py-2 bg-[#C29B38]/20 hover:bg-[#C29B38]/30 text-[#E5C266] text-[11px] font-medium rounded border border-[#C29B38]/40 flex items-center gap-2 transition-colors text-start"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                  <span className="truncate">Audit (100%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsSeoInspectorOpen(true);
                    setIsDevToolsDockOpen(false);
                  }}
                  className="px-2.5 py-2 bg-white/5 hover:bg-white/15 text-[11px] font-medium rounded border border-white/10 flex items-center gap-2 transition-colors text-start col-span-2"
                >
                  <Search className="w-3.5 h-3.5 text-[#C29B38] shrink-0" />
                  <span className="truncate">Google JSON-LD & SEO Schema Inspector</span>
                </button>
              </div>

              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
                <span className="text-[#8C8882] text-[10px]">Theme Archive</span>
                <a
                  href="/valoir-eyewear-theme.zip"
                  download
                  className="text-[#C29B38] hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  <Download className="w-3 h-3" />
                  <span>Download .ZIP</span>
                </a>
              </div>
            </div>
          )}
        </aside>
      )}

      {/* SEO & JSON-LD Schema Inspector Modal */}
      <SEOSchemaInspectorModal
        isOpen={isSeoInspectorOpen}
        onClose={() => setIsSeoInspectorOpen(false)}
        activeProduct={selectedProduct}
        allProducts={EYEWEAR_PRODUCTS}
        language={themeSettings.language}
      />
    </div>
  );
}

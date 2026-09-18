import React, { useState } from 'react';
import { EyewearProduct, CartLineItem, ThemeSettingsState, ViewMode } from './types';
import { EYEWEAR_PRODUCTS } from './data/eyewear-products';
import { StoreHeader } from './components/StoreHeader';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ThreeEyewearViewer } from './components/ThreeEyewearViewer';
import { CartDrawer } from './components/CartDrawer';
import { PredictiveSearchModal } from './components/PredictiveSearchModal';
import { ThemeEditorSimulator } from './components/ThemeEditorSimulator';
import { ThemeCodeExplorer } from './components/ThemeCodeExplorer';
import { ComplianceAuditModal } from './components/ComplianceAuditModal';
import { ARSpaceModal } from './components/ARSpaceModal';
import {
  Box,
  Compass,
  ArrowRight,
  Shield,
  Truck,
  Sparkles,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Sliders,
  Code,
  Download
} from 'lucide-react';

export default function App() {
  // Application State
  const [viewMode, setViewMode] = useState<ViewMode>('storefront');
  const [selectedProduct, setSelectedProduct] = useState<EyewearProduct>(EYEWEAR_PRODUCTS[0]);
  const [selectedShapeFilter, setSelectedShapeFilter] = useState<string | undefined>(undefined);
  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isARModalOpen, setIsARModalOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);

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
    enable3DViewer: true,
    autoRotate3D: true,
    showCalipers: false,
    lensCoatingEffect: 'high',
    cardAspectRatio: '4/5',
    showColorSwatches: true,
    freeShippingThreshold: 250,
    language: 'en'
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

  // Filter & Sort Products
  const filteredProducts = EYEWEAR_PRODUCTS.filter(p => {
    if (!selectedShapeFilter) return true;
    return p.shape.toLowerCase() === selectedShapeFilter.toLowerCase();
  }).sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return 0;
  });

  const shapesList = ['All Silhouettes', 'Aviator', 'Geometric Square', 'Panto Round', 'Cat-Eye', 'Ultra-Thin Titanium'];

  return (
    <div
      dir={themeSettings.language === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1A1A] selection:bg-[#1A1A1A] selection:text-[#FAF9F6]"
    >
      {/* Skip Link for Accessibility */}
      <a
        href="#MainContent"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 z-50 bg-[#1A1A1A] text-white px-4 py-2 text-xs font-semibold rounded"
      >
        Skip to main content
      </a>

      {/* Primary Header */}
      <StoreHeader
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        language={themeSettings.language}
        onToggleLanguage={() => setThemeSettings(s => ({ ...s, language: s.language === 'en' ? 'ar' : 'en' }))}
        activeView={viewMode}
        onSelectView={(mode) => setViewMode(mode)}
        onSelectCategory={(shape) => {
          setSelectedShapeFilter(shape);
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
            enable3DViewer: true,
            autoRotate3D: true,
            showCalipers: false,
            lensCoatingEffect: 'high',
            cardAspectRatio: '4/5',
            showColorSwatches: true,
            freeShippingThreshold: 250,
            language: 'en'
          })}
          onClose={() => setViewMode('storefront')}
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
            onLaunchAR={() => setIsARModalOpen(true)}
            onSelectRelated={(p) => setSelectedProduct(p)}
            relatedProducts={EYEWEAR_PRODUCTS.filter(p => p.id !== selectedProduct.id)}
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
                    <span>HAUTE LUNETTERIE &amp; OPTICAL ARCHITECTURE</span>
                  </div>

                  <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-[#1A1A1A] leading-[1.08] tracking-tight">
                    Sculpted in Titanium.<br />
                    <span className="italic font-normal">Defined by Vision.</span>
                  </h1>

                  <p className="mt-6 text-base sm:text-lg text-[#6B6864] font-normal leading-relaxed max-w-2xl">
                    Experience eyewear engineered as sculptural form. Handcrafted in Sabae, Japan with multi-axis titanium mills and custom-tinted mineral glass.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <a
                      href="#eyewear-catalog"
                      className="px-8 py-4 bg-[#1A1A1A] text-[#FAF9F6] text-xs font-semibold uppercase tracking-[0.16em] rounded-sm hover:bg-black transition-colors shadow-sm inline-flex items-center gap-2"
                    >
                      <span>Explore 2026 Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href="#3d-explorer"
                      className="px-6 py-4 bg-white border border-[#E5E2DC] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-[#F6F4EF] transition-colors inline-flex items-center gap-2"
                    >
                      <Box className="w-4 h-4 text-[#C29B38]" />
                      <span>3D Virtual Showroom</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Interactive 3D Eyewear Explorer Section */}
            <section id="3d-explorer" className="py-16 sm:py-24 bg-[#121214] text-[#FAF9F6] border-b border-[#282830]">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  {/* Left Column: Architectural Story & Caliper Explanations */}
                  <div className="lg:col-span-5 flex flex-col gap-6">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C29B38] block mb-2">
                        INTERACTIVE 3D OPTICAL LAB
                      </span>
                      <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#FAF9F6] leading-tight">
                        Micro-Precision Architecture in 360°
                      </h2>
                    </div>

                    <p className="text-sm text-[#A8A59E] leading-relaxed">
                      Inspect our patented 5-barrel custom barrel hinges, bevel-cut Mazzucchelli acetate temples, and hand-finished mineral crystal optics directly in your browser or physical space.
                    </p>

                    <div className="flex flex-col gap-3.5 my-2">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#26262A] text-[#C29B38] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                            Pure Japanese Beta-Titanium
                          </h4>
                          <p className="text-xs text-[#7A7873] mt-0.5">
                            High tensile elasticity and featherlight 23.4g mass.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#26262A] text-[#C29B38] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
                            Vacuum-Deposited AR Coating
                          </h4>
                          <p className="text-xs text-[#7A7873] mt-0.5">
                            8-layer anti-reflective treatment eliminating glare without chromatic distortion.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProduct(EYEWEAR_PRODUCTS[0]);
                          setViewMode('product_detail');
                        }}
                        className="px-6 py-3 bg-[#FAF9F6] text-[#121214] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-white transition-colors"
                      >
                        Inspect Aero-Titanium 01
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsARModalOpen(true)}
                        className="px-4 py-3 bg-[#26262A] text-[#FAF9F6] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#333338] transition-colors flex items-center gap-1.5"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-[#C29B38]" />
                        AR Space
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Live WebGL 3D Model Stage */}
                  <div className="lg:col-span-7 aspect-[4/3] sm:aspect-square w-full rounded-sm overflow-hidden border border-[#2C2C32] bg-[#18181C]">
                    <ThreeEyewearViewer
                      frameColor="#1A1A1A"
                      lensColor="#1C2E3D"
                      lensOpacity={0.8}
                      autoRotate={themeSettings.autoRotate3D}
                      showCalipersDefault={true}
                      productTitle="Aero-Titanium 01"
                      specs={EYEWEAR_PRODUCTS[0].specs}
                      onLaunchAR={() => setIsARModalOpen(true)}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Shop by Frame Shape (Curated Optical Taxonomy) */}
            <section className="py-14 sm:py-20 bg-[#F6F3ED] border-b border-[#E5E2DC]">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="text-center max-w-xl mx-auto mb-10">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C29B38] block mb-2">
                    OPTICAL CURATION
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light">
                    Shop by Frame Architecture
                  </h2>
                  <p className="text-xs text-[#6B6864] mt-2">
                    Discover silhouettes calibrated to facial geometry and optical focal points.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {[
                    { title: 'Aviator', subtitle: 'Double Bridge', shape: 'Aviator' },
                    { title: 'Geometric Square', subtitle: 'Block Acetate', shape: 'Geometric Square' },
                    { title: 'Panto Round', subtitle: 'Vintage Optical', shape: 'Panto Round' },
                    { title: 'Cat-Eye Sculpt', subtitle: 'Haute Couture', shape: 'Cat-Eye' },
                    { title: 'Ultra-Thin Titanium', subtitle: 'Featherlight 14g', shape: 'Ultra-Thin Titanium' }
                  ].map((card, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSelectedShapeFilter(card.shape);
                        const el = document.getElementById('eyewear-catalog');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`p-6 bg-white border rounded-sm text-center flex flex-col items-center justify-center gap-3 transition-all hover:border-[#1A1A1A] hover:shadow-xs ${
                        selectedShapeFilter === card.shape ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E5E2DC]'
                      }`}
                    >
                      <div className="w-14 h-7 border-[1.5px] border-[#1A1A1A] rounded-xs flex items-center justify-center">
                        <div className="w-2 h-0.5 bg-[#1A1A1A]" />
                      </div>
                      <span className="font-serif text-base text-[#1A1A1A] font-medium">{card.title}</span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B6864]">{card.subtitle}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. Product Catalog Grid with Filters & Sorting */}
            <section id="eyewear-catalog" className="py-16 sm:py-24 max-w-[1440px] mx-auto px-4 sm:px-8 w-full">
              {/* Category and Sort Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E2DC] mb-10">
                {/* Shape Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                  {shapesList.map((shapeName, idx) => {
                    const isAll = shapeName === 'All Silhouettes';
                    const active = isAll ? !selectedShapeFilter : selectedShapeFilter === shapeName;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedShapeFilter(isAll ? undefined : shapeName)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                          active
                            ? 'bg-[#1A1A1A] text-white'
                            : 'bg-white text-[#6B6864] hover:text-[#1A1A1A] border border-[#E5E2DC]'
                        }`}
                      >
                        {shapeName}
                      </button>
                    );
                  })}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 text-xs text-[#6B6864] self-end sm:self-auto">
                  <label htmlFor="SortSelect" className="font-medium">Sort:</label>
                  <select
                    id="SortSelect"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as any)}
                    className="p-1.5 bg-white border border-[#E5E2DC] rounded-sm text-xs text-[#1A1A1A] outline-none"
                  >
                    <option value="featured">Featured Atelier</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelectProduct={(p) => {
                      setSelectedProduct(p);
                      setViewMode('product_detail');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onQuickAdd={(p, color) => handleAddToCart(p, color)}
                    aspectRatio={themeSettings.cardAspectRatio}
                    showSwatches={themeSettings.showColorSwatches}
                  />
                ))}
              </div>
            </section>

            {/* 5. Editorial Sabae Craft Story */}
            <section className="py-20 bg-[#F2EFE9] border-t border-[#E5E2DC]">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  <div className="lg:col-span-6 flex flex-col gap-4">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C29B38]">
                      THE SABAÈ ATELIER
                    </span>
                    <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1A1A] leading-tight">
                      One Hundred &amp; Sixty Steps of Optical Mastery
                    </h2>
                    <p className="text-sm text-[#6B6864] leading-relaxed">
                      Every Valoir frame is born in Sabae, Japan—a legendary enclave where metallurgical masters have honed eyewear manufacturing across three centuries. Over two hundred days are required to cure our natural cotton-based acetate slabs before microscopic CNC routing begins.
                    </p>
                    <p className="text-sm text-[#6B6864] leading-relaxed">
                      Temples undergo five consecutive stages of tumbling with organic bamboo chips and walnut husks, achieving a liquid-smooth gloss impossible through chemical baths.
                    </p>
                  </div>
                  <div className="lg:col-span-6 aspect-[4/3] bg-white rounded-sm border border-[#E5E2DC] p-8 flex flex-col justify-center items-center text-center">
                    <span className="font-serif text-3xl text-[#1A1A1A] italic">
                      &ldquo;Light made architectural.&rdquo;
                    </span>
                    <p className="text-xs text-[#6B6864] uppercase tracking-widest mt-4">
                      Sabae Fukui Prefecture • Master Artisan Guild
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Testimonials Section */}
            <section className="py-16 sm:py-20 bg-[#FAF9F6] border-t border-[#E5E2DC]">
              <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C29B38] block mb-1">
                    CRITICAL ACCLAIM
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
                    Editorial Notes
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      quote: "The titanium hinge damping is extraordinary. It feels like closing the door of a bespoke Swiss timepiece.",
                      author: "Hélène de Montfort",
                      publication: "Parisian Optical Gazette"
                    },
                    {
                      quote: "Valoir achieves an optical instrument of surgical precision that feels weightless on the nose bridge.",
                      author: "Marco Santoro",
                      publication: "Milan Design Review"
                    },
                    {
                      quote: "Their mineral polarized lenses provide crystal clarity without chromatic aberration or peripheral distortion.",
                      author: "Dr. Kenji Takahashi",
                      publication: "Tokyo Optometry Quarterly"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-sm border border-[#E5E2DC] flex flex-col justify-between">
                      <p className="font-serif text-sm italic text-[#1A1A1A] leading-relaxed mb-4">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <div>
                        <div className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">{item.author}</div>
                        <div className="text-[11px] text-[#6B6864]">{item.publication}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. Private Register Newsletter */}
            <section className="py-16 bg-[#161618] text-[#FAF9F6] text-center border-t border-[#26262A]">
              <div className="max-w-xl mx-auto px-4">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C29B38] block mb-2">
                  THE PRIVATE REGISTER
                </span>
                <h2 className="font-serif text-3xl font-light mb-3 text-[#FAF9F6]">
                  Receive Invitations to Limited Bespoke Releases
                </h2>
                <p className="text-xs text-[#A8A59E] mb-6 leading-relaxed">
                  Members receive priority allocations for numbered 3D-milled titanium silhouettes and private salon trunk shows.
                </p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert("Thank you. You have been placed on the Valoir Private Register for bespoke allocations.");
                  }}
                  className="flex gap-2 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your personal email..."
                    className="flex-1 px-4 py-3 bg-[#222226] border border-[#333338] text-xs text-white rounded-xs outline-none focus:border-[#C29B38]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#FAF9F6] text-[#121214] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-white"
                  >
                    Register
                  </button>
                </form>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Store Footer */}
      <footer className="bg-[#121214] text-[#A8A59E] border-t border-[#282830] pt-16 pb-12 text-xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="font-serif text-2xl tracking-[0.2em] text-white uppercase mb-3">VALOIR</div>
              <p className="text-[11px] text-[#7A7873] leading-relaxed">
                Haute Lunetterie and precision optical instruments. Handcrafted in Sabae, Japan.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Atelier Salons</h4>
              <ul className="flex flex-col gap-1.5 text-[11px]">
                <li>Sabae: Fukui Optical District</li>
                <li>Paris: Rue Saint-Honoré 1er</li>
                <li>Tokyo: Ginza 6-Chome</li>
                <li>Dubai: DIFC Gate Precinct 4</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Customer Concierge</h4>
              <ul className="flex flex-col gap-1.5 text-[11px]">
                <li>Complimentary Bespoke Fitting</li>
                <li>Prescription &amp; Lens Sizing</li>
                <li>Ultrasonic Refurbishment</li>
                <li>Worldwide Courier Tracking</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Shopify Architecture</h4>
              <p className="text-[11px] text-[#7A7873] mb-3">
                Online Store 2.0 Theme package with 3D product media, bilingual English/Arabic RTL, and zero Dawn framework bloat.
              </p>
              <button
                type="button"
                onClick={() => setIsComplianceOpen(true)}
                className="text-xs text-[#C29B38] underline hover:text-white"
              >
                Review Theme Compliance Audit &rarr;
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-[#222226] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#555]">
            <div>© 2026 Valoir Eyewear Inc. All rights reserved. Registered optical trademark.</div>
            <div className="flex gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Caliper Guarantees</span>
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
      />

      {/* AR Space Modal */}
      {isARModalOpen && (
        <ARSpaceModal
          product={selectedProduct}
          onClose={() => setIsARModalOpen(false)}
        />
      )}

      {/* Compliance Audit Modal */}
      {isComplianceOpen && (
        <ComplianceAuditModal onClose={() => setIsComplianceOpen(false)} />
      )}
    </div>
  );
}

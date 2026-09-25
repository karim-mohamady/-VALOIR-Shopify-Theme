import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Shield, Truck, SlidersHorizontal, Heart, Image as ImageIcon, Ruler } from 'lucide-react';
import { EyewearProduct } from '../types';
import { TRANSLATIONS, ARABIC_PRODUCT_TRANSLATIONS } from '../data/translations';
import { PRODUCT_IMAGES } from '../assets/images';
import { SizeFitGuideModal } from './SizeFitGuideModal';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { LazyImage } from './LazyImage';

interface ProductDetailPageProps {
  product: EyewearProduct;
  onBack: () => void;
  onAddToCart: (product: EyewearProduct, color: string) => void;
  onSelectRelated: (product: EyewearProduct) => void;
  relatedProducts: EyewearProduct[];
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  language?: 'en' | 'ar';
  onSelectShapeCategory?: (shape: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onSelectRelated,
  relatedProducts,
  isWishlisted = false,
  onToggleWishlist,
  language = 'en',
  onSelectShapeCategory
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [lensOption, setLensOption] = useState<'sunglasses' | 'prescription' | 'blueblock'>('sunglasses');
  const [prescriptionNote, setPrescriptionNote] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const t = TRANSLATIONS[language];
  const arProd = language === 'ar' ? ARABIC_PRODUCT_TRANSLATIONS[product.id] : undefined;

  const displayTitle = arProd?.title || product.title;
  const displaySubtitle = arProd?.subtitle || product.subtitle;
  const displayShape = arProd?.shape || product.shape;
  const displayMaterial = arProd?.material || product.material;
  const displayLens = arProd?.lensMaterial || product.lensMaterial;

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const currentColorName = arProd?.colors?.[currentColor.name] || currentColor.name;
  const productImage = PRODUCT_IMAGES[product.id] || product.image;

  const handleAdd = () => {
    onAddToCart(product, currentColor.name);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const breadcrumbItems: BreadcrumbItem[] = [
    {
      label: t.productDetail.home,
      onClick: onBack
    },
    {
      label: displayShape,
      onClick: onSelectShapeCategory ? () => onSelectShapeCategory(product.shape) : onBack
    },
    {
      label: displayTitle,
      isCurrent: true
    }
  ];

  return (
    <div className="py-6 sm:py-10 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumbs
            items={breadcrumbItems}
            language={language}
            showBackButton={true}
            onBack={onBack}
            backLabel={t.productDetail.backButton}
          />
        </div>

        {/* Main Grid: Media & Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Crisp Packshot Stage */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Stage Container */}
            <div className="w-full aspect-[4/3] sm:aspect-square bg-white rounded-sm overflow-hidden border border-[#E5E2DC] shadow-xs relative flex flex-col items-center justify-center p-8">
              {productImage ? (
                <LazyImage
                  src={productImage}
                  alt={displayTitle}
                  aspectRatio="1/1"
                  priority={true}
                  containerClassName="w-full h-full max-h-[85%] max-w-[90%] flex items-center justify-center bg-transparent"
                  imageClassName="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
                  objectFit="contain"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ) : (
                <div className="w-full max-w-[340px] text-center">
                  <svg viewBox="0 0 160 65" className="w-full filter drop-shadow-md mb-4">
                    <ellipse
                      cx="45"
                      cy="34"
                      rx="26"
                      ry="22"
                      fill={currentColor.lensHex}
                      fillOpacity={currentColor.lensOpacity}
                      stroke={currentColor.frameHex}
                      strokeWidth="3.5"
                    />
                    <ellipse
                      cx="115"
                      cy="34"
                      rx="26"
                      ry="22"
                      fill={currentColor.lensHex}
                      fillOpacity={currentColor.lensOpacity}
                      stroke={currentColor.frameHex}
                      strokeWidth="3.5"
                    />
                    <path d="M 68 28 Q 80 20 92 28" fill="none" stroke={currentColor.frameHex} strokeWidth="3" />
                    <line x1="20" y1="30" x2="2" y2="24" stroke={currentColor.frameHex} strokeWidth="3" />
                    <line x1="140" y1="30" x2="158" y2="24" stroke={currentColor.frameHex} strokeWidth="3" />
                  </svg>
                  <p className="text-xs text-[#6B6864] uppercase tracking-wider font-semibold">Studio Editorial Profile</p>
                  <p className="text-[11px] text-[#6B6864] mt-1">{product.specs.origin} • Packshot Lighting</p>
                </div>
              )}

              {/* Badges */}
              <span className="absolute bottom-4 start-4 text-[10px] uppercase font-mono tracking-wider text-[#8A8782] bg-white/90 border border-[#E5E2DC] px-2.5 py-1 rounded">
                {language === 'ar' ? 'تصوير استوديو رسمي • ساباي، اليابان' : 'Atelier Studio Packshot • Sabae'}
              </span>

              {onToggleWishlist && (
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`absolute top-4 end-4 p-2.5 rounded-full border transition-all shadow-xs ${
                    isWishlisted
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white/90 border-[#E5E2DC] text-[#6B6864] hover:text-red-500'
                  }`}
                  title={isWishlisted ? 'Saved in wishlist' : 'Save to wishlist'}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-600' : ''}`} />
                </button>
              )}
            </div>

            {/* Gallery Info Bar */}
            <div className="p-3 bg-white border border-[#E5E2DC] rounded-sm text-xs text-[#6B6864] flex items-center justify-between font-mono">
              <span>{language === 'ar' ? 'المادة: ' + displayMaterial : 'Material: ' + displayMaterial}</span>
              <span>{product.specs.origin}</span>
            </div>
          </div>

          {/* Right Column: Spec, Variant Picker & Cart Actions (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Header Block */}
            <div className="border-b border-[#E5E2DC] pb-5">
              <div className="flex items-center justify-between text-xs text-[#6B6864] mb-2 uppercase tracking-widest font-semibold">
                <span className="text-[#C29B38]">{language === 'ar' ? 'دار فالوار • مشغل ساباي' : 'MAISON VALOIR • SABAE ATELIER'}</span>
                <span>{displayShape}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light leading-tight">
                {displayTitle}
              </h1>

              <p className="text-sm text-[#6B6864] mt-1 font-normal">
                {displaySubtitle}
              </p>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-light text-[#1A1A1A] font-serif">
                  ${product.price}.00
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-[#6B6864] line-through">
                    ${product.compareAtPrice}.00
                  </span>
                )}
                <span className="text-[11px] font-mono text-[#6B6864] bg-[#F2EFE9] px-2 py-0.5 rounded-sm">
                  {t.productDetail.taxIncluded}
                </span>
              </div>

              {/* Quick Dimension Specs & Size & Fit Guide Link */}
              <div className="mt-4 pt-3 border-t border-[#EFECE6] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-[#6B6864]">
                  <span className="font-mono text-[11px] bg-white border border-[#E5E2DC] px-2 py-0.5 rounded-sm text-[#1A1A1A]">
                    {product.specs.frameWidth} · {product.specs.lensHeight}
                  </span>
                  <span className="text-[11px] font-medium text-[#1A1A1A]">
                    {language === 'ar' ? `مقاس الإطار: ${displayShape}` : `Frame Fit: ${displayShape}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#C29B38] hover:text-[#9E7A22] font-semibold underline underline-offset-4 decoration-[#C29B38]/50 hover:decoration-[#C29B38] transition-colors cursor-pointer"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'دليل المقاسات والملاءمة' : 'Size & Fit Guide'}</span>
                </button>
              </div>
            </div>

            {/* Frame Finish Swatches */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  {t.productDetail.frameFinish} <span className="font-normal text-[#6B6864]">{currentColorName}</span>
                </span>
                <span className="text-[11px] text-[#6B6864]">{displayMaterial}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`flex items-center gap-2 p-1.5 pe-3 rounded-full border text-xs transition-all ${
                      selectedColorIndex === idx
                        ? 'border-[#1A1A1A] bg-white ring-1 ring-[#1A1A1A]'
                        : 'border-[#E5E2DC] bg-[#FAF9F6] hover:border-[#8C8882]'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-black/10 inline-block shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="font-medium text-[#1A1A1A]">{arProd?.colors?.[c.name] || c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optical Lens Customization Selector */}
            <div className="flex flex-col gap-2">
              <span className="font-semibold text-xs uppercase tracking-wider text-[#1A1A1A]">
                {t.productDetail.lensSelection}
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setLensOption('sunglasses')}
                  className={`p-3 text-start border rounded-sm text-xs transition-all ${
                    lensOption === 'sunglasses' ? 'border-[#1A1A1A] bg-white ring-1 ring-[#1A1A1A]' : 'border-[#E5E2DC] bg-[#FAF9F6]'
                  }`}
                >
                  <p className="font-semibold text-[#1A1A1A]">{t.productDetail.polarSun}</p>
                  <p className="text-[10px] text-[#6B6864] mt-0.5">{displayLens}</p>
                </button>
                <button
                  type="button"
                  onClick={() => setLensOption('blueblock')}
                  className={`p-3 text-start border rounded-sm text-xs transition-all ${
                    lensOption === 'blueblock' ? 'border-[#1A1A1A] bg-white ring-1 ring-[#1A1A1A]' : 'border-[#E5E2DC] bg-[#FAF9F6]'
                  }`}
                >
                  <p className="font-semibold text-[#1A1A1A]">{t.productDetail.blueBlock}</p>
                  <p className="text-[10px] text-[#6B6864] mt-0.5">+ $60 • Digital Shield</p>
                </button>
                <button
                  type="button"
                  onClick={() => setLensOption('prescription')}
                  className={`p-3 text-start border rounded-sm text-xs transition-all ${
                    lensOption === 'prescription' ? 'border-[#1A1A1A] bg-white ring-1 ring-[#1A1A1A]' : 'border-[#E5E2DC] bg-[#FAF9F6]'
                  }`}
                >
                  <p className="font-semibold text-[#1A1A1A]">{t.productDetail.customRx}</p>
                  <p className="text-[10px] text-[#6B6864] mt-0.5">+ $120 • 1.74 High Index</p>
                </button>
              </div>

              {lensOption === 'prescription' && (
                <div className="mt-2 p-3 bg-white border border-[#E5E2DC] rounded-sm flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-[#C29B38] font-medium">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>{t.productDetail.rxOptometryNotes}</span>
                  </div>
                  <input
                    type="text"
                    value={prescriptionNote}
                    onChange={(e) => setPrescriptionNote(e.target.value)}
                    placeholder={t.productDetail.rxPlaceholder}
                    className="w-full text-xs p-2 border border-[#E5E2DC] rounded bg-[#FAF9F6] outline-none focus:border-[#1A1A1A]"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons: Add to Bag + Sticky Bag Notification */}
            <div className="flex flex-col gap-3 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className={`w-full py-4 px-8 text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all flex items-center justify-center gap-2 ${
                  addedNotice
                    ? 'bg-[#2E7D32] text-white shadow-lg'
                    : 'bg-[#1A1A1A] text-[#FAF9F6] hover:bg-black shadow-md'
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>{t.productDetail.addedSuccess}</span>
                  </>
                ) : (
                  <span>{t.productDetail.addToBagBtn} — ${product.price}.00</span>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-[#6B6864] pt-2">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#8C8882]" />
                  {t.productDetail.dispatchTimeline}
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#8C8882]" />
                  {t.productDetail.lifetimeWarranty}
                </span>
              </div>
            </div>

            {/* Sabae Engineering Specifications Table */}
            <div className="border-t border-[#E5E2DC] pt-6 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg text-[#1A1A1A]">{t.productDetail.sabaeDossier}</h2>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#C29B38] hover:text-[#9E7A22] font-semibold py-1.5 px-3 rounded bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#C29B38] transition-colors shadow-2xs"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'دليل المقاسات والملاءمة' : 'Size & Fit Guide'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="text-[#6B6864]">{t.productDetail.frameWidth}</span>
                <span className="font-mono text-[#1A1A1A] text-end">{product.specs.frameWidth}</span>
                <span className="text-[#6B6864]">{t.productDetail.bridgeWidth}</span>
                <span className="font-mono text-[#1A1A1A] text-end">{product.specs.bridgeWidth}</span>
                <span className="text-[#6B6864]">{t.productDetail.lensHeight}</span>
                <span className="font-mono text-[#1A1A1A] text-end">{product.specs.lensHeight}</span>
                <span className="text-[#6B6864]">{t.productDetail.templeLength}</span>
                <span className="font-mono text-[#1A1A1A] text-end">{product.specs.templeLength}</span>
                <span className="text-[#6B6864]">{t.productDetail.chassisWeight}</span>
                <span className="font-mono text-[#1A1A1A] text-end">{product.specs.weight}</span>
                <span className="text-[#6B6864]">{t.productDetail.uvProtection}</span>
                <span className="font-mono text-[#1A1A1A] text-end">{product.specs.uvRating}</span>
              </div>
            </div>

            {/* Editorial Craft Story */}
            <div className="bg-[#F2EFE9] p-5 rounded-sm flex flex-col gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#C29B38] font-bold">
                {t.productDetail.craftNarrative}
              </span>
              <p className="text-xs text-[#524E48] leading-relaxed">
                {arProd?.editorialStory || product.editorialStory}
              </p>
            </div>
          </div>
        </div>

        {/* Related Bespoke Frames Carousel */}
        <div className="mt-20 pt-12 border-t border-[#E5E2DC]">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl text-[#1A1A1A]">{t.productDetail.relatedPieces}</h2>
            <span className="text-xs text-[#6B6864] uppercase tracking-wider">{t.productDetail.companionSilhouettes}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 3).map((rel) => {
              const arRel = language === 'ar' ? ARABIC_PRODUCT_TRANSLATIONS[rel.id] : undefined;
              const relImg = PRODUCT_IMAGES[rel.id] || rel.image;

              return (
                <div
                  key={rel.id}
                  onClick={() => {
                    onSelectRelated(rel);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-white border border-[#E5E2DC] rounded-sm p-4 cursor-pointer hover:border-[#1A1A1A] transition-colors group flex flex-col justify-between"
                >
                  <div className="aspect-[4/3] bg-[#FAF9F6] rounded-sm flex items-center justify-center p-4 overflow-hidden mb-3">
                    {relImg ? (
                      <LazyImage
                        src={relImg}
                        alt={rel.title}
                        aspectRatio="4/3"
                        containerClassName="w-full h-full flex items-center justify-center bg-transparent"
                        imageClassName="max-h-full max-w-full object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                        objectFit="contain"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    ) : (
                      <span className="text-xs font-mono text-[#8C8882]">{rel.shape}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-[#1A1A1A] group-hover:text-[#C29B38] transition-colors">
                      {arRel?.title || rel.title}
                    </h3>
                    <p className="text-xs text-[#6B6864] mt-0.5">${rel.price}.00</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Size & Fit Guide Modal */}
      <SizeFitGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        currentProduct={product}
        language={language}
      />
    </div>
  );
};

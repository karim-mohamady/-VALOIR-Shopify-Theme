import React, { useState } from 'react';
import { X, Check, ShoppingBag, ExternalLink, Heart } from 'lucide-react';
import { EyewearProduct } from '../types';
import { TRANSLATIONS, ARABIC_PRODUCT_TRANSLATIONS } from '../data/translations';
import { PRODUCT_IMAGES } from '../assets/images';
import { LazyImage } from './LazyImage';

interface QuickViewModalProps {
  product: EyewearProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: EyewearProduct, color: string) => void;
  onOpenFullDetail: (product: EyewearProduct) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  language?: 'en' | 'ar';
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenFullDetail,
  isWishlisted = false,
  onToggleWishlist,
  language = 'en'
}) => {
  if (!isOpen || !product) return null;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  const t = TRANSLATIONS[language];
  const arProd = language === 'ar' ? ARABIC_PRODUCT_TRANSLATIONS[product.id] : undefined;

  const displayTitle = arProd?.title || product.title;
  const displaySubtitle = arProd?.subtitle || product.subtitle;
  const displayShape = arProd?.shape || product.shape;
  const displayMaterial = arProd?.material || product.material;
  const displayDesc = arProd?.description || product.description;

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];
  const currentColorName = arProd?.colors?.[currentColor.name] || currentColor.name;
  const productImage = PRODUCT_IMAGES[product.id] || product.image;

  const handleAddToCart = () => {
    onAddToCart(product, currentColor.name);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white border border-[#E8E5DF] rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Icons */}
        <div className="absolute top-4 end-4 z-30 flex items-center gap-2">
          {onToggleWishlist && (
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              className={`p-2 rounded-full border transition-colors shadow-xs ${
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

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#6B6864] hover:text-[#1A1A1A] bg-white/90 backdrop-blur-xs hover:bg-white rounded-full border border-[#E5E2DC] transition-colors shadow-xs"
            aria-label="Close Quick View"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Preview Column */}
        <div className="w-full md:w-1/2 bg-[#F8F7F4] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-e border-[#E8E5DF]">
          {/* Media Header Controls */}
          <div className="flex items-center justify-between mb-4 z-10">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B6864] bg-white/90 px-2.5 py-1 rounded-full border border-[#E5E2DC]">
              {displayShape}
            </span>
            <span className="text-[10px] font-mono text-[#8C8882] uppercase">
              {product.specs.origin}
            </span>
          </div>

          {/* Media Canvas View */}
          <div className="aspect-square w-full relative flex items-center justify-center overflow-hidden rounded-md bg-white/50 border border-[#EFECE6] p-6">
            {productImage ? (
              <LazyImage
                src={productImage}
                alt={displayTitle}
                aspectRatio="1/1"
                priority={true}
                containerClassName="w-full h-full flex items-center justify-center bg-transparent"
                imageClassName="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-300 hover:scale-105"
                objectFit="contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <svg viewBox="0 0 160 65" className="w-full max-w-[240px] filter drop-shadow-md">
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
            )}
          </div>

          {/* Specs Micro-bar */}
          <div className="mt-4 pt-3 border-t border-[#E8E5DF] flex items-center justify-between text-[11px] text-[#6B6864] font-mono">
            <span>{language === 'ar' ? 'الوزن: ' + product.specs.weight : 'Weight: ' + product.specs.weight}</span>
            <span>{product.specs.uvRating}</span>
          </div>
        </div>

        {/* Product Details & Purchase Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Origin & Availability */}
            <div className="flex items-center justify-between text-xs text-[#787571] mb-2 font-mono">
              <span className="uppercase tracking-wider">{product.specs.origin}</span>
              <span className="text-[#2E7D32] flex items-center gap-1 font-sans">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                {language === 'ar' ? 'متوفر للتسليم الفوري' : 'In Stock & Ready to Ship'}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] leading-tight mb-1">
              {displayTitle}
            </h2>
            <p className="text-xs text-[#7A7873] uppercase tracking-wider mb-4 font-mono">
              {displaySubtitle}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-4 border-b border-[#E8E5DF]">
              <span className="text-2xl font-serif text-[#1A1A1A]">
                ${product.price}.00
              </span>
              {product.compareAtPrice && (
                <span className="text-sm text-[#8A8782] line-through font-mono">
                  ${product.compareAtPrice}.00
                </span>
              )}
            </div>

            {/* Short Editorial Description */}
            <p className="text-xs sm:text-sm text-[#5C5955] leading-relaxed mb-6">
              {displayDesc}
            </p>

            {/* Color Finish Picker */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#6B6864] uppercase tracking-wider font-semibold">
                  {language === 'ar' ? 'اللون والطلاء:' : 'Finish / Colorway:'}
                </span>
                <span className="font-medium text-[#1A1A1A]">{currentColorName}</span>
              </div>
              <div className="flex items-center gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColorIndex === idx
                        ? 'border-[#1A1A1A] scale-110 shadow-sm'
                        : 'border-[#D4D0C7] hover:border-[#1A1A1A]'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={arProd?.colors?.[c.name] || c.name}
                  />
                ))}
              </div>
            </div>

            {/* Material & Optics Pill */}
            <div className="bg-[#FAF9F6] border border-[#E8E5DF] p-3 rounded text-xs text-[#5C5955] mb-6">
              <p className="font-semibold text-[#1A1A1A] mb-0.5">
                {language === 'ar' ? 'مواصفات الصناعة والبصريات:' : 'Artisanal Build & Optics:'}
              </p>
              <p className="leading-normal">{displayMaterial}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-3 pt-4 border-t border-[#E8E5DF]">
            <button
              type="button"
              onClick={handleAddToCart}
              className={`w-full py-3.5 px-6 rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                addedNotice
                  ? 'bg-[#2E7D32] text-white'
                  : 'bg-[#1A1A1A] text-white hover:bg-black shadow-md'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{language === 'ar' ? 'تمت الإضافة لحقيبة التسوق ✓' : 'Added to Bag ✓'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#C29B38]" />
                  <span>{language === 'ar' ? 'إضافة إلى حقيبة التسوق' : 'Add to Shopping Bag'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenFullDetail(product);
              }}
              className="w-full py-2.5 px-4 text-xs font-medium text-[#6B6864] hover:text-[#1A1A1A] hover:bg-[#FAF9F6] rounded border border-transparent hover:border-[#E8E5DF] flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{language === 'ar' ? 'عرض تفاصيل النظارة الكاملة وشهادة المنشأ' : 'View Full Product Dossier & Sabae Specs'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

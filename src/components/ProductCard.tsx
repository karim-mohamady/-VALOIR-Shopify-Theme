import React, { useState } from 'react';
import { Eye, Plus, Sparkles, Heart } from 'lucide-react';
import { EyewearProduct } from '../types';
import { TRANSLATIONS, ARABIC_PRODUCT_TRANSLATIONS } from '../data/translations';
import { PRODUCT_IMAGES } from '../assets/images';
import { LazyImage } from './LazyImage';

interface ProductCardProps {
  product: EyewearProduct;
  onSelectProduct: (product: EyewearProduct) => void;
  onQuickAdd: (product: EyewearProduct, color: string) => void;
  onQuickView?: (product: EyewearProduct) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  aspectRatio?: '4/5' | '1/1' | '16/9';
  showSwatches?: boolean;
  language?: 'en' | 'ar';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAdd,
  onQuickView,
  isWishlisted = false,
  onToggleWishlist,
  aspectRatio = '4/5',
  showSwatches = true,
  language = 'en'
}) => {
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const activeColor = product.colors[activeColorIndex] || product.colors[0];

  const t = TRANSLATIONS[language];
  const arProd = language === 'ar' ? ARABIC_PRODUCT_TRANSLATIONS[product.id] : undefined;

  const displayTitle = arProd?.title || product.title;
  const displaySubtitle = arProd?.subtitle || product.subtitle;
  const displayShape = arProd?.shape || product.shape;
  const originLabel = language === 'ar' ? 'ساباي، فوكوي، اليابان' : product.specs.origin;

  const aspectClass =
    aspectRatio === '1/1' ? 'aspect-square' :
    aspectRatio === '16/9' ? 'aspect-[16/9]' : 'aspect-[4/5]';

  const productImage = PRODUCT_IMAGES[product.id] || product.image;

  return (
    <div className="group relative flex flex-col justify-between bg-white border border-[#E8E5DF] rounded-md p-4 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-[1.018] hover:shadow-2xl hover:shadow-[#1A1A1A]/8 hover:border-[#C29B38]/60 will-change-transform">
      {/* Visual Image Box */}
      <div
        className={`relative w-full ${aspectClass} bg-[#F8F7F4] rounded-sm overflow-hidden flex items-center justify-center p-4`}
      >
        {/* Badges & Actions (Top Left & Top Right) */}
        <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
          {/* Wishlist Heart Icon */}
          <div className="pointer-events-auto">
            {onToggleWishlist && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product.id);
                }}
                className={`p-1.5 rounded-full border transition-all shadow-xs ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-600 scale-105'
                    : 'bg-white/95 border-[#E5E2DC] text-[#6B6864] hover:text-red-500 hover:bg-white'
                }`}
                title={
                  isWishlisted
                    ? (language === 'ar' ? 'محفوظ في قائمة الرغبات' : 'Saved in wishlist')
                    : (language === 'ar' ? 'حفظ في قائمة الرغبات' : 'Save to wishlist')
                }
                aria-label="Toggle Wishlist"
              >
                <Heart
                  className={`w-3.5 h-3.5 transition-colors ${
                    isWishlisted ? 'fill-red-600 text-red-600' : ''
                  }`}
                />
              </button>
            )}
          </div>

          {/* Frame Shape Badge & Quick View dedicated icon */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            {onQuickView && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickView(product);
                }}
                className="p-1.5 bg-white/95 hover:bg-[#1A1A1A] text-[#6B6864] hover:text-white rounded-full border border-[#E5E2DC] transition-colors shadow-xs"
                title={language === 'ar' ? 'نظرة سريعة على المنتج' : 'Quick View Modal'}
                aria-label="Quick View"
              >
                <Sparkles className="w-3 h-3 text-[#C29B38]" />
              </button>
            )}
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B6864] bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-[#E5E2DC]">
              {displayShape}
            </span>
          </div>
        </div>

        {/* Content Area: Crisp Packshot with Responsive LazyImage */}
        <div
          onClick={() => onSelectProduct(product)}
          className="w-full h-full flex items-center justify-center cursor-pointer transition-transform duration-500 ease-out group-hover:scale-105"
        >
          {productImage ? (
            <LazyImage
              src={productImage}
              alt={displayTitle}
              aspectRatio={aspectRatio}
              containerClassName="w-full h-full flex items-center justify-center bg-transparent"
              imageClassName="w-full h-full object-contain filter drop-shadow-sm"
              objectFit="contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              decoding="async"
            />
          ) : (
            /* Fallback Crisp SVG Vector Silhouette */
            <svg viewBox="0 0 160 65" className="w-full max-w-[200px] filter drop-shadow-sm">
              <ellipse
                cx="45"
                cy="34"
                rx={product.shape.includes('Square') ? '24' : '26'}
                ry={product.shape.includes('Aviator') ? '22' : '19'}
                fill={activeColor.lensHex}
                fillOpacity={activeColor.lensOpacity}
                stroke={activeColor.frameHex}
                strokeWidth="3.5"
              />
              <ellipse
                cx="115"
                cy="34"
                rx={product.shape.includes('Square') ? '24' : '26'}
                ry={product.shape.includes('Aviator') ? '22' : '19'}
                fill={activeColor.lensHex}
                fillOpacity={activeColor.lensOpacity}
                stroke={activeColor.frameHex}
                strokeWidth="3.5"
              />
              <path d="M 68 28 Q 80 20 92 28" fill="none" stroke={activeColor.frameHex} strokeWidth="3" />
              {product.shape === 'Aviator' && (
                <path d="M 45 13 Q 80 12 115 13" fill="none" stroke={activeColor.frameHex} strokeWidth="2.5" />
              )}
              <line x1="20" y1="30" x2="2" y2="24" stroke={activeColor.frameHex} strokeWidth="3" />
              <line x1="140" y1="30" x2="158" y2="24" stroke={activeColor.frameHex} strokeWidth="3" />
            </svg>
          )}
        </div>

        {/* Hover Quick Action to Open Quick View Modal or Atelier Detail */}
        <div className="absolute inset-x-3 bottom-3 z-20 flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 bg-white/95 text-[#1A1A1A] hover:bg-white text-xs font-semibold py-2.5 px-3 rounded-sm shadow-md border border-[#E5E2DC] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>{language === 'ar' ? 'نظرة سريعة' : 'Quick View'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            aria-label={language === 'ar' ? `عرض تفاصيل ${displayTitle}` : `View details for ${displayTitle}`}
            className={`${onQuickView ? 'flex-1' : 'w-full'} bg-[#1A1A1A] text-[#FAF9F6] text-xs font-semibold py-2.5 px-3 rounded-sm shadow-lg hover:bg-black flex items-center justify-center gap-1.5 transition-colors`}
          >
            <Eye className="w-3.5 h-3.5 text-[#C29B38]" />
            <span>{language === 'ar' ? 'عرض التفاصيل' : 'View Details'}</span>
          </button>
        </div>
      </div>

      {/* Product Details Meta */}
      <div className="mt-3.5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#787571] mb-1 font-mono">
            <span>{originLabel}</span>
            <span>{product.specs.weight}</span>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-lg font-medium text-[#1A1A1A] cursor-pointer hover:text-[#C29B38] transition-colors leading-snug"
          >
            {displayTitle}
          </h3>

          <p className="text-xs text-[#6B6864] line-clamp-1 mt-0.5">
            {displaySubtitle}
          </p>
        </div>

        {/* Swatches & Price */}
        <div className="mt-3.5 pt-3 border-t border-[#EFECE6] flex items-center justify-between gap-2">
          {showSwatches ? (
            <div className="flex items-center gap-1.5" aria-label="Color finishes">
              {product.colors.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveColorIndex(idx)}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    activeColorIndex === idx ? 'ring-2 ring-offset-1 ring-[#1A1A1A] scale-110' : 'border-[#D4D0C7]'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={arProd?.colors?.[c.name] || c.name}
                  aria-label={arProd?.colors?.[c.name] || c.name}
                />
              ))}
            </div>
          ) : <div />}

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#1A1A1A]">
              ${product.price}.00
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#8A8782] line-through font-mono">
                ${product.compareAtPrice}.00
              </span>
            )}
            <button
              type="button"
              onClick={() => onQuickAdd(product, activeColor.name)}
              className="p-1.5 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white rounded-sm transition-colors"
              title="Add to Shopping Bag"
              aria-label={`Add ${displayTitle} to shopping bag`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

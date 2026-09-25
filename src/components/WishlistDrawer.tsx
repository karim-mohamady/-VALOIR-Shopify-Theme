import React, { useEffect } from 'react';
import { X, Heart, Trash2, ShoppingBag, Eye, ArrowRight, ArrowLeft } from 'lucide-react';
import { EyewearProduct } from '../types';
import { TRANSLATIONS, ARABIC_PRODUCT_TRANSLATIONS } from '../data/translations';
import { PRODUCT_IMAGES } from '../assets/images';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: EyewearProduct[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: EyewearProduct, color: string) => void;
  onSelectProduct: (product: EyewearProduct) => void;
  language?: 'en' | 'ar';
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language];

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className={`fixed inset-0 z-50 flex ${language === 'ar' ? 'justify-start' : 'justify-end'}`}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={language === 'ar' ? 'قائمة الرغبات والمحفوظات' : 'Saved Wishlist'}
        className={`relative w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col z-10 duration-300 ${
          language === 'ar'
            ? 'border-e border-[#E5E2DC] animate-in slide-in-from-left'
            : 'border-s border-[#E5E2DC] animate-in slide-in-from-right'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E5E2DC] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C29B38] fill-[#C29B38]" />
            <h2 className="font-serif text-lg font-medium text-[#1A1A1A]">
              {language === 'ar' ? 'قائمة الرغبات' : 'Wishlist'}
            </h2>
            <span className="text-xs bg-[#F2EFE9] text-[#6B6864] font-mono px-2 py-0.5 rounded-full">
              {wishlistProducts.length}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6B6864] hover:text-[#1A1A1A] transition-colors rounded-sm hover:bg-[#FAF9F6]"
            aria-label="Close Wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-[#E5E2DC]">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6B6864]">
              <div className="w-16 h-16 rounded-full bg-[#F2EFE9] flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-[#A8A59E]" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-2">
                {language === 'ar' ? 'قائمة الرغبات فارغة' : 'Your wishlist is empty'}
              </h3>
              <p className="text-xs text-[#7A7873] max-w-[240px] leading-relaxed mb-6">
                {language === 'ar'
                  ? 'انقر على أيقونة القلب على أي نظارة لحفظها في هذه القائمة الخاصة والرجوع إليها لاحقاً.'
                  : 'Click the heart icon on any eyewear piece to save it to your personal curation.'}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
              >
                {language === 'ar' ? 'استكشف التشكيلة' : 'Explore Catalog'}
              </button>
            </div>
          ) : (
            wishlistProducts.map((product) => {
              const arProd = language === 'ar' ? ARABIC_PRODUCT_TRANSLATIONS[product.id] : undefined;
              const displayTitle = arProd?.title || product.title;
              const displaySubtitle = arProd?.subtitle || product.subtitle;
              const productImage = PRODUCT_IMAGES[product.id] || product.image;
              const firstColor = product.colors[0];

              return (
                <div key={product.id} className="py-4 flex gap-4 items-center">
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProduct(product);
                    }}
                    className="w-20 h-20 bg-white rounded border border-[#E5E2DC] flex items-center justify-center p-2 cursor-pointer shrink-0 hover:border-[#C29B38] transition-colors"
                  >
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={displayTitle}
                        className="max-h-full max-w-full object-contain filter drop-shadow-xs"
                      />
                    ) : (
                      <span className="text-[10px] font-mono text-[#8C8882]">{product.shape}</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4
                      onClick={() => {
                        onClose();
                        onSelectProduct(product);
                      }}
                      className="font-serif text-sm font-medium text-[#1A1A1A] hover:text-[#C29B38] cursor-pointer truncate"
                    >
                      {displayTitle}
                    </h4>
                    <p className="text-[11px] text-[#6B6864] truncate">{displaySubtitle}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold text-[#1A1A1A]">${product.price}.00</span>
                      {product.compareAtPrice && (
                        <span className="text-[10px] text-[#8C8882] line-through font-mono">
                          ${product.compareAtPrice}.00
                        </span>
                      )}
                    </div>

                    {/* Quick Move to Bag */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => onAddToCart(product, firstColor.name)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1A1A1A] bg-white border border-[#DDD9D1] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white px-2.5 py-1 rounded-sm transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3 text-[#C29B38]" />
                        <span>{language === 'ar' ? 'إضافة للحقيبة' : 'Move to Bag'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="p-1 text-[#8C8882] hover:text-red-600 transition-colors"
                        title={language === 'ar' ? 'إزالة من المحفوظات' : 'Remove from wishlist'}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-6 border-t border-[#E5E2DC] bg-white">
            <p className="text-[11px] text-[#7A7873] text-center mb-3">
              {language === 'ar'
                ? 'يتم حفظ اختياراتك تلقائياً في متصفحك للرجوع إليها في أي وقت.'
                : 'Your saved items are securely preserved in your local browser storage.'}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
            >
              {language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

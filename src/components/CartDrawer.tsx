import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { CartLineItem } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartLineItem[];
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  threshold?: number;
  language?: 'en' | 'ar';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  threshold = 250,
  language = 'en'
}) => {
  const t = TRANSLATIONS[language];
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const remainingForFreeShipping = Math.max(0, threshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / threshold) * 100);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const CheckoutArrow = language === 'ar' ? ArrowLeft : ArrowRight;

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
        aria-label={t.cart.title}
        className={`relative w-full max-w-md bg-[#FAF9F6] h-full shadow-2xl flex flex-col z-10 duration-300 ${
          language === 'ar'
            ? 'border-e border-[#E5E2DC] animate-in slide-in-from-left'
            : 'border-s border-[#E5E2DC] animate-in slide-in-from-right'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E5E2DC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-xl text-[#1A1A1A]">{t.cart.title}</h2>
            <span className="text-xs bg-[#F2EFE9] text-[#6B6864] px-2 py-0.5 rounded-full font-mono">
              {items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6B6864] hover:text-[#1A1A1A] rounded-full hover:bg-[#F2EFE9] transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Free Shipping Threshold Meter */}
        <div className="p-4 bg-white border-b border-[#E5E2DC]">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="flex items-center gap-1 text-[#1A1A1A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
              {remainingForFreeShipping === 0 ? (
                <span className="text-[#C29B38] font-semibold">{t.cart.freeShippingUnlocked}</span>
              ) : (
                <>
                  {t.cart.freeShippingAdd} <strong className="text-[#1A1A1A] px-1">${remainingForFreeShipping}.00</strong> {language === 'ar' ? 'للحصول على شحن مجاني' : 'for Free Express Shipping'}
                </>
              )}
            </span>
            <span className="text-[#6B6864] font-mono text-[11px]">{Math.round(shippingProgress)}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#EAE6DE] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C29B38] transition-all duration-500 ease-out"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-[#F2EFE9] flex items-center justify-center text-[#6B6864] mb-3">
                <ShieldCheck className="w-8 h-8 text-[#C29B38]" />
              </div>
              <h3 className="font-serif text-lg text-[#1A1A1A] mb-1">{t.cart.emptyTitle}</h3>
              <p className="text-xs text-[#6B6864] max-w-xs mb-4">
                {t.cart.emptyDesc}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1A1A1A] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
              >
                {t.cart.browseButton}
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.key}
                className="bg-white p-3.5 border border-[#E5E2DC] rounded-sm flex gap-3.5 items-center justify-between"
              >
                {/* Visual Swatch Pill */}
                <div
                  className="w-14 h-14 rounded-xs flex items-center justify-center shrink-0 border border-[#E5E2DC]"
                  style={{ backgroundColor: item.imageColor || '#F6F3ED' }}
                >
                  <span className="text-[10px] font-serif text-[#1A1A1A] font-semibold text-center px-1">
                    VALOIR
                  </span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm text-[#1A1A1A] truncate">{item.title}</h4>
                  <div className="text-[11px] text-[#6B6864] flex items-center gap-1.5 mt-0.5">
                    <span>{item.variantColor}</span>
                    <span>•</span>
                    <span className="font-medium text-[#1A1A1A]">${item.price}.00</span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-[#E5E2DC] rounded-xs bg-[#FAF9F6]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.key, -1)}
                        className="p-1 text-[#6B6864] hover:text-[#1A1A1A]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-mono font-medium text-[#1A1A1A]">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.key, 1)}
                        className="p-1 text-[#6B6864] hover:text-[#1A1A1A]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.key)}
                      className="p-1 text-[#6B6864] hover:text-red-600 transition-colors ms-auto"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Subtotal & Checkout */}
        {items.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E5E2DC] flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-wider text-[#6B6864] font-medium">{t.cart.subtotal}</span>
              <span className="font-serif text-xl font-light text-[#1A1A1A]">
                ${subtotal}.00
              </span>
            </div>

            <p className="text-[11px] text-[#6B6864]">
              {t.cart.taxNote}
            </p>

            <button
              type="button"
              onClick={() => {
                alert(`${t.cart.checkoutAlert} (${items.length} ${language === 'ar' ? 'قطع' : 'items'}). ${t.cart.subtotal}: $${subtotal}.00`);
              }}
              className="w-full py-4 bg-[#1A1A1A] text-[#FAF9F6] text-xs font-bold uppercase tracking-[0.18em] rounded-sm hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{t.cart.checkoutButton}</span>
              <CheckoutArrow className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Globe, Heart } from 'lucide-react';
import { ViewMode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface StoreHeaderProps {
  cartCount: number;
  wishlistCount?: number;
  onOpenCart: () => void;
  onOpenWishlist?: () => void;
  onOpenSearch: () => void;
  language: 'en' | 'ar';
  onToggleLanguage: () => void;
  activeView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onSelectCategory: (shape?: string) => void;
  announcementText?: string;
  showAnnouncement?: boolean;
}

export const StoreHeader: React.FC<StoreHeaderProps> = ({
  cartCount,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  language,
  onToggleLanguage,
  activeView,
  onSelectView,
  onSelectCategory,
  announcementText,
  showAnnouncement = true
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[language];

  const defaultAnnouncement = announcementText || t.announcement.defaultText;

  const navLinks = [
    { label: t.header.optical, shape: 'Ultra-Thin Titanium' },
    { label: t.header.sunglasses, shape: 'Aviator' },
    { label: t.header.geometric, shape: 'Geometric Square' },
    { label: t.header.panto, shape: 'Panto Round' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#EAE7E1] transition-all">
      {/* Top Announcement Bar - Clean & Elegant */}
      {showAnnouncement && (
        <div className="bg-[#1A1A1A] text-[#FAF9F6] text-[11px] sm:text-xs py-2 px-4 text-center font-normal tracking-wide flex items-center justify-center gap-2">
          <span>{defaultAnnouncement}</span>
          <button
            type="button"
            className="text-[#C29B38] underline underline-offset-2 hover:text-white transition-colors cursor-pointer"
            onClick={() => onSelectCategory()}
          >
            {t.announcement.exploreLink}
          </button>
        </div>
      )}

      {/* Main Clean Luxury Navbar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Left: Mobile Toggle & Minimalist Clean Navigation */}
        <div className="flex items-center gap-8">
          <button
            type="button"
            className="lg:hidden p-2 -ms-2 text-[#1A1A1A] hover:text-[#C29B38] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t.header.mobileMenu}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Clean Editorial Links without visual clutter */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectView('storefront');
                  onSelectCategory(item.shape);
                }}
                className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#4A4744] hover:text-[#1A1A1A] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-0 hover:after:w-full after:h-[1.5px] after:bg-[#C29B38] after:transition-all"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Haute Horlogerie & Eyewear Monogram Logo */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => {
              onSelectView('storefront');
              onSelectCategory(undefined);
            }}
            className="group flex flex-col items-center justify-center transition-transform hover:opacity-90"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.28em] font-light text-[#1A1A1A] uppercase">
              VALOIR
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#8C8882] -mt-1 group-hover:text-[#C29B38] transition-colors">
              HAUTE OPTIQUE
            </span>
          </button>
        </div>

        {/* Right: Actions (Language, Search, Wishlist, Cart Bag) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Minimalist Language Switcher */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1A] hover:text-[#C29B38] bg-transparent px-2.5 py-1.5 rounded-full border border-[#DDD9D1] hover:border-[#1A1A1A] transition-all"
            title={language === 'en' ? 'التحويل إلى العربية (RTL)' : 'Switch to English (LTR)'}
          >
            <Globe className="w-3.5 h-3.5 text-[#C29B38]" />
            <span className="font-medium text-[11px] tracking-wider">{language === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Minimalist Search Icon */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2 text-[#1A1A1A] hover:text-[#C29B38] transition-colors"
            aria-label={t.header.searchAria}
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Heart Icon with dynamic badge */}
          {onOpenWishlist && (
            <button
              type="button"
              onClick={onOpenWishlist}
              className="relative p-2 text-[#1A1A1A] hover:text-red-600 transition-colors flex items-center"
              aria-label={language === 'ar' ? 'قائمة الرغبات والمحفوظات' : 'Wishlist'}
              title={language === 'ar' ? 'قائمة الرغبات والمحفوظات' : 'Wishlist'}
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-red-600 text-red-600' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>
          )}

          {/* Cart Bag Icon with refined gold counter */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2 text-[#1A1A1A] hover:text-[#C29B38] transition-colors flex items-center"
            aria-label={`${t.header.cartAria} (${cartCount})`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C29B38] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#E5E2DC] px-6 py-6 flex flex-col gap-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 pb-4 border-b border-[#E5E2DC]">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectView('storefront');
                  onSelectCategory(item.shape);
                  setMobileMenuOpen(false);
                }}
                className="text-start text-sm uppercase tracking-widest font-medium text-[#1A1A1A] py-2 hover:text-[#C29B38]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-[#6B6864]">
              {language === 'ar' ? 'اللغة والاتجاه' : 'Language & Region'}
            </span>
            <button
              type="button"
              onClick={() => {
                onToggleLanguage();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-[#1A1A1A] underline"
            >
              {language === 'en' ? 'التحويل للعربية (RTL)' : 'Switch to English'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

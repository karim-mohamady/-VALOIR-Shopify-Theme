import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Globe, Sliders, Code, ShieldCheck, Box } from 'lucide-react';
import { ViewMode } from '../types';

interface StoreHeaderProps {
  cartCount: number;
  onOpenCart: () => void;
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
  onOpenCart,
  onOpenSearch,
  language,
  onToggleLanguage,
  activeView,
  onSelectView,
  onSelectCategory,
  announcementText = "Complimentary Worldwide Express Courier & Precision Prescription Service on orders over $250",
  showAnnouncement = true
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState('USD');

  const navLinks = [
    { label: language === 'ar' ? 'البصريات' : 'Optical', shape: 'Ultra-Thin Titanium' },
    { label: language === 'ar' ? 'النظارات الشمسية' : 'Sunglasses', shape: 'Aviator' },
    { label: language === 'ar' ? 'المربع الهندسي' : 'Geometric Square', shape: 'Geometric Square' },
    { label: language === 'ar' ? 'المستدير الكلاسيكي' : 'Panto Round', shape: 'Panto Round' },
    { label: language === 'ar' ? 'معمل 3D' : '3D Optical Lab', is3D: true }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E5E2DC] transition-colors">
      {/* Top Announcement Bar */}
      {showAnnouncement && (
        <div className="bg-[#1A1A1A] text-[#FAF9F6] text-xs py-2 px-4 text-center font-normal tracking-wide flex items-center justify-center gap-3">
          <span>{announcementText}</span>
          <span className="hidden md:inline text-[#C29B38] underline cursor-pointer hover:text-white" onClick={() => onSelectCategory()}>
            {language === 'ar' ? 'استكشف المجموعة' : 'Explore Atelier'}
          </span>
        </div>
      )}

      {/* Main Header Row */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Desktop Nav */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="md:hidden p-2 text-[#1A1A1A] hover:text-[#C29B38]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectView('storefront');
                  if (item.shape) {
                    onSelectCategory(item.shape);
                  } else {
                    onSelectCategory(undefined);
                  }
                }}
                className="text-xs uppercase tracking-[0.16em] font-medium text-[#1A1A1A] hover:text-[#C29B38] transition-colors flex items-center gap-1.5"
              >
                {item.is3D && <Box className="w-3.5 h-3.5 text-[#C29B38]" />}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: Brand Logo */}
        <div className="flex-1 text-center md:flex-initial">
          <button
            type="button"
            onClick={() => {
              onSelectView('storefront');
              onSelectCategory(undefined);
            }}
            className="text-2xl sm:text-3xl font-serif tracking-[0.24em] font-light text-[#1A1A1A] hover:opacity-80 transition-opacity uppercase"
          >
            VALOIR
          </button>
        </div>

        {/* Right: Actions, Language/Currency, View Switcher & Bag */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* View Mode Quick Tabs (Shopify Simulator Suite) */}
          <div className="hidden xl:flex items-center bg-[#F2EFE9] p-0.5 rounded-sm border border-[#E5E2DC] text-[11px] font-medium">
            <button
              type="button"
              onClick={() => onSelectView('storefront')}
              className={`px-2.5 py-1 rounded-sm transition-colors ${activeView === 'storefront' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-[#6B6864] hover:text-[#1A1A1A]'}`}
            >
              Storefront
            </button>
            <button
              type="button"
              onClick={() => onSelectView('theme_editor')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-sm transition-colors ${activeView === 'theme_editor' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-[#6B6864] hover:text-[#1A1A1A]'}`}
            >
              <Sliders className="w-3 h-3" />
              Theme Editor
            </button>
            <button
              type="button"
              onClick={() => onSelectView('code_explorer')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-sm transition-colors ${activeView === 'code_explorer' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-[#6B6864] hover:text-[#1A1A1A]'}`}
            >
              <Code className="w-3 h-3" />
              Liquid Code
            </button>
            <button
              type="button"
              onClick={() => onSelectView('compliance_audit')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-sm transition-colors ${activeView === 'compliance_audit' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-[#6B6864] hover:text-[#1A1A1A]'}`}
            >
              <ShieldCheck className="w-3 h-3 text-[#C29B38]" />
              Store Audit &amp; ZIP
            </button>
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={onToggleLanguage}
            className="flex items-center gap-1 text-xs font-medium text-[#6B6864] hover:text-[#1A1A1A] px-2 py-1 rounded border border-[#E5E2DC] hover:border-[#1A1A1A] transition-colors"
            title="Toggle English / Arabic RTL"
          >
            <Globe className="w-3.5 h-3.5 text-[#C29B38]" />
            <span className="uppercase">{language === 'en' ? 'AR (عربي)' : 'EN'}</span>
          </button>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="p-2 text-[#1A1A1A] hover:text-[#C29B38] transition-colors"
            aria-label="Search Eyewear Models"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Bag Icon with dynamic counter */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative p-2 text-[#1A1A1A] hover:text-[#C29B38] transition-colors flex items-center"
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#C29B38] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] border-b border-[#E5E2DC] px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3 pb-4 border-b border-[#E5E2DC]">
            {navLinks.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  onSelectView('storefront');
                  if (item.shape) onSelectCategory(item.shape);
                  else onSelectCategory(undefined);
                  setMobileMenuOpen(false);
                }}
                className="text-left text-sm uppercase tracking-wider font-medium text-[#1A1A1A] py-1 hover:text-[#C29B38]"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <span className="text-[11px] font-semibold text-[#6B6864] uppercase tracking-wider">Theme Mode</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => { onSelectView('theme_editor'); setMobileMenuOpen(false); }}
                className="p-2 text-left bg-white border border-[#E5E2DC] rounded font-medium"
              >
                Theme Editor
              </button>
              <button
                type="button"
                onClick={() => { onSelectView('code_explorer'); setMobileMenuOpen(false); }}
                className="p-2 text-left bg-white border border-[#E5E2DC] rounded font-medium"
              >
                Liquid Code
              </button>
              <button
                type="button"
                onClick={() => { onSelectView('compliance_audit'); setMobileMenuOpen(false); }}
                className="p-2 text-left bg-white border border-[#E5E2DC] rounded font-medium col-span-2 text-[#C29B38]"
              >
                Store Audit &amp; Download ZIP
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

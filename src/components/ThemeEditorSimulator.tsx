import React from 'react';
import { Sliders, RotateCcw, Layout, ShoppingCart, Globe, Heart, FlipHorizontal, Activity } from 'lucide-react';
import { ThemeSettingsState } from '../types';

interface ThemeEditorSimulatorProps {
  settings: ThemeSettingsState;
  onUpdateSettings: (newSettings: Partial<ThemeSettingsState>) => void;
  onResetSettings: () => void;
  onClose: () => void;
  onOpenPerformanceDashboard?: () => void;
  isPerformanceDashboardOpen?: boolean;
}

export const ThemeEditorSimulator: React.FC<ThemeEditorSimulatorProps> = ({
  settings,
  onUpdateSettings,
  onResetSettings,
  onClose,
  onOpenPerformanceDashboard,
  isPerformanceDashboardOpen = false
}) => {
  return (
    <div className="bg-[#FAF9F6] border-b border-[#E5E2DC] shadow-md p-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E2DC] mb-6">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#C29B38]" />
            <h2 className="font-serif text-lg text-[#1A1A1A]">Shopify Theme Customizer Simulator</h2>
            <span className="text-[11px] font-mono bg-[#EAE6DE] px-2 py-0.5 rounded text-[#6B6864]">
              theme/config/settings_schema.json
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onResetSettings}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#6B6864] hover:text-[#1A1A1A] bg-white border border-[#E5E2DC] rounded hover:bg-[#F2EFE9] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Defaults
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1A1A1A] rounded hover:bg-black transition-colors"
            >
              Close Editor
            </button>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          {/* Section 1: Layout & Product Cards */}
          <div className="bg-white p-4 rounded border border-[#E5E2DC] flex flex-col gap-3">
            <div className="flex items-center gap-2 font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
              <Layout className="w-4 h-4 text-[#C29B38]" />
              Catalog Layout &amp; Packshot
            </div>

            <div className="flex flex-col gap-1 text-[#6B6864]">
              <span>Card Aspect Ratio</span>
              <div className="grid grid-cols-3 gap-1">
                {(['4/5', '1/1', '16/9'] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => onUpdateSettings({ cardAspectRatio: ratio })}
                    className={`p-1.5 rounded border text-center font-mono text-[11px] ${
                      settings.cardAspectRatio === ratio ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-[#FAF9F6] border-[#E5E2DC] text-[#6B6864]'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex items-center justify-between text-[#6B6864] cursor-pointer mt-1">
              <span>Color Swatches on Cards</span>
              <input
                type="checkbox"
                checked={settings.showColorSwatches}
                onChange={(e) => onUpdateSettings({ showColorSwatches: e.target.checked })}
                className="accent-[#C29B38]"
              />
            </label>
          </div>

          {/* Section 2: Localization & Language */}
          <div className="bg-white p-4 rounded border border-[#E5E2DC] flex flex-col gap-3">
            <div className="flex items-center gap-2 font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
              <Globe className="w-4 h-4 text-[#C29B38]" />
              Localization &amp; RTL
            </div>

            <div className="flex flex-col gap-1 text-[#6B6864]">
              <span>Active Storefront Locale</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ language: 'en' })}
                  className={`p-2 rounded border text-center text-xs font-semibold ${
                    settings.language === 'en' ? 'bg-[#1A1A1A] text-white' : 'bg-[#FAF9F6] border-[#E5E2DC] text-[#6B6864]'
                  }`}
                >
                  English (LTR)
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateSettings({ language: 'ar' })}
                  className={`p-2 rounded border text-center text-xs font-semibold ${
                    settings.language === 'ar' ? 'bg-[#1A1A1A] text-white' : 'bg-[#FAF9F6] border-[#E5E2DC] text-[#6B6864]'
                  }`}
                >
                  العربية (RTL)
                </button>
              </div>
            </div>

            {/* Mirror All Components Toggle */}
            <div className="pt-2.5 border-t border-[#E5E2DC] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col pe-2">
                  <span className="font-semibold text-[#1A1A1A] text-[11px] flex items-center gap-1.5">
                    <FlipHorizontal className="w-3.5 h-3.5 text-[#C29B38]" />
                    Mirror All Components
                  </span>
                  <span className="text-[10px] text-[#6B6864] leading-tight mt-0.5">
                    Real-time RTL alignment &amp; spacing test without switching language
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={Boolean(settings.mirrorComponents)}
                  onClick={() => onUpdateSettings({ mirrorComponents: !settings.mirrorComponents })}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    settings.mirrorComponents ? 'bg-[#C29B38]' : 'bg-[#DDD9D1]'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                      settings.mirrorComponents ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {settings.mirrorComponents && (
                <div className="px-2 py-1 bg-[#F5F2EA] border border-[#E0D9CB] rounded text-[10px] text-[#8C6D1F] flex items-center justify-between">
                  <span>Mirrored Layout Active</span>
                  <span className="font-mono text-[9px] uppercase font-semibold">dir="rtl" applied</span>
                </div>
              )}

              {onOpenPerformanceDashboard && (
                <button
                  type="button"
                  onClick={onOpenPerformanceDashboard}
                  className="mt-1 w-full py-1.5 px-2 bg-[#FAF9F6] hover:bg-[#F2EDE2] border border-[#DDD9D1] rounded text-[11px] text-[#1A1A1A] font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Activity className="w-3.5 h-3.5 text-[#C29B38]" />
                  <span>{isPerformanceDashboardOpen ? 'Focus RTL Performance HUD' : 'Open RTL Performance Overlay'}</span>
                </button>
              )}
            </div>

            <p className="text-[10px] text-[#6B6864] mt-0.5 leading-normal">
              Switching to Arabic activates real right-to-left layout transformations, mirrored typography, and Arabic locale strings.
            </p>
          </div>

          {/* Section 3: Cart & Threshold */}
          <div className="bg-white p-4 rounded border border-[#E5E2DC] flex flex-col gap-3">
            <div className="flex items-center gap-2 font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
              <ShoppingCart className="w-4 h-4 text-[#C29B38]" />
              Shipping &amp; Cart
            </div>

            <div className="flex flex-col gap-1 text-[#6B6864]">
              <div className="flex justify-between">
                <span>Free Shipping Bar Threshold</span>
                <span className="font-semibold text-[#1A1A1A]">${settings.freeShippingThreshold}</span>
              </div>
              <input
                type="range"
                min="100"
                max="500"
                step="25"
                value={settings.freeShippingThreshold}
                onChange={(e) => onUpdateSettings({ freeShippingThreshold: Number(e.target.value) })}
                className="accent-[#C29B38]"
              />
            </div>

            <label className="flex items-center justify-between text-[#6B6864] cursor-pointer mt-1">
              <span>Show Top Announcement</span>
              <input
                type="checkbox"
                checked={settings.showAnnouncement}
                onChange={(e) => onUpdateSettings({ showAnnouncement: e.target.checked })}
                className="accent-[#C29B38]"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sliders, RotateCcw, Check, Sparkles, Box, Layout, Palette, ShoppingCart, Globe } from 'lucide-react';
import { ThemeSettingsState } from '../types';

interface ThemeEditorSimulatorProps {
  settings: ThemeSettingsState;
  onUpdateSettings: (newSettings: Partial<ThemeSettingsState>) => void;
  onResetSettings: () => void;
  onClose: () => void;
}

export const ThemeEditorSimulator: React.FC<ThemeEditorSimulatorProps> = ({
  settings,
  onUpdateSettings,
  onResetSettings,
  onClose
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          {/* Section 1: 3D Product Media */}
          <div className="bg-white p-4 rounded border border-[#E5E2DC] flex flex-col gap-3">
            <div className="flex items-center gap-2 font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
              <Box className="w-4 h-4 text-[#C29B38]" />
              3D Eyewear Studio
            </div>

            <label className="flex items-center justify-between text-[#6B6864] cursor-pointer">
              <span>Auto-Rotate by Default</span>
              <input
                type="checkbox"
                checked={settings.autoRotate3D}
                onChange={(e) => onUpdateSettings({ autoRotate3D: e.target.checked })}
                className="accent-[#C29B38]"
              />
            </label>

            <label className="flex items-center justify-between text-[#6B6864] cursor-pointer">
              <span>Show Caliper Dimensions</span>
              <input
                type="checkbox"
                checked={settings.showCalipers}
                onChange={(e) => onUpdateSettings({ showCalipers: e.target.checked })}
                className="accent-[#C29B38]"
              />
            </label>

            <div className="flex flex-col gap-1 text-[#6B6864]">
              <span>Lens Optical Reflection</span>
              <select
                value={settings.lensCoatingEffect}
                onChange={(e) => onUpdateSettings({ lensCoatingEffect: e.target.value as any })}
                className="p-1.5 bg-[#FAF9F6] border border-[#E5E2DC] rounded text-xs text-[#1A1A1A]"
              >
                <option value="high">High Sheen Vacuum Emerald</option>
                <option value="medium">Balanced Studio Anti-Reflective</option>
                <option value="clear">Crystal Clear Optical</option>
              </select>
            </div>
          </div>

          {/* Section 2: Layout & Product Cards */}
          <div className="bg-white p-4 rounded border border-[#E5E2DC] flex flex-col gap-3">
            <div className="flex items-center gap-2 font-semibold text-[#1A1A1A] uppercase tracking-wider text-[11px]">
              <Layout className="w-4 h-4 text-[#C29B38]" />
              Catalog Layout
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

          {/* Section 3: Localization & Language */}
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

            <p className="text-[10px] text-[#6B6864] mt-1 leading-normal">
              Switching to Arabic activates real right-to-left layout transformations, mirrored typography, and Arabic locale strings.
            </p>
          </div>

          {/* Section 4: Cart & Threshold */}
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

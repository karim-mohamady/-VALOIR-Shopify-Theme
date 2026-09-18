import React, { useState } from 'react';
import { ArrowLeft, Box, Check, Shield, Truck, Sparkles, SlidersHorizontal, Share2, HelpCircle } from 'lucide-react';
import { EyewearProduct } from '../types';
import { ThreeEyewearViewer } from './ThreeEyewearViewer';

interface ProductDetailPageProps {
  product: EyewearProduct;
  onBack: () => void;
  onAddToCart: (product: EyewearProduct, color: string) => void;
  onLaunchAR: () => void;
  onSelectRelated: (product: EyewearProduct) => void;
  relatedProducts: EyewearProduct[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onLaunchAR,
  onSelectRelated,
  relatedProducts
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [activeMediaTab, setActiveMediaTab] = useState<'3d' | 'gallery'>('3d');
  const [lensOption, setLensOption] = useState<'sunglasses' | 'prescription' | 'blueblock'>('sunglasses');
  const [prescriptionNote, setPrescriptionNote] = useState('');
  const [addedNotice, setAddedNotice] = useState(false);

  const currentColor = product.colors[selectedColorIndex] || product.colors[0];

  const handleAdd = () => {
    onAddToCart(product, currentColor.name);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  return (
    <div className="py-6 sm:py-10 bg-[#FAF9F6] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between mb-8 text-xs text-[#6B6864]">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 hover:text-[#1A1A1A] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Eyewear Collection
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <span>Home</span>
            <span>/</span>
            <span>{product.shape}</span>
            <span>/</span>
            <span className="text-[#1A1A1A] font-semibold">{product.title}</span>
          </div>
        </div>

        {/* Main Grid: Media & Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Interactive 3D Stage & Media Switcher (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Stage Container */}
            <div className="w-full aspect-[4/3] sm:aspect-square bg-white rounded-sm overflow-hidden border border-[#E5E2DC] shadow-xs relative">
              {activeMediaTab === '3d' ? (
                <ThreeEyewearViewer
                  frameColor={currentColor.frameHex}
                  lensColor={currentColor.lensHex}
                  lensOpacity={currentColor.lensOpacity}
                  productTitle={product.title}
                  specs={product.specs}
                  onLaunchAR={onLaunchAR}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#F6F3ED]">
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
                    <p className="text-[11px] text-[#6B6864] mt-1">{product.specs.origin} • 45° Isometric Perspective</p>
                  </div>
                </div>
              )}
            </div>

            {/* Media Gallery Selector Tabs */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveMediaTab('3d')}
                className={`flex-1 py-3 px-4 border rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  activeMediaTab === '3d' ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FAF9F6]' : 'border-[#E5E2DC] bg-white text-[#6B6864] hover:text-[#1A1A1A]'
                }`}
              >
                <Box className="w-4 h-4 text-[#C29B38]" />
                3D Interactive WebGL Model
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('gallery')}
                className={`flex-1 py-3 px-4 border rounded-sm text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
                  activeMediaTab === 'gallery' ? 'border-[#1A1A1A] bg-[#1A1A1A] text-[#FAF9F6]' : 'border-[#E5E2DC] bg-white text-[#6B6864] hover:text-[#1A1A1A]'
                }`}
              >
                Studio Isometric Still
              </button>
            </div>
          </div>

          {/* Right Column: Spec, Variant Picker & Cart Actions (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Header Block */}
            <div className="border-b border-[#E5E2DC] pb-5">
              <div className="flex items-center justify-between text-xs text-[#6B6864] mb-2 uppercase tracking-widest font-semibold">
                <span className="text-[#C29B38]">MAISON VALOIR • SABAE ATELIER</span>
                <span>{product.shape}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] font-light leading-tight">
                {{
                  'aero-titanium-01': 'The Aero-Titanium 01',
                  'grand-palais-04': 'The Grand Palais 04',
                  'sora-panto-02': 'The Sora Panto 02',
                  'solarium-haute-05': 'The Solarium Haute 05',
                  'fukui-minimalist-03': 'The Fukui Minimalist 03'
                }[product.handle] || product.title}
              </h1>

              <p className="text-sm text-[#6B6864] mt-1 font-normal">
                {product.subtitle}
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
                  Tax included • Free Insured Courier
                </span>
              </div>
            </div>

            {/* Frame Finish Swatches */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#1A1A1A]">
                  Frame Finish: <span className="font-normal text-[#6B6864]">{currentColor.name}</span>
                </span>
                <span className="text-[11px] text-[#6B6864]">{product.material}</span>
              </div>

              <div className="flex items-center gap-3 mt-1">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColorIndex(idx)}
                    className={`relative w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      selectedColorIndex === idx ? 'ring-2 ring-offset-2 ring-[#1A1A1A] scale-105' : 'border-[#E5E2DC]'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColorIndex === idx && (
                      <Check className={`w-3.5 h-3.5 ${color.hex === '#1A1A1A' ? 'text-white' : 'text-black'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Optical Lens Customization Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                Optical Configuration
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setLensOption('sunglasses')}
                  className={`p-2.5 text-xs text-left rounded-sm border transition-colors ${
                    lensOption === 'sunglasses' ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-medium' : 'border-[#E5E2DC] bg-white text-[#6B6864]'
                  }`}
                >
                  <div className="font-semibold">Polarized Tint</div>
                  <div className="text-[10px] opacity-80">Cat-3 UV Guard</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLensOption('prescription')}
                  className={`p-2.5 text-xs text-left rounded-sm border transition-colors ${
                    lensOption === 'prescription' ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-medium' : 'border-[#E5E2DC] bg-white text-[#6B6864]'
                  }`}
                >
                  <div className="font-semibold">Custom Rx</div>
                  <div className="text-[10px] opacity-80">Single Vision / Progr.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLensOption('blueblock')}
                  className={`p-2.5 text-xs text-left rounded-sm border transition-colors ${
                    lensOption === 'blueblock' ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white font-medium' : 'border-[#E5E2DC] bg-white text-[#6B6864]'
                  }`}
                >
                  <div className="font-semibold">Clear Optical</div>
                  <div className="text-[10px] opacity-80">420nm Blue Block</div>
                </button>
              </div>

              {lensOption === 'prescription' && (
                <div className="mt-2 p-3 bg-[#F4F1EC] rounded-sm border border-[#E5E2DC] text-xs">
                  <label className="block font-semibold text-[#1A1A1A] mb-1">
                    Enter Pupillary Distance (PD) or Prescription Values:
                  </label>
                  <textarea
                    rows={2}
                    value={prescriptionNote}
                    onChange={(e) => setPrescriptionNote(e.target.value)}
                    placeholder="e.g. OD: -1.50 -0.50 x 180 | OS: -1.75 SPH | PD: 63mm"
                    className="w-full p-2 bg-white border border-[#E5E2DC] rounded-xs font-mono text-xs text-[#1A1A1A] outline-none"
                  />
                  <p className="text-[10px] text-[#6B6864] mt-1">Our certified opticians review and confirm all tolerances before robotic surfacing.</p>
                </div>
              )}
            </div>

            {/* Actions: Add to Bag & Accelerated Checkout */}
            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-4 bg-[#1A1A1A] text-[#FAF9F6] text-xs font-bold uppercase tracking-[0.18em] rounded-sm hover:bg-black transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-[#C29B38]" />
                    Allocated to Your Bag
                  </>
                ) : (
                  <>Add to Bag • ${product.price}.00</>
                )}
              </button>

              <button
                type="button"
                onClick={onLaunchAR}
                className="w-full py-3 bg-[#FAF9F6] border border-[#1A1A1A] text-[#1A1A1A] text-xs font-semibold uppercase tracking-[0.14em] rounded-sm hover:bg-[#F2EFE9] transition-colors flex items-center justify-center gap-2"
              >
                <Box className="w-3.5 h-3.5 text-[#C29B38]" />
                Launch 3D Augmented Reality Fitting
              </button>
            </div>

            {/* Micro-Caliper Specifications & Optical Blueprint */}
            <div className="border border-[#E5E2DC] rounded-sm bg-white p-5 mt-2">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DC]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C29B38]" />
                  Micro-Caliper Specifications
                </span>
                <span className="text-[10px] font-mono text-[#6B6864]">±0.05mm Tolerance</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-b border-[#E5E2DC] text-center font-mono">
                <div className="p-2 bg-[#F6F4EF] rounded-xs">
                  <div className="text-[10px] text-[#6B6864] uppercase">Frame Width</div>
                  <div className="text-xs font-bold text-[#1A1A1A] mt-0.5">{product.specs.frameWidth}</div>
                </div>
                <div className="p-2 bg-[#F6F4EF] rounded-xs">
                  <div className="text-[10px] text-[#6B6864] uppercase">Bridge Width</div>
                  <div className="text-xs font-bold text-[#1A1A1A] mt-0.5">{product.specs.bridgeWidth}</div>
                </div>
                <div className="p-2 bg-[#F6F4EF] rounded-xs">
                  <div className="text-[10px] text-[#6B6864] uppercase">Lens Height</div>
                  <div className="text-xs font-bold text-[#1A1A1A] mt-0.5">{product.specs.lensHeight}</div>
                </div>
                <div className="p-2 bg-[#F6F4EF] rounded-xs">
                  <div className="text-[10px] text-[#6B6864] uppercase">Temple Length</div>
                  <div className="text-xs font-bold text-[#1A1A1A] mt-0.5">{product.specs.templeLength}</div>
                </div>
              </div>

              <div className="pt-3 flex flex-col gap-1 text-[11px] text-[#6B6864]">
                <div className="flex justify-between">
                  <span>Gross Mass:</span>
                  <span className="font-semibold text-[#1A1A1A]">{product.specs.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lens Optics:</span>
                  <span className="font-semibold text-[#1A1A1A]">{product.lensMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span>UV/Polarization:</span>
                  <span className="font-semibold text-[#1A1A1A]">{product.specs.uvRating}</span>
                </div>
                <div className="flex justify-between">
                  <span>Origin Atelier:</span>
                  <span className="font-semibold text-[#1A1A1A]">{product.specs.origin}</span>
                </div>
              </div>
            </div>

            {/* Maison Guarantees */}
            <div className="flex flex-col gap-2 text-xs text-[#6B6864] pt-2">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#C29B38]" />
                <span>Complimentary insured DHL Express courier (2-3 business days)</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C29B38]" />
                <span>Lifetime titanium hinge alignment &amp; ultrasonic cleaning warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Curated Pairings / Related Products */}
        <div className="mt-20 pt-12 border-t border-[#E5E2DC]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C29B38] font-semibold block mb-1">
              CURATED PAIRINGS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-light">
              You May Also Admire
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.slice(0, 3).map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectRelated(rel)}
                className="bg-white border border-[#E5E2DC] rounded-sm p-4 cursor-pointer hover:shadow-md transition-all group"
              >
                <div className="aspect-[4/3] bg-[#F6F4EF] rounded-xs flex items-center justify-center p-4">
                  <span className="text-xs font-serif italic text-[#6B6864] group-hover:text-[#1A1A1A] transition-colors">
                    {rel.title} — {rel.shape}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center text-xs">
                  <span className="font-semibold text-[#1A1A1A]">{rel.title}</span>
                  <span className="text-[#6B6864]">${rel.price}.00</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { EyewearProduct } from '../types';
import { SILHOUETTE_IMAGES } from '../assets/images';
import {
  X,
  Ruler,
  Compass,
  Check,
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  ChevronRight,
  ShieldCheck,
  Sliders
} from 'lucide-react';

interface SizeFitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProduct?: EyewearProduct;
  language: 'en' | 'ar';
}

export const SizeFitGuideModal: React.FC<SizeFitGuideModalProps> = ({
  isOpen,
  onClose,
  currentProduct,
  language
}) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'matrix' | 'faces' | 'measure'>('matrix');
  const [selectedShapeName, setSelectedShapeName] = useState<string>(
    currentProduct?.shape || 'Geometric Square'
  );

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shapeData = [
    {
      shape: 'Aviator',
      nameEn: 'Aviator',
      nameAr: 'أفياتور (الطيار)',
      subtitleEn: 'Double Bridge Architecture',
      subtitleAr: 'هندسة الجسر المزدوج',
      fitCategoryEn: 'Generous / Wide Fit',
      fitCategoryAr: 'مقاس عريض ومريح',
      frameWidth: '144 mm',
      lensWidth: '58 mm',
      bridgeWidth: '15 mm',
      templeLength: '145 mm',
      lensHeight: '50 mm',
      weight: '18 g',
      bestForEn: 'Medium to Wide faces, Square & Oval geometries',
      bestForAr: 'الوجوه المتوسطة إلى العريضة، والوجوه المربعة والبيضاوية',
      descriptionEn: 'Featuring an iconic teardrop curvature and double titanium brow bar that expands optical field of view while distributing weight effortlessly.',
      descriptionAr: 'يتميز بانحناء انسيابي وجسر علوي مزدوج من التيتانيوم لتوسيع مجال الرؤية مع توزيع الوزن بأعلى درجات التوازن.'
    },
    {
      shape: 'Geometric Square',
      nameEn: 'Geometric Square',
      nameAr: 'المربع الهندسي',
      subtitleEn: 'Sculpted Block Acetate',
      subtitleAr: 'أسيتات منحوت مصمت',
      fitCategoryEn: 'Medium-Wide Fit',
      fitCategoryAr: 'مقاس متوسط إلى عريض',
      frameWidth: '140 mm',
      lensWidth: '52 mm',
      bridgeWidth: '20 mm',
      templeLength: '145 mm',
      lensHeight: '44 mm',
      weight: '28 g',
      bestForEn: 'Round, Oval, and Oblong face shapes needing architectural structure',
      bestForAr: 'الوجوه الدائرية والبيضاوية التي تبحث عن خطوط معمارية حادة وأناقة واثقة',
      descriptionEn: 'Precision-milled 10mm Japanese cured acetate with beveled edges that add architectural definition to softer facial lines.',
      descriptionAr: 'مصنوع من أسيتات ياباني معتق بسماكة 10 مم بحواف مشطوفة تضيف حضوراً معمارياً بارزاً للملامح الانسيابية.'
    },
    {
      shape: 'Panto Round',
      nameEn: 'Panto Round',
      nameAr: 'بانتو كلاسيكي مستدير',
      subtitleEn: 'Vintage Optical Proportion',
      subtitleAr: 'نسب بصرية كلاسيكية راقية',
      fitCategoryEn: 'Universal Standard Fit',
      fitCategoryAr: 'مقاس عالمي قياسي مريح',
      frameWidth: '136 mm',
      lensWidth: '49 mm',
      bridgeWidth: '21 mm',
      templeLength: '142 mm',
      lensHeight: '46 mm',
      weight: '16 g',
      bestForEn: 'Square, Angular, and Diamond facial contours',
      bestForAr: 'الملامح المربعة والحادة والوجوه الماسية لتنعيم زوايا الفك',
      descriptionEn: 'The intellectual optical silhouette favored by architects and artists since 1930. Provides comfortable keyhole bridge contouring.',
      descriptionAr: 'التصميم الأيقوني المفضل لكبار المعماريين والأدباء منذ عام 1930 مع جسر مفتاحي دقيق يمنح الأنف راحة مطلقة.'
    },
    {
      shape: 'Cat-Eye',
      nameEn: 'Cat-Eye Sculpt',
      nameAr: 'عين القطة المنحوتة',
      subtitleEn: 'Haute Optical Lift',
      subtitleAr: 'رفع بصري للأزياء الراقية',
      fitCategoryEn: 'Medium Ergonomic Fit',
      fitCategoryAr: 'مقاس متوسط مدروس الملامح',
      frameWidth: '138 mm',
      lensWidth: '53 mm',
      bridgeWidth: '18 mm',
      templeLength: '140 mm',
      lensHeight: '42 mm',
      weight: '22 g',
      bestForEn: 'Heart, Oval, and Soft Angular geometries',
      bestForAr: 'الوجوه القلبية والبيضاوية والملامح المتناسقة لرفع بصري جذاب',
      descriptionEn: 'Subtle upward temple sweeps sculpt cheekbones and elongate the eye profile with hand-polished facets.',
      descriptionAr: 'انحناءة علوية رقيقة تنحت ملامح الوجنتين وتمنح العينين مدى بصرياً ممتداً عبر شطفات يدوية فائقة النعومة.'
    },
    {
      shape: 'Ultra-Thin Titanium',
      nameEn: 'Ultra-Thin Titanium',
      nameAr: 'تيتانيوم نحيف فائق الخفة',
      subtitleEn: 'Grade-4 Pure Sabae Beta-Titanium',
      subtitleAr: 'بيتا-تيتانيوم ساباي النقي الفئة 4',
      fitCategoryEn: 'Tailored Minimalist Fit',
      fitCategoryAr: 'مقاس انسيابي خفيف ومخصص',
      frameWidth: '134 mm',
      lensWidth: '50 mm',
      bridgeWidth: '19 mm',
      templeLength: '142 mm',
      lensHeight: '40 mm',
      weight: '14 g',
      bestForEn: 'All face geometries, especially Narrow to Medium faces',
      bestForAr: 'كافة أشكال الوجوه، خصوصاً الوجوه الضيقة إلى المتوسطة',
      descriptionEn: 'At only 14 grams, this silhouette disappears entirely on the face while offering microscopic ±0.05mm hinge tolerances.',
      descriptionAr: 'بوزن 14 غراماً فقط، يستقر الإطار على الوجه بخفة تامة مع تفاوت تصنيع ميكروني ±0.05 مم بالمفصلات.'
    }
  ];

  const faceShapes = [
    {
      typeEn: 'Oval Face',
      typeAr: 'الوجه البيضاوي',
      proportionsEn: 'Balanced proportions with slightly narrower jawline than temples.',
      proportionsAr: 'تناسب متوازن مع فك أضيق قليلاً من عظام الجبهة والصدغين.',
      recommendedEn: 'Geometric Square, Aviator, Panto Round (Universal)',
      recommendedAr: 'المربع الهندسي، الأفياتور، البانتو المستدير (يناسب معظم الأنماط)',
      stylistTipEn: 'Most shapes flatter an oval structure. Choose Geometric Square for executive presence or Panto for understated vintage flair.',
      stylistTipAr: 'يناسب هذا الوجه معظم التصاميم. اختر المربع الهندسي لإطلالة واثقة أو البانتو للمسة كلاسيكية هادئة.'
    },
    {
      typeEn: 'Round Face',
      typeAr: 'الوجه الدائري',
      proportionsEn: 'Equal width and length with soft cheek contours and curved jaw.',
      proportionsAr: 'تساوي تقريبي بين الطول والعرض مع وجنتين ممتلئتين وخط فك انسيابي.',
      recommendedEn: 'Geometric Square & Architectural Aviator',
      recommendedAr: 'المربع الهندسي والأفياتور المعماري ذو الجسر المزدوج',
      stylistTipEn: 'Angular, rectilinear frames add structural contrast, drawing the eye upward and visually slimming facial curvature.',
      stylistTipAr: 'تضفي الإطارات ذات الزوايا الهندسية توازناً بصرياً معمارياً يبرز الملامح ويمنح الوجه تحديداً أنيقاً.'
    },
    {
      typeEn: 'Square / Angular Face',
      typeAr: 'الوجه المربع / الحاد',
      proportionsEn: 'Defined jawline, broad forehead, and prominent cheekbones.',
      proportionsAr: 'خط فك محدد بوضوح، وجبهة عريضة مع عظام وجنتين بارزة.',
      recommendedEn: 'Panto Round, Aviator, & Ultra-Thin Titanium',
      recommendedAr: 'البانتو المستدير، الأفياتور، والتيتانيوم فائق النحافة',
      stylistTipEn: 'Soft curved or circular silhouettes soften prominent jawlines and highlight optical symmetry without overwhelming features.',
      stylistTipAr: 'تعمل الحواف الدائرية والمنحنية على تلطيف حدة الفك وإبراز التناظر البصري دون طغيان على الملامح.'
    },
    {
      typeEn: 'Heart / Triangular Face',
      typeAr: 'الوجه القلبي / المثلثي',
      proportionsEn: 'Broad forehead tapering smoothly down to a pointed, delicate chin.',
      proportionsAr: 'جبهة عريضة تضيق تدريجياً وبنعومة نحو ذقن مدبب ورقيق.',
      recommendedEn: 'Cat-Eye Sculpt & Ultra-Thin Titanium',
      recommendedAr: 'عين القطة المنحوتة والتيتانيوم فائق النحافة',
      stylistTipEn: 'Silhouettes with upward lifts or rimless minimalism balance the lower face while drawing graceful attention to the eyes.',
      stylistTipAr: 'التصاميم ذات الرفع البصري أو الإطارات متناهية النحافة تعيد التوازن للجزء السفلي من الوجه.'
    }
  ];

  const activeShape = shapeData.find(s => s.shape === selectedShapeName) || shapeData[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#FAF9F6] text-[#1A1A1A] w-full max-w-4xl max-h-[90vh] rounded-md shadow-2xl border border-[#E5E2DC] flex flex-col overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-5 bg-white border-b border-[#E5E2DC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#F5F2EB] border border-[#E5E2DC] flex items-center justify-center text-[#C29B38]">
              <Ruler className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C29B38] block font-semibold">
                {isAr ? 'مشغل ساباي • المعايرة الهندسية الدقيقة' : 'SABAE ATELIER • PRECISION ERGONOMICS'}
              </span>
              <h2 id="size-guide-modal-title" className="font-serif text-xl sm:text-2xl text-[#1A1A1A] font-light">
                {isAr ? 'دليل المقاسات والملاءمة البصرية' : 'Size & Fit Atelier Guide'}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#73706A] hover:text-[#1A1A1A] hover:bg-[#F2EFE9] rounded-full transition-colors"
            aria-label={isAr ? 'إغلاق' : 'Close Size Guide'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 bg-[#F6F4EF] border-b border-[#E5E2DC] flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'matrix', labelEn: 'Frame Dimensions Matrix', labelAr: 'أبعاد ومقاييس الأشكال' },
            { id: 'faces', labelEn: 'Face Shape Recommendations', labelAr: 'ملاءمة أشكال الوجوه' },
            { id: 'measure', labelEn: 'How to Read Your Size', labelAr: 'كيف تختار مقاسك بدقة' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-[#1A1A1A] text-[#1A1A1A] bg-white rounded-t-sm shadow-xs'
                  : 'border-transparent text-[#73706A] hover:text-[#1A1A1A]'
              }`}
            >
              {isAr ? tab.labelAr : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
          {/* TAB 1: FRAME DIMENSIONS MATRIX */}
          {activeTab === 'matrix' && (
            <div className="flex flex-col gap-6">
              {/* Active Product Highlight Card if open for a product */}
              {currentProduct && (
                <div className="p-4 bg-white border border-[#C29B38]/40 rounded-sm shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-16 h-12 bg-[#F6F4EF] rounded border border-[#E5E2DC] overflow-hidden flex items-center justify-center p-1 shrink-0">
                      {currentProduct.image ? (
                        <img src={currentProduct.image} alt={currentProduct.title} className="w-full h-full object-contain" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-[#C29B38]" />
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#C29B38] font-semibold">
                        {isAr ? 'الإطار المعروض حالياً' : 'Currently Viewing'}
                      </span>
                      <h3 className="font-serif text-base text-[#1A1A1A] font-medium leading-tight">
                        {currentProduct.title}
                      </h3>
                      <p className="text-xs text-[#73706A]">
                        {currentProduct.shape} • {currentProduct.specs.weight}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono bg-[#FAF9F6] p-2 px-3 rounded border border-[#E5E2DC]">
                    <div className="text-center">
                      <span className="block text-[10px] uppercase text-[#8C8882]">{isAr ? 'العرض' : 'Width'}</span>
                      <span className="font-semibold text-[#1A1A1A]">{currentProduct.specs.frameWidth}</span>
                    </div>
                    <span className="text-[#C29B38]">|</span>
                    <div className="text-center">
                      <span className="block text-[10px] uppercase text-[#8C8882]">{isAr ? 'الجسر' : 'Bridge'}</span>
                      <span className="font-semibold text-[#1A1A1A]">{currentProduct.specs.bridgeWidth}</span>
                    </div>
                    <span className="text-[#C29B38]">|</span>
                    <div className="text-center">
                      <span className="block text-[10px] uppercase text-[#8C8882]">{isAr ? 'الذراع' : 'Temple'}</span>
                      <span className="font-semibold text-[#1A1A1A]">{currentProduct.specs.templeLength}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Visual Caliper Measurement Schematic (SVG Diagram) */}
              <div className="p-5 bg-white border border-[#E5E2DC] rounded-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-medium text-[#1A1A1A] flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C29B38]" />
                    <span>{isAr ? 'مخطط القياسات الميكرومترية للأطر' : 'Optical Caliper Measurement Schematic'}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-[#8C8882]">±0.05 mm Sabae Calibration</span>
                </div>

                <div className="relative w-full aspect-[21/8] bg-[#F9F8F5] rounded border border-[#EAE7E0] flex items-center justify-center p-4 overflow-hidden">
                  {/* Eyewear Caliper SVG Diagram with Clear Dimensional Callouts */}
                  <svg viewBox="0 0 540 180" className="w-full h-full max-h-44 text-[#1A1A1A]">
                    {/* Dimension Line: Frame Width (Top) */}
                    <line x1="50" y1="20" x2="490" y2="20" stroke="#C29B38" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="50" y1="12" x2="50" y2="28" stroke="#C29B38" strokeWidth="1.5" />
                    <line x1="490" y1="12" x2="490" y2="28" stroke="#C29B38" strokeWidth="1.5" />
                    <rect x="210" y="10" width="120" height="20" rx="3" fill="#1A1A1A" />
                    <text x="270" y="24" fill="#FFFFFF" fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="bold">
                      {isAr ? 'عرض الإطار الكلي (134-144mm)' : 'Total Frame Width (134-144mm)'}
                    </text>

                    {/* Left Temple Arm */}
                    <path d="M 50 85 L 20 75 Q 8 72 8 82 L 8 110" fill="none" stroke="#2B2927" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Right Temple Arm */}
                    <path d="M 490 85 L 520 75 Q 532 72 532 82 L 532 110" fill="none" stroke="#2B2927" strokeWidth="3.5" strokeLinecap="round" />

                    {/* Left Lens Frame */}
                    <rect x="50" y="55" width="175" height="90" rx="20" fill="#E8E4DC" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="3" />
                    {/* Right Lens Frame */}
                    <rect x="315" y="55" width="175" height="90" rx="20" fill="#E8E4DC" fillOpacity="0.4" stroke="#1A1A1A" strokeWidth="3" />

                    {/* Bridge */}
                    <path d="M 225 80 Q 270 65 315 80" fill="none" stroke="#1A1A1A" strokeWidth="4" />

                    {/* Dimension Line: Lens Width (Bottom Left) */}
                    <line x1="50" y1="158" x2="225" y2="158" stroke="#73706A" strokeWidth="1.2" />
                    <line x1="50" y1="152" x2="50" y2="164" stroke="#73706A" strokeWidth="1.2" />
                    <line x1="225" y1="152" x2="225" y2="164" stroke="#73706A" strokeWidth="1.2" />
                    <text x="137" y="172" fill="#6B6864" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      {isAr ? 'عرض العدسة (49-58mm)' : 'Lens Width (49-58mm)'}
                    </text>

                    {/* Dimension Line: Bridge Width (Center) */}
                    <line x1="225" y1="110" x2="315" y2="110" stroke="#73706A" strokeWidth="1.2" />
                    <line x1="225" y1="104" x2="225" y2="116" stroke="#73706A" strokeWidth="1.2" />
                    <line x1="315" y1="104" x2="315" y2="116" stroke="#73706A" strokeWidth="1.2" />
                    <text x="270" y="125" fill="#6B6864" fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                      {isAr ? 'الجسر (15-21mm)' : 'Bridge (15-21mm)'}
                    </text>

                    {/* Dimension Line: Lens Height (Right Side) */}
                    <line x1="505" y1="55" x2="505" y2="145" stroke="#73706A" strokeWidth="1.2" />
                    <line x1="499" y1="55" x2="511" y2="55" stroke="#73706A" strokeWidth="1.2" />
                    <line x1="499" y1="145" x2="511" y2="145" stroke="#73706A" strokeWidth="1.2" />
                    <text x="515" y="103" fill="#6B6864" fontSize="9" fontFamily="monospace" textAnchor="start" fontWeight="bold">
                      {isAr ? 'الارتفاع (40-50mm)' : 'Height (40-50mm)'}
                    </text>
                  </svg>
                </div>
              </div>

              {/* Silhouette Selection & Comparison Table */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base font-medium text-[#1A1A1A]">
                    {isAr ? 'مقارنة أبعاد التشكيلات الخمس' : 'Comparison of 5 Atelier Silhouettes'}
                  </h3>
                  <span className="text-xs text-[#8C8882]">
                    {isAr ? 'انقر على أي شكل لتفقد تفاصيله' : 'Select a silhouette to inspect ergonomics'}
                  </span>
                </div>

                {/* Silhouette selector pill buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {shapeData.map((s) => {
                    const isSelected = selectedShapeName === s.shape;
                    const isCurrent = currentProduct?.shape === s.shape;
                    return (
                      <button
                        key={s.shape}
                        type="button"
                        onClick={() => setSelectedShapeName(s.shape)}
                        className={`p-2.5 text-start rounded-sm border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white border-[#1A1A1A] ring-1 ring-[#1A1A1A] shadow-xs'
                            : 'bg-[#F9F8F5] border-[#E5E2DC] hover:border-[#8C8882]'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="font-serif text-xs font-semibold text-[#1A1A1A]">
                            {isAr ? s.nameAr : s.nameEn}
                          </span>
                          {isCurrent && (
                            <span className="w-2 h-2 rounded-full bg-[#C29B38]" title="Current item" />
                          )}
                        </div>
                        <span className="text-[10px] text-[#73706A] font-mono">
                          {s.frameWidth}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Silhouette Detailed Spec Box */}
                <div className="bg-white border border-[#E5E2DC] rounded-sm p-5 flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F0EDE6] pb-3">
                    <div>
                      <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#C29B38] font-bold">
                        <span>{activeShape.frameWidth} TOTAL WIDTH</span>
                        <span>•</span>
                        <span>{isAr ? activeShape.fitCategoryAr : activeShape.fitCategoryEn}</span>
                      </div>
                      <h4 className="font-serif text-lg text-[#1A1A1A] font-medium">
                        {isAr ? activeShape.nameAr : activeShape.nameEn} — {isAr ? activeShape.subtitleAr : activeShape.subtitleEn}
                      </h4>
                    </div>

                    <div className="text-xs bg-[#FAF9F6] border border-[#E5E2DC] px-3 py-1.5 rounded-sm text-[#4A4744] font-mono">
                      {isAr ? 'الوزن الصافي: ' : 'Gross Weight: '}{activeShape.weight}
                    </div>
                  </div>

                  <p className="text-xs text-[#6B6864] leading-relaxed">
                    {isAr ? activeShape.descriptionAr : activeShape.descriptionEn}
                  </p>

                  {/* 5-Metric Caliper Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                    <div className="bg-[#FAF9F6] p-3 rounded border border-[#EAE7E0] text-center">
                      <span className="block text-[10px] font-mono uppercase text-[#8C8882] mb-1">
                        {isAr ? 'عرض الإطار' : 'Frame Width'}
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#1A1A1A]">
                        {activeShape.frameWidth}
                      </span>
                    </div>

                    <div className="bg-[#FAF9F6] p-3 rounded border border-[#EAE7E0] text-center">
                      <span className="block text-[10px] font-mono uppercase text-[#8C8882] mb-1">
                        {isAr ? 'عرض العدسة' : 'Lens Width'}
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#1A1A1A]">
                        {activeShape.lensWidth}
                      </span>
                    </div>

                    <div className="bg-[#FAF9F6] p-3 rounded border border-[#EAE7E0] text-center">
                      <span className="block text-[10px] font-mono uppercase text-[#8C8882] mb-1">
                        {isAr ? 'جسر الأنف' : 'Bridge Width'}
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#1A1A1A]">
                        {activeShape.bridgeWidth}
                      </span>
                    </div>

                    <div className="bg-[#FAF9F6] p-3 rounded border border-[#EAE7E0] text-center">
                      <span className="block text-[10px] font-mono uppercase text-[#8C8882] mb-1">
                        {isAr ? 'طول الذراع' : 'Temple Length'}
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#1A1A1A]">
                        {activeShape.templeLength}
                      </span>
                    </div>

                    <div className="bg-[#FAF9F6] p-3 rounded border border-[#EAE7E0] text-center">
                      <span className="block text-[10px] font-mono uppercase text-[#8C8882] mb-1">
                        {isAr ? 'ارتفاع العدسة' : 'Lens Height'}
                      </span>
                      <span className="font-mono text-sm font-semibold text-[#1A1A1A]">
                        {activeShape.lensHeight}
                      </span>
                    </div>
                  </div>

                  {/* Best Facial Geometries recommendation */}
                  <div className="p-3 bg-[#F4F1EC] rounded text-xs text-[#4A4744] flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#C29B38] shrink-0" />
                    <span>
                      <strong>{isAr ? 'أفضل ملاءمة للوجه: ' : 'Recommended For: '}</strong>
                      {isAr ? activeShape.bestForAr : activeShape.bestForEn}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FACE SHAPE RECOMMENDATIONS */}
          {activeTab === 'faces' && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-[#E5E2DC] pb-3">
                <h3 className="font-serif text-lg font-light text-[#1A1A1A]">
                  {isAr ? 'تناغم الأطر مع البنية الهندسية للوجه' : 'Harmonizing Frames with Facial Geometry'}
                </h3>
                <p className="text-xs text-[#6B6864] mt-1">
                  {isAr
                    ? 'صممت إطارات فالوار البصرية لتوفير تباين متوازن يبرز نقاط الجمال الطبيعية ويحقق الراحة الأرغونومية طوال اليوم.'
                    : 'Valoir silhouettes are architecturally engineered to balance facial focal points, creating effortless optical harmony.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faceShapes.map((face, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-[#E5E2DC] rounded-sm flex flex-col justify-between gap-4 hover:border-[#1A1A1A] transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-serif text-base text-[#1A1A1A] font-medium">
                          {isAr ? face.typeAr : face.typeEn}
                        </h4>
                        <span className="text-[10px] font-mono uppercase text-[#C29B38] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E5E2DC]">
                          {isAr ? 'تحليل الملامح' : 'Facial Profile'}
                        </span>
                      </div>
                      <p className="text-xs text-[#73706A] leading-relaxed">
                        {isAr ? face.proportionsAr : face.proportionsEn}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F0ECE4] flex flex-col gap-2">
                      <div className="text-xs">
                        <span className="font-semibold text-[#1A1A1A] block mb-0.5">
                          {isAr ? 'الإطارات الموصى بها:' : 'Ideal Silhouettes:'}
                        </span>
                        <span className="text-[#C29B38] font-medium">
                          {isAr ? face.recommendedAr : face.recommendedEn}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#6B6864] italic bg-[#FAF9F6] p-2.5 rounded border border-[#EAE7E0]">
                        «{isAr ? face.stylistTipAr : face.stylistTipEn}»
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: HOW TO READ YOUR CURRENT SIZE */}
          {activeTab === 'measure' && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-[#E5E2DC] pb-3">
                <h3 className="font-serif text-lg font-light text-[#1A1A1A]">
                  {isAr ? 'كيف تقرأ وتحدد مقاس نظارتك الحالي' : 'How to Read & Verify Your Current Eyewear Size'}
                </h3>
                <p className="text-xs text-[#6B6864] mt-1">
                  {isAr
                    ? 'إذا كنت تمتلك نظارة مريحة حالياً، يمكنك العثور على مقاسك المعتمد بسهولة بالغة.'
                    : 'If you already own a pair of glasses that fits comfortably, checking your optical size takes under 30 seconds.'}
                </p>
              </div>

              {/* The 3-Number Formula Box */}
              <div className="p-6 bg-white border border-[#E5E2DC] rounded-sm flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#FAF9F6] rounded border border-[#E5E2DC] text-[#C29B38]">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif text-base text-[#1A1A1A] font-medium">
                    {isAr ? 'معادلة الأرقام الثلاثة المطبوعة على الذراع' : 'The 3-Number Formula Stamped on Your Temple'}
                  </h4>
                </div>

                <p className="text-xs text-[#6B6864] leading-relaxed">
                  {isAr
                    ? 'انظر إلى السطح الداخلي لذراع نظارتك الحالية. ستجد سلسلة أرقام بالصيغة العالمية القياسية، مثل:'
                    : 'Look closely at the inside surface of your current frame’s temple arm. You will find a series of digits in standard optical notation, such as:'}
                </p>

                {/* Stamped visual example */}
                <div className="p-4 bg-[#23211F] text-[#FAF9F6] rounded font-mono text-center flex flex-col sm:flex-row items-center justify-center gap-6">
                  <span className="text-xl sm:text-2xl font-bold tracking-widest text-[#E6C673]">
                    52 □ 20 — 145
                  </span>
                  <div className="text-xs text-[#A8A59E] text-start border-t sm:border-t-0 sm:border-s border-[#3E3B37] pt-2 sm:pt-0 sm:ps-6">
                    <p><strong>52 mm:</strong> {isAr ? 'عرض العدسة الواحدة' : 'Single Lens Width'}</p>
                    <p><strong>20 mm:</strong> {isAr ? 'عرض جسر الأنف' : 'Bridge Distance'}</p>
                    <p><strong>145 mm:</strong> {isAr ? 'طول الذراع الحامل' : 'Temple Arm Length'}</p>
                  </div>
                </div>

                {/* Sizing Tiers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DC] rounded text-center">
                    <span className="text-[10px] font-mono uppercase text-[#8C8882] block mb-1">
                      {isAr ? 'مقاس ضيق / دقيق' : 'Narrow Fit'}
                    </span>
                    <span className="font-serif text-sm font-semibold text-[#1A1A1A]">
                      &lt; 135 mm
                    </span>
                    <p className="text-[11px] text-[#6B6864] mt-1">
                      {isAr ? 'مثالي للوجوه الدقيقة وصغيرة الحجم' : 'Recommended: Ultra-Thin Titanium'}
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DC] rounded text-center">
                    <span className="text-[10px] font-mono uppercase text-[#8C8882] block mb-1">
                      {isAr ? 'مقاس متوسط / قياسي' : 'Medium Standard Fit'}
                    </span>
                    <span className="font-serif text-sm font-semibold text-[#1A1A1A]">
                      136 – 140 mm
                    </span>
                    <p className="text-[11px] text-[#6B6864] mt-1">
                      {isAr ? 'المقاس الأكثر شيوعاً وعالمية' : 'Recommended: Panto Round, Cat-Eye'}
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF9F6] border border-[#E5E2DC] rounded text-center">
                    <span className="text-[10px] font-mono uppercase text-[#8C8882] block mb-1">
                      {isAr ? 'مقاس عريض / رحب' : 'Wide Fit'}
                    </span>
                    <span className="font-serif text-sm font-semibold text-[#1A1A1A]">
                      &gt; 140 mm
                    </span>
                    <p className="text-[11px] text-[#6B6864] mt-1">
                      {isAr ? 'أقصى درجات الراحة والتغطية' : 'Recommended: Aviator, Geometric Square'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sabae Nose Pad Custom Adjustment Feature */}
              <div className="p-5 bg-white border border-[#E5E2DC] rounded-sm flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#F6F4EF] border border-[#E5E2DC] flex items-center justify-center text-[#C29B38] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-[#1A1A1A] font-medium mb-1">
                    {isAr ? 'وسائد الأنف من التيتانيوم الياباني المضاد للحساسية' : 'Micro-Adjustable Pure Titanium Nose Pads'}
                  </h4>
                  <p className="text-xs text-[#6B6864] leading-relaxed">
                    {isAr
                      ? 'جميع إطارات فالوار مزودة بوسائد أنف مصنوعة من التيتانيوم الطبي الياباني الخالص بنسبة 100%. يمكن تعديل زاوية وارتفاع الوسادات بمقدار 2 مم بدقة متناهية لتناسب أي جسر أنفي (سواءً كان مرتفعاً أو مسطحاً أو دقيقاً) دون ترك علامات حمراء أو انزلاق.'
                      : 'Every Valoir titanium frame features hypoallergenic Japanese medical-grade titanium nose pads. They allow micro-adjustment to accommodate any bridge profile (low bridge, high bridge, or delicate nasal crests) preventing slippage and eliminating pressure points.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-white border-t border-[#E5E2DC] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#73706A]">
            <Check className="w-4 h-4 text-[#2E7D32]" />
            <span>
              {isAr
                ? 'خدمة الاستشارة البصرية المجانية متوفرة مع كل طلب'
                : 'Complimentary optical consultation included with all frames'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
          >
            {isAr ? 'تم، إغلاق الدليل' : 'Done, Close Guide'}
          </button>
        </div>
      </div>
    </div>
  );
};

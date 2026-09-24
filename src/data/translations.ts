export interface TranslationDictionary {
  header: {
    optical: string;
    sunglasses: string;
    geometric: string;
    panto: string;
    optical3D: string;
    exploreAtelier: string;
    storefront: string;
    themeEditor: string;
    liquidCode: string;
    complianceAudit: string;
    langSwitch: string;
    searchAria: string;
    cartAria: string;
    mobileMenu: string;
  };
  announcement: {
    defaultText: string;
    exploreLink: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    exploreButton: string;
    virtualShowroomButton: string;
  };
  opticalLab: {
    badge: string;
    title: string;
    description: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
    launchARButton: string;
    interactiveNotice: string;
    caliperSubtitle: string;
  };
  silhouettes: {
    badge: string;
    title: string;
    description: string;
    all: string;
    aviator: string;
    aviatorSubtitle: string;
    square: string;
    squareSubtitle: string;
    panto: string;
    pantoSubtitle: string;
    catEye: string;
    catEyeSubtitle: string;
    titanium: string;
    titaniumSubtitle: string;
  };
  catalog: {
    sortLabel: string;
    sortFeatured: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    inspectAria: string;
    quickAddAria: string;
    threeDModel: string;
    quickAddSuccess: string;
  };
  atelierStory: {
    badge: string;
    title: string;
    p1: string;
    p2: string;
    quote: string;
    author: string;
    statSteps: string;
    statStepsLabel: string;
    statDays: string;
    statDaysLabel: string;
    statTolerance: string;
    statToleranceLabel: string;
    statStages: string;
    statStagesLabel: string;
    guildSeal: string;
    inspectButton: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    verifiedText: string;
    ratingText: string;
    t1Quote: string;
    t1Author: string;
    t1Title: string;
    t1City: string;
    t1Frame: string;
    t2Quote: string;
    t2Author: string;
    t2Title: string;
    t2City: string;
    t2Frame: string;
    t3Quote: string;
    t3Author: string;
    t3Title: string;
    t3City: string;
    t3Frame: string;
  };
  newsletter: {
    badge: string;
    title: string;
    description: string;
    placeholder: string;
    button: string;
    successAlert: string;
  };
  footer: {
    brandBio: string;
    salonsTitle: string;
    salon1: string;
    salon2: string;
    salon3: string;
    salon4: string;
    conciergeTitle: string;
    concierge1: string;
    concierge2: string;
    concierge3: string;
    concierge4: string;
    shopifyTitle: string;
    shopifyDesc: string;
    auditLink: string;
    copyright: string;
    privacy: string;
    terms: string;
    caliperGuarantees: string;
  };
  productDetail: {
    backButton: string;
    home: string;
    taxIncluded: string;
    frameFinish: string;
    opticalConfig: string;
    polarOption: string;
    polarSubtitle: string;
    rxOption: string;
    rxSubtitle: string;
    blueblockOption: string;
    blueblockSubtitle: string;
    rxLabel: string;
    rxPlaceholder: string;
    rxNotice: string;
    addToBag: string;
    allocatedNotice: string;
    launchAR: string;
    caliperSpecs: string;
    tolerance: string;
    frameWidth: string;
    bridgeWidth: string;
    lensHeight: string;
    templeLength: string;
    grossMass: string;
    lensOptics: string;
    uvRating: string;
    originAtelier: string;
    dhlGuarantee: string;
    hingeGuarantee: string;
    pairingsBadge: string;
    pairingsTitle: string;
  };
  cart: {
    title: string;
    freeShippingUnlocked: string;
    freeShippingAdd: string;
    emptyTitle: string;
    emptyDesc: string;
    browseButton: string;
    subtotal: string;
    taxNote: string;
    checkoutButton: string;
    checkoutAlert: string;
  };
  search: {
    placeholder: string;
    clear: string;
    curated: string;
    noResults: string;
    inStock: string;
    inspect: string;
  };
  viewer3D: {
    pause: string;
    rotate: string;
    calipers: string;
    exploded: string;
    reset: string;
    arSpace: string;
    frameWidth: string;
    height: string;
    bridge: string;
    temple: string;
    calibration: string;
  };
}

export const TRANSLATIONS: Record<'en' | 'ar', TranslationDictionary> = {
  en: {
    header: {
      optical: 'Optical',
      sunglasses: 'Sunglasses',
      geometric: 'Geometric Square',
      panto: 'Panto Round',
      optical3D: 'Optical Atelier',
      exploreAtelier: 'Explore Atelier',
      storefront: 'Storefront',
      themeEditor: 'Theme Editor',
      liquidCode: 'Liquid Code',
      complianceAudit: 'Store Audit & ZIP',
      langSwitch: 'AR (عربي)',
      searchAria: 'Search Eyewear Models',
      cartAria: 'Open shopping bag',
      mobileMenu: 'Toggle navigation menu'
    },
    announcement: {
      defaultText: 'Complimentary Worldwide Express Courier & Precision Prescription Service on orders over $250',
      exploreLink: 'Explore Atelier'
    },
    hero: {
      eyebrow: 'HAUTE LUNETTERIE & OPTICAL ARCHITECTURE',
      titleLine1: 'Sculpted in Titanium.',
      titleLine2: 'Defined by Vision.',
      description: 'Experience eyewear engineered as sculptural form. Handcrafted in Sabae, Japan with multi-axis titanium mills and custom-tinted mineral glass.',
      exploreButton: 'Explore 2026 Collection',
      virtualShowroomButton: 'Atelier Silhouettes'
    },
    opticalLab: {
      badge: 'HAUTE OPTICAL ATELIER',
      title: 'Micro-Precision Architecture & Finishes',
      description: 'Inspect our custom-engineered 5-barrel barrel hinges, bevel-cut Mazzucchelli acetate temples, and hand-finished mineral crystal optics with micro-caliper precision.',
      feature1Title: 'Pure Japanese Beta-Titanium',
      feature1Desc: 'Laser cut and wire-eroded with tolerances of ±0.05 mm for zero pressure on the nasal bridge.',
      feature2Title: 'Hand-Beveled Italian Acetate',
      feature2Desc: 'Cured 10mm cellulose slabs tumbled in organic bamboo husks for deep tactile luster.',
      feature3Title: 'Multi-Axis Micro Tolerances',
      feature3Desc: 'Examine hinge tension dampening, barrel screws, and lens reflections under simulated daylight.',
      launchARButton: 'Size & Fit Guide',
      interactiveNotice: 'Handcrafted in Sabae • Titanium Ergonomics • Caliper Precision',
      caliperSubtitle: 'Micro-caliper overlay'
    },
    silhouettes: {
      badge: 'CURATED SILHOUETTES',
      title: 'Architectural Geometries',
      description: 'Discover silhouettes calibrated to facial geometry and optical focal points.',
      all: 'All Silhouettes',
      aviator: 'Aviator',
      aviatorSubtitle: 'Double Bridge',
      square: 'Geometric Square',
      squareSubtitle: 'Block Acetate',
      panto: 'Panto Round',
      pantoSubtitle: 'Vintage Optical',
      catEye: 'Cat-Eye Sculpt',
      catEyeSubtitle: 'Haute Couture',
      titanium: 'Ultra-Thin Titanium',
      titaniumSubtitle: 'Featherlight 14g'
    },
    catalog: {
      sortLabel: 'Sort:',
      sortFeatured: 'Featured Atelier',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      inspectAria: 'View Details',
      quickAddAria: 'Quick Add to Bag',
      threeDModel: 'Precision Eyewear',
      quickAddSuccess: 'Added to your bag'
    },
    atelierStory: {
      badge: 'THE SABAÈ ATELIER',
      title: 'One Hundred & Sixty Steps of Optical Mastery',
      p1: 'Every Valoir frame is born in Sabae, Japan—a legendary enclave where metallurgical masters have honed eyewear manufacturing across three centuries. Over two hundred days are required to cure our natural cotton-based acetate slabs before microscopic CNC routing begins.',
      p2: 'Temples undergo five consecutive stages of tumbling with organic bamboo chips and walnut husks, achieving a liquid-smooth gloss impossible through chemical baths.',
      quote: '“Light made architectural.”',
      author: 'Sabae Fukui Prefecture • Master Artisan Guild',
      statSteps: '160',
      statStepsLabel: 'Steps of Optical Mastery',
      statDays: '200+',
      statDaysLabel: 'Days Acetate Curing',
      statTolerance: '±0.05mm',
      statToleranceLabel: 'Micro-CNC Tolerance',
      statStages: '5',
      statStagesLabel: 'Bamboo Tumbling Stages',
      guildSeal: 'Certified Master Guild No. 842',
      inspectButton: 'Discover Sabae Workshop'
    },
    testimonials: {
      badge: 'CRITICAL ACCLAIM',
      title: 'Expert Perspectives & Verified Patronage',
      subtitle: 'Evaluated by leading optical designers, architecture critics, and verified collectors worldwide.',
      verifiedText: 'Verified Optical Collector',
      ratingText: '5.0 Optical Rating',
      t1Quote: 'The titanium hinge damping is extraordinary. It feels like closing the door of a bespoke Swiss timepiece.',
      t1Author: 'Elena Vance',
      t1Title: 'Senior Eye Care & Architecture Critic',
      t1City: 'Paris, France',
      t1Frame: 'Aero Minimalist • Pure Japanese Beta-Titanium',
      t2Quote: 'Valoir achieves an optical instrument of surgical precision that feels weightless on the nose bridge.',
      t2Author: 'Marco Scarlatti',
      t2Title: 'Haute Horlogerie & Design Director',
      t2City: 'Milan, Italy',
      t2Frame: 'Grand Palais • Mazzucchelli Cotton Acetate',
      t3Quote: 'Their mineral polarized lenses provide crystal clarity without chromatic aberration or peripheral distortion.',
      t3Author: 'Kenji Takahashi',
      t3Title: 'Master Optometrist & Eyewear Historian',
      t3City: 'Tokyo, Japan',
      t3Frame: 'Solarium Haute • Multi-Axis Titanium'
    },
    newsletter: {
      badge: 'THE PRIVATE REGISTER',
      title: 'Receive Invitations to Limited Bespoke Releases',
      description: 'Members receive priority allocations for numbered precision-milled titanium silhouettes and private salon trunk shows.',
      placeholder: 'Enter your personal email...',
      button: 'Register',
      successAlert: 'Thank you. You have been placed on the Valoir Private Register for bespoke allocations.'
    },
    footer: {
      brandBio: 'Haute Lunetterie and precision optical instruments. Handcrafted in Sabae, Japan.',
      salonsTitle: 'Atelier Salons',
      salon1: 'Sabae: Fukui Optical District',
      salon2: 'Paris: Rue Saint-Honoré 1er',
      salon3: 'Tokyo: Ginza 6-Chome',
      salon4: 'Dubai: DIFC Gate Precinct 4',
      conciergeTitle: 'Customer Concierge',
      concierge1: 'Complimentary Bespoke Fitting',
      concierge2: 'Prescription & Lens Sizing',
      concierge3: 'Ultrasonic Refurbishment',
      concierge4: 'Worldwide Courier Tracking',
      shopifyTitle: 'Shopify Architecture',
      shopifyDesc: 'Online Store 2.0 Theme package with editorial photography, bilingual English/Arabic RTL, and zero Dawn framework bloat.',
      auditLink: 'Review Theme Compliance Audit →',
      copyright: '© 2026 Valoir Eyewear Inc. All rights reserved. Registered optical trademark.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      caliperGuarantees: 'Frame Care & Calipers'
    },
    productDetail: {
      backButton: 'Back to Eyewear Collection',
      home: 'Home',
      taxIncluded: 'Tax included • Free Insured Courier',
      frameFinish: 'Frame Finish:',
      opticalConfig: 'Optical Configuration',
      polarOption: 'Polarized Tint',
      polarSubtitle: 'Cat-3 UV Guard',
      rxOption: 'Custom Rx',
      rxSubtitle: 'Single Vision / Progr.',
      blueblockOption: 'Clear Optical',
      blueblockSubtitle: '420nm Blue Block',
      rxLabel: 'Enter Pupillary Distance (PD) or Prescription Values:',
      rxPlaceholder: 'e.g. OD: -1.50 -0.50 x 180 | OS: -1.75 SPH | PD: 63mm',
      rxNotice: 'Our certified opticians review and confirm all tolerances before robotic surfacing.',
      addToBag: 'Add to Bag',
      allocatedNotice: 'Allocated to Your Bag',
      launchAR: 'Size & Fit Guide',
      caliperSpecs: 'Micro-Caliper Specifications',
      tolerance: '±0.05mm Tolerance',
      frameWidth: 'Frame Width',
      bridgeWidth: 'Bridge Width',
      lensHeight: 'Lens Height',
      templeLength: 'Temple Length',
      grossMass: 'Gross Mass:',
      lensOptics: 'Lens Optics:',
      uvRating: 'UV/Polarization:',
      originAtelier: 'Origin Atelier:',
      dhlGuarantee: 'Complimentary insured DHL Express courier (2-3 business days)',
      hingeGuarantee: 'Lifetime titanium hinge alignment & ultrasonic cleaning warranty',
      pairingsBadge: 'CURATED PAIRINGS',
      pairingsTitle: 'You May Also Admire'
    },
    cart: {
      title: 'Your Atelier Bag',
      freeShippingUnlocked: 'Complimentary Worldwide Courier Unlocked',
      freeShippingAdd: 'Add',
      emptyTitle: 'Your bag is currently empty',
      emptyDesc: 'Explore our Sabae titanium silhouettes, custom optical sunglasses, and atelier models.',
      browseButton: 'Browse Eyewear',
      subtotal: 'Subtotal',
      taxNote: 'Taxes calculated at checkout. Includes complimentary bespoke microfiber cleaning cloth and rigid leather case.',
      checkoutButton: 'Proceed to Checkout',
      checkoutAlert: 'Proceeding to Shopify Secure Checkout'
    },
    search: {
      placeholder: 'Search eyewear by silhouette, material, or caliber...',
      clear: 'Clear',
      curated: 'Curated searches:',
      noResults: 'No eyewear matching your search query was found.',
      inStock: 'In Stock',
      inspect: 'View Frame'
    },
    viewer3D: {
      pause: 'Pause',
      rotate: 'Rotate',
      calipers: 'Calipers',
      exploded: 'Exploded',
      reset: 'Reset',
      arSpace: 'AR Space',
      frameWidth: 'Width',
      height: 'Height',
      bridge: 'Bridge',
      temple: 'Temple',
      calibration: 'Optical Calibration: 0.05mm CNC Precision Tolerances (Sabae, Japan)'
    }
  },
  ar: {
    header: {
      optical: 'النظارات الطبية',
      sunglasses: 'النظارات الشمسية',
      geometric: 'المربع الهندسي',
      panto: 'المستدير الكلاسيكي',
      optical3D: 'معمل البصريات الفاخرة',
      exploreAtelier: 'استكشف الدار',
      storefront: 'واجهة المتجر',
      themeEditor: 'محرر الثيم الحي',
      liquidCode: 'أكواد ليكويد',
      complianceAudit: 'فحص الاعتماد وحزمة ZIP',
      langSwitch: 'English',
      searchAria: 'البحث في موديلات النظارات',
      cartAria: 'فتح حقيبة التسوق',
      mobileMenu: 'فتح قائمة التصفح'
    },
    announcement: {
      defaultText: 'شحن سريع دولي مجاني ومؤمن مع خدمة تفصيل العدسات الطبية الدقيقة للطلبات الأكثر من 250 دولاراً',
      exploreLink: 'اكتشف المجموعة'
    },
    hero: {
      eyebrow: 'صناعة النظارات الراقية والهندسة البصرية المعمارية',
      titleLine1: 'منحوتة من التيتانيوم النقي.',
      titleLine2: 'محددة بدقة الرؤية.',
      description: 'اكتشف نظارات مصممة كتحف هندسية معمارية. مصنعة يدوياً في ساباي، اليابان بآلات تفريز التيتانيوم متعددة المحاور وزجاج بصري معدني عالي النقاوة.',
      exploreButton: 'استكشف تشكيلة 2026',
      virtualShowroomButton: 'تشكيلات الأتيلييه'
    },
    opticalLab: {
      badge: 'مشغل البصريات الفاخرة',
      title: 'هندسة بصرية فائقة الدقة والإتقان',
      description: 'افحص مفصلاتنا المبتكرة خماسية البراميل، وأذرع الأسيتات الإيطالية المشطوفة، وعدسات الكريستال المعدنية المصقولة يدوياً بدقة ميكرونية متناهية.',
      feature1Title: 'بيتا-تيتانيوم ياباني فائق النقاء',
      feature1Desc: 'مقصوص بالليزر مع تفاوت ميكروني لا يتجاوز ±0.05 مم لتوزيع مثالي يلغي ضغط جسر الأنف تماماً.',
      feature2Title: 'أسيتات إيطالي مشطوف يدوياً',
      feature2Desc: 'ألواح قطنية طبيعية بسماكة 10 مم يتم تلميعها في قشور الخيزران الطبيعية لاكتساب بريق حريري عميق.',
      feature3Title: 'معايير ميكرومترية متعددة المحاور',
      feature3Desc: 'اختبر مرونة المفصلات، البراغي الهندسية، وانعكاسات العدسة بوضوح تام.',
      launchARButton: 'دليل المقاسات والملاءمة',
      interactiveNotice: 'صناعة يدوية في ساباي • أرغونوميا التيتانيوم • دقة هندسية',
      caliperSubtitle: 'طبقة المقاييس الميكرونية'
    },
    silhouettes: {
      badge: 'أشكال وتصاميم مختارة',
      title: 'الهندسة المعمارية للإطارات',
      description: 'تصاميم محسوبة بدقة لتلائم هندسة ملامح الوجه ونقاط التركيز البصري.',
      all: 'كافة التصاميم',
      aviator: 'أفياتور (الطيار)',
      aviatorSubtitle: 'جسر مزدوج',
      square: 'مربع هندسي',
      squareSubtitle: 'أسيتات مصمت',
      panto: 'بانتو مستدير',
      pantoSubtitle: 'بصريات كلاسيكية',
      catEye: 'عين القطة المنحوتة',
      catEyeSubtitle: 'أزياء راقية',
      titanium: 'تيتانيوم نحيف للغاية',
      titaniumSubtitle: 'وزن الريشة 14 غرام'
    },
    catalog: {
      sortLabel: 'ترتيب حسب:',
      sortFeatured: 'المجموعات المميزة',
      sortPriceAsc: 'السعر: من الأقل للأعلى',
      sortPriceDesc: 'السعر: من الأعلى للأقل',
      inspectAria: 'عرض التفاصيل',
      quickAddAria: 'إضافة سريعة إلى الحقيبة',
      threeDModel: 'صناعة يدوية دقيقة',
      quickAddSuccess: 'تمت الإضافة إلى حقيبتك بنجاح'
    },
    atelierStory: {
      badge: 'مشغل ساباي الحرفي',
      title: 'مائة وستون خطوة نحو الإتقان البصري الخالد',
      p1: 'يولد كل إطار من دار فالوار في ساباي باليابان—المعقل التاريخي الأسطوري الذي أتقن فيه كبار الصاغة صناعة النظارات عبر ثلاثة قرون. يتطلب تحضير ألواح الأسيتات القطنية الطبيعية أكثر من مائتي يوم من التعتيق الهادئ قبل بدء التفريز بالتحكم الرقمي.',
      p2: 'تخضع الأذرع لخمس مراحل متتالية من الصقل اليدوي باستخدام رقائق الخيزران الطبيعي وقشور الجوز لتحقيق ملمس فائق النعومة يستحيل الوصول إليه بالمعالجات الكيميائية التقليدية.',
      quote: '«الضوء عندما يتجسد في هيكل معماري.»',
      author: 'محافظة فوكوي، ساباي • نقابة كبار الحرفيين اليابانيين',
      statSteps: '١٦٠',
      statStepsLabel: 'خطوة صياغة بصرية يدوية',
      statDays: '+٢٠٠',
      statDaysLabel: 'يوماً لتعتيق ألواح الأسيتات',
      statTolerance: '±٠.٠٥ مم',
      statToleranceLabel: 'تفاوت تفريز رقمي مجهري',
      statStages: '٥',
      statStagesLabel: 'مراحل صقل بالخيزران الطبيعي',
      guildSeal: 'ختم نقابة الحرفيين المعتمد رقم ٨٤٢',
      inspectButton: 'استكشف كواليس مشغل ساباي'
    },
    testimonials: {
      badge: 'إشادات النُقاد والخبراء',
      title: 'آراء الخبراء ومقتني النظارات الموثقين',
      subtitle: 'تقييمات موثقة من كبار نقاد التصميم المعماري، وأخصائيي البصريات، والمقتنين حول العالم.',
      verifiedText: 'مقتنٍ معتمد وحساب موثق',
      ratingText: 'تقييم بصري ٥.٠',
      t1Quote: 'تخميد حركة مفصلات التيتانيوم استثنائي؛ يمنحك شعور إغلاق باب ساعة سويسرية مخصصة.',
      t1Author: 'إلينا فانس',
      t1Title: 'ناقدة العمارة والتصميم البصري الرفيع',
      t1City: 'باريس، فرنسا',
      t1Frame: 'أيرو مينيمالست • بيتا تيتانيوم ياباني نقي',
      t2Quote: 'تُحقق فالوار آلة بصرية بدقة جراحية تكاد لا تشعر بوزنها على جسر الأنف طوال اليوم.',
      t2Author: 'ماركو سكارلاتي',
      t2Title: 'مدير التصميم وصناعة الساعات الفاخرة',
      t2City: 'ميلانو، إيطاليا',
      t2Frame: 'غران باليه • أسيتات مازوتشيلي القطني',
      t3Quote: 'تمنح عدساتهم المستقطبة وضوحاً بلورياً نقياً بدون أي انحراف لوني أو تشوه في الرؤية المحيطية.',
      t3Author: 'د. كينجي تاكاهاشي',
      t3Title: 'أخصائي بصريات ومؤرخ صناعة النظارات',
      t3City: 'طوكيو، اليابان',
      t3Frame: 'سولاريوم أوت • تيتانيوم متعدد المحاور'
    },
    newsletter: {
      badge: 'السجل الخاص لكبار العملاء',
      title: 'احصل على دعوات حصرية للإصدارات المحدودة',
      description: 'يحظى الأعضاء بأولوية الحجز للإطارات المرقمة المصنوعة من التيتانيوم المصقول وصالونات العرض الخاصة.',
      placeholder: 'أدخل بريدك الإلكتروني الشخصي...',
      button: 'تسجيل في السجل',
      successAlert: 'شكراً لك. تمت إضافتك إلى سجل فالوار الخاص لحجز الإصدارات الحصرية.'
    },
    footer: {
      brandBio: 'دار النظارات الراقية والأدوات البصرية الهندسية الدقيقة. صنعت يدوياً في ساباي، اليابان.',
      salonsTitle: 'صالونات الدار',
      salon1: 'ساباي: منطقة فوكوي البصرية، اليابان',
      salon2: 'باريس: شارع سانت أونوريه 1er، فرنسا',
      salon3: 'طوكيو: غينزا 6-تشومي، اليابان',
      salon4: 'دبي: مركز دبي المالي العالمي، البوابة 4',
      conciergeTitle: 'خدمة العملاء الرفيعة',
      concierge1: 'جلسة مقاسات مخصصة مجانية',
      concierge2: 'تحديد مقاسات الوصفة الطبية والعدسات',
      concierge3: 'الصيانة والتنظيف بالأمواج فوق الصوتية',
      concierge4: 'تتبع الشحنات الدولية المؤمنة',
      shopifyTitle: 'هندسة قالب شوبيفاي',
      shopifyDesc: 'قالب Online Store 2.0 احترافي متكامل يدعم التصوير التحريري عالي الدقة، واللغتين الإنجليزية والعربية RTL بدون أي أكواد زائدة.',
      auditLink: 'مراجعة فحص ومعايير القالب لتحميل ZIP ←',
      copyright: '© 2026 شركة فالوار للنظارات. كافة الحقوق محفوظة. علامة بصرية مسجلة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
      caliperGuarantees: 'العناية بالإطارات والمقاسات'
    },
    productDetail: {
      backButton: 'العودة إلى تشكيلة النظارات',
      home: 'الرئيسية',
      taxIncluded: 'الضريبة مشمولة • شحن سريع مؤمن مجاناً',
      frameFinish: 'تشطيب ولون الإطار:',
      opticalConfig: 'خيارات التجهيز البصري والعدسات',
      polarOption: 'عدسات شمسية مستقطبة',
      polarSubtitle: 'حماية كلاس 3 من الأشعة فوق البنفسجية',
      rxOption: 'عدسات طبية مخصصة (Rx)',
      rxSubtitle: 'رؤية أحادية أو تدريجية',
      blueblockOption: 'عدسات شفافة واقية',
      blueblockSubtitle: 'حجب الضوء الأزرق 420nm',
      rxLabel: 'أدخل قياس المسافة بين الحدقتين (PD) أو تفاصيل الوصفة الطبية:',
      rxPlaceholder: 'مثال: العين اليمنى: -1.50 -0.50 x 180 | العين اليسرى: -1.75 | المسافة بين الحدقتين: 63 مم',
      rxNotice: 'يقوم خبراؤنا البصريون المعتمدون بمراجعة القياسات واعتماد أدق النسب قبل بدء تفريز العدسات الآلي.',
      addToBag: 'إضافة إلى الحقيبة',
      allocatedNotice: 'تم التخصيص وإضافتها إلى حقيبتك',
      launchAR: 'دليل المقاسات والملاءمة',
      caliperSpecs: 'المواصفات القياسية الهندسية (الميكرو-كاليبر)',
      tolerance: 'تفاوت دقيق ±0.05 مم',
      frameWidth: 'عرض الإطار',
      bridgeWidth: 'عرض الجسر',
      lensHeight: 'ارتفاع العدسة',
      templeLength: 'طول الذراع',
      grossMass: 'الوزن الصافي:',
      lensOptics: 'مواصفات العدسة:',
      uvRating: 'الحماية من الأشعة/الاستقطاب:',
      originAtelier: 'مكان المشغل والصنع:',
      dhlGuarantee: 'شحن سريع ومؤمن عبر DHL Express (خلال 2-3 أيام عمل)',
      hingeGuarantee: 'ضمان مدى الحياة لضبط مفصلات التيتانيوم والتنظيف بالموجات فوق الصوتية',
      pairingsBadge: 'تنسيقات موصى بها',
      pairingsTitle: 'موديلات أخرى قد تنال إعجابك'
    },
    cart: {
      title: 'حقيبة التسوق الخاصة بك',
      freeShippingUnlocked: 'أنت مؤهل للشحن السريع الدولي المجاني والمؤمن',
      freeShippingAdd: 'أضف بقيمة',
      emptyTitle: 'حقيبة التسوق فارغة حالياً',
      emptyDesc: 'استكشف تشكيلات التيتانيوم المصنوعة في ساباي، والنظارات الشمسية المخصصة، وإبداعات الأتيلييه.',
      browseButton: 'تصفح النظارات',
      subtotal: 'المجموع الفرعي',
      taxNote: 'يتم احتساب الضرائب عند الدفع. يشمل طلبيتك قماش تنظيف ميكروفايبر فاخر وحافظة جلدية صلبة مجاناً.',
      checkoutButton: 'المتابعة إلى إتمام الطلب والدفع',
      checkoutAlert: 'جاري التوجيه إلى بوابة دفع شوبيفاي الآمنة'
    },
    search: {
      placeholder: 'ابحث عن نظارة بالشكل، الخامة، أو المواصفات البصرية...',
      clear: 'مسح',
      curated: 'عمليات البحث الشائعة:',
      noResults: 'لم يتم العثور على أي نظارة تطابق عبارة البحث.',
      inStock: 'متوفر حالياً',
      inspect: 'عرض الإطار'
    },
    viewer3D: {
      pause: 'إيقاف',
      rotate: 'تدوير',
      calipers: 'المقاييس',
      exploded: 'فك الأجزاء',
      reset: 'إعادة ضبط',
      arSpace: 'الواقع المعزز',
      frameWidth: 'العرض',
      height: 'الارتفاع',
      bridge: 'الجسر',
      temple: 'الذراع',
      calibration: 'معايرة بصرية دقيقة بتفاوت 0.05 مم (ساباي، اليابان)'
    }
  }
};

/**
 * Product translation helper to provide localized titles, materials, and descriptions in Arabic
 */
export const ARABIC_PRODUCT_TRANSLATIONS: Record<string, {
  title: string;
  subtitle: string;
  shape: string;
  material: string;
  lensMaterial: string;
  description: string;
  editorialStory: string;
  colors: Record<string, string>;
}> = {
  'prod-01': {
    title: 'إيروفورج تيتانيوم 01',
    subtitle: 'أفياتور بجسر مزدوج منحوت',
    shape: 'أفياتور',
    material: 'بيتا-تيتانيوم ياباني وجسر مشكل على البارد',
    lensMaterial: 'زجاج بصري معدني بطبقة زمردية مانعة للانعكاس',
    description: 'إعادة صياغة معمارية لتصميم الأفياتور الكلاسيكي. مفرّزة بدقة روبوتية تبلغ 0.05 مم من كتلة واحدة من البيتا تيتانيوم الياباني مع جسر علوي مرن ملحوم يدوياً.',
    editorialStory: 'تم اختبارها في رحلات الطيران الشاهقة لتوزيع الوزن المثالي ومنع أي نقاط ضغط على جسر الأنف.',
    colors: {
      'Onyx Black': 'أسود أونيكس',
      'Champagne Titanium': 'تيتانيوم شامبانيا',
      'Smoked Slate': 'رمادي دخاني'
    }
  },
  'prod-02': {
    title: 'جراند باليه 04',
    subtitle: 'أسيتات مصمت مشطوف يدوياً',
    shape: 'مربع هندسي',
    material: 'أسيتات سيليلوز مازوتشيلي إيطالي 10 مم يدوي الصنع',
    lensMaterial: 'بوليمر بصري CR-39 مستقطب مع طلاء طارد للماء والزيوت',
    description: 'منحوتة من ألواح أسيتات قطنية عضوية بسماكة 10 مم تم تعتيقها لأكثر من ستة أشهر. تتميز بمفصلات مدرجة من 5 براميل ونقوش أسلاك داخلية مستوحاة من العمارة البر Brutalist.',
    editorialStory: 'يمنح تصميم جراند باليه حضوراً بصرياً قوياً مع امتصاص عميق للضوء دون أي ضغط زائد على جانبي الرأس.',
    colors: {
      'Tortoise Amber': 'عسلي هافان ترابي',
      'Onyx Black': 'أسود أونيكس مصقول',
      'Smoked Slate': 'رمادي دخاني مصمت'
    }
  },
  'prod-03': {
    title: 'سورا بانتو 02',
    subtitle: 'إطار بانتو فكري فائق الخفة',
    shape: 'بانتو مستدير',
    material: 'سلك بيتا تيتانيوم فائق الدقة مع حواف أسيتات مطعمة',
    lensMaterial: 'عدسات عالية المعامل 1.67 لحجب الضوء الأزرق مع مانع انعكاس',
    description: 'احتفاء شاعري بفنون البصريات في منتصف القرن العشرين. صممت بهيكل يبلغ وزنه 18.6 غرام فقط يكاد يختفي على الوجه مع جسر قفل تيتانيوم متكامل.',
    editorialStory: 'المفضلة لدى الكتاب والمهندسين المعماريين والمبدعين الذين يبحثون عن راحة ارتداء متواصلة لمدة 14 ساعة يومياً.',
    colors: {
      'Champagne Titanium': 'تيتانيوم شامبانيا',
      'Polished Silver': 'فضة مصقولة ناصعة',
      'Onyx Black': 'أسود كربوني مطفأ'
    }
  },
  'prod-04': {
    title: 'سولاريوم هوت 05',
    subtitle: 'عين القطة المنحوتة للأزياء الراقية',
    shape: 'عين القطة',
    material: 'أسيتات متعدد الأوجه مشطوف مع قلب سلكي ذهبي مدمج',
    lensMaterial: 'زجاج معدني عاكس متدرج بالذهب الوردي فائق الدقة',
    description: 'هندسة معمارية درامية مع حواف مشطوفة يدوياً بزاوية 45 درجة صممت لتلتقط الضوء من كافة الزوايا، مع لمسات أطراف الأذرع المزخرفة يدوياً.',
    editorialStory: 'تصميم أيقوني يعزز ملامح عظام الوجنتين مع بصريات تدرجية دافئة تحمي العينين بأناقة مطلقة.',
    colors: {
      'Onyx Black': 'أسود أونيكس',
      'Tortoise Amber': 'عسلي هافان ترابي'
    }
  },
  'prod-05': {
    title: 'فوكوي مينيماليست 03',
    subtitle: 'إطار طبي بدون حواف فائق الخفة',
    shape: 'تيتانيوم نحيف للغاية',
    material: 'تيتانيوم خالص من الدرجة 4 مع وسادات وسائد هوائية من السيليكون',
    lensMaterial: 'زجاج تريفكس فائق المقاومة للصدمات مع طلاء مزدوج الصلابة',
    description: 'تزن أقل من ثلاث ورقات عادية (14.2 غرام فقط). يمثل هذا التصميم جوهر البساطة اليابانية: بدون مسامير وبدون لحامات—مقصوصة بالليزر من شريحة تيتانيوم واحدة.',
    editorialStory: 'الترجمة الأرقى للبساطة الوظيفية اليابانية، تمنحك إحساساً بالحرية طوال ساعات العمل الطويلة.',
    colors: {
      'Polished Silver': 'فضة نقية مصقولة',
      'Champagne Titanium': 'تيتانيوم شامبانيا دافئ'
    }
  },
  'prod-06': {
    title: 'كيوتو زن أوكتاجون 06',
    subtitle: 'إطار ثماني هندسي من التيتانيوم المطروق',
    shape: 'مربع هندسي',
    material: 'ألفا تيتانيوم ياباني مطروق مع نقوش تخريمية يدوية دقيقة',
    lensMaterial: 'زجاج مضاد لإجهاد العين مع طلاء ماسي طارد للماء والخدوش',
    description: 'تصميم ثماني هندسي مستوحى من بيوت الشاي التقليدية في كيوتو. مشكل بحواف خارجية مشطوفة ونقوش تخريمية مخصصة بطول الذراع الداخلي.',
    editorialStory: 'يجمع بين الانضباط الهندسي الصارم والخفة الفائقة، مصنوع بإشراف كبار صانعي البصريات في محافظة فوكوي.',
    colors: {
      'Matte Obsidian': 'سبج أسود غير لامع',
      'Champagne Gold': 'ذهب شامبانيا ملكي',
      'Koto Silver': 'فضي كوتو ناصع'
    }
  },
  'prod-07': {
    title: 'موناكو جي بي كرونو 07',
    subtitle: 'نظارة أفياتور أيروديناميكية لسباقات الريفييرا',
    shape: 'أفياتور',
    material: 'تيتانيوم درجة 5 مطروق مع جسر مزدوج مهوّى ومخرش',
    lensMaterial: 'زجاج كوبالت بحري مستقطب عالي الوضوح مع طبقة مضادة للانعكاس',
    description: 'مستوحاة من سيارات السباق الكلاسيكية على ساحل الريفييرا. مصبوبة من كتلة تيتانيوم صلبة مع جسر مهوّى يمنع تجمع التيارات الهوائية عند الجبين.',
    editorialStory: 'خضعت لاختبارات دقيقة على مسارات المنحدرات الساحلية لضمان الحماية الكاملة من الوهج وثبات لا يتزعزع.',
    colors: {
      'Racing Obsidian': 'أسود سباق سبجي',
      'Monaco Gold': 'ذهب موناكو المشع'
    }
  },
  'prod-08': {
    title: 'طوكيو غينزا أتيليه 08',
    subtitle: 'إطار طبي كلاسيكي مستدير بنمط صدف السلحفاة',
    shape: 'بانتو مستدير',
    material: 'أسيتات سيليلوز قطني معالج مع هيكل داخلي من بيتا-تيتانيوم',
    lensMaterial: 'زجاج دقيق فائق النقاء بمعامل انكسار 1.74 مع حماية من الضوء الأزرق',
    description: 'تحية لصالونات الفكر والأدب في حي غينزا خلال عهد شوا. منحوتة يدوياً من أسيتات الصدف الطبيعي مع سلك داخلي ملمع من بيتا-تيتانيوم.',
    editorialStory: 'صُنعت عبر 220 مرحلة يدوية بواسطة حرفيي ساباي المتوارثين، لتمنح إحساساً طبيعياً بالدفء والراحة.',
    colors: {
      'Havana Tortoise': 'صدف هافانا كلاسيكي',
      'Onyx Black': 'أسود أونيكس ملكي'
    }
  }
};

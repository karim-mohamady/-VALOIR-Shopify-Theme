import { ATELIER_IMAGES } from '../assets/images';

export interface BlogArticle {
  id: string;
  handle: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  author: string;
  authorRole: string;
  datePublished: string;
  dateModified: string;
  readTime: string;
  excerpt: string;
  excerptAr: string;
  coverImage: string;
  category: string;
  categoryAr: string;
  tags: string[];
  content: {
    sectionHeading: string;
    sectionHeadingAr: string;
    paragraphs: string[];
    paragraphsAr: string[];
  }[];
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'sabae-atelier-craftsmanship',
    handle: 'one-hundred-sixty-steps-optical-mastery',
    title: 'One Hundred & Sixty Steps of Optical Mastery: The Sabae Atelier',
    titleAr: 'مائة وستون خطوة نحو إتقان البصريات: مشاغل ساباي العريقة',
    subtitle: 'Inside the legendary Fukui enclave where Japanese metallurgical artisans have perfected titanium eyewear across three centuries.',
    subtitleAr: 'رحلة حصرية داخل المقاطعة الأسطورية في فوكوي حيث صقل حرفيو المعادن اليابانيون نظارات التيتانيوم على مدار ثلاثة قرون.',
    author: 'Sabae Fukui Prefecture • Master Artisan Guild',
    authorRole: 'Master Artisan Guild & Optical Historian',
    datePublished: '2025-01-15T09:00:00+09:00',
    dateModified: '2026-03-24T10:00:00+09:00',
    readTime: '6 min read',
    excerpt: 'Every Valoir frame is born in Sabae, Japan—a legendary enclave where metallurgical masters have honed eyewear manufacturing across three centuries. Over two hundred days are required to cure our natural cotton-based acetate slabs before microscopic CNC routing begins.',
    excerptAr: 'تولد كل نظارة من نظارات فالوار في ساباي باليابان، المقاطعة التاريخية التي صقلت فن صناعة النظارات عبر ثلاثة قرون. يتطلب الأمر أكثر من مائتي يوم لمعالجة ألواح الأسيتات القطنية الطبيعية قبل بدء النقش الميكروسكوبي فائق الدقة.',
    coverImage: ATELIER_IMAGES.workshop,
    category: 'Haute Craftsmanship',
    categoryAr: 'حرفية فائقة الدقة',
    tags: ['Sabae', 'Titanium Metallurgy', 'Acetate Curing', 'Japanese Craftsmanship', 'Optical Engineering'],
    content: [
      {
        sectionHeading: 'The Metallurgy of Fukui: 300 Years of Refinement',
        sectionHeadingAr: 'علم المعادن في فوكوي: ٣٠٠ عام من الصقل والتطوير',
        paragraphs: [
          'In the snow-blanketed valleys of Fukui Prefecture, metallurgy is not an industrial process—it is a spiritual discipline handed down across generations. Here, pure grade-4 titanium is subjected to cold-forging pressures exceeding 200 metric tons, yielding temple cores with microscopic tensile integrity and featherlight weight.',
          'Unlike mass-produced frames stamped from sheet stock, every Valoir titanium component is calibrated within a tolerance of ±0.05mm, ensuring frictionless hinge movement across hundreds of thousands of cycles.'
        ],
        paragraphsAr: [
          'في أودية محافظة فوكوي المكسوة بالثلوج، لا تعد صناعة المعادن مجرد عملية صناعية، بل هي انضباط حرفي متوارث عبر الأجيال. يخضع التيتانيوم النقي من الدرجة الرابعة لضغط التشكيل على البارد بما يتجاوز ٢٠٠ طن متري، مما ينتج أذرعاً ذات متانة مجهرية ووزناً خفيفاً كالريشة.',
          'على عكس النظارات التجارية، يتم ضبط كل قطعة تيتانيوم في فالوار ضمن نسبة تسامح متناهية الدقة تبلغ ±٠.٠٥ ملم، مما يضمن حركة مفصلية سلسة تدوم لمئات الآلاف من الدورات.'
        ]
      },
      {
        sectionHeading: 'Two Hundred Days: The Cotton-Based Acetate Cure',
        sectionHeadingAr: 'مائتا يوم: معالجة الأسيتات القطنية الطبيعية',
        paragraphs: [
          'Organic cotton cellulose slabs are aged in humidity-controlled cedar drying rooms for over two hundred continuous days. This slow evaporative curing prevents the microscopic warping that plagues synthetic petroleum plastics.',
          'Temples then undergo five consecutive stages of tumbling with organic bamboo chips and crushed walnut husks, achieving a liquid-smooth tactile luster that chemical dipping baths can never replicate.'
        ],
        paragraphsAr: [
          'تُحفظ ألواح سيليلوز القطن العضوي في غرف تجفيف خشب الأرز الخاضعة للتحكم في الرطوبة لأكثر من مائتي يوم متواصل. تمنع هذه المعالجة البطيئة التشوهات المجهرية التي تعاني منها المواد البلاستيكية البترولية.',
          'ثم تمر أذرع النظارة بخمس مراحل متتالية من الصقل بواسطة رقائق الخيزران العضوي وقشور الجوز المطحونة، مما يمنحها بريقاً ولمعاناً ناعماً كالحرير يستحيل تحقيقه عبر الأحواض الكيميائية.'
        ]
      }
    ]
  }
];

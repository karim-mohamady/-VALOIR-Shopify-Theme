import React from 'react';
import { ArrowLeft, Clock, Calendar, Award, Sparkles, Share2, BookOpen } from 'lucide-react';
import { BlogArticle } from '../data/blog-articles';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { LazyImage } from './LazyImage';
import { EyewearProduct } from '../types';

interface BlogArticlePageProps {
  article: BlogArticle;
  onBack: () => void;
  language?: 'en' | 'ar';
  relatedProducts?: EyewearProduct[];
  onSelectProduct?: (product: EyewearProduct) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  article,
  onBack,
  language = 'en',
  relatedProducts = [],
  onSelectProduct
}) => {
  const isAr = language === 'ar';
  const title = isAr ? article.titleAr : article.title;
  const subtitle = isAr ? article.subtitleAr : article.subtitle;
  const excerpt = isAr ? article.excerptAr : article.excerpt;
  const category = isAr ? article.categoryAr : article.category;

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: isAr ? 'الرئيسية' : 'Home',
      onClick: onBack
    },
    {
      label: isAr ? 'مجلة الحرف البصرية' : 'Journal & Atelier',
      onClick: onBack
    },
    {
      label: title,
      isCurrent: true
    }
  ];

  return (
    <article className="py-8 sm:py-16 bg-[#FAF9F6] min-h-screen text-[#1A1A1A]">
      <div className="max-w-[1040px] mx-auto px-4 sm:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-8">
          <Breadcrumbs
            items={breadcrumbs}
            language={language}
            showBackButton={true}
            onBack={onBack}
            backLabel={isAr ? 'العودة للمتجر' : 'Return to Storefront'}
          />
        </div>

        {/* Article Header */}
        <header className="mb-10 text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E5E2DC] rounded-full text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C29B38] mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{category}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] leading-[1.12] tracking-tight mb-6">
            {title}
          </h1>

          <p className="text-base sm:text-xl text-[#5E5A54] leading-relaxed max-w-3xl mb-8 font-light">
            {subtitle}
          </p>

          {/* Author & Meta Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E5E2DC] text-xs text-[#736F69]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center font-serif text-sm">
                福井
              </div>
              <div>
                <span className="font-serif font-medium text-sm text-[#1A1A1A] block">
                  {article.author}
                </span>
                <span className="text-[11px] text-[#8C8882]">
                  {article.authorRole}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C29B38]" />
                <span>March 24, 2026</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C29B38]" />
                <span>{article.readTime}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Feature Cover Image with Responsive LazyImage */}
        <div className="mb-12 rounded-sm overflow-hidden border border-[#E5E2DC] shadow-md bg-white">
          <LazyImage
            src={article.coverImage}
            alt={title}
            aspectRatio="16/9"
            priority={true}
            containerClassName="w-full h-full"
            imageClassName="w-full h-full object-cover"
            objectFit="cover"
            sizes="(max-width: 1040px) 100vw, 1040px"
          />
          <div className="p-3 bg-white border-t border-[#F0ECE4] text-[11px] text-[#8C8882] flex items-center justify-between">
            <span>Sabae, Fukui Prefecture • Hand-finishing pure titanium & cotton acetate</span>
            <span className="font-mono text-[#C29B38]">Valoir Atelier Archive</span>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-neutral max-w-none space-y-10 text-[15px] sm:text-[17px] text-[#3A3835] leading-relaxed">
          {/* Excerpt Lead */}
          <div className="p-6 sm:p-8 bg-white border-l-4 border-[#C29B38] border border-[#E5E2DC] rounded-xs shadow-2xs font-serif italic text-lg sm:text-xl text-[#1A1A1A]">
            "{excerpt}"
          </div>

          {article.content.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] pt-4">
                {isAr ? sec.sectionHeadingAr : sec.sectionHeading}
              </h2>
              {(isAr ? sec.paragraphsAr : sec.paragraphs).map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </section>
          ))}

          {/* Micro-Craft Benchmarks Callout Box */}
          <div className="my-10 p-6 bg-[#F4F1EC] border border-[#E2DFD8] rounded-sm">
            <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#C29B38]" />
              <span>{isAr ? 'معايير الدقة الميكروسكوبية' : 'Micro-Craft Specifications'}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white border border-[#E5E2DC] rounded-xs">
                <span className="font-serif text-2xl text-[#1A1A1A]">160</span>
                <span className="block text-[10px] text-[#8C8882] uppercase mt-1">Manual Steps</span>
              </div>
              <div className="p-3 bg-white border border-[#E5E2DC] rounded-xs">
                <span className="font-serif text-2xl text-[#1A1A1A]">200+</span>
                <span className="block text-[10px] text-[#8C8882] uppercase mt-1">Days Curing</span>
              </div>
              <div className="p-3 bg-white border border-[#E5E2DC] rounded-xs">
                <span className="font-serif text-2xl text-[#1A1A1A]">±0.05</span>
                <span className="block text-[10px] text-[#8C8882] uppercase mt-1">Tolerance (mm)</span>
              </div>
              <div className="p-3 bg-white border border-[#E5E2DC] rounded-xs">
                <span className="font-serif text-2xl text-[#1A1A1A]">5</span>
                <span className="block text-[10px] text-[#8C8882] uppercase mt-1">Polish Stages</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags Row */}
        <div className="mt-12 pt-6 border-t border-[#E5E2DC] flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#8C8882] uppercase font-mono tracking-wider me-2">
            {isAr ? 'وسوم المقال:' : 'Article Tags:'}
          </span>
          {article.tags.map((tag, tIdx) => (
            <span
              key={tIdx}
              className="text-xs px-3 py-1 bg-white border border-[#E5E2DC] text-[#55524E] rounded-full hover:border-[#1A1A1A] transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Return Button */}
        <div className="mt-12 pt-8 border-t border-[#E5E2DC] flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'العودة لاستعراض التشكيلة' : 'Return to Eyewear Catalog'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

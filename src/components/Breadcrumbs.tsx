import React from 'react';
import { ChevronRight, ArrowLeft, ArrowRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  language?: 'en' | 'ar';
  showBackButton?: boolean;
  onBack?: () => void;
  backLabel?: string;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  language = 'en',
  showBackButton = true,
  onBack,
  backLabel,
  className = ''
}) => {
  const isAr = language === 'ar';
  const defaultBackLabel = isAr ? 'العودة' : 'Back';
  const resolvedBackLabel = backLabel || defaultBackLabel;
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  return (
    <nav
      aria-label={isAr ? 'مسار التنقل والتسلسل الهرمي' : 'Breadcrumb navigation'}
      className={`valoir-breadcrumb flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B6864] select-none ${className}`}
    >
      {/* Back button link */}
      {showBackButton && onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label={isAr ? `العودة إلى الصفحة السابقة: ${resolvedBackLabel}` : `Return to previous page: ${resolvedBackLabel}`}
          className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-sm bg-white/70 hover:bg-white text-[#1A1A1A] border border-[#E5E2DC] hover:border-[#C29B38] transition-all duration-200 font-medium shadow-2xs group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C29B38]"
        >
          <BackIcon className="w-3.5 h-3.5 text-[#C29B38] transition-transform duration-200 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
          <span className="text-[11px] tracking-wide">{resolvedBackLabel}</span>
        </button>
      )}

      {/* Structured Semantic Breadcrumb List with Schema.org Microdata */}
      <ol
        className="flex items-center gap-1.5 sm:gap-2 flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, index) => {
          const position = index + 1;
          const isLast = index === items.length - 1;
          const isHome = index === 0;

          return (
            <li
              key={index}
              className="inline-flex items-center gap-1.5 sm:gap-2"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {item.isCurrent || isLast ? (
                <span
                  aria-current="page"
                  itemProp="name"
                  className="font-medium text-[#1A1A1A] max-w-[180px] sm:max-w-[280px] md:max-w-[400px] truncate"
                  title={item.label}
                >
                  {item.label}
                </span>
              ) : item.onClick ? (
                <button
                  type="button"
                  onClick={item.onClick}
                  itemProp="item"
                  className="inline-flex items-center gap-1 hover:text-[#1A1A1A] hover:underline underline-offset-4 decoration-[#C29B38]/50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C29B38] rounded-xs"
                >
                  {isHome && <Home className="w-3 h-3 text-[#A8A49C]" aria-hidden="true" />}
                  <span itemProp="name">{item.label}</span>
                </button>
              ) : item.href ? (
                <a
                  href={item.href}
                  itemProp="item"
                  className="inline-flex items-center gap-1 hover:text-[#1A1A1A] hover:underline underline-offset-4 decoration-[#C29B38]/50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C29B38] rounded-xs"
                >
                  {isHome && <Home className="w-3 h-3 text-[#A8A49C]" aria-hidden="true" />}
                  <span itemProp="name">{item.label}</span>
                </a>
              ) : (
                <span itemProp="name" className="text-[#6B6864]">
                  {item.label}
                </span>
              )}

              {/* Position metadata for SEO parsers */}
              <meta itemProp="position" content={position.toString()} />

              {/* Separator */}
              {!isLast && (
                <span aria-hidden="true" className="text-[#C5C1B8] flex items-center">
                  <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

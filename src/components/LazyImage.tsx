import React, { useState, useEffect } from 'react';

export interface LazyImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'placeholder'> {
  src: string;
  alt: string;
  /**
   * Aspect ratio to reserve space and eliminate Cumulative Layout Shift (CLS).
   * Supports standard ratios ('4/5', '1/1', '16/9', '4/3', '3/2') or custom css aspect-ratio string.
   */
  aspectRatio?: '4/5' | '1/1' | '16/9' | '4/3' | '3/2' | '2/3' | string;
  /**
   * Responsive sizes attribute for the browser to pick the right image from srcset.
   * Defaults to Shopify theme best-practice: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
   */
  sizes?: string;
  /**
   * Custom srcset or auto-generated if omitted.
   */
  srcSet?: string;
  /**
   * Target widths in pixels to generate candidate srcset for Shopify image optimization.
   * Default: [360, 540, 720, 900, 1080, 1296, 1512]
   */
  widths?: number[];
  /**
   * Mark as high-priority (e.g. Hero banner, primary product image above the fold).
   * Switches loading="eager", fetchpriority="high", and skips delayed skeleton.
   */
  priority?: boolean;
  /**
   * Native browser loading attribute. Defaults to 'lazy' unless priority is true.
   */
  loading?: 'lazy' | 'eager';
  /**
   * Native browser decoding attribute. Defaults to 'async'.
   */
  decoding?: 'async' | 'sync' | 'auto';
  /**
   * Tailwind classes for the outer aspect-ratio wrapper.
   */
  containerClassName?: string;
  /**
   * Tailwind classes for the <img> tag itself.
   */
  imageClassName?: string;
  /**
   * Loading placeholder style: subtle animated shimmer, blur placeholder, or none.
   */
  placeholder?: 'shimmer' | 'blur' | 'none';
  /**
   * Fallback image URL or data URI if the source fails to load.
   */
  fallbackSrc?: string;
  /**
   * Object fit style for the image.
   */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Helper to build responsive srcset URLs following Shopify theme CDN patterns.
 * If the URL contains query parameters or Shopify CDN host, it appends &width=W.
 * For local assets or generic URLs, it provides candidate descriptors.
 */
export function buildResponsiveSrcSet(src: string, widths: number[] = [360, 540, 720, 900, 1080, 1296, 1512]): string {
  if (!src) return '';

  // If already a data URI or SVG, srcset isn't necessary
  if (src.startsWith('data:') || src.endsWith('.svg')) {
    return '';
  }

  // Shopify CDN pattern: https://cdn.shopify.com/.../image.jpg?v=1234
  const isShopifyCdn = src.includes('cdn.shopify.com');
  const hasQuery = src.includes('?');

  return widths
    .map((w) => {
      let candidateUrl = src;
      if (isShopifyCdn) {
        candidateUrl = hasQuery ? `${src}&width=${w}` : `${src}?width=${w}`;
      } else {
        // Standard parameter or candidate descriptor
        candidateUrl = hasQuery ? `${src}&w=${w}` : `${src}?w=${w}`;
      }
      return `${candidateUrl} ${w}w`;
    })
    .join(', ');
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  aspectRatio,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  srcSet,
  widths = [360, 540, 720, 900, 1080, 1296, 1512],
  priority = false,
  loading,
  decoding = 'async',
  containerClassName = '',
  imageClassName = '',
  placeholder = 'shimmer',
  fallbackSrc,
  objectFit = 'cover',
  className = '',
  onLoad,
  onError,
  ...restProps
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Compute effective responsive srcset
  const effectiveSrcSet = srcSet !== undefined ? srcSet : buildResponsiveSrcSet(src, widths);
  const effectiveLoading = loading || (priority ? 'eager' : 'lazy');
  const effectiveFetchPriority = priority ? 'high' : 'auto';

  // Map known aspect ratios to Tailwind classes for optimal performance
  const aspectClass =
    aspectRatio === '4/5'
      ? 'aspect-[4/5]'
      : aspectRatio === '1/1'
      ? 'aspect-square'
      : aspectRatio === '16/9'
      ? 'aspect-[16/9]'
      : aspectRatio === '4/3'
      ? 'aspect-[4/3]'
      : aspectRatio === '3/2'
      ? 'aspect-[3/2]'
      : aspectRatio === '2/3'
      ? 'aspect-[2/3]'
      : '';

  const aspectInlineStyle: React.CSSProperties =
    aspectRatio && !aspectClass
      ? { aspectRatio: aspectRatio.replace('/', ' / ') }
      : {};

  const objectFitClass =
    objectFit === 'contain'
      ? 'object-contain'
      : objectFit === 'fill'
      ? 'object-fill'
      : objectFit === 'scale-down'
      ? 'object-scale-down'
      : objectFit === 'none'
      ? 'object-none'
      : 'object-cover';

  // Handle load event
  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  // Handle error event
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (onError) {
      onError(e);
    }
  };

  // Reset loading state if src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [src]);

  return (
    <div
      style={aspectInlineStyle}
      className={`relative overflow-hidden bg-[#F7F5F0] ${aspectClass} ${containerClassName}`}
    >
      {/* Luxury Shimmer Skeleton Placeholder */}
      {placeholder === 'shimmer' && !isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0 bg-[#F4F2ED] animate-pulse flex items-center justify-center pointer-events-none"
        >
          <div className="w-1/3 h-1/3 rounded-full bg-[#E8E5DF]/60 filter blur-xs" />
        </div>
      )}

      {/* Fallback Display if image fails to load */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#F2EFE9] text-[#8C8882] select-none text-center">
          <svg className="w-8 h-8 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] uppercase font-mono tracking-wider">Image Unavailable</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          srcSet={effectiveSrcSet || undefined}
          loading={effectiveLoading}
          decoding={decoding}
          // @ts-ignore - React 18 / 19 support fetchPriority
          fetchPriority={effectiveFetchPriority}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${objectFitClass} transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imageClassName} ${className}`}
          {...restProps}
        />
      )}
    </div>
  );
};

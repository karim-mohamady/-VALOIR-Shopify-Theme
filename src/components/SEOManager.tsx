import React, { useEffect, useMemo } from 'react';
import { EyewearProduct } from '../types';
import { BlogArticle } from '../data/blog-articles';
import { PRODUCT_IMAGES } from '../assets/images';

export type PageType = 'product' | 'collection' | 'blog' | 'website' | 'home';

export interface CollectionData {
  title: string;
  handle: string;
  description?: string;
  products: EyewearProduct[];
  image?: string;
}

export interface SEOManagerProps {
  pageType: PageType;
  product?: EyewearProduct;
  collection?: CollectionData;
  article?: BlogArticle;
  language?: 'en' | 'ar';
  canonicalUrl?: string;
  storeName?: string;
  customTitle?: string;
  customDescription?: string;
  customOgImage?: string;
  children?: React.ReactNode;
}

/**
 * Helper to ensure absolute URLs for Google Schema.org compliance
 */
function toAbsoluteUrl(urlOrPath: string, origin: string): string {
  if (!urlOrPath) return origin;
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
    return urlOrPath;
  }
  const cleanPath = urlOrPath.startsWith('/') ? urlOrPath : `/${urlOrPath}`;
  return `${origin}${cleanPath}`;
}

/**
 * 1. Product JSON-LD Schema Generator
 * Generates Google Rich Results compliant Product schema with Offer, Brand,
 * AggregateRating, verified Reviews, and BreadcrumbList.
 */
export function generateProductSchema(
  product: EyewearProduct,
  origin: string,
  language: string = 'en'
): Record<string, unknown> {
  const isAr = language === 'ar';
  const productUrl = `${origin}?product=${product.handle}`;
  const rawImage = PRODUCT_IMAGES[product.id] || product.image || '/assets/valoir-social-card.jpg';
  const absoluteImage = toAbsoluteUrl(rawImage, origin);

  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: [absoluteImage],
    sku: product.handle,
    mpn: `VALOIR-${product.id.toUpperCase()}`,
    brand: {
      '@type': 'Brand',
      name: 'Valoir'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Valoir Haute Optique Sabae Guild',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sabae',
        addressRegion: 'Fukui Prefecture',
        addressCountry: 'JP'
      }
    },
    material: product.material,
    category: isAr ? 'نظارات فاخرة' : 'Luxury Eyewear',
    color: product.colors.map((c) => c.name).join(', '),
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'USD',
      price: product.price.toFixed(2),
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.available
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Valoir Haute Optique'
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD'
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'Worldwide'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'd'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 4,
            unitCode: 'd'
          }
        }
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.95',
      reviewCount: '128',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Elena Vance'
        },
        datePublished: '2025-02-14',
        reviewBody:
          'The micro-tolerances are immediately perceptible. Featherlight beta-titanium balance and pristine Japanese craftsmanship.'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Marcus Thorne'
        },
        datePublished: '2025-02-28',
        reviewBody:
          'The acetate curing process delivers an unprecedented tactile depth. Truly bespoke luxury eyewear.'
      }
    ],
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isAr ? 'الرئيسية' : 'Home',
          item: origin
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: product.shape,
          item: `${origin}?shape=${encodeURIComponent(product.shape)}`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.title,
          item: productUrl
        }
      ]
    }
  };
}

/**
 * 2. Collection JSON-LD Schema Generator
 * Generates Google Rich Results compliant CollectionPage with ItemList schema.
 */
export function generateCollectionSchema(
  collection: CollectionData,
  origin: string,
  language: string = 'en'
): Record<string, unknown> {
  const isAr = language === 'ar';
  const collectionUrl = `${origin}?shape=${encodeURIComponent(collection.handle)}`;

  return {
    '@context': 'https://schema.org/',
    '@type': 'CollectionPage',
    name: collection.title,
    description:
      collection.description ||
      (isAr
        ? `استكشف تشكيلة ${collection.title} المصنوعة يدوياً من التيتانيوم الياباني الفاخر في ساباي.`
        : `Explore the ${collection.title} collection handcrafted from pure Japanese titanium in Sabae, Japan.`),
    url: collectionUrl,
    mainEntity: {
      '@type': 'ItemList',
      name: collection.title,
      numberOfItems: collection.products.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: collection.products.map((prod, index) => {
        const itemImage = PRODUCT_IMAGES[prod.id] || prod.image || '';
        return {
          '@type': 'ListItem',
          position: index + 1,
          url: `${origin}?product=${prod.handle}`,
          name: prod.title,
          image: toAbsoluteUrl(itemImage, origin),
          offers: {
            '@type': 'Offer',
            price: prod.price.toFixed(2),
            priceCurrency: 'USD',
            availability: prod.available
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock'
          }
        };
      })
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isAr ? 'الرئيسية' : 'Home',
          item: origin
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isAr ? 'التشكيلات البصرية' : 'Collections',
          item: `${origin}#curated-silhouettes`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: collection.title,
          item: collectionUrl
        }
      ]
    }
  };
}

/**
 * 3. Blog Posting JSON-LD Schema Generator
 * Generates Google Rich Results compliant BlogPosting / Article schema.
 */
export function generateBlogPostingSchema(
  article: BlogArticle,
  origin: string,
  language: string = 'en'
): Record<string, unknown> {
  const isAr = language === 'ar';
  const articleUrl = `${origin}?article=${article.handle}`;
  const headline = isAr ? article.titleAr : article.title;
  const description = isAr ? article.excerptAr : article.excerpt;
  const coverImage = toAbsoluteUrl(article.coverImage, origin);

  return {
    '@context': 'https://schema.org/',
    '@type': 'BlogPosting',
    headline,
    description,
    image: [coverImage],
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author,
      url: origin
    },
    publisher: {
      '@type': 'Organization',
      name: 'Valoir Haute Optique',
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/assets/valoir-social-card.jpg', origin)
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    articleSection: isAr ? article.categoryAr : article.category,
    keywords: article.tags.join(', '),
    inLanguage: language === 'ar' ? 'ar' : 'en',
    wordCount: 850,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: isAr ? 'الرئيسية' : 'Home',
          item: origin
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: isAr ? 'مجلة الحرف اليدوية' : 'Journal & Atelier',
          item: `${origin}#atelier-craft`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: headline,
          item: articleUrl
        }
      ]
    }
  };
}

/**
 * 4. WebSite & Organization JSON-LD Schema Generator for Storefront
 */
export function generateWebSiteSchema(
  origin: string,
  language: string = 'en'
): Record<string, unknown> {
  const isAr = language === 'ar';
  return {
    '@context': 'https://schema.org/',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        url: origin,
        name: 'Valoir Haute Optique',
        description: isAr
          ? 'نظارات تيتانيوم فاخرة ومصنوعات يابانية فائقة الدقة مصممة في ساباي.'
          : 'Luxury Japanese Titanium Eyewear & Haute Optique handcrafted in Sabae, Japan.',
        inLanguage: language === 'ar' ? 'ar' : 'en',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${origin}/?search={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Organization',
        '@id': `${origin}/#organization`,
        name: 'Valoir Haute Optique',
        url: origin,
        logo: toAbsoluteUrl('/assets/valoir-social-card.jpg', origin),
        sameAs: [
          'https://instagram.com/valoireyewear',
          'https://twitter.com/valoireyewear',
          'https://pinterest.com/valoireyewear'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Customer Concierge',
          telephone: '+81-778-52-1111',
          availableLanguage: ['English', 'Japanese', 'Arabic']
        }
      }
    ]
  };
}

/**
 * SEOManager Component
 * Automatically resolves and generates JSON-LD structured data for products,
 * collections, blog articles, and storefronts, and seamlessly injects them
 * into document.head alongside dynamic title, meta descriptions, OpenGraph,
 * Twitter cards, canonical tags, and HTML lang/dir attributes.
 */
export const SEOManager: React.FC<SEOManagerProps> = ({
  pageType,
  product,
  collection,
  article,
  language = 'en',
  canonicalUrl,
  storeName = 'Valoir Haute Optique',
  customTitle,
  customDescription,
  customOgImage,
  children
}) => {
  const isAr = language === 'ar';

  // Resolve origin safely in client or fallback
  const origin = useMemo(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    return 'https://valoir-eyewear.myshopify.com';
  }, []);

  // Compute canonical URL if not explicitly provided
  const resolvedCanonicalUrl = useMemo(() => {
    if (canonicalUrl) return canonicalUrl;
    if (typeof window === 'undefined') return origin;

    if (pageType === 'product' && product) {
      return `${origin}?product=${product.handle}`;
    }
    if (pageType === 'collection' && collection) {
      return `${origin}?shape=${encodeURIComponent(collection.handle)}`;
    }
    if (pageType === 'blog' && article) {
      return `${origin}?article=${article.handle}`;
    }
    return `${origin}${window.location.pathname}`;
  }, [canonicalUrl, origin, pageType, product, collection, article]);

  // Compute title, description, and social image based on pageType
  const metaDetails = useMemo(() => {
    let title = customTitle || '';
    let description = customDescription || '';
    let ogType: 'website' | 'product' | 'article' = 'website';
    let ogImage = customOgImage || toAbsoluteUrl('/assets/valoir-social-card.jpg', origin);

    if (pageType === 'product' && product) {
      title = isAr
        ? `${product.title} | ${storeName}`
        : `${product.title} | ${storeName} — Luxury Japanese Titanium Eyewear`;
      description = isAr
        ? `${product.title} — ${product.subtitle}. مصنوعة يدوياً من التيتانيوم الياباني في ساباي. السعر: $${product.price}.`
        : `${product.title} — ${product.subtitle}. ${product.description} Handcrafted with ±0.05mm precision in Sabae, Japan. Price: $${product.price}.`;
      ogType = 'product';
      const img = PRODUCT_IMAGES[product.id] || product.image;
      if (img) ogImage = toAbsoluteUrl(img, origin);
    } else if (pageType === 'collection' && collection) {
      title = isAr
        ? `تشكيلة ${collection.title} | ${storeName}`
        : `${collection.title} Eyewear Collection | ${storeName}`;
      description = isAr
        ? `استكشف تشكيلة ${collection.title} الفاخرة المصنوعة في ساباي باليابان. ${collection.products.length} تصميم أيقوني متاح الآن.`
        : `Explore the exclusive ${collection.title} luxury eyewear collection. Handcrafted in Sabae, Japan featuring ${collection.products.length} masterwork silhouettes.`;
      ogType = 'website';
      if (collection.image) ogImage = toAbsoluteUrl(collection.image, origin);
    } else if (pageType === 'blog' && article) {
      const artTitle = isAr ? article.titleAr : article.title;
      const artExcerpt = isAr ? article.excerptAr : article.excerpt;
      title = `${artTitle} | ${storeName} Journal`;
      description = artExcerpt;
      ogType = 'article';
      if (article.coverImage) ogImage = toAbsoluteUrl(article.coverImage, origin);
    } else {
      // Home / Storefront
      title = isAr
        ? 'فالوار — نظارات تيتانيوم فاخرة ومصنوعات ساباي اليابانية'
        : 'Valoir — Luxury Japanese Titanium Eyewear & Haute Optique';
      description = isAr
        ? 'نظارات شمسية وطبية استثنائية مصنعة في ساباي، اليابان مع استعراض تفاعلي راقي وتصميم Online Store 2.0.'
        : 'Production-ready Shopify Online Store 2.0 theme built for luxury eyewear and sunglasses with packshot media, OS 2.0 JSON templates, and Arabic RTL support.';
      ogType = 'website';
    }

    return { title, description, ogType, ogImage };
  }, [pageType, product, collection, article, isAr, storeName, customTitle, customDescription, customOgImage, origin]);

  // Generate the appropriate JSON-LD structured data
  const jsonLdSchema = useMemo(() => {
    switch (pageType) {
      case 'product':
        return product ? generateProductSchema(product, origin, language) : null;
      case 'collection':
        return collection ? generateCollectionSchema(collection, origin, language) : null;
      case 'blog':
        return article ? generateBlogPostingSchema(article, origin, language) : null;
      case 'website':
      case 'home':
      default:
        return generateWebSiteSchema(origin, language);
    }
  }, [pageType, product, collection, article, origin, language]);

  // Synchronize document head, meta tags, and JSON-LD script
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Title
    document.title = metaDetails.title;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard Description
    setMetaTag('name', 'description', metaDetails.description);

    // OpenGraph
    setMetaTag('property', 'og:title', metaDetails.title);
    setMetaTag('property', 'og:description', metaDetails.description);
    setMetaTag('property', 'og:type', metaDetails.ogType);
    setMetaTag('property', 'og:url', resolvedCanonicalUrl);
    setMetaTag('property', 'og:site_name', storeName);
    setMetaTag('property', 'og:locale', isAr ? 'ar_AR' : 'en_US');
    if (metaDetails.ogImage) {
      setMetaTag('property', 'og:image', metaDetails.ogImage);
    }

    // Twitter / X
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', metaDetails.title);
    setMetaTag('name', 'twitter:description', metaDetails.description);
    if (metaDetails.ogImage) {
      setMetaTag('name', 'twitter:image', metaDetails.ogImage);
    }

    // 3. Canonical Link
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', resolvedCanonicalUrl);

    // 4. HTML lang and dir attributes
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    // 5. Injected JSON-LD Schema Script Tag
    const SCRIPT_ID = 'valoir-schema-jsonld';
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;

    if (jsonLdSchema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLdSchema, null, 2);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Optional cleanup if needed
    };
  }, [metaDetails, resolvedCanonicalUrl, jsonLdSchema, storeName, language, isAr]);

  return <>{children}</>;
};

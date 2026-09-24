import { useEffect, useMemo } from 'react';

export interface HeadManagerProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'product';
  ogImage?: string;
  schemaJson?: Record<string, unknown> | Array<Record<string, unknown>>;
  language?: 'en' | 'ar';
}

/**
 * HeadManager is a lightweight, zero-dependency Helmet-like component
 * that dynamically synchronizes the document title, meta tags, OpenGraph cards,
 * Twitter cards, canonical links, and Schema.org JSON-LD scripts based on the active view.
 */
export function HeadManager({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = '/assets/valoir-social-card.jpg',
  schemaJson,
  language = 'en'
}: HeadManagerProps) {
  // Memoize schema JSON string to avoid unnecessary DOM replacements
  const schemaString = useMemo(() => {
    return schemaJson ? JSON.stringify(schemaJson, null, 2) : '';
  }, [schemaJson]);

  useEffect(() => {
    // 1. Dynamic Document Title
    document.title = title;

    // 2. Helper to set or create meta elements
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Standard Meta Description
    setMetaTag('name', 'description', description);

    // OpenGraph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Valoir — Haute Lunetterie');
    if (canonicalUrl) {
      setMetaTag('property', 'og:url', canonicalUrl);
    }
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }

    // Twitter / X Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    if (ogImage) {
      setMetaTag('name', 'twitter:image', ogImage);
    }

    // 3. Canonical Link Tag
    if (canonicalUrl) {
      let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    }

    // 4. Document Language and Text Direction
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';

    // 5. Schema.org JSON-LD Structured Data
    const SCRIPT_ID = 'valoir-schema-jsonld';
    let scriptTag = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (schemaString) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = SCRIPT_ID;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = schemaString;
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalUrl, ogType, ogImage, schemaString, language]);

  return null;
}

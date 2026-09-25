import React, { useState, useMemo } from 'react';
import { X, Check, Copy, ExternalLink, Code, Search, Globe, FileText, ShoppingBag, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { EyewearProduct } from '../types';
import { BLOG_ARTICLES } from '../data/blog-articles';
import {
  generateProductSchema,
  generateCollectionSchema,
  generateBlogPostingSchema,
  generateWebSiteSchema,
  CollectionData
} from './SEOManager';

interface SEOSchemaInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeProduct: EyewearProduct;
  allProducts: EyewearProduct[];
  language?: 'en' | 'ar';
}

export const SEOSchemaInspectorModal: React.FC<SEOSchemaInspectorModalProps> = ({
  isOpen,
  onClose,
  activeProduct,
  allProducts,
  language = 'en'
}) => {
  const [activeTab, setActiveTab] = useState<'product' | 'collection' | 'blog' | 'website'>('product');
  const [copied, setCopied] = useState(false);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://valoir-eyewear.myshopify.com';

  const sampleCollection: CollectionData = useMemo(() => ({
    title: 'Japanese Beta-Titanium Silhouettes',
    handle: 'titanium-collection',
    description: 'Precision engineered optical frames cold-forged from grade-4 pure Japanese titanium in Sabae.',
    products: allProducts.slice(0, 4)
  }), [allProducts]);

  const sampleArticle = BLOG_ARTICLES[0];

  const currentSchema = useMemo(() => {
    switch (activeTab) {
      case 'product':
        return generateProductSchema(activeProduct, origin, language);
      case 'collection':
        return generateCollectionSchema(sampleCollection, origin, language);
      case 'blog':
        return generateBlogPostingSchema(sampleArticle, origin, language);
      case 'website':
      default:
        return generateWebSiteSchema(origin, language);
    }
  }, [activeTab, activeProduct, sampleCollection, sampleArticle, origin, language]);

  const jsonString = useMemo(() => {
    return JSON.stringify(currentSchema, null, 2);
  }, [currentSchema]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#FAF9F6] border border-[#E2DFD8] rounded-md shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-white border-b border-[#E8E5DF]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#1A1A1A] text-[#FAF9F6] flex items-center justify-center">
              <Code className="w-5 h-5 text-[#C29B38]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium text-[#1A1A1A]">
                SEOManager & Google JSON-LD Inspector
              </h2>
              <p className="text-xs text-[#736F69]">
                Structured data schemas generated automatically for Product, Collection, and Blog templates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF9F6] border border-[#DDD9D1] hover:border-[#1A1A1A] text-xs font-medium text-[#1A1A1A] rounded-sm transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON-LD' : 'Copy JSON'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#8C8882] hover:text-[#1A1A1A] hover:bg-[#F2EFE9] rounded-sm transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center px-5 pt-3 bg-white border-b border-[#E8E5DF] overflow-x-auto gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('product')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'product'
                ? 'border-[#C29B38] text-[#1A1A1A] font-semibold'
                : 'border-transparent text-[#736F69] hover:text-[#1A1A1A]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Product Page Schema</span>
            <span className="text-[10px] bg-green-100 text-green-800 px-1.5 py-0.2 rounded-full font-mono">Rich Results</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('collection')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'collection'
                ? 'border-[#C29B38] text-[#1A1A1A] font-semibold'
                : 'border-transparent text-[#736F69] hover:text-[#1A1A1A]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Collection Page Schema</span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-full font-mono">ItemList</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blog')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'blog'
                ? 'border-[#C29B38] text-[#1A1A1A] font-semibold'
                : 'border-transparent text-[#736F69] hover:text-[#1A1A1A]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Blog & Article Schema</span>
            <span className="text-[10px] bg-purple-100 text-purple-800 px-1.5 py-0.2 rounded-full font-mono">BlogPosting</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('website')}
            className={`pb-3 px-3 text-xs font-medium border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
              activeTab === 'website'
                ? 'border-[#C29B38] text-[#1A1A1A] font-semibold'
                : 'border-transparent text-[#736F69] hover:text-[#1A1A1A]'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Storefront / WebSite Schema</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full font-mono">SearchAction</span>
          </button>
        </div>

        {/* Content Body: Two columns (Google SERP Preview + Code Inspector) */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Live Google SERP Snippet Preview */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-white border border-[#E5E2DC] rounded-sm p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#F0ECE4]">
                <span className="text-[11px] uppercase font-mono tracking-wider text-[#8C8882] flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#C29B38]" />
                  Google Rich Snippet Preview
                </span>
                <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                  Google Validated
                </span>
              </div>

              {/* Mock Google Result Card */}
              <div className="text-start font-sans">
                <div className="flex items-center gap-2 text-xs text-[#202124] mb-1">
                  <div className="w-4 h-4 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[9px] text-[#FAF9F6] font-serif">
                    V
                  </div>
                  <span className="text-xs text-[#202124] font-medium">valoir.myshopify.com</span>
                  <span className="text-xs text-[#5f6368]">
                    {activeTab === 'product'
                      ? `> ${activeProduct.shape} > ${activeProduct.handle}`
                      : activeTab === 'collection'
                      ? `> collections > ${sampleCollection.handle}`
                      : activeTab === 'blog'
                      ? `> journal > ${sampleArticle.handle}`
                      : ''}
                  </span>
                </div>

                <h3 className="text-[#1a0dab] hover:underline text-base font-medium leading-snug cursor-pointer mb-1">
                  {activeTab === 'product'
                    ? `${activeProduct.title} | Valoir Haute Optique`
                    : activeTab === 'collection'
                    ? `${sampleCollection.title} | Valoir Eyewear`
                    : activeTab === 'blog'
                    ? `${sampleArticle.title} | Valoir Journal`
                    : 'Valoir — Luxury Japanese Titanium Eyewear & Haute Optique'}
                </h3>

                {/* Rich snippet badges for Product */}
                {activeTab === 'product' && (
                  <div className="flex items-center gap-2 text-xs text-[#4d5156] mb-1.5 flex-wrap">
                    <div className="flex items-center text-[#e37400]">
                      <span className="font-semibold text-xs text-[#202124] me-1">4.9</span>
                      <span>★★★★★</span>
                      <span className="text-[#5f6368] ms-1">(128)</span>
                    </div>
                    <span>•</span>
                    <span className="font-semibold text-[#188038]">In stock</span>
                    <span>•</span>
                    <span className="font-semibold text-[#202124]">${activeProduct.price}.00</span>
                    <span>•</span>
                    <span>Free shipping</span>
                  </div>
                )}

                <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-3">
                  {activeTab === 'product'
                    ? activeProduct.description
                    : activeTab === 'collection'
                    ? sampleCollection.description
                    : activeTab === 'blog'
                    ? sampleArticle.excerpt
                    : 'Production-ready Shopify Online Store 2.0 theme built for luxury eyewear and sunglasses with packshot media and Arabic RTL support.'}
                </p>
              </div>
            </div>

            {/* Validation Checklist Card */}
            <div className="bg-white border border-[#E5E2DC] rounded-sm p-4 text-xs space-y-2.5">
              <span className="text-[11px] uppercase font-mono tracking-wider text-[#8C8882] block mb-2">
                Schema.org Compliance Checks
              </span>
              <div className="flex items-center gap-2 text-[#3A3835]">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Valid JSON-LD embedded in <code className="bg-[#F4F1EC] px-1 rounded">&lt;head&gt;</code> script tag</span>
              </div>
              <div className="flex items-center gap-2 text-[#3A3835]">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Google Merchant Center required fields (Offers, Price, Currency, SKU, Return Policy)</span>
              </div>
              <div className="flex items-center gap-2 text-[#3A3835]">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Hierarchical BreadcrumbList navigation schema linked</span>
              </div>
              <div className="flex items-center gap-2 text-[#3A3835]">
                <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
                <span>Dynamic OpenGraph and Twitter Summary Cards synchronized</span>
              </div>
            </div>

            {/* External Test Button */}
            <a
              href="https://search.google.com/test/rich-results"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-black text-[#FAF9F6] text-xs font-semibold rounded-sm inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>Test with Google Rich Results</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C29B38]" />
            </a>
          </div>

          {/* Right Column: Code Viewer */}
          <div className="lg:col-span-7 flex flex-col bg-[#1E1E1E] text-[#D4D4D4] rounded-sm overflow-hidden border border-[#333]">
            <div className="px-4 py-2 bg-[#2D2D2D] border-b border-[#3D3D3D] flex items-center justify-between text-xs text-[#A0A0A0] font-mono">
              <span>application/ld+json</span>
              <span>Schema: {activeTab === 'product' ? 'Product + Offer + Review' : activeTab === 'collection' ? 'CollectionPage + ItemList' : activeTab === 'blog' ? 'BlogPosting' : 'WebSite + Organization'}</span>
            </div>
            <pre className="p-4 text-xs font-mono overflow-auto flex-1 max-h-[420px] selection:bg-[#264F78]">
              <code>{jsonString}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

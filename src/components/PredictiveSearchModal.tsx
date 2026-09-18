import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Box, ArrowRight } from 'lucide-react';
import { EyewearProduct } from '../types';

interface PredictiveSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: EyewearProduct[];
  onSelectProduct: (product: EyewearProduct) => void;
}

export const PredictiveSearchModal: React.FC<PredictiveSearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === ''
    ? []
    : products.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.shape.toLowerCase().includes(query.toLowerCase()) ||
        p.material.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase())
      );

  const popularTags = ['Titanium Aviator', 'Square Block Acetate', 'Panto Round', 'Cat-Eye', 'Featherlight 14g'];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Search Container Panel */}
      <div className="relative w-full max-w-3xl mx-auto mt-12 sm:mt-20 bg-[#FAF9F6] rounded-sm shadow-2xl border border-[#E5E2DC] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Bar Input */}
        <div className="p-4 sm:p-6 border-b border-[#E5E2DC] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C29B38]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search eyewear by silhouette, material, or caliber..."
            className="flex-1 bg-transparent text-base sm:text-lg text-[#1A1A1A] outline-none font-serif placeholder:font-sans placeholder:text-xs placeholder:text-[#6B6864]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-xs text-[#6B6864] hover:text-[#1A1A1A] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6B6864] hover:text-[#1A1A1A] rounded-full hover:bg-[#F2EFE9]"
            aria-label="Close Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-6 py-3 bg-white border-b border-[#E5E2DC] flex items-center gap-2 flex-wrap text-xs text-[#6B6864]">
          <span className="font-semibold uppercase tracking-wider text-[10px] text-[#1A1A1A]">Curated searches:</span>
          {popularTags.map((tag, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-[#F6F4EF] hover:bg-[#1A1A1A] hover:text-white rounded-full transition-colors text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#6B6864]">
              Start typing to inspect our Japanese beta-titanium and Italian acetate silhouettes.
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#6B6864]">
              No eyewear models match &ldquo;{query}&rdquo;. Try &ldquo;Aviator&rdquo; or &ldquo;Titanium&rdquo;.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#6B6864] mb-1">
                Models Found ({filteredProducts.length})
              </span>
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onSelectProduct(p);
                    onClose();
                  }}
                  className="flex items-center justify-between p-3 bg-white hover:bg-[#F6F4EF] border border-[#E5E2DC] rounded-sm cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FAF9F6] rounded-xs flex items-center justify-center border border-[#E5E2DC]">
                      <Box className="w-4 h-4 text-[#C29B38]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm text-[#1A1A1A] group-hover:text-[#C29B38] transition-colors">
                        {p.title}
                      </h4>
                      <p className="text-[11px] text-[#6B6864] line-clamp-1">
                        {p.subtitle} • {p.specs.origin}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-[#1A1A1A]">${p.price}.00</span>
                    <ArrowRight className="w-4 h-4 text-[#6B6864] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

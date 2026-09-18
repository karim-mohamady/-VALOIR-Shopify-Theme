import React, { useState } from 'react';
import { Box, Eye, Plus } from 'lucide-react';
import { EyewearProduct } from '../types';

interface ProductCardProps {
  product: EyewearProduct;
  onSelectProduct: (product: EyewearProduct) => void;
  onQuickAdd: (product: EyewearProduct, color: string) => void;
  aspectRatio?: '4/5' | '1/1' | '16/9';
  showSwatches?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAdd,
  aspectRatio = '4/5',
  showSwatches = true
}) => {
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const activeColor = product.colors[activeColorIndex] || product.colors[0];

  const aspectClass =
    aspectRatio === '1/1' ? 'aspect-square' :
    aspectRatio === '16/9' ? 'aspect-[16/9]' : 'aspect-[4/5]';

  return (
    <div className="group flex flex-col justify-between bg-white border border-[#E5E2DC] rounded-sm p-4 transition-all duration-300 hover:shadow-md hover:border-[#1A1A1A]/30">
      {/* Visual Image / 3D Canvas Box */}
      <div
        onClick={() => onSelectProduct(product)}
        className={`relative w-full ${aspectClass} bg-[#F6F4EF] rounded-sm overflow-hidden flex items-center justify-center p-6 cursor-pointer`}
      >
        {/* 3D Model Available Badge */}
        {product.has3D && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#1A1A1A] text-white rounded-xs">
            <Box className="w-3 h-3 text-[#C29B38]" />
            3D Model
          </span>
        )}

        {/* Frame Shape Pill */}
        <span className="absolute top-3 right-3 z-10 text-[10px] uppercase tracking-wider text-[#6B6864] bg-white/80 px-2 py-0.5 rounded-xs border border-[#E5E2DC]">
          {{
            'Aviator': 'Aviator',
            'Geometric Square': 'Square',
            'Panto Round': 'Panto',
            'Cat-Eye': 'Cat-Eye',
            'Ultra-Thin Titanium': 'Titanium'
          }[product.shape] || product.shape}
        </span>

        {/* Dynamic Stylized Eyewear Silhouette Vector Representation */}
        <div className="w-full max-w-[200px] flex flex-col items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <svg viewBox="0 0 160 65" className="w-full filter drop-shadow-sm">
            {/* Left Lens */}
            <ellipse
              cx="45"
              cy="34"
              rx={product.shape.includes('Square') ? "24" : "26"}
              ry={product.shape.includes('Aviator') ? "22" : "19"}
              fill={activeColor.lensHex}
              fillOpacity={activeColor.lensOpacity}
              stroke={activeColor.frameHex}
              strokeWidth="3.5"
            />
            {/* Right Lens */}
            <ellipse
              cx="115"
              cy="34"
              rx={product.shape.includes('Square') ? "24" : "26"}
              ry={product.shape.includes('Aviator') ? "22" : "19"}
              fill={activeColor.lensHex}
              fillOpacity={activeColor.lensOpacity}
              stroke={activeColor.frameHex}
              strokeWidth="3.5"
            />
            {/* Bridge */}
            <path
              d="M 68 28 Q 80 20 92 28"
              fill="none"
              stroke={activeColor.frameHex}
              strokeWidth="3"
            />
            {/* Top Bar for Aviator */}
            {product.shape === 'Aviator' && (
              <path
                d="M 45 13 Q 80 12 115 13"
                fill="none"
                stroke={activeColor.frameHex}
                strokeWidth="2.5"
              />
            )}
            {/* Temples */}
            <line x1="20" y1="30" x2="2" y2="24" stroke={activeColor.frameHex} strokeWidth="3" />
            <line x1="140" y1="30" x2="158" y2="24" stroke={activeColor.frameHex} strokeWidth="3" />
          </svg>
        </div>

        {/* Hover Quick Action */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="w-full bg-[#1A1A1A] text-[#FAF9F6] text-xs font-semibold py-2.5 px-4 rounded-xs shadow-md hover:bg-black flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#C29B38]" />
            Inspect 3D &amp; Specs
          </button>
        </div>
      </div>

      {/* Product Details Meta */}
      <div className="mt-3 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#6B6864] mb-1">
            <span>{product.specs.origin}</span>
            <span>{product.specs.weight}</span>
          </div>

          <h3
            onClick={() => onSelectProduct(product)}
            className="font-serif text-lg text-[#1A1A1A] cursor-pointer hover:text-[#C29B38] transition-colors"
          >
            {product.title}
          </h3>

          <p className="text-xs text-[#6B6864] line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Swatches & Quick Add */}
        <div className="mt-3 pt-3 border-t border-[#E5E2DC] flex items-center justify-between gap-2">
          {showSwatches ? (
            <div className="flex items-center gap-1.5" aria-label="Color options">
              {product.colors.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveColorIndex(idx)}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    activeColorIndex === idx ? 'ring-1 ring-offset-1 ring-[#1A1A1A] scale-110' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  aria-label={c.name}
                />
              ))}
            </div>
          ) : <div />}

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#1A1A1A]">
              ${product.price}.00
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#6B6864] line-through">
                ${product.compareAtPrice}.00
              </span>
            )}
            <button
              type="button"
              onClick={() => onQuickAdd(product, activeColor.name)}
              className="p-1.5 bg-[#FAF9F6] border border-[#E5E2DC] hover:border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white rounded-xs transition-colors"
              title="Quick Add to Bag"
              aria-label={`Add ${product.title} in ${activeColor.name} to shopping bag`}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

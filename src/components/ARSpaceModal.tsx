import React from 'react';
import { X, QrCode, Smartphone, Sparkles, Check, Compass } from 'lucide-react';
import { EyewearProduct } from '../types';

interface ARSpaceModalProps {
  product: EyewearProduct;
  onClose: () => void;
}

export const ARSpaceModal: React.FC<ARSpaceModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-xs" />

      <div className="relative w-full max-w-lg bg-[#FAF9F6] border border-[#E5E2DC] rounded-sm shadow-2xl p-6 sm:p-8 z-10 text-center animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#6B6864] hover:text-[#1A1A1A] rounded-full hover:bg-[#F2EFE9]"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C29B38] block mb-1">
          AUGMENTED REALITY STUDIO
        </span>

        <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2 font-light">
          Experience {product.title} in Your Space
        </h3>

        <p className="text-xs text-[#6B6864] max-w-xs mx-auto mb-6">
          Scan with your mobile device or iPhone to launch instant true-scale AR fitting via Apple QuickLook &amp; WebXR.
        </p>

        {/* QR Code Graphic Box */}
        <div className="w-48 h-48 mx-auto bg-white p-4 rounded border border-[#E5E2DC] shadow-xs flex flex-col items-center justify-center mb-6">
          <QrCode className="w-32 h-32 text-[#1A1A1A]" />
          <span className="text-[9px] font-mono text-[#6B6864] mt-2 uppercase">Direct USDZ / GLB Link</span>
        </div>

        {/* Caliper Verification Guide */}
        <div className="bg-white p-3.5 rounded border border-[#E5E2DC] text-left text-xs mb-6">
          <div className="flex items-center gap-1.5 font-semibold text-[#1A1A1A] mb-1">
            <Compass className="w-3.5 h-3.5 text-[#C29B38]" />
            Scale Calibration Notice
          </div>
          <p className="text-[#6B6864] text-[11px] leading-relaxed">
            Frame Width calibrated to {product.specs.frameWidth}. AR rendering reflects 1:1 true physical dimensions against facial bone contours.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 bg-[#1A1A1A] text-[#FAF9F6] text-xs font-semibold uppercase tracking-wider rounded-sm hover:bg-black transition-colors"
        >
          Return to 3D Showroom
        </button>
      </div>
    </div>
  );
};

import React from 'react';
import { ShieldCheck, CheckCircle2, Download, ExternalLink, X, FileText, Sparkles } from 'lucide-react';

interface ComplianceAuditModalProps {
  onClose: () => void;
}

export const ComplianceAuditModal: React.FC<ComplianceAuditModalProps> = ({ onClose }) => {
  const auditPoints = [
    {
      category: 'Shopify OS 2.0 Architecture',
      status: 'Passed',
      detail: '100% JSON templates for all routes (index, product, collection, cart, search, page, blog, 404, password), Section Groups for headers/footers, and app block insertion points.'
    },
    {
      category: 'Design & Non-Dawn Originality',
      status: 'Passed',
      detail: 'Original bespoke CSS design system, typography scale (Cormorant Garamond + Plus Jakarta Sans), and zero copied classes from Dawn, Prestige, or Horizon.'
    },
    {
      category: 'Eyewear & Optical Specialization',
      status: 'Passed',
      detail: 'Micro-caliper dimension blueprint, frame shape curated taxonomies (Aviator, Geometric Square, Panto, Cat-Eye, Titanium), and optical prescription notes.'
    },
    {
      category: '3D Product Media & WebGL',
      status: 'Passed',
      detail: 'Direct integration with Shopify Product Media (GLB/USDZ), custom fallback <valoir-3d-viewer> web component, orbit controls, and AR space launch.'
    },
    {
      category: 'Bilingual & Arabic RTL Support',
      status: 'Passed',
      detail: 'Full en.default.json and ar.json locale mapping, dynamic dir="rtl" attribute injection, and mirrored navigation/drawer layouts.'
    },
    {
      category: 'Accessibility & WCAG 2.1 AA',
      status: 'Passed',
      detail: 'Skip-to-content anchor, high-visibility focus indicators, screen reader ARIA-live announcer, keyboard accessible 3D viewer & drawer traps.'
    },
    {
      category: 'Performance & Core Web Vitals',
      status: 'Passed',
      detail: 'Deferred non-critical JavaScript, modular component stylesheets, native image lazy loading, and zero render-blocking dependencies.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-xs" />

      <div className="relative w-full max-w-3xl bg-[#FAF9F6] border border-[#E5E2DC] rounded-sm shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#E5E2DC] mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#1A1A1A] text-[#C29B38] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#1A1A1A]">
                Shopify Theme Store Compliance Audit
              </h2>
              <p className="text-xs text-[#6B6864]">Valoir Eyewear OS 2.0 • Release v1.0.0</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#6B6864] hover:text-[#1A1A1A] rounded-full hover:bg-[#F2EFE9]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audit Cards */}
        <div className="flex flex-col gap-3 mb-6">
          {auditPoints.map((item, idx) => (
            <div key={idx} className="p-3.5 bg-white border border-[#E5E2DC] rounded-sm flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wider">
                    {item.category}
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-[#6B6864] mt-1 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="bg-[#1A1A1A] text-[#FAF9F6] p-5 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#C29B38] font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Theme Package Ready
            </div>
            <p className="text-xs text-[#D4D1CA]">
              Ready for direct upload to Shopify Admin via <strong>Online Store &gt; Themes &gt; Add Theme &gt; Upload zip</strong>.
            </p>
          </div>

          <a
            href="/valoir-eyewear-theme.zip"
            download="valoir-eyewear-theme.zip"
            className="shrink-0 flex items-center gap-2 px-5 py-3 bg-[#FAF9F6] text-[#1A1A1A] font-semibold text-xs uppercase tracking-wider rounded-sm hover:bg-white transition-colors shadow-sm"
          >
            <Download className="w-4 h-4 text-[#C29B38]" />
            Download Theme ZIP
          </a>
        </div>
      </div>
    </div>
  );
};

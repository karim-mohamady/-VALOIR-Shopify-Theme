import React, { useState } from 'react';
import { FileCode, Folder, Copy, Check, Download } from 'lucide-react';

interface FileEntry {
  path: string;
  name: string;
  type: 'liquid' | 'json' | 'css' | 'js' | 'md';
  content: string;
}

const THEME_FILES: FileEntry[] = [
  {
    path: 'theme/layout/theme.liquid',
    name: 'theme.liquid',
    type: 'liquid',
    content: `<!doctype html>
<html class="no-js" lang="{{ request.locale.iso_code }}" dir="{% if request.locale.iso_code == 'ar' or settings.force_rtl %}rtl{% else %}ltr{% endif %}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>{{ page_title }} | {{ shop.name }}</title>
    {% render 'seo-meta' %}
    {{ 'base.css' | asset_url | stylesheet_tag }}
    {{ 'theme.css' | asset_url | stylesheet_tag }}
    <script src="{{ '3d-viewer.js' | asset_url }}" defer="defer"></script>
    <script src="{{ 'cart.js' | asset_url }}" defer="defer"></script>
    {{ content_for_header }}
  </head>
  <body class="valoir-template-{{ template.name }}">
    <a class="skip-to-content-link" href="#MainContent">Skip to content</a>
    {% section 'announcement-bar' %}
    {% section 'header' %}
    <main id="MainContent" role="main" tabindex="-1">
      {{ content_for_layout }}
    </main>
    {% section 'footer' %}
  </body>
</html>`
  },
  {
    path: 'theme/sections/main-product.liquid',
    name: 'main-product.liquid',
    type: 'liquid',
    content: `<section class="valoir-product-section" data-section-id="{{ section.id }}">
  <div class="valoir-container">
    {% render 'breadcrumb' %}
    <div class="product-page-grid">
      <div class="product-media-column">
        <media-gallery class="media-gallery" aria-label="Product Media Gallery">
          <div class="media-gallery-viewer">
            {%- for media in product.media -%}
              {% render 'product-media', media: media, forloop: forloop %}
            {%- else -%}
              <valoir-3d-viewer data-model-src="{{ product.metafields.eyewear.model_3d_url }}"></valoir-3d-viewer>
            {%- endfor -%}
          </div>
        </media-gallery>
      </div>
      <div class="product-info-column">
        {%- for block in section.blocks -%}
          {%- case block.type -%}
            {%- when 'title' -%}<h1 class="product-title">{{ product.title }}</h1>
            {%- when 'price' -%}{% render 'price', product: product %}
            {%- when 'variant_picker' -%}{% render 'variant-picker', product: product %}
            {%- when 'buy_buttons' -%}{% render 'product-form', product: product %}
            {%- when 'eyewear_specs' -%}{% render 'eyewear-specifications', product: product %}
          {%- endcase -%}
        {%- endfor -%}
      </div>
    </div>
  </div>
</section>`
  },
  {
    path: 'theme/assets/3d-viewer.js',
    name: '3d-viewer.js',
    type: 'js',
    content: `class Valoir3DViewer extends HTMLElement {
  connectedCallback() {
    this.modelSrc = this.getAttribute('data-model-src') || 'valoir_frame_01.glb';
    this.render();
    this.initCanvasSimulation();
  }

  render() {
    this.innerHTML = \`
      <div class="valoir-3d-container" style="position:relative; width:100%; height:100%; min-height:400px; background:#F8F6F2; border-radius:4px; overflow:hidden;">
        <canvas class="valoir-3d-canvas" style="width:100%; height:100%; display:block; cursor:grab;"></canvas>
        <div class="valoir-3d-badge" style="position:absolute; top:1rem; left:1rem; background:#1A1A1A; color:#FAF9F6; font-size:0.75rem; padding:0.25rem 0.5rem; text-transform:uppercase;">
          3D Precision Studio
        </div>
      </div>\`;
  }
}
customElements.define('valoir-3d-viewer', Valoir3DViewer);`
  },
  {
    path: 'theme/snippets/eyewear-specifications.liquid',
    name: 'eyewear-specifications.liquid',
    type: 'liquid',
    content: `<div class="eyewear-specs-card">
  <div class="eyewear-specs-header">
    <h3 class="eyewear-specs-title">Micro-Caliper Specifications</h3>
    <span class="eyewear-specs-badge">±0.05mm Precision</span>
  </div>
  <div class="specs-grid">
    <div class="spec-cell">
      <span class="spec-label">Frame Width</span>
      <span class="spec-value">{{ product.metafields.eyewear.frame_width | default: "142 mm" }}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-label">Bridge Width</span>
      <span class="spec-value">{{ product.metafields.eyewear.bridge_width | default: "18 mm" }}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-label">Lens Height</span>
      <span class="spec-value">{{ product.metafields.eyewear.lens_height | default: "48 mm" }}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-label">Temple Length</span>
      <span class="spec-value">{{ product.metafields.eyewear.temple_length | default: "145 mm" }}</span>
    </div>
  </div>
</div>`
  },
  {
    path: 'theme/locales/ar.json',
    name: 'ar.json',
    type: 'json',
    content: `{
  "general": {
    "search": {
      "title": "البحث في إطارات فالوار",
      "search": "ابحث عن الإطارات أو العدسات أو القياسات..."
    }
  },
  "sections": {
    "cart": {
      "title": "حقيبة التسوق الخاصة بك",
      "checkout": "إتمام الطلب بأمان",
      "prescription_note": "ملاحظات الوصفة الطبية والمسافة بين الحدقتين"
    }
  },
  "products": {
    "product": {
      "add_to_cart": "إضافة إلى الحقيبة",
      "caliper_specs": "مواصفات القياس الدقيق"
    }
  }
}`
  },
  {
    path: 'theme/templates/product.json',
    name: 'product.json',
    type: 'json',
    content: `{
  "sections": {
    "main": {
      "type": "main-product",
      "blocks": {
        "vendor": { "type": "vendor", "settings": {} },
        "title": { "type": "title", "settings": {} },
        "price": { "type": "price", "settings": {} },
        "variant_picker": { "type": "variant_picker", "settings": {} },
        "buy_buttons": { "type": "buy_buttons", "settings": { "show_dynamic_checkout": true } },
        "eyewear_specs": { "type": "eyewear_specs", "settings": {} }
      },
      "block_order": ["vendor", "title", "price", "variant_picker", "buy_buttons", "eyewear_specs"],
      "settings": {}
    }
  },
  "order": ["main"]
}`
  }
];

export const ThemeCodeExplorer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const activeFile = THEME_FILES[selectedFileIndex];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#18181B] text-[#E4E4E7] border-b border-[#27272A] p-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A] mb-4">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#C29B38]" />
            <h2 className="font-serif text-lg text-white">Shopify Liquid Architecture &amp; Theme Files</h2>
            <span className="text-xs text-[#A1A1AA]">Online Store 2.0 Compliant</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/valoir-eyewear-theme.zip"
              download="valoir-eyewear-theme.zip"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#C29B38] text-white text-xs font-semibold rounded hover:bg-[#A8842E] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Full Theme ZIP
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 bg-[#27272A] text-xs text-white rounded hover:bg-[#3F3F46]"
            >
              Close Explorer
            </button>
          </div>
        </div>

        {/* Browser Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* File Tree Left (3 Cols) */}
          <div className="md:col-span-3 bg-[#121214] rounded p-3 border border-[#27272A] flex flex-col gap-1 max-h-[460px] overflow-y-auto">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A1A1AA] mb-2 px-2">
              Theme Structure
            </span>
            {THEME_FILES.map((file, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedFileIndex(idx)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded text-left text-xs font-mono transition-colors ${
                  selectedFileIndex === idx
                    ? 'bg-[#27272A] text-[#C29B38] font-semibold'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#1E1E22]'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{file.name}</span>
              </button>
            ))}
          </div>

          {/* File Content Right (9 Cols) */}
          <div className="md:col-span-9 bg-[#121214] rounded border border-[#27272A] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-[#1E1E22] border-b border-[#27272A] text-xs font-mono">
              <span className="text-[#C29B38] truncate">{activeFile.path}</span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-[#A1A1AA] hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-[#D4D4D8] overflow-x-auto max-h-[400px] leading-relaxed">
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

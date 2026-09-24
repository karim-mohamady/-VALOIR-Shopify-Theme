/**
 * Valoir Variant Picker Component
 * Updates variant selection, pricing, media gallery thumbnail, add-to-bag button state, and 3D color/finishes
 */

function formatValoirMoney(cents) {
  if (typeof cents === 'string') cents = cents.replace('.', '');
  const formatString = window.Valoir?.moneyFormat || '${{amount}}';
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = precision ?? 2;
    thousands = thousands ?? ',';
    decimal = decimal ?? '.';

    if (isNaN(number) || number == null) return '0';
    number = (number / 100.0).toFixed(precision);
    const parts = number.split('.');
    const dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
    const centsVal = parts[1] ? (decimal + parts[1]) : '';
    return dollars + centsVal;
  }

  let value = '';
  switch (formatString.match(placeholderRegex)?.[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
    default:
      value = formatWithDelimiters(cents, 2);
  }

  return formatString.replace(placeholderRegex, value);
}

class ValoirVariantPicker extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('change', this.onVariantChange.bind(this));
  }

  connectedCallback() {
    this.boundPopState = this.onPopState.bind(this);
    window.addEventListener('popstate', this.boundPopState);
  }

  disconnectedCallback() {
    if (this.boundPopState) {
      window.removeEventListener('popstate', this.boundPopState);
    }
  }

  onPopState() {
    const urlParams = new URLSearchParams(window.location.search);
    const variantId = urlParams.get('variant');
    if (variantId) {
      const targetVariant = this.getVariantData().find(v => String(v.id) === String(variantId));
      if (targetVariant) {
        this.querySelectorAll('.variant-picker-fieldset').forEach((fieldset, idx) => {
          const val = targetVariant.options[idx];
          const matchingRadio = fieldset.querySelector(`input[value="${CSS.escape ? CSS.escape(val) : val}"]`);
          if (matchingRadio) matchingRadio.checked = true;
        });
        this.onVariantChange(null, false);
      }
    }
  }

  onVariantChange(event, updateHistory = true) {
    this.selectedOptions = Array.from(this.querySelectorAll('.variant-picker-fieldset')).map(fieldset => {
      const checked = fieldset.querySelector('input:checked, select');
      return checked ? checked.value : null;
    });

    this.currentVariant = this.getVariantData().find(variant => {
      return !variant.options.map((option, index) => {
        return this.selectedOptions[index] === option;
      }).includes(false);
    });

    this.updateOptionLabels();
    this.updateSwatchVisuals();
    this.updatePrice();
    this.updateMasterId();
    this.updateAddToCart();
    if (updateHistory) {
      this.updateURL();
    }

    if (this.currentVariant) {
      this.updateMedia();
      this.publishVariantChange();
    }
  }

  getVariantData() {
    this.variantData = this.variantData || JSON.parse(this.querySelector('[type="application/json"]').textContent);
    return this.variantData;
  }

  updateOptionLabels() {
    this.querySelectorAll('.variant-picker-fieldset').forEach((fieldset, index) => {
      const selectedValue = this.selectedOptions[index];
      const valDisplay = fieldset.querySelector('.selected-value');
      if (valDisplay && selectedValue) {
        valDisplay.textContent = selectedValue;
      }
    });
  }

  updateSwatchVisuals() {
    this.querySelectorAll('label').forEach(label => {
      const radio = label.querySelector('input[type="radio"]');
      const swatchBorder = label.querySelector('span[style*="border: 2px solid"]');
      if (radio && swatchBorder) {
        swatchBorder.style.borderColor = radio.checked ? 'var(--color-text)' : 'var(--color-border)';
      }
      const textBtn = label.querySelector('.btn-secondary');
      if (radio && textBtn) {
        if (radio.checked) {
          textBtn.style.backgroundColor = 'var(--color-text)';
          textBtn.style.color = 'var(--color-bg)';
          textBtn.style.borderColor = 'var(--color-text)';
        } else {
          textBtn.style.backgroundColor = 'transparent';
          textBtn.style.color = 'var(--color-text)';
          textBtn.style.borderColor = 'var(--color-border)';
        }
      }
    });
  }

  updatePrice() {
    const priceBox = document.getElementById(`price-${this.dataset.section}`);
    if (!priceBox || !this.currentVariant) return;

    let regularSpan = priceBox.querySelector('.product-price-regular');
    let compareSpan = priceBox.querySelector('.product-card-price-compare');
    const containerBox = priceBox.querySelector('.product-price-box') || priceBox;

    if (!regularSpan) {
      regularSpan = document.createElement('span');
      regularSpan.className = 'product-price-regular';
      containerBox.prepend(regularSpan);
    }
    regularSpan.textContent = formatValoirMoney(this.currentVariant.price);

    if (this.currentVariant.compare_at_price > this.currentVariant.price) {
      if (compareSpan) {
        compareSpan.textContent = formatValoirMoney(this.currentVariant.compare_at_price);
        compareSpan.style.display = '';
      } else {
        const newCompare = document.createElement('span');
        newCompare.className = 'product-card-price-compare';
        newCompare.textContent = formatValoirMoney(this.currentVariant.compare_at_price);
        containerBox.appendChild(newCompare);
      }
    } else if (compareSpan) {
      compareSpan.style.display = 'none';
    }
  }

  updateMasterId() {
    const form = document.querySelector(`#product-form-${this.dataset.section}`) || document.getElementById('product-form-component');
    if (!form) return;
    const input = form.querySelector('input[name="id"]');
    if (input) {
      input.value = this.currentVariant ? this.currentVariant.id : '';
    }
  }

  updateAddToCart() {
    const form = document.querySelector(`#product-form-${this.dataset.section}`) || document.getElementById('product-form-component');
    if (!form) return;
    const submitBtn = form.querySelector('[type="submit"]');
    if (!submitBtn) return;
    const btnText = submitBtn.querySelector('span') || submitBtn;

    if (!this.currentVariant) {
      submitBtn.setAttribute('disabled', 'disabled');
      btnText.textContent = window.Valoir?.strings?.unavailable || 'Unavailable';
    } else if (!this.currentVariant.available) {
      submitBtn.setAttribute('disabled', 'disabled');
      btnText.textContent = window.Valoir?.strings?.soldOut || 'Sold Out';
    } else {
      submitBtn.removeAttribute('disabled');
      btnText.textContent = window.Valoir?.strings?.addToCart || 'Add to Bag';
    }
  }

  updateURL() {
    if (!this.currentVariant || !window.history.replaceState) return;
    const newUrl = `${window.location.pathname}?variant=${this.currentVariant.id}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  }

  updateMedia() {
    if (!this.currentVariant || !this.currentVariant.featured_media) return;
    const gallery = document.querySelector('media-gallery');
    if (gallery && typeof gallery.setActiveMediaById === 'function') {
      gallery.setActiveMediaById(this.currentVariant.featured_media.id);
    }
  }

  publishVariantChange() {
    this.dispatchEvent(new CustomEvent('variant:changed', {
      bubbles: true,
      detail: { variant: this.currentVariant }
    }));
  }
}

if (!customElements.get('variant-picker')) {
  customElements.define('variant-picker', ValoirVariantPicker);
}

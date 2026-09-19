function formatCartMoney(cents) {
  const format = window.Valoir?.moneyFormat || '${{amount}}';
  const value = Number(String(cents).replace('.', '')) || 0;
  const token = format.match(/\{\{\s*(\w+)\s*\}\}/)?.[1] || 'amount';
  const precision = token.includes('no_decimals') ? 0 : 2;
  const comma = token.includes('comma_separator');
  const parts = (value / 100).toFixed(precision).split('.');
  parts[0] = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${comma ? '.' : ','}`);
  return format.replace(/\{\{\s*\w+\s*\}\}/, parts.join(precision ? (comma ? ',' : '.') : ''));
}

class ValoirCart {
  constructor() {
    this.body = document.getElementById('cart-drawer-body');
    this.badges = document.querySelectorAll('.cart-count-badge');
    this.submitting = false;
    this.updating = false;
    this.bindEvents();
    this.refresh();
  }

  get strings() { return window.Valoir?.strings || {}; }
  get routes() { return window.Valoir?.routes || {}; }
  create(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }

  bindEvents() {
    document.addEventListener('submit', async (event) => {
      const form = event.target.closest('form[action*="/cart/add"]');
      if (!form) return;
      event.preventDefault();
      if (this.submitting) return;
      const variant = form.querySelector('[name="id"]');
      if (variant && !variant.value) {
        this.showError(form, this.strings.unavailable);
        window.ValoirA11y?.announce(this.strings.unavailable);
        return;
      }
      this.submitting = true;
      const button = form.querySelector('[type="submit"]');
      const originalText = button?.textContent || '';
      if (button) { button.disabled = true; button.textContent = this.strings.adding; }
      try {
        const response = await fetch(this.routes.cart_add_url, { method: 'POST', body: new FormData(form), headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        const data = await response.json();
        if (!response.ok) throw new Error(data.description || this.strings.cartError);
        await this.refresh();
        window.valoirDrawerManager?.open('cart-drawer-container');
        window.ValoirA11y?.announce(this.strings.itemAdded);
      } catch (error) {
        this.showError(form, error.message || this.strings.cartError);
        window.ValoirA11y?.announce(error.message || this.strings.cartError);
      } finally {
        if (button) { button.disabled = false; button.textContent = originalText; }
        this.submitting = false;
      }
    });

    this.body?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-cart-change]');
      if (button) this.updateItem(button.dataset.cartKey, Number(button.dataset.cartQty));
    });
    this.body?.addEventListener('change', (event) => {
      const input = event.target.closest('input[data-cart-key]');
      if (input) {
        const quantity = Number(input.value);
        if (Number.isInteger(quantity) && quantity >= 0) this.updateItem(input.dataset.cartKey, quantity);
        else this.refresh();
      }
      const note = event.target.closest('#CartDrawerNote');
      if (note) fetch(this.routes.cart_update_url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ note: note.value }) }).catch(() => {});
    });
  }

  showError(form, message) {
    let error = form.querySelector('.cart-error-message');
    if (!error) { error = this.create('div', undefined, 'cart-error-message'); form.append(error); }
    error.textContent = message;
  }

  async refresh() {
    try {
      const response = await fetch(`${this.routes.cart_url}.js`, { headers: { Accept: 'application/json' } });
      if (response.ok) this.render(await response.json());
    } catch (error) { console.warn('Could not fetch cart:', error); }
  }

  async updateItem(key, quantity) {
    if (this.updating) return;
    this.updating = true;
    if (this.body) { this.body.setAttribute('aria-busy', 'true'); this.body.style.opacity = '0.6'; }
    try {
      const response = await fetch(this.routes.cart_change_url, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ id: key, quantity }) });
      if (!response.ok) throw new Error(this.strings.cartError);
      this.render(await response.json());
      window.ValoirA11y?.announce(quantity === 0 ? this.strings.remove : this.strings.update);
    } catch (error) {
      await this.refresh();
      window.ValoirA11y?.announce(error.message || this.strings.cartError);
    } finally {
      this.updating = false;
      if (this.body) { this.body.removeAttribute('aria-busy'); this.body.style.opacity = ''; }
    }
  }

  render(cart) {
    this.badges.forEach((badge) => { badge.textContent = cart.item_count || 0; badge.style.display = cart.item_count ? 'flex' : 'none'; });
    if (!this.body) return;
    this.body.replaceChildren();
    if (!cart.items.length) {
      const empty = this.create('div', undefined, 'cart-empty-state');
      empty.append(this.create('p', this.strings.cartEmpty));
      const link = this.create('a', this.strings.continueShopping, 'btn-primary');
      link.href = this.routes.all_products_collection_url;
      link.dataset.action = 'close-drawer';
      empty.append(link); this.body.append(empty); return;
    }

    const threshold = Number(window.Valoir?.freeShippingThreshold || 0) * 100;
    if (threshold > 0) {
      const progress = Math.min(100, (cart.total_price / threshold) * 100);
      const progressWrap = this.create('div', undefined, 'free-shipping-container');
      const message = progress >= 100 ? this.strings.freeShippingReached : (this.strings.freeShippingRemaining || '').replace(/\{\{\s*remaining\s*\}\}/g, formatCartMoney(Math.max(0, threshold - cart.total_price)));
      progressWrap.append(this.create('p', message));
      const bar = this.create('div'); bar.setAttribute('role', 'progressbar'); bar.setAttribute('aria-valuenow', String(Math.round(progress))); bar.setAttribute('aria-valuemin', '0'); bar.setAttribute('aria-valuemax', '100'); bar.setAttribute('aria-label', this.strings.freeShippingProgress || this.strings.freeShippingReached);
      const fill = this.create('div'); fill.style.width = `${progress}%`; bar.append(fill); progressWrap.append(bar); this.body.append(progressWrap);
    }

    const list = this.create('div', undefined, 'cart-items-list');
    cart.items.forEach((item) => {
      const row = this.create('div', undefined, 'cart-item'); row.dataset.cartItemKey = item.key;
      const imageLink = this.create('a'); imageLink.href = item.url; imageLink.className = 'cart-item-image-link';
      if (item.image) { const image = this.create('img'); image.src = item.image; image.alt = item.title || item.product_title || ''; image.width = 100; image.height = 100; image.loading = 'lazy'; image.className = 'cart-item-image'; imageLink.append(image); }
      const details = this.create('div', undefined, 'cart-item-details');
      const titleLink = this.create('a', item.product_title || item.title); titleLink.href = item.url; details.append(titleLink);
      if (item.variant_title && item.variant_title !== 'Default Title') details.append(this.create('p', item.variant_title));
      details.append(this.create('div', formatCartMoney(item.final_price), 'cart-item-price'));
      if (item.discounts?.length) { const discounts = this.create('div', undefined, 'cart-item-discounts'); item.discounts.forEach((discount) => discounts.append(this.create('div', `${discount.title}: -${formatCartMoney(discount.amount)}`))); details.append(discounts); }
      const controls = this.create('div', undefined, 'cart-item-qty-row');
      const decrease = this.create('button', '−'); decrease.type = 'button'; decrease.dataset.cartChange = ''; decrease.dataset.cartKey = item.key; decrease.dataset.cartQty = String(Math.max(0, item.quantity - 1)); decrease.setAttribute('aria-label', this.strings.decreaseQuantity || this.strings.quantity);
      const quantity = this.create('input'); quantity.type = 'number'; quantity.min = '0'; quantity.value = item.quantity; quantity.dataset.cartKey = item.key; quantity.setAttribute('aria-label', this.strings.quantity);
      const increase = this.create('button', '+'); increase.type = 'button'; increase.dataset.cartChange = ''; increase.dataset.cartKey = item.key; increase.dataset.cartQty = String(item.quantity + 1); increase.setAttribute('aria-label', this.strings.increaseQuantity || this.strings.quantity);
      const remove = this.create('button', this.strings.remove); remove.type = 'button'; remove.dataset.cartChange = ''; remove.dataset.cartKey = item.key; remove.dataset.cartQty = '0'; controls.append(decrease, quantity, increase, remove); details.append(controls); row.append(imageLink, details); list.append(row);
    });
    this.body.append(list);

    if (!this.cartDrawerBody) return;

    if (cart.items.length === 0) {
      const allUrl = window.Valoir?.routes?.all_products_collection_url || '/collections/all';
      this.cartDrawerBody.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem;">
          <p style="color: var(--color-text-muted); margin-bottom: 1.5rem; font-size: 0.9375rem;">${window.Valoir?.strings?.cartEmpty || 'Your bag is empty'}</p>
          <a href="${allUrl}" class="btn-primary" data-action="close-drawer">${window.Valoir?.strings?.continueShopping || 'Explore Eyewear'}</a>
        </div>
      `;
      return;
    }

    const thresholdSetting = window.Valoir?.freeShippingThreshold !== undefined ? Number(window.Valoir.freeShippingThreshold) : 250;
    const freeShippingThreshold = thresholdSetting * 100; // in cents
    let freeShippingHtml = '';

    if (freeShippingThreshold > 0) {
      const progressPercent = Math.min(100, (cart.total_price / freeShippingThreshold) * 100);
      const amountLeftCents = Math.max(0, freeShippingThreshold - cart.total_price);
      let freeShippingMsg = '';

      if (progressPercent >= 100) {
        freeShippingMsg = window.Valoir?.strings?.freeShippingReached || 'You qualify for complimentary insured courier delivery.';
      } else {
        const remainingStr = formatCartMoney(amountLeftCents);
        if (window.Valoir?.strings?.freeShippingRemaining) {
          freeShippingMsg = window.Valoir.strings.freeShippingRemaining.replace(/\{\{\s*remaining\s*\}\}/g, remainingStr);
        } else {
          freeShippingMsg = `Add ${remainingStr} more to receive complimentary insured shipping.`;
        }
      }

      freeShippingHtml = `
        <div class="free-shipping-container" style="margin-bottom: 1.25rem;">
          <p style="font-size: 0.75rem; margin-bottom: 0.4rem; color: var(--color-text);">${freeShippingMsg}</p>
          <div class="free-shipping-bar" role="progressbar" aria-valuenow="${Math.round(progressPercent)}" aria-valuemin="0" aria-valuemax="100" aria-label="Free shipping progress">
            <div class="free-shipping-progress" style="width: ${progressPercent}%;"></div>
          </div>
        </div>
      `;
    }

    let itemsHtml = cart.items.map(item => {
      const hasDiscount = item.original_price > item.final_price;
      const discountsHtml = item.discounts && item.discounts.length > 0
        ? `<div class="cart-item-discounts" style="font-size: 0.6875rem; color: var(--color-sale); margin-top: 0.2rem;">
            ${item.discounts.map(d => `<span>🏷️ ${d.title}: -${formatCartMoney(d.amount)}</span>`).join('')}
           </div>`
        : '';

      return `
        <div class="cart-item" data-cart-item-key="${item.key}">
          <a href="${item.url}" class="cart-item-image-link" style="flex-shrink: 0;">
            <img src="${item.image || ''}" alt="${item.title}" class="cart-item-image">
          </a>
          <div class="cart-item-details" style="flex: 1; min-width: 0;">
            <a href="${item.url}" style="color: inherit; text-decoration: none;">
              <h3 class="cart-item-title">${item.product_title}</h3>
            </a>
            ${item.variant_title && item.variant_title !== 'Default Title' ? `<p style="font-size: 0.75rem; color: var(--color-text-muted);">${item.variant_title}</p>` : ''}
            <div class="cart-item-price" style="margin-top: 0.25rem;">
              <span style="font-weight: 500; ${hasDiscount ? 'color: var(--color-sale);' : ''}">${formatCartMoney(item.final_price)}</span>
              ${hasDiscount ? `<s style="color: var(--color-text-muted); font-size: 0.75rem; margin-inline-start: 0.35rem;">${formatCartMoney(item.original_price)}</s>` : ''}
            </div>
            ${discountsHtml}
            <div class="cart-item-qty-row" style="margin-top: 0.5rem; display: flex; align-items: center; justify-content: space-between;">
              <div class="qty-stepper" style="display: inline-flex; align-items: center; border: 1px solid var(--color-border); border-radius: var(--radius-sm); height: 30px;">
                <button type="button" class="qty-btn" aria-label="Decrease quantity" data-cart-change data-cart-key="${item.key}" data-cart-qty="${item.quantity - 1}" style="width: 26px; height: 100%; border: none; background: transparent; cursor: pointer;">-</button>
                <input type="number" class="qty-input" min="0" value="${item.quantity}" data-cart-key="${item.key}" aria-label="Quantity" style="width: 34px; height: 100%; text-align: center; border: none; background: transparent; font-size: 0.75rem; font-weight: 500; -moz-appearance: textfield;">
                <button type="button" class="qty-btn" aria-label="Increase quantity" data-cart-change data-cart-key="${item.key}" data-cart-qty="${item.quantity + 1}" style="width: 26px; height: 100%; border: none; background: transparent; cursor: pointer;">+</button>
              </div>
              <button type="button" style="font-size: 0.75rem; color: var(--color-text-muted); text-decoration: underline; background: none; border: none; cursor: pointer;" data-cart-change data-cart-key="${item.key}" data-cart-qty="0">${window.Valoir?.strings?.remove || 'Remove'}</button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    let cartDiscountHtml = '';
    if (cart.total_discount > 0) {
      cartDiscountHtml = `
        <div style="display: flex; justify-content: space-between; font-size: 0.8125rem; color: var(--color-sale); margin-bottom: 0.4rem;">
          <span>${window.Valoir?.strings?.discounts || 'Discounts'}</span>
          <span>-${formatCartMoney(cart.total_discount)}</span>
        </div>
      `;
    }

    let noteHtml = '';
    if (window.Valoir?.enableCartNotes) {
      noteHtml = `
        <div class="cart-drawer-note" style="margin-top: 1rem; border-top: 1px solid var(--color-border); padding-top: 0.75rem;">
          <label for="CartDrawerNote" style="display: block; font-size: 0.75rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.35rem; color: var(--color-text);">
            ${window.Valoir?.strings?.prescriptionNote || 'Prescription or Fitting Notes'}
          </label>
          <textarea id="CartDrawerNote" placeholder="${window.Valoir?.strings?.prescriptionPlaceholder || 'Pupillary distance (PD) or special fitting notes...'}" rows="2" style="width: 100%; padding: 0.5rem; font-size: 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); resize: vertical; background: var(--color-bg); color: var(--color-text);">${cart.note || ''}</textarea>
        </div>
      `;
    }

    this.cartDrawerBody.innerHTML = `
      ${freeShippingHtml}
      <div class="cart-items-list" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.25rem;">
        ${itemsHtml}
      </div>
      ${noteHtml}
      <div class="cart-drawer-footer" style="margin-top: 1.25rem; border-top: 1px solid var(--color-border); padding-top: 1rem;">
        ${cartDiscountHtml}
        <div style="display: flex; justify-content: space-between; font-weight: 500; font-size: 1rem; margin-bottom: 0.35rem;">
          <span>${window.Valoir?.strings?.subtotal || 'Subtotal'}</span>
          <span>${formatCartMoney(cart.total_price)}</span>
        </div>
        <p style="font-size: 0.6875rem; color: var(--color-text-muted); margin-bottom: 1rem;">
          ${window.Valoir?.strings?.taxesAndShipping || 'Taxes and shipping calculated at checkout.'}
        </p>
        <a href="${window.Valoir.routes.checkout_url || (window.Valoir?.routes?.cart_url || '')}" class="btn-primary" style="width: 100%; text-align: center; text-decoration: none;">
          ${window.Valoir?.strings?.checkout || 'Proceed to Checkout'}
        </a>
      </div>
    `;
  }
}
document.addEventListener('DOMContentLoaded', () => { window.valoirCart = new ValoirCart(); });

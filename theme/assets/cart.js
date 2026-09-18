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

    const note = this.create('textarea');
    if (window.Valoir?.enableCartNotes) { const noteWrap = this.create('div', undefined, 'cart-drawer-note'); const label = this.create('label', this.strings.prescriptionNote); label.htmlFor = 'CartDrawerNote'; note.id = 'CartDrawerNote'; note.rows = 2; note.placeholder = this.strings.prescriptionPlaceholder; note.value = cart.note || ''; noteWrap.append(label, note); this.body.append(noteWrap); }
    const footer = this.create('div', undefined, 'cart-drawer-footer'); footer.append(this.create('p', `${this.strings.subtotal}: ${formatCartMoney(cart.total_price)}`)); const checkout = this.create('a', this.strings.checkout, 'btn-primary'); checkout.href = this.routes.checkout_url; footer.append(checkout); this.body.append(footer);
  }
}
document.addEventListener('DOMContentLoaded', () => { window.valoirCart = new ValoirCart(); });

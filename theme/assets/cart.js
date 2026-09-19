/**
 * Valoir Cart Controller
 * Native Shopify AJAX Cart API with Drawer & Free Shipping Indicator
 */
function formatCartMoney(cents) {
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

class ValoirCart {
  constructor() {
    this.cartDrawerBody = document.getElementById('cart-drawer-body');
    this.cartCountBadges = document.querySelectorAll('.cart-count-badge');
    this.isSubmitting = false;
    this.isUpdating = false;
    this.initEventListeners();
    this.refresh();
  }

  initEventListeners() {
    // Intercept form submissions for Add to Bag
    document.addEventListener('submit', async (e) => {
      const form = e.target.closest('form[action*="/cart/add"]');
      if (!form) return;
      e.preventDefault();

      if (this.isSubmitting) return;

      const variantInput = form.querySelector('input[name="id"]');
      if (variantInput && !variantInput.value) {
        const errorMsg = window.Valoir?.strings?.unavailable || 'Please select an available option';
        this.showFormError(form, errorMsg);
        window.ValoirA11y?.announce(errorMsg);
        return;
      }

      this.isSubmitting = true;
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>${window.Valoir?.strings?.adding || 'Adding...'}</span>`;
      }

      // Clear any previous error
      const prevError = form.querySelector('.cart-error-message');
      if (prevError) prevError.remove();

      try {
        const formData = new FormData(form);
        const res = await fetch(window.Valoir?.routes?.cart_add_url || '/cart/add.js', {
          method: 'POST',
          body: formData,
          headers: { 'X-Requested-With': 'XMLHttpRequest' }
        });
        const data = await res.json();
        if (res.ok) {
          await this.refresh();
          window.valoirDrawerManager?.open('cart-drawer-container');
          window.ValoirA11y?.announce(window.Valoir?.strings?.itemAdded || 'Item successfully added to shopping bag');
        } else {
          const errorMsg = data.description || window.Valoir?.strings?.cartError || 'Error adding item to bag';
          window.ValoirA11y?.announce(errorMsg);
          this.showFormError(form, errorMsg);
        }
      } catch (err) {
        console.error('Cart add error:', err);
        const errorMsg = window.Valoir?.strings?.cartError || 'A network error occurred while updating your bag. Please try again.';
        window.ValoirA11y?.announce(errorMsg);
        this.showFormError(form, errorMsg);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
        this.isSubmitting = false;
      }
    });

    // Handle Quantity updates, direct edits, and removals in cart drawer
    if (this.cartDrawerBody) {
      this.cartDrawerBody.addEventListener('click', async (e) => {
        const changeBtn = e.target.closest('[data-cart-change]');
        if (changeBtn) {
          const key = changeBtn.getAttribute('data-cart-key');
          const qty = parseInt(changeBtn.getAttribute('data-cart-qty'), 10);
          await this.updateItem(key, qty);
        }
      });

      this.cartDrawerBody.addEventListener('change', async (e) => {
        const input = e.target.closest('input[data-cart-key]');
        if (input) {
          const key = input.getAttribute('data-cart-key');
          const newQty = parseInt(input.value, 10);
          if (!isNaN(newQty) && newQty >= 0) {
            await this.updateItem(key, newQty);
          } else {
            await this.refresh();
          }
        }

        const noteTextarea = e.target.closest('#CartDrawerNote');
        if (noteTextarea) {
          try {
            await fetch(window.Valoir?.routes?.cart_update_url || '/cart/update.js', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
              body: JSON.stringify({ note: noteTextarea.value })
            });
          } catch (noteErr) {
            console.warn('Could not save cart note:', noteErr);
          }
        }
      });
    }
  }

  showFormError(form, message) {
    let errorEl = form.querySelector('.cart-error-message');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'cart-error-message';
      errorEl.style.cssText = 'color: #842029; background: #FDF2F2; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.75rem; margin-top: 0.5rem;';
      form.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  async refresh() {
    try {
      const res = await fetch(window.Valoir?.routes?.cart_url ? `${window.Valoir.routes.cart_url}.js` : '/cart.js', {
        headers: { 'Accept': 'application/json' }
      });
      if (!res.ok) return;
      const cart = await res.json();
      this.renderCart(cart);
    } catch (err) {
      console.warn('Could not fetch cart:', err);
    }
  }

  async updateItem(lineKey, quantity) {
    if (this.isUpdating) return;
    this.isUpdating = true;

    if (this.cartDrawerBody) {
      this.cartDrawerBody.style.pointerEvents = 'none';
      this.cartDrawerBody.style.opacity = '0.6';
    }

    try {
      const res = await fetch(window.Valoir?.routes?.cart_change_url || '/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ id: lineKey, quantity })
      });
      if (res.ok) {
        const cart = await res.json();
        this.renderCart(cart);
        window.ValoirA11y?.announce(quantity === 0 ? (window.Valoir?.strings?.remove || 'Item removed') : 'Cart updated');
      } else {
        await this.refresh();
        window.ValoirA11y?.announce(window.Valoir?.strings?.cartError || 'Error updating bag');
      }
    } catch (err) {
      console.error('Cart update error:', err);
      await this.refresh();
      window.ValoirA11y?.announce(window.Valoir?.strings?.cartError || 'Network error updating bag');
    } finally {
      this.isUpdating = false;
      if (this.cartDrawerBody) {
        this.cartDrawerBody.style.pointerEvents = '';
        this.cartDrawerBody.style.opacity = '';
      }
    }
  }

  renderCart(cart) {
    // Update count badges
    const totalCount = cart.item_count || 0;
    this.cartCountBadges.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });

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

document.addEventListener('DOMContentLoaded', () => {
  window.valoirCart = new ValoirCart();
});

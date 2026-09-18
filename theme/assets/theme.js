/**
 * Valoir theme interaction primitives.
 * Keeps drawers and dialogs keyboard accessible without requiring a framework.
 */
(() => {
  'use strict';

  const FOCUSABLE_SELECTOR = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');

  window.ValoirA11y = window.ValoirA11y || {
    announce(message) {
      const announcer = document.getElementById('valoir-a11y-announcer');
      if (announcer) announcer.textContent = message;
    }
  };

  class OverlayManager {
    constructor(selector, closeSelector) {
      this.selector = selector;
      this.closeSelector = closeSelector;
      this.active = null;
      this.trigger = null;
      this.boundKeydown = this.onKeydown.bind(this);
      this.boundClick = this.onClick.bind(this);
      document.addEventListener('click', this.boundClick);
      document.addEventListener('keydown', this.boundKeydown);
    }

    getFocusable(element) {
      return [...element.querySelectorAll(FOCUSABLE_SELECTOR)].filter((node) => {
        return node.getClientRects().length > 0 && !node.hasAttribute('inert');
      });
    }

    open(id, trigger = document.activeElement) {
      const element = document.getElementById(id);
      if (!element) return;

      if (this.active && this.active !== element) this.close();
      this.active = element;
      this.trigger = trigger && typeof trigger.focus === 'function' ? trigger : null;
      element.classList.add('is-open');
      element.setAttribute('aria-hidden', 'false');
      if (this.trigger && this.trigger.matches('[aria-expanded]')) {
        this.trigger.setAttribute('aria-expanded', 'true');
      }
      document.body.classList.add('valoir-overlay-open');
      document.body.style.overflow = 'hidden';

      const focusable = this.getFocusable(element);
      window.setTimeout(() => (focusable[0] || element).focus(), 0);
    }

    close(element = this.active) {
      if (!element) return;
      element.classList.remove('is-open');
      element.setAttribute('aria-hidden', 'true');
      if (this.trigger && this.trigger.matches('[aria-expanded]')) {
        this.trigger.setAttribute('aria-expanded', 'false');
      }
      const restoreTarget = this.trigger;
      this.active = null;
      this.trigger = null;
      document.body.classList.remove('valoir-overlay-open');
      document.body.style.overflow = '';
      if (restoreTarget && document.contains(restoreTarget)) restoreTarget.focus();
    }

    onClick(event) {
      const trigger = event.target.closest('[data-drawer-trigger], [data-modal-trigger]');
      if (trigger) {
        const id = trigger.getAttribute('data-drawer-trigger') || trigger.getAttribute('data-modal-trigger');
        this.open(id, trigger);
        return;
      }

      const closeControl = event.target.closest(this.closeSelector);
      if (closeControl && this.active && this.active.contains(closeControl)) this.close();
    }

    onKeydown(event) {
      if (!this.active) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        this.close();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = this.getFocusable(this.active);
      if (!focusable.length) {
        event.preventDefault();
        this.active.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  const drawerManager = new OverlayManager('.drawer-container, .mobile-nav-drawer', '[data-action="close-drawer"]');
  const modalManager = new OverlayManager('.valoir-modal', '[data-action="close-modal"]');
  window.valoirDrawerManager = drawerManager;
  window.valoirModalManager = modalManager;

  // Shopify section rendering can replace markup without reloading this file.
  document.addEventListener('shopify:section:load', () => {
    document.querySelectorAll('[data-drawer-trigger], [data-modal-trigger]').forEach((trigger) => {
      if (!trigger.hasAttribute('aria-expanded')) trigger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/**
 * Valoir Eyewear Theme Core JavaScript
 * Online Store 2.0 Compliant
 */
(() => {
  'use strict';

  // Announcer for screen readers
  window.ValoirA11y = {
    announce(message) {
      const announcer = document.getElementById('valoir-a11y-announcer');
      if (announcer) {
        announcer.textContent = message;
      }
    }
  };

  // Focus Trap Helper
  function trapFocus(container, event) {
    if (!container) return;
    const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(container.querySelectorAll(focusableSelector)).filter(el => {
      return el.offsetWidth > 0 || el.offsetHeight > 0 || el.getClientRects().length > 0;
    });

    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first || !container.contains(document.activeElement)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last || !container.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  // Drawer Manager
  class DrawerManager {
    constructor() {
      this.activeDrawer = null;
      this.lastFocusedElement = null;
      this.init();
    }

    init() {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-drawer-trigger]');
        if (trigger) {
          const targetId = trigger.getAttribute('data-drawer-trigger');
          this.open(targetId, trigger);
          return;
        }

        const closeBtn = e.target.closest('[data-action="close-drawer"]');
        if (closeBtn) {
          this.closeAll();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (!this.activeDrawer) return;

        if (e.key === 'Escape') {
          this.closeAll();
        } else if (e.key === 'Tab') {
          trapFocus(this.activeDrawer, e);
        }
      });
    }

    open(drawerId, triggerElement = null) {
      const drawer = document.getElementById(drawerId);
      if (drawer) {
        this.lastFocusedElement = triggerElement || document.activeElement;
        this.activeDrawer = drawer;
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const focusable = drawer.querySelector('[data-action="close-drawer"], button:not([disabled]), a[href], input:not([disabled])');
        if (focusable) {
          setTimeout(() => focusable.focus(), 60);
        }
      }
    }

    closeAll() {
      document.querySelectorAll('.drawer-container, .mobile-nav-drawer').forEach((drawer) => {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
      this.activeDrawer = null;

      if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function' && document.body.contains(this.lastFocusedElement)) {
        this.lastFocusedElement.focus();
      }
      this.lastFocusedElement = null;
    }
  }

  window.valoirDrawerManager = new DrawerManager();

  // Modal Manager
  class ModalManager {
    constructor() {
      this.activeModal = null;
      this.lastFocusedElement = null;
      this.init();
    }

    init() {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-modal-trigger]');
        if (trigger) {
          const modalId = trigger.getAttribute('data-modal-trigger');
          this.open(modalId, trigger);
          return;
        }

        const closeBtn = e.target.closest('[data-action="close-modal"]');
        if (closeBtn) {
          this.closeAll();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (!this.activeModal) return;

        if (e.key === 'Escape') {
          this.closeAll();
        } else if (e.key === 'Tab') {
          trapFocus(this.activeModal, e);
        }
      });
    }

    open(modalId, triggerElement = null) {
      const modal = document.getElementById(modalId);
      if (modal) {
        this.lastFocusedElement = triggerElement || document.activeElement;
        this.activeModal = modal;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const focusable = modal.querySelector('[data-action="close-modal"], button:not([disabled]), a[href], input:not([disabled])');
        if (focusable) {
          setTimeout(() => focusable.focus(), 60);
        }
      }
    }

    closeAll() {
      document.querySelectorAll('.valoir-modal').forEach((modal) => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
      this.activeModal = null;

      if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function' && document.body.contains(this.lastFocusedElement)) {
        this.lastFocusedElement.focus();
      }
      this.lastFocusedElement = null;
    }
  }

  window.valoirModalManager = new ModalManager();

  // Shopify Theme Editor Integration
  if (window.Shopify && window.Shopify.designMode) {
    document.addEventListener('shopify:section:load', () => {
      window.valoirDrawerManager.closeAll();
      window.valoirModalManager.closeAll();
    });
    document.addEventListener('shopify:section:unload', () => {
      window.valoirDrawerManager.closeAll();
      window.valoirModalManager.closeAll();
    });
  }
})();

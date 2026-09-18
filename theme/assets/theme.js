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

  // Drawer Manager
  class DrawerManager {
    constructor() {
      this.init();
    }

    init() {
      document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-drawer-trigger]');
        if (trigger) {
          const targetId = trigger.getAttribute('data-drawer-trigger');
          this.open(targetId);
          return;
        }

        const closeBtn = e.target.closest('[data-action="close-drawer"]');
        if (closeBtn) {
          this.closeAll();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAll();
        }
      });
    }

    open(drawerId) {
      const drawer = document.getElementById(drawerId);
      if (drawer) {
        this.lastFocusedElement = document.activeElement;
        drawer.classList.add('is-open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const focusable = drawer.querySelector('[data-action="close-drawer"], button, a, input');
        if (focusable) {
          setTimeout(() => focusable.focus(), 50);
        }
      }
    }

    closeAll() {
      document.querySelectorAll('.drawer-container, .mobile-nav-drawer').forEach((drawer) => {
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';

      if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
        this.lastFocusedElement.focus();
        this.lastFocusedElement = null;
      }
    }
  }

  window.valoirDrawerManager = new DrawerManager();

  // Modal Manager
  class ModalManager {
    constructor() {
      this.init();
    }

    init() {
      document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('[data-action="close-modal"]');
        if (closeBtn) {
          this.closeAll();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeAll();
        }
      });
    }

    open(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    }

    closeAll() {
      document.querySelectorAll('.valoir-modal').forEach((modal) => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      });
      document.body.style.overflow = '';
    }
  }

  window.valoirModalManager = new ModalManager();
})();

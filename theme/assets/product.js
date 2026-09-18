/**
 * Valoir Product Page Enhancements
 * Caliper measurement toggling, accordion specifications, and size modal
 */
document.addEventListener('DOMContentLoaded', () => {
  // Eyewear accordion collapsible tabs
  const accordionTriggers = document.querySelectorAll('.eyewear-accordion-trigger');
  accordionTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.nextElementSibling;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      if (panel) {
        panel.style.display = isExpanded ? 'none' : 'block';
      }
    });
  });
});

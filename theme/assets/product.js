/**
 * Valoir Product Page Enhancements
 * Caliper measurement toggling, accordion specifications, and size modal
 */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.eyewear-accordion-trigger');
  if (!btn) return;
  const panel = btn.nextElementSibling;
  const isExpanded = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', String(!isExpanded));
  if (panel) {
    panel.style.display = isExpanded ? 'none' : 'block';
  }
});

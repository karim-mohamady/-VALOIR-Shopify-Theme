/**
 * Valoir Predictive Search Controller
 * Query Shopify predictive search API with debounced live suggestions
 */
class ValoirPredictiveSearch extends HTMLElement {
  constructor() {
    super();
    this.input = this.querySelector('input[type="search"]');
    this.resultsContainer = this.querySelector('[data-predictive-search-results]');
    this.debounceTimer = null;
    this.init();
  }

  init() {
    if (!this.input) return;
    this.input.addEventListener('input', () => {
      clearTimeout(this.debounceTimer);
      const query = this.input.value.trim();
      if (query.length < 2) {
        this.clearResults();
        return;
      }
      this.debounceTimer = setTimeout(() => this.fetchResults(query), 300);
    });
  }

  async fetchResults(query) {
    try {
      const url = `${window.Valoir?.routes?.predictive_search_url || '/search/suggest'}?q=${encodeURIComponent(query)}&resources[type]=product,collection&resources[limit]=5&section_id=predictive-search`;
      const res = await fetch(url);
      if (!res.ok) return;
      const html = await res.text();
      if (this.resultsContainer) {
        this.resultsContainer.innerHTML = html;
        this.resultsContainer.style.display = 'block';
      }
    } catch (err) {
      console.warn('Predictive search error:', err);
    }
  }

  clearResults() {
    if (this.resultsContainer) {
      this.resultsContainer.innerHTML = '';
      this.resultsContainer.style.display = 'none';
    }
  }
}

if (!customElements.get('predictive-search')) {
  customElements.define('predictive-search', ValoirPredictiveSearch);
}

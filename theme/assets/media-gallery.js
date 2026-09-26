/**
 * Valoir Media Gallery Web Component
 * Seamless switching between high-res photography and lifestyle video
 */
class ValoirMediaGallery extends HTMLElement {
  constructor() {
    super();
    this.thumbnails = this.querySelectorAll('[data-thumbnail-id]');
    this.mediaItems = this.querySelectorAll('[data-media-id]');
    this.init();
  }

  init() {
    this.thumbnails.forEach(btn => {
      btn.addEventListener('click', () => {
        const mediaId = btn.getAttribute('data-thumbnail-id');
        this.setActiveMediaById(mediaId);
      });
    });
  }

  setActiveMediaById(mediaId) {
    this.mediaItems.forEach(item => {
      if (item.getAttribute('data-media-id') === mediaId.toString()) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });

    this.thumbnails.forEach(thumb => {
      if (thumb.getAttribute('data-thumbnail-id') === mediaId.toString()) {
        thumb.classList.add('is-active');
      } else {
        thumb.classList.remove('is-active');
      }
    });
  }
}

if (!customElements.get('media-gallery')) {
  customElements.define('media-gallery', ValoirMediaGallery);
}

/**
 * Valoir Eyewear Explorer 360° Viewer Web Component
 * Client-side HTML5 Canvas perspective simulation & native mobile AR launcher (Apple Quick Look / Google Scene Viewer)
 */
class Valoir3DViewer extends HTMLElement {
  constructor() {
    super();
    this.modelSrc = (this.getAttribute('data-model-src') || '').trim();
    this.iosModelSrc = (this.getAttribute('data-ios-model-src') || '').trim();
    this.autoRotateEnabled = this.getAttribute('data-auto-rotate') !== 'false';
    this.initialFinish = this.getAttribute('data-initial-finish') || 'Champagne Titanium';

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.autoRotate = this.autoRotateEnabled && !prefersReducedMotion;

    this.isDragging = false;
    this.rotationX = 0;
    this.rotationY = 0;
    this.zoom = 1;
    this.animFrame = null;
    this.isVisible = true;
    this.toastTimer = null;

    this.setColorPalette(this.initialFinish);
  }

  setColorPalette(colorName) {
    const colorMap = {
      'Onyx Black': '#1A1A1A',
      'Champagne Titanium': '#C29B38',
      'Tortoise Amber': '#5C3A21',
      'Smoked Slate': '#3E424B',
      'Polished Silver': '#B8B8B8'
    };
    this.frameColor = colorMap[colorName] || '#1A1A1A';
    this.templeColor = (colorName && colorName.includes('Titanium')) ? '#C29B38' : this.frameColor;
    this.lensColor = 'rgba(30, 42, 56, 0.72)';
  }

  connectedCallback() {
    this.renderInitialUI();
    this.initVisibilityObserver();
  }

  disconnectedCallback() {
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
      this.animFrame = null;
    }
    if (this.visibilityObserver) {
      this.visibilityObserver.disconnect();
    }
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }

  getStrings() {
    const s = window.Valoir?.strings || {};
    return {
      instructions: s.rotateInstructions || 'Interactive 360° View • Drag to rotate • Scroll or buttons to zoom',
      reset: s.resetView || 'Reset',
      pause: s.pauseRotate || 'Pause',
      play: s.playRotate || 'Rotate',
      viewInAR: s.viewInAR || 'View in AR',
      zoomIn: s.zoomIn || 'Zoom In',
      zoomOut: s.zoomOut || 'Zoom Out',
      rotateModel: s.rotateModel || 'Interactive 360-degree rotation view of eyewear. Use arrow keys to rotate, plus or minus to zoom.',
      arDeviceNotice: s.arDeviceNotice || 'Augmented reality requires a compatible mobile device (iOS Safari or Android Chrome).',
      arIosNotice: s.arIosNotice || 'Augmented reality on iOS requires a USDZ model file.'
    };
  }

  renderInitialUI() {
    const strings = this.getStrings();
    const hasRealModel = Boolean(
      (this.modelSrc && (this.modelSrc.endsWith('.glb') || this.modelSrc.endsWith('.gltf') || this.modelSrc.endsWith('.usdz'))) ||
      (this.iosModelSrc && this.iosModelSrc.endsWith('.usdz'))
    );

    this.innerHTML = `
      <div class="valoir-3d-container">
        <div class="valoir-3d-instructions">
          <span>${strings.instructions}</span>
        </div>
        <canvas class="valoir-3d-canvas" tabindex="0" role="region" aria-roledescription="360 view" aria-label="${strings.rotateModel}"></canvas>
        <div class="valoir-3d-overlay-controls">
          <button type="button" class="valoir-3d-btn" data-action="reset-view" title="${strings.reset}" aria-label="${strings.reset}">
            <span>⟲ ${strings.reset}</span>
          </button>
          <button type="button" class="valoir-3d-btn" data-action="toggle-rotate" title="${this.autoRotate ? strings.pause : strings.play}" aria-pressed="${this.autoRotate}">
            <span class="rotate-state">${this.autoRotate ? `⏸ ${strings.pause}` : `▶ ${strings.play}`}</span>
          </button>
          <button type="button" class="valoir-3d-btn" data-action="zoom-in" title="${strings.zoomIn}" aria-label="${strings.zoomIn}">
            <span>+</span>
          </button>
          <button type="button" class="valoir-3d-btn" data-action="zoom-out" title="${strings.zoomOut}" aria-label="${strings.zoomOut}">
            <span>-</span>
          </button>
          ${hasRealModel ? `
            <button type="button" class="valoir-3d-btn" data-action="launch-ar" title="${strings.viewInAR}">
              <span>◈ ${strings.viewInAR}</span>
            </button>
          ` : ''}
        </div>
      </div>
    `;

    this.initCanvasAndControls();
  }

  initCanvasAndControls() {
    const container = this.querySelector('.valoir-3d-container');
    const canvas = this.querySelector('.valoir-3d-canvas');
    if (!canvas || !container) return;

    this.canvas = canvas;
    this.container = container;

    let prevX = 0;
    let prevY = 0;

    // Pointer events for intuitive rotation
    container.addEventListener('pointerdown', (e) => {
      this.isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
      try {
        container.setPointerCapture(e.pointerId);
      } catch (_) {}
    });

    container.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - prevX;
      const deltaY = e.clientY - prevY;
      this.rotationY += deltaX * 0.01;
      this.rotationX = Math.max(-0.6, Math.min(0.6, this.rotationX + deltaY * 0.01));
      prevX = e.clientX;
      prevY = e.clientY;
      this.drawEyewearFrame(canvas, this.rotationX, this.rotationY, this.zoom);
    });

    const endDrag = (e) => {
      if (this.isDragging) {
        this.isDragging = false;
        try {
          container.releasePointerCapture(e.pointerId);
        } catch (_) {}
      }
    };

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);

    // Wheel zoom
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.zoom = Math.max(0.7, Math.min(1.8, this.zoom - e.deltaY * 0.001));
      this.drawEyewearFrame(canvas, this.rotationX, this.rotationY, this.zoom);
    }, { passive: false });

    // Keyboard accessibility
    canvas.addEventListener('keydown', (e) => {
      let handled = false;
      switch (e.key) {
        case 'ArrowLeft':
          this.rotationY -= 0.08;
          handled = true;
          break;
        case 'ArrowRight':
          this.rotationY += 0.08;
          handled = true;
          break;
        case 'ArrowUp':
          this.rotationX = Math.min(0.6, this.rotationX + 0.08);
          handled = true;
          break;
        case 'ArrowDown':
          this.rotationX = Math.max(-0.6, this.rotationX - 0.08);
          handled = true;
          break;
        case '+':
        case '=':
          this.zoom = Math.min(1.8, this.zoom + 0.1);
          handled = true;
          break;
        case '-':
        case '_':
          this.zoom = Math.max(0.7, this.zoom - 0.1);
          handled = true;
          break;
        case 'Home':
        case 'r':
        case 'R':
          this.rotationX = 0;
          this.rotationY = 0;
          this.zoom = 1;
          handled = true;
          break;
        case ' ':
          this.toggleAutoRotate();
          handled = true;
          break;
      }
      if (handled) {
        e.preventDefault();
        this.drawEyewearFrame(canvas, this.rotationX, this.rotationY, this.zoom);
      }
    });

    // Control Buttons
    const strings = this.getStrings();
    this.querySelector('[data-action="reset-view"]')?.addEventListener('click', () => {
      this.rotationX = 0;
      this.rotationY = 0;
      this.zoom = 1;
      this.drawEyewearFrame(canvas, this.rotationX, this.rotationY, this.zoom);
      window.ValoirA11y?.announce(strings.reset);
    });

    this.querySelector('[data-action="toggle-rotate"]')?.addEventListener('click', () => {
      this.toggleAutoRotate();
    });

    this.querySelector('[data-action="zoom-in"]')?.addEventListener('click', () => {
      this.zoom = Math.min(1.8, this.zoom + 0.15);
      this.drawEyewearFrame(canvas, this.rotationX, this.rotationY, this.zoom);
    });

    this.querySelector('[data-action="zoom-out"]')?.addEventListener('click', () => {
      this.zoom = Math.max(0.7, this.zoom - 0.15);
      this.drawEyewearFrame(canvas, this.rotationX, this.rotationY, this.zoom);
    });

    this.querySelector('[data-action="launch-ar"]')?.addEventListener('click', () => {
      this.launchAR();
    });

    // Initial render & loop
    this.drawEyewearFrame(canvas, this.rotationX, this.rotationY, this.zoom);
    this.startAnimationLoop();
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    const rotateBtn = this.querySelector('[data-action="toggle-rotate"]');
    const strings = this.getStrings();
    if (rotateBtn) {
      rotateBtn.setAttribute('aria-pressed', String(this.autoRotate));
      rotateBtn.setAttribute('title', this.autoRotate ? strings.pause : strings.play);
      const label = rotateBtn.querySelector('.rotate-state');
      if (label) label.textContent = this.autoRotate ? `⏸ ${strings.pause}` : `▶ ${strings.play}`;
    }
    if (this.autoRotate) {
      this.startAnimationLoop();
    }
  }

  initVisibilityObserver() {
    if ('IntersectionObserver' in window) {
      this.visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && this.autoRotate && !this.animFrame) {
            this.startAnimationLoop();
          } else if (!this.isVisible && this.animFrame) {
            cancelAnimationFrame(this.animFrame);
            this.animFrame = null;
          }
        });
      }, { threshold: 0.1 });
      this.visibilityObserver.observe(this);
    }
  }

  startAnimationLoop() {
    if (this.animFrame) return;

    const animate = () => {
      if (this.autoRotate && !this.isDragging && this.isVisible) {
        this.rotationY += 0.008;
        if (this.canvas) {
          this.drawEyewearFrame(this.canvas, this.rotationX, this.rotationY, this.zoom);
        }
        this.animFrame = requestAnimationFrame(animate);
      } else {
        this.animFrame = null;
      }
    };

    if (this.autoRotate && this.isVisible) {
      this.animFrame = requestAnimationFrame(animate);
    }
  }

  drawEyewearFrame(canvas, rotX, rotY, zoom) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || 500;
    const height = canvas.clientHeight || 500;
    const targetW = Math.round(width * dpr);
    const targetH = Math.round(height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(width / 2, height / 2);
    ctx.scale(zoom, zoom);

    // Simulate 3D perspective projection
    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);

    // Cast soft floor shadow
    ctx.beginPath();
    ctx.ellipse(0, 75 * cosX, 120 * Math.abs(cosY) + 40, 20 * zoom, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fill();

    ctx.rotate(rotX * 0.4);

    // Left Lens
    ctx.save();
    ctx.translate(-70 * cosY, -10 * sinY);
    ctx.beginPath();
    ctx.ellipse(0, 0, Math.max(2, 52 * Math.abs(cosY)), 42, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.lensColor || 'rgba(30, 42, 56, 0.72)';
    ctx.fill();
    ctx.lineWidth = 4.5;
    ctx.strokeStyle = this.frameColor || '#1A1A1A';
    ctx.stroke();

    // Anti-reflective gradient sheen
    const grad1 = ctx.createLinearGradient(-30, -30, 30, 30);
    grad1.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    grad1.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    grad1.addColorStop(1, 'rgba(194, 155, 56, 0.15)');
    ctx.fillStyle = grad1;
    ctx.fill();
    ctx.restore();

    // Right Lens
    ctx.save();
    ctx.translate(70 * cosY, 10 * sinY);
    ctx.beginPath();
    ctx.ellipse(0, 0, Math.max(2, 52 * Math.abs(cosY)), 42, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.lensColor || 'rgba(30, 42, 56, 0.72)';
    ctx.fill();
    ctx.lineWidth = 4.5;
    ctx.strokeStyle = this.frameColor || '#1A1A1A';
    ctx.stroke();

    // Anti-reflective gradient sheen
    const grad2 = ctx.createLinearGradient(-30, -30, 30, 30);
    grad2.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    grad2.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    grad2.addColorStop(1, 'rgba(194, 155, 56, 0.15)');
    ctx.fillStyle = grad2;
    ctx.fill();
    ctx.restore();

    // Optical Bridge
    ctx.beginPath();
    ctx.moveTo(-18 * cosY, -4);
    ctx.quadraticCurveTo(0, -14, 18 * cosY, -4);
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = this.frameColor || '#1A1A1A';
    ctx.stroke();

    // Titanium Temple Arms
    ctx.beginPath();
    ctx.moveTo(-122 * cosY, 0);
    ctx.lineTo(-140 * cosY - 80 * sinY, 20 * sinY);
    ctx.moveTo(122 * cosY, 0);
    ctx.lineTo(140 * cosY - 80 * sinY, -20 * sinY);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = this.templeColor || '#C29B38';
    ctx.stroke();

    ctx.restore();
    ctx.restore();
  }

  updateMaterialColor(colorName) {
    this.setColorPalette(colorName);
    if (this.canvas) {
      this.drawEyewearFrame(this.canvas, this.rotationX, this.rotationY, this.zoom);
    }
  }

  showToast(message) {
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    let toast = this.querySelector('.valoir-3d-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'valoir-3d-toast';
      toast.setAttribute('role', 'status');
      this.container?.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';

    this.toastTimer = setTimeout(() => {
      toast.style.opacity = '0';
      this.toastTimer = null;
    }, 4000);
  }

  launchAR() {
    const strings = this.getStrings();
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /android/i.test(navigator.userAgent);

    if (isIOS) {
      const usdzUrl = (this.iosModelSrc && this.iosModelSrc.endsWith('.usdz'))
        ? this.iosModelSrc
        : (this.modelSrc && this.modelSrc.endsWith('.usdz') ? this.modelSrc : null);

      if (usdzUrl) {
        const anchor = document.createElement('a');
        anchor.setAttribute('rel', 'ar');
        const img = document.createElement('img');
        anchor.appendChild(img);
        anchor.setAttribute('href', usdzUrl);
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
      } else {
        this.showToast(strings.arIosNotice);
        window.ValoirA11y?.announce(strings.arIosNotice);
      }
    } else if (isAndroid) {
      if (this.modelSrc) {
        const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(this.modelSrc)}&mode=ar_only#Intent;scheme=https;package=com.google.ar.core;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(window.location.href)};end;`;
        window.location.href = sceneViewerUrl;
      }
    } else {
      // Desktop / unsupported browser fallback notice
      this.showToast(strings.arDeviceNotice);
      window.ValoirA11y?.announce(strings.arDeviceNotice);
    }
  }

  onActivated() {
    // Re-trigger layout calculation when tab activates
    if (this.canvas) {
      this.drawEyewearFrame(this.canvas, this.rotationX, this.rotationY, this.zoom);
    }
  }
}

if (!customElements.get('valoir-3d-viewer')) {
  customElements.define('valoir-3d-viewer', Valoir3DViewer);
}


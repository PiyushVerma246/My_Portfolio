/**
 * OptionWheel - High-Performance Vanilla JS + CSS implementation of <OptionWheel /> from React Bits
 * Supports touch, drag, wheel, keyboard navigation, frame-rate independent exponential smoothing & audio tick.
 */
class OptionWheel {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) {
      console.warn('OptionWheel: container not found', container);
      return;
    }

    const DEFAULT_ITEMS = [
      'Ambient', 'House', 'Techno', 'Jazz', 'Lo-Fi', 'Synthwave',
      'Trance', 'Funk', 'Disco', 'Hip-Hop', 'Chillwave', 'Drum & Bass'
    ];

    this.options = Object.assign({
      items: DEFAULT_ITEMS,
      defaultSelected: 3,
      onChange: null,
      textColor: '#a6a6a6',
      activeColor: '#ffffff',
      side: 'left',
      fontSize: 3,
      spacing: 1.4,
      curve: 1,
      tilt: 6,
      blur: 2,
      fade: 0.25,
      minOpacity: 0.05,
      smoothing: 200,
      inset: 80,
      loop: false,
      draggable: true,
      soundUrl: '',
      soundVolume: 0.5,
      className: ''
    }, options);

    this.pos = this.options.defaultSelected;
    this.target = this.options.defaultSelected;
    this.selected = this.options.defaultSelected;
    this.lastTime = 0;
    this.rafId = null;
    this.wheelTimer = null;
    this.drag = null;
    this.dragMoved = false;
    this.lastTick = 0;
    this.audio = null;
    this.itemEls = [];
    this._remPx = 16;
    this._onResize = () => {
      this._remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    };
    window.addEventListener('resize', this._onResize, { passive: true });
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(() => this._onResize());
    }

    this._initDOM();
    this._initEvents();
    this.applyTarget(this.target, false);
  }

  _getRemPx() {
    return this._remPx || 16;
  }

  _getRowHeight() {
    return Math.max(this.options.fontSize * this.options.spacing * this._getRemPx(), 1);
  }

  _initDOM() {
    this.root = document.createElement('div');
    this.root.setAttribute('role', 'listbox');
    this.root.setAttribute('tabindex', '0');
    this.root.setAttribute('aria-label', 'Option wheel');

    let classNames = 'option-wheel';
    if (this.options.side === 'right') classNames += ' option-wheel--right';
    if (this.options.className) classNames += ` ${this.options.className}`;
    this.root.className = classNames;

    this.root.style.setProperty('--ow-text-color', this.options.textColor);
    this.root.style.setProperty('--ow-active-color', this.options.activeColor);
    this.root.style.setProperty('--ow-font-size', `${this.options.fontSize}rem`);
    this.root.style.setProperty('--ow-inset', `${this.options.inset}px`);

    this.itemEls = [];
    this.options.items.forEach((label, index) => {
      const item = document.createElement('div');
      item.setAttribute('role', 'option');
      item.className = 'option-wheel__item' + (this.selected === index ? ' option-wheel__item--selected' : '');
      item.setAttribute('aria-selected', this.selected === index ? 'true' : 'false');
      item.textContent = label;
      item.addEventListener('click', () => this._handleItemClick(index));
      this.root.appendChild(item);
      this.itemEls.push(item);
    });

    this.container.appendChild(this.root);
  }

  _playTick() {
    const { soundUrl, soundVolume } = this.options;
    if (!soundUrl) return;
    const now = performance.now();
    if (now - this.lastTick < 70) return;
    this.lastTick = now;
    if (!this.audio || this.audio.src !== soundUrl) {
      this.audio = new Audio(soundUrl);
      this.audio.preload = 'auto';
    }
    this.audio.volume = Math.min(Math.max(soundVolume, 0), 1);
    this.audio.currentTime = 0;
    this.audio.play()?.catch(() => {});
  }

  _runFrame(now) {
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    const cfg = this.options;
    const tau = Math.max(cfg.smoothing, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    const target = this.target;
    const cur = this.pos;
    let next = cur + (target - cur) * k;
    const settled = Math.abs(target - next) < 0.001;
    if (settled) next = target;
    this.pos = next;

    const rowH = this._getRowHeight();
    const els = this.itemEls;
    const n = cfg.items.length;
    const mirror = cfg.side === 'right' ? -1 : 1;
    const tiltRad = (cfg.tilt * Math.PI) / 180;
    const R = tiltRad > 0.0005 ? rowH / tiltRad : 0;

    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (!el) continue;
      let d = i - next;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }
      const dist = Math.abs(d);
      let x = 0;
      let y = d * rowH;
      let rot = 0;
      if (R > 0) {
        const ang = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, d * tiltRad));
        y = R * Math.sin(ang);
        x = -mirror * R * (1 - Math.cos(ang)) * cfg.curve;
        rot = (mirror * ang * 180) / Math.PI;
      }
      el.style.transform = `translate(${x.toFixed(2)}px, calc(${y.toFixed(2)}px - 50%)) rotate(${rot.toFixed(3)}deg)`;
      el.style.opacity = String(Math.max(cfg.minOpacity, 1 - dist * cfg.fade));
      el.style.filter = cfg.blur > 0 ? `blur(${(dist * cfg.blur).toFixed(2)}px)` : 'none';
      el.style.setProperty('--ow-p', Math.max(0, 1 - Math.min(dist, 1)).toFixed(4));
    }

    if (!settled) {
      this.rafId = requestAnimationFrame(t => this._runFrame(t));
    } else {
      this.rafId = null;
    }
  }

  _startLoop() {
    if (this.rafId != null) {
      cancelAnimationFrame(this.rafId);
    }
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(t => this._runFrame(t));
  }

  applyTarget(value, snap) {
    const cfg = this.options;
    let v = value;
    const count = cfg.items.length;
    if (!cfg.loop) v = Math.min(Math.max(v, 0), Math.max(count - 1, 0));
    if (snap) v = Math.round(v);
    this.target = v;
    const idx = ((Math.round(v) % count) + count) % count;
    if (idx !== this.selected) {
      this.selected = idx;
      this.itemEls.forEach((el, i) => {
        el.classList.toggle('option-wheel__item--selected', i === idx);
        el.setAttribute('aria-selected', i === idx ? 'true' : 'false');
      });
      if (typeof cfg.onChange === 'function') {
        cfg.onChange(idx, cfg.items[idx]);
      }
      this._playTick();
    }
    this._startLoop();
  }

  _handleItemClick(index) {
    if (this.dragMoved) return;
    const count = this.options.items.length;
    const cur = this.target;
    let d = index - (((cur % count) + count) % count);
    if (this.options.loop && count > 1) {
      if (d > count / 2) d -= count;
      else if (d < -count / 2) d += count;
    }
    this.applyTarget(cur + d, true);
  }

  _initEvents() {
    // Wheel scroll
    this.root.addEventListener('wheel', e => {
      e.preventDefault();
      const rowH = this._getRowHeight();
      const delta = e.deltaMode === 1 ? e.deltaY * 24 : e.deltaY;
      const step = Math.max(-1, Math.min(1, delta / rowH));
      this.applyTarget(this.target + step, false);
      if (this.wheelTimer) clearTimeout(this.wheelTimer);
      this.wheelTimer = setTimeout(() => this.applyTarget(this.target, true), 140);
    }, { passive: false });

    // Drag / Pointer Events
    this.root.addEventListener('pointerdown', e => {
      if (!this.options.draggable) return;
      this.drag = { y: e.clientY, start: this.target, id: e.pointerId };
      this.dragMoved = false;
      this.root.classList.add('option-wheel--dragging');
    });

    this.root.addEventListener('pointermove', e => {
      if (!this.drag) return;
      const dy = e.clientY - this.drag.y;
      if (!this.dragMoved && Math.abs(dy) > 4) {
        this.dragMoved = true;
        try { this.root.setPointerCapture(this.drag.id); } catch(err) {}
      }
      if (this.dragMoved) {
        const rowH = this._getRowHeight();
        this.applyTarget(this.drag.start - dy / rowH, false);
      }
    });

    const endPointer = () => {
      if (!this.drag) return;
      this.drag = null;
      this.root.classList.remove('option-wheel--dragging');
      if (this.dragMoved) {
        this.applyTarget(this.target, true);
      }
    };

    this.root.addEventListener('pointerup', endPointer);
    this.root.addEventListener('pointercancel', endPointer);

    // Keyboard navigation
    this.root.addEventListener('keydown', e => {
      let delta = null;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') delta = -1;
      else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') delta = 1;
      if (delta == null) return;
      e.preventDefault();
      this.applyTarget(Math.round(this.target) + delta, true);
    });
  }

  select(index) {
    this.applyTarget(index, true);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.wheelTimer) clearTimeout(this.wheelTimer);
    if (this._onResize) window.removeEventListener('resize', this._onResize);
    if (this.root && this.root.parentNode) {
      this.root.parentNode.removeChild(this.root);
    }
  }
}

if (typeof window !== 'undefined') {
  window.OptionWheel = OptionWheel;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = OptionWheel;
}


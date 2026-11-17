/**
 * PIYUSH VERMA - CREATIVE ENGINEER PORTFOLIO
 * Visual Identity: Deep Black (#050505), Pure White (#FFFFFF), Dark Powder Blue (#5E8CA8)
 * High-Performance Interactive Controller
 */

/* ==========================================================================
   FUTURISTIC DEVELOPER BOOT LOADER & CINEMATIC HERO ZOOM-IN CONTROLLER
   ========================================================================== */
const DevLoader = {
    isComplete: false,
    rafId: null,
    bootMessages: [
        { at: 0, text: "INITIALIZING ENVIRONMENT..." },
        { at: 20, text: "COMPILING CORE ARCHITECTURE..." },
        { at: 45, text: "HYDRATING INTERACTIVE MODULES..." },
        { at: 70, text: "CALIBRATING 3D MATRICES..." },
        { at: 92, text: "ALL SYSTEMS READY // WELCOME" }
    ],

    init() {
        const loader = document.getElementById('dev-loader');
        if (!loader) {
            document.body.classList.remove('is-loading');
            return;
        }

        const main = document.getElementById('main-content');
        if (main) main.setAttribute('inert', '');

        const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            this.finish(true);
            return;
        }

        const skipBtn = document.getElementById('dev-loader-skip');
        if (skipBtn) {
            skipBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.finish(true);
            });
        }
        // Dismiss loader immediately on user tap/click anywhere
        loader.addEventListener('click', () => this.finish(true), { once: true });

        const onKeyDown = (e) => {
            if (e.key === 'Escape' && !this.isComplete) {
                document.removeEventListener('keydown', onKeyDown);
                this.finish(true);
            }
        };
        document.addEventListener('keydown', onKeyDown);

        const percentEl = document.getElementById('dev-loader-percent');
        const barEl = document.getElementById('dev-loader-bar');
        const sparkEl = document.getElementById('loader-spark');
        const logEl = document.getElementById('dev-loader-log');

        const startTime = performance.now();
        const duration = 520; // snappy 0.5s for instant responsive feel

        const tick = (now) => {
            if (this.isComplete) return;

            const elapsed = now - startTime;
            const progressRatio = Math.min(1, elapsed / duration);
            
            // Decelerating cubic curve for organic tech boot feel
            const easedProgress = 1 - Math.pow(1 - progressRatio, 2.2);
            const currentPct = Math.min(100, Math.round(easedProgress * 100));

            if (percentEl) percentEl.textContent = String(currentPct).padStart(2, '0');
            if (barEl) barEl.style.width = `${currentPct}%`;
            if (sparkEl) sparkEl.style.left = `${currentPct}%`;
            loader.setAttribute('aria-valuenow', String(currentPct));

            if (logEl) {
                for (let i = this.bootMessages.length - 1; i >= 0; i--) {
                    if (currentPct >= this.bootMessages[i].at) {
                        if (logEl.textContent !== this.bootMessages[i].text) {
                            logEl.textContent = this.bootMessages[i].text;
                        }
                        break;
                    }
                }
            }

            if (progressRatio < 1) {
                this.rafId = window.requestAnimationFrame(tick);
            } else {
                this.completeSequence();
            }
        };

        this.rafId = window.requestAnimationFrame(tick);

        // Failsafe watchdog: unlock page after 1.1s under any circumstance
        setTimeout(() => {
            if (!this.isComplete) this.finish(true);
        }, 1100);
    },

    completeSequence() {
        if (this.isComplete) return;
        const percentEl = document.getElementById('dev-loader-percent');
        const barEl = document.getElementById('dev-loader-bar');
        const sparkEl = document.getElementById('loader-spark');
        const logEl = document.getElementById('dev-loader-log');

        if (percentEl) percentEl.textContent = '100';
        if (barEl) barEl.style.width = '100%';
        if (sparkEl) sparkEl.style.left = '100%';
        if (logEl) {
            logEl.textContent = "INITIALIZATION COMPLETE // WELCOME";
            logEl.style.color = '#FFFFFF';
        }

        // Brief hold of 30ms to register 100% and initiate shutter aperture
        setTimeout(() => {
            this.finish(false);
        }, 30);
    },

    finish(instant = false) {
        if (this.isComplete) return;
        this.isComplete = true;

        if (this.rafId) window.cancelAnimationFrame(this.rafId);

        const loader = document.getElementById('dev-loader');
        const main = document.getElementById('main-content');

        if (main) main.removeAttribute('inert');

        if (instant || !loader) {
            document.body.classList.remove('is-loading');
            document.body.classList.remove('hero-opening');
            document.body.classList.add('is-loaded');
            if (loader) {
                loader.style.display = 'none';
                loader.setAttribute('inert', '');
                loader.setAttribute('aria-hidden', 'true');
            }
            if (typeof window.refreshScrollReveal === 'function') {
                window.refreshScrollReveal();
            }
            return;
        }

        // Trigger Futuristic Zoom-Out on Loader & Cinematic Zoom-In on Hero
        loader.classList.add('loader-finished');
        document.body.classList.remove('is-loading');
        document.body.classList.add('hero-opening');

        setTimeout(() => {
            loader.style.display = 'none';
            loader.setAttribute('inert', '');
            loader.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('hero-opening');
            document.body.classList.add('is-loaded');

            if (typeof window.refreshScrollReveal === 'function') {
                window.refreshScrollReveal();
            }

            if (window.location.hash && window.location.hash !== '#home') {
                const target = document.querySelector(window.location.hash);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 340);
    }
};

window.DevLoader = DevLoader;

/* ==========================================================================
   UNIVERSAL 3D "OPEN" SCROLL REVEAL CONTROLLER
   ========================================================================== */
function initScrollReveal() {
    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = Array.from(document.querySelectorAll('[data-scroll-reveal], [data-ed-reveal], [data-connect-reveal]'));
    if (!elements.length) return;

    if (reducedMotion || !('IntersectionObserver' in window)) {
        elements.forEach(el => {
            el.classList.add('is-revealed');
            el.classList.add('is-visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.04,
        rootMargin: '40px 0px -20px 0px'
    });

    const checkInViewport = () => {
        const windowH = window.innerHeight || 800;
        const remaining = Array.from(document.querySelectorAll('[data-scroll-reveal]:not(.is-revealed), [data-ed-reveal]:not(.is-revealed), [data-connect-reveal]:not(.is-revealed)'));
        remaining.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowH - 20 && rect.bottom > 0) {
                el.classList.add('is-revealed');
                el.classList.add('is-visible');
                revealObserver.unobserve(el);
            } else {
                revealObserver.observe(el);
            }
        });
    };

    checkInViewport();

    window.refreshScrollReveal = checkInViewport;
}

document.addEventListener('DOMContentLoaded', () => {
    DevLoader.init();
    initScrollReveal();
    DataLoader.init();
    initAboutShowcase();
    initConnectSection();
    initMobileMenu();
    initOptionWheelShowcase();
    initSectionParticles();
    initScrollSpy();
    initModalEvents();
    initExperienceInteractions();
    initVisibilityHandler();
});

/* ==========================================================================
   DATA LOADER: Fetches dynamic about, project, and certification registries
   ========================================================================== */
const DataLoader = {
    allProjects: [],
    allCertifications: [],

    yieldToMain() {
        if (window.scheduler && typeof window.scheduler.yield === 'function') {
            return window.scheduler.yield();
        }
        return new Promise(resolve => setTimeout(resolve, 0));
    },

    async init() {
        // Fast path: load cached data instantly to eliminate layout shifts
        try {
            const cachedAbout = JSON.parse(localStorage.getItem('pv_about_cache') || 'null');
            const cachedProjects = JSON.parse(localStorage.getItem('pv_projects_cache') || 'null');
            const cachedCerts = JSON.parse(localStorage.getItem('pv_certs_cache') || 'null');

            if (cachedAbout && typeof AboutShowcase !== 'undefined') AboutShowcase.hydrate(cachedAbout);
            if (cachedProjects && cachedProjects.projects) {
                this.allProjects = cachedProjects.projects;
                FeaturedProjectShowcase.init(this.allProjects);
            }
            if (cachedCerts && cachedCerts.items) {
                this.allCertifications = cachedCerts.items;
                CertSlider.init(cachedCerts);
            }
        } catch (_) {}

        // Network update
        try {
            const [aboutData, projectsData, certsData] = await Promise.all([
                fetch('data/about.json').then(r => r.ok ? r.json() : null).catch(() => null),
                fetch('data/projects.json').then(r => r.ok ? r.json() : null).catch(() => null),
                fetch('data/certifications.json').then(r => r.ok ? r.json() : null).catch(() => null)
            ]);

            if (aboutData && typeof AboutShowcase !== 'undefined') {
                AboutShowcase.hydrate(aboutData);
                try { localStorage.setItem('pv_about_cache', JSON.stringify(aboutData)); } catch (_) {}
                await this.yieldToMain();
            }

            if (projectsData && projectsData.projects) {
                this.allProjects = projectsData.projects;
                FeaturedProjectShowcase.init(this.allProjects);
                try { localStorage.setItem('pv_projects_cache', JSON.stringify(projectsData)); } catch (_) {}
                await this.yieldToMain();
            }

            if (certsData && certsData.items) {
                this.allCertifications = certsData.items;
                CertSlider.init(certsData);
                try { localStorage.setItem('pv_certs_cache', JSON.stringify(certsData)); } catch (_) {}
            }
        } catch (err) {
            console.error('Error loading portfolio datasets:', err);
        }
    },

    openCertificateModal(item) {
        if (!item) return;
        const modal = document.getElementById('scrapbook-modal');
        const body = document.getElementById('modal-body');
        if (!modal || !body) return;

        body.innerHTML = `
            <div class="modal-cert-plaque">
                <div class="modal-cert-gold-seal">VERIFIED CREDENTIAL</div>

                <div class="modal-cert-header">
                    <div class="modal-cert-icon" style="color: var(--color-powder-blue); background: var(--powder-blue-light); border: 2px solid var(--border-dark);">
                        ${getCertBrandIcon(item.brand)}
                    </div>
                    <div>
                        <div style="font-family: var(--font-mono); font-size: 0.74rem; font-weight: 800; color: var(--color-powder-blue); text-transform: uppercase; letter-spacing: 0.5px;">
                            ${item.issuer}
                        </div>
                        <h3 class="modal-cert-title">${item.title}</h3>
                    </div>
                </div>

                <div style="margin-bottom: 14px;">
                    <span style="font-size: 0.85rem; color: var(--ink-muted); font-weight: 600;">Recipient: &nbsp;</span>
                    <span class="modal-cert-recipient">Piyush Verma</span>
                </div>

                <p class="modal-cert-desc">
                    ${item.description}
                </p>

                <div class="modal-cert-details-grid">
                    <div>
                        <strong>Credential ID</strong>
                        <span>${item.credentialId || 'PV-VERIFIED-' + item.id.toUpperCase()}</span>
                    </div>
                    <div>
                        <strong>Category</strong>
                        <span>${item.category}</span>
                    </div>
                    <div>
                        <strong>Issued Date</strong>
                        <span>${item.issued}</span>
                    </div>
                    <div>
                        <strong>Status</strong>
                        <span style="color: var(--color-powder-blue); font-weight: 800;">Accredited & Active ✓</span>
                    </div>
                </div>

                ${item.skills && item.skills.length ? `
                    <div class="modal-cert-skills">
                        <h4>Validated Proficiencies</h4>
                        <div class="modal-cert-skills-wrap">
                            ${item.skills.map(s => `
                                <span class="card-skill-tag" style="padding: 5px 12px; font-size: 0.8rem; background: var(--powder-blue-light); color: var(--color-powder-blue); border: 1.5px solid var(--border-dark); border-radius: 6px;">
                                    ✦ ${s}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <div class="modal-cert-actions">
                    <div class="cert-rubber-stamp" style="font-size: 0.76rem; padding: 4px 10px; border: 1.5px solid rgba(92, 139, 168, 0.45); background: rgba(92, 139, 168, 0.14); color: #FFFFFF; border-radius: 6px;">
                        OFFICIALLY VERIFIED ✓
                    </div>
                    <a href="${item.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn-cert-verify-link" style="padding: 10px 20px; font-size: 0.88rem; background: #4B7691; color: #FFFFFF; border: 2px solid #6D9BB8; border-radius: 8px; font-weight: 700;">
                        Verify on Official Portal ↗
                    </a>
                </div>
            </div>
        `;

        modal.removeAttribute('inert');
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    },

    openProjectModal(indexOrProject) {
        let p = null;
        if (typeof indexOrProject === 'object' && indexOrProject !== null) {
            p = indexOrProject;
        } else if (typeof indexOrProject === 'number') {
            p = this.allProjects[indexOrProject] || (FeaturedProjectShowcase.projects && FeaturedProjectShowcase.projects[indexOrProject]);
        }
        if (!p) return;

        const modal = document.getElementById('scrapbook-modal');
        const body = document.getElementById('modal-body');

        body.innerHTML = `
            <div style="position: relative; margin-bottom: 22px;">
                <div style="border-radius: 14px; overflow: hidden; border: 2px solid var(--border-dark); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);">
                    <!-- Modal Browser Toolbar -->
                    <div style="background: #050505; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <div style="display: flex; gap: 6px;">
                            <span style="width: 10px; height: 10px; border-radius: 50%; background: #5E8CA8; display: inline-block;"></span>
                            <span style="width: 10px; height: 10px; border-radius: 50%; background: #8A8A8A; display: inline-block;"></span>
                            <span style="width: 10px; height: 10px; border-radius: 50%; background: #FFFFFF; display: inline-block;"></span>
                        </div>
                        <div style="background: rgba(255,255,255,0.08); color: #FFFFFF; font-family: var(--font-mono); font-size: 0.75rem; padding: 3px 12px; border-radius: 999px; display: flex; align-items: center; gap: 6px;">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                            <span>https://${p.domain || 'github.com/PiyushVerma246'}</span>
                        </div>
                        <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #6D9BB8; font-weight: 800;">#${p.number}</span>
                    </div>
                    <img src="${p.image}" alt="${p.title}" width="768" height="429" loading="lazy" decoding="async" style="width: 100%; height: auto; max-height: 330px; object-fit: cover; display: block;">
                </div>
                <div style="position: absolute; top: -10px; left: 24px; width: 75px; height: 22px; background: rgba(92, 139, 168, 0.22); border: 1.5px dashed var(--color-powder-blue); transform: rotate(-6deg); z-index: 5;"></div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <div>
                    <span style="font-family: var(--font-marker); font-size: 1.15rem; color: var(--color-powder-blue); font-weight: 700; display: block;">${p.role || ''}</span>
                    <h3 style="font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--ink-primary); margin-top: 2px;">${p.title}</h3>
                </div>
                <span style="font-family: var(--font-mono); font-size: 0.74rem; font-weight: 800; padding: 4px 10px; border-radius: 6px; background: var(--powder-blue-light); color: var(--color-powder-blue); border: 1.5px solid var(--border-dark); text-transform: uppercase;">
                    ${p.category ? p.category.split('•')[0].trim() : 'FULL STACK'}
                </span>
            </div>

            <p style="font-size: 0.98rem; color: var(--ink-secondary); line-height: 1.65; margin-bottom: 22px;">
                ${p.description}
            </p>

            ${p.features && p.features.length ? `
                <div style="margin-bottom: 22px;">
                    <h4 style="font-family: var(--font-hand); font-size: 1.5rem; color: var(--ink-primary); margin-bottom: 10px;">Architectural Highlights</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
                        ${p.features.map(f => `
                            <div style="background: var(--powder-blue-light); border: 1.5px solid var(--border-dark); padding: 8px 12px; border-radius: 8px; font-size: 0.88rem; font-weight: 700; color: var(--ink-primary); display: flex; align-items: center; gap: 6px;">
                                <span style="color: var(--color-powder-blue); font-size: 1rem;">✦</span>
                                <span>${f.title}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <div style="margin-bottom: 24px;">
                <h4 style="font-family: var(--font-hand); font-size: 1.5rem; color: var(--ink-primary); margin-bottom: 10px;">Technologies & Frameworks</h4>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${(p.tech || []).map(t => `
                        <span style="background: var(--powder-blue-light); color: var(--color-powder-blue); font-family: var(--font-mono); font-size: 0.82rem; padding: 5px 12px; border-radius: 6px; font-weight: 700; border: 1.5px solid var(--border-dark);">
                            ${t}
                        </span>
                    `).join('')}
                </div>
            </div>

            <div style="display: flex; gap: 12px; padding-top: 18px; border-top: 1.5px dashed var(--border-dark); flex-wrap: wrap;">
                <a href="${p.links?.[0]?.href || '#'}" target="_blank" rel="noopener noreferrer" class="btn-card primary" style="padding: 10px 22px; font-size: 0.95rem; border-radius: 8px; flex: 1; background: #4B7691; color: #FFFFFF; border: 2px solid #6D9BB8; text-align: center; text-decoration: none; font-weight: 700;">
                    Launch Live Application ↗
                </a>
                <a href="${p.links?.[1]?.href || '#'}" target="_blank" rel="noopener noreferrer" class="btn-card outline" style="padding: 10px 22px; font-size: 0.95rem; border-radius: 8px; flex: 1; background: transparent; color: #FFFFFF; border: 2px solid rgba(255, 255, 255, 0.25); text-align: center; text-decoration: none; font-weight: 700;">
                    View GitHub Repository ⌥
                </a>
            </div>
        `;

        modal.removeAttribute('inert');
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
};

/* ==========================================================================
   EXPERIENCE SECTION: SCROLL-LINKED JOURNEY & TELEMETRY CONTROLLER
   Zero-Reflow Geometry Cache Architecture
   ========================================================================== */
function initExperienceInteractions() {
    const section = document.getElementById('experience');
    const timeline = document.getElementById('journey-timeline');
    const spineTrack = section ? section.querySelector('.journey-spine-track') : null;
    const progressEl = document.getElementById('journey-spine-progress');
    const headEl = document.getElementById('journey-spine-head');
    const items = section ? Array.from(section.querySelectorAll('.journey-item')) : [];
    const waypoints = Array.from(document.querySelectorAll('#journey-waypoints .journey-waypoint'));
    const hudStep = document.getElementById('journey-hud-step');
    const hudLabel = document.getElementById('journey-hud-label');
    const hudSegs = Array.from(document.querySelectorAll('#journey-hud-segments .journey-hud-seg'));

    if (!section || !timeline || !items.length) return;

    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const nodeEls = items.map(item => item.querySelector('.journey-node') || item);
    const horizonCap = timeline.querySelector('.journey-horizon-cap');

    let activeIdx = 0;
    let hasEnteredProximity = false;
    let activateExperienceLayout = () => {};
    const reachedState = items.map((_, i) => i === 0);

    const setActiveChapter = (idx) => {
        const clamped = Math.max(0, Math.min(items.length - 1, idx));
        const activeItem = items[clamped];
        activeIdx = clamped;

        items.forEach((item, i) => {
            item.classList.toggle('is-active', i === clamped);
        });

        waypoints.forEach((btn, i) => {
            btn.classList.toggle('is-active', i === clamped);
        });

        if (hudStep) hudStep.textContent = String(clamped + 1).padStart(2, '0');
        if (hudLabel && activeItem) {
            hudLabel.textContent = activeItem.getAttribute('data-hud-label') || '';
        }

        hudSegs.forEach((seg, i) => {
            seg.classList.toggle('is-active', i === clamped);
            seg.classList.toggle('is-passed', i < clamped);
        });
    };

    // Progressive Reveal Choreography (Pure IntersectionObserver -> Zero Startup Reflow)
    if (!reducedMotion && 'IntersectionObserver' in window) {
        section.classList.add('js-journey-anim');
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.06, rootMargin: '80px 0px -20px 0px' });

        items.forEach(item => revealObserver.observe(item));
    } else {
        items.forEach(item => item.classList.add('is-visible'));
    }

    // Waypoint & Node Navigation
    const focusChapter = (idx) => {
        const target = items[idx];
        if (!target) return;
        if (!hasEnteredProximity) activateExperienceLayout();
        target.classList.add('is-visible', 'is-reached');
        reachedState[idx] = true;
        setActiveChapter(idx);
        target.scrollIntoView({
            behavior: reducedMotion ? 'auto' : 'smooth',
            block: 'center'
        });
    };

    waypoints.forEach((btn, idx) => {
        btn.addEventListener('click', () => focusChapter(idx));
    });

    items.forEach((item, idx) => {
        const nodeBtn = item.querySelector('.journey-node');
        const cardEl = item.querySelector('.journey-card');

        if (nodeBtn) {
            nodeBtn.addEventListener('click', () => focusChapter(idx));
        }

        if (cardEl) {
            cardEl.addEventListener('click', () => setActiveChapter(idx));
            cardEl.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    focusChapter(idx);
                }
            });

            // Cursor radial spotlight (rAF-batched)
            if (!isCoarsePointer) {
                let cardRaf = null;
                let lastCardEvt = null;
                cardEl.addEventListener('pointermove', (e) => {
                    lastCardEvt = e;
                    if (!cardRaf) {
                        cardRaf = window.requestAnimationFrame(() => {
                            cardRaf = null;
                            if (!lastCardEvt) return;
                            const rect = cardEl.getBoundingClientRect();
                            cardEl.style.setProperty('--jx', `${(lastCardEvt.clientX - rect.left).toFixed(1)}px`);
                            cardEl.style.setProperty('--jy', `${(lastCardEvt.clientY - rect.top).toFixed(1)}px`);
                        });
                    }
                }, { passive: true });
            }
        }
    });

    // Cached Layout Coordinates (Measured ONLY during resize/font-load rAF, NEVER during scroll)
    const layoutCache = {
        trackTopDoc: 0,
        trackHeight: 800,
        focalOffset: window.innerHeight * 0.56,
        itemCentersDoc: []
    };

    let targetProgress = 0.08;
    let currentProgress = 0.08;
    let animRafId = null;
    let scrollRafId = null;
    let measureRafId = null;

    const computeScrollTargetFromCache = () => {
        if (!spineTrack || layoutCache.itemCentersDoc.length === 0) return;

        const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        const trackTopView = layoutCache.trackTopDoc - scrollY;
        const trackHeight = layoutCache.trackHeight || 1;
        const focalY = layoutCache.focalOffset;

        const raw = (focalY - trackTopView) / trackHeight;
        targetProgress = Math.max(0.05, Math.min(1, raw));

        let closestIdx = 0;
        let minDist = Infinity;

        for (let idx = 0; idx < items.length; idx++) {
            const nCenter = layoutCache.itemCentersDoc[idx] - scrollY;
            const dist = Math.abs(nCenter - focalY);
            if (dist < minDist) {
                minDist = dist;
                closestIdx = idx;
            }

            const reached = idx === 0 || nCenter <= focalY + 32;
            if (reached !== reachedState[idx]) {
                reachedState[idx] = reached;
                items[idx].classList.toggle('is-reached', reached);
            }
        }

        if (closestIdx !== activeIdx) {
            setActiveChapter(closestIdx);
        }
    };

    const paintSpineFrame = () => {
        animRafId = null;
        if (!spineTrack || !progressEl || !headEl) return;

        if (reducedMotion) {
            currentProgress = targetProgress;
        } else {
            currentProgress += (targetProgress - currentProgress) * 0.18;
        }

        progressEl.style.setProperty('--journey-progress', currentProgress.toFixed(4));
        headEl.style.setProperty('--journey-head-y', `${(currentProgress * layoutCache.trackHeight).toFixed(1)}px`);

        if (!reducedMotion && Math.abs(targetProgress - currentProgress) > 0.002) {
            animRafId = window.requestAnimationFrame(paintSpineFrame);
        }
    };

    const measureAndSyncLayout = () => {
        measureRafId = null;
        if (!spineTrack || !items.length || !horizonCap) return;

        // Phase 1: READ ALL DOM GEOMETRY BEFORE ANY STYLE WRITES
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        const viewH = window.innerHeight || 800;
        const timelineRect = timeline.getBoundingClientRect();
        const capRect = horizonCap.getBoundingClientRect();
        const nodeRects = nodeEls.map(el => el.getBoundingClientRect());

        // Phase 2: PURE COMPUTE & WRITE
        const firstRect = nodeRects[0];
        const startTop = (firstRect.top + firstRect.height / 2) - timelineRect.top;
        const endBottom = capRect.top - timelineRect.top;
        const span = Math.max(120, endBottom - startTop);

        layoutCache.trackHeight = span;
        layoutCache.trackTopDoc = timelineRect.top + scrollY + startTop;
        layoutCache.focalOffset = viewH * 0.56;
        layoutCache.itemCentersDoc = nodeRects.map(r => r.top + scrollY + r.height / 2);

        spineTrack.style.top = `${startTop.toFixed(1)}px`;
        spineTrack.style.bottom = 'auto';
        spineTrack.style.height = `${span.toFixed(1)}px`;
        spineTrack.style.setProperty('--journey-track-span', `${span.toFixed(1)}px`);

        computeScrollTargetFromCache();
        paintSpineFrame();
    };

    const scheduleLayoutMeasure = () => {
        if (!measureRafId) {
            measureRafId = window.requestAnimationFrame(measureAndSyncLayout);
        }
    };

    let isExperienceInView = false;
    if ('IntersectionObserver' in window) {
        const expObserver = new IntersectionObserver((entries) => {
            isExperienceInView = entries.some(e => e.isIntersecting);
            if (isExperienceInView && hasEnteredProximity) {
                scheduleLayoutMeasure();
            }
        }, { rootMargin: '250px 0px' });
        expObserver.observe(timeline);
    } else {
        isExperienceInView = true;
    }

    const onScroll = () => {
        if (!isExperienceInView) return;
        if (!scrollRafId) {
            scrollRafId = window.requestAnimationFrame(() => {
                scrollRafId = null;
                computeScrollTargetFromCache();
                if (!animRafId) {
                    animRafId = window.requestAnimationFrame(paintSpineFrame);
                }
            });
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
        if (hasEnteredProximity) scheduleLayoutMeasure();
    }, { passive: true });

    let timelineObserver = null;

    activateExperienceLayout = () => {
        if (hasEnteredProximity) {
            scheduleLayoutMeasure();
            return;
        }
        hasEnteredProximity = true;
        if (!timelineObserver && typeof ResizeObserver === 'function') {
            timelineObserver = new ResizeObserver(scheduleLayoutMeasure);
            timelineObserver.observe(timeline);
        }
        scheduleLayoutMeasure();
    };

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            if (hasEnteredProximity) scheduleLayoutMeasure();
        });
    }

    setActiveChapter(0);

    if ('IntersectionObserver' in window) {
        const proximityObserver = new IntersectionObserver((entries, obs) => {
            if (entries.some(e => e.isIntersecting)) {
                obs.disconnect();
                activateExperienceLayout();
            }
        }, { rootMargin: '550px 0px' });
        proximityObserver.observe(section);
    } else {
        activateExperienceLayout();
    }
}

/* ==========================================================================
   MODAL EVENTS
   ========================================================================== */
function initModalEvents() {
    const modal = document.getElementById('scrapbook-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    if (!modal) return;

    const closeModal = () => {
        if (modal.contains(document.activeElement) && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
        }
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('inert', '');
        document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

/* ==========================================================================
   MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
    const btn = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');
    if (!btn || !navLinks) return;

    btn.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('mobile-active');
        btn.classList.toggle('active', isOpen);
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        });
    });
}

/* ==========================================================================
   SCROLLSPY (Pure IntersectionObserver -> Zero Reflows)
   ========================================================================== */
function initScrollSpy() {
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    if (!navLinks.length) return;

    const targetMap = navLinks.map(link => {
        const hash = link.getAttribute('href');
        const element = hash && hash.startsWith('#') ? document.querySelector(hash) : null;
        return { link, hash, element };
    }).filter(item => item.element !== null);

    if (!targetMap.length) return;

    const hashByElement = new Map(targetMap.map(item => [item.element, item.hash]));
    const activeHashes = new Set();
    let isFooterVisible = false;
    let lastActiveHash = '';
    let isTicking = false;

    const applyActiveHash = (nextHash) => {
        if (!nextHash || nextHash === lastActiveHash) return;
        lastActiveHash = nextHash;
        targetMap.forEach(({ link, hash }) => {
            link.classList.toggle('active', hash === nextHash);
        });
    };

    const syncScrollSpyState = () => {
        isTicking = false;
        if (isFooterVisible) {
            applyActiveHash(targetMap[targetMap.length - 1].hash);
            return;
        }
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        if (scrollY < 180) {
            applyActiveHash(targetMap[0].hash);
            return;
        }
        if (activeHashes.size > 0) {
            let chosen = '';
            for (let i = 0; i < targetMap.length; i++) {
                if (activeHashes.has(targetMap[i].hash)) {
                    chosen = targetMap[i].hash;
                }
            }
            if (chosen) applyActiveHash(chosen);
        }
    };

    if ('IntersectionObserver' in window) {
        const bandObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const hash = hashByElement.get(entry.target);
                if (!hash) return;
                if (entry.isIntersecting) activeHashes.add(hash);
                else activeHashes.delete(hash);
            });
            syncScrollSpyState();
        }, { rootMargin: '-28% 0px -58% 0px', threshold: 0 });

        targetMap.forEach(item => bandObserver.observe(item.element));

        const footerEl = document.querySelector('.connect-footer');
        if (footerEl) {
            const footerObserver = new IntersectionObserver((entries) => {
                isFooterVisible = entries.some(e => e.isIntersecting);
                syncScrollSpyState();
            }, { threshold: 0.05 });
            footerObserver.observe(footerEl);
        }
    }

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            isTicking = true;
            window.requestAnimationFrame(syncScrollSpyState);
        }
    }, { passive: true });

    syncScrollSpyState();
}

/* ==========================================================================
   VISIBILITY HANDLER
   ========================================================================== */
function initVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            FeaturedProjectShowcase.stopAutoplay();
            CertSlider.stopAutoplay();
        } else {
            if (FeaturedProjectShowcase.isPlaying && FeaturedProjectShowcase.isInView) {
                FeaturedProjectShowcase.startAutoplay();
            }
            if (CertSlider.isPlaying && CertSlider.isInView) {
                CertSlider.startAutoplay();
            }
        }
    });
}

/* ==========================================================================
   CERTIFICATE BRAND ICONS: Black, White & Dark Powder Blue System
   ========================================================================== */
function getCertBrandIcon(brand) {
    switch (brand) {
        case 'ibm':
            return `<span style="font-family: 'JetBrains Mono', monospace; font-weight: 800; color: #FFFFFF; letter-spacing: 0.8px; font-size: 0.78rem;">IBM</span>`;
        case 'aws':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D9BB8" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                </svg>
            `;
        case 'neo4j':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2">
                    <circle cx="6" cy="6" r="3" fill="#5E8CA8" stroke="#FFFFFF"/>
                    <circle cx="18" cy="6" r="3" fill="#5E8CA8" stroke="#FFFFFF"/>
                    <circle cx="12" cy="18" r="3" fill="#5E8CA8" stroke="#FFFFFF"/>
                    <line x1="8.5" y1="7.5" x2="10.5" y2="15.5"/>
                    <line x1="15.5" y1="7.5" x2="13.5" y2="15.5"/>
                    <line x1="9" y1="6" x2="15" y2="6"/>
                </svg>
            `;
        case 'google':
            return `
                <svg width="19" height="19" viewBox="0 0 24 24">
                    <path fill="#6D9BB8" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#436B85" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#D4D4D4" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#FFFFFF" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
            `;
        case 'meta':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D9BB8" stroke-width="2.2">
                    <path d="M7 16c-2.76 0-5-2.24-5-5s2.24-5 5-5c2.3 0 4.14 1.56 4.77 3.69L12 10l.23-.31C12.86 7.56 14.7 6 17 6c2.76 0 5 2.24 5 5s-2.24 5-5 5c-2.3 0-4.14-1.56-4.77-3.69L12 14l-.23.31C11.14 16.44 9.3 18 7 18z"/>
                </svg>
            `;
        case 'tata':
            return `<span style="font-family: 'Orbitron', sans-serif; font-weight: 800; color: #FFFFFF; font-size: 0.65rem; letter-spacing: 0.5px;">TATA</span>`;
        case 'infosys':
            return `<span style="font-family: 'JetBrains Mono', monospace; font-weight: 800; color: #FFFFFF; font-size: 0.68rem;">INFY</span>`;
        case 'hela':
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D9BB8" stroke-width="2.1">
                    <polygon points="12 2 20 7 20 17 12 22 4 17 4 7 12 2"/>
                </svg>
            `;
        default:
            return `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6D9BB8" stroke-width="2">
                    <circle cx="12" cy="8" r="6"/>
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
            `;
    }
}

/* ==========================================================================
   FEATURED PROJECT SHOWCASE CONTROLLER
   ========================================================================== */
const FeaturedProjectShowcase = {
    projects: [],
    currentIndex: 0,
    autoplayTimer: null,
    autoplayDuration: 5500,
    isPlaying: true,
    isInView: false,
    _eventsAttached: false,
    _stageTimer: null,

    init(projects) {
        if (!projects || !projects.length) return;
        this.projects = projects;
        this.currentIndex = 0;

        this.renderStage(true);
        this.renderPolaroidReel();
        this.attachEventListeners();
        this.observeVisibility();
    },

    observeVisibility() {
        const section = document.getElementById('projects');
        if (!section || !('IntersectionObserver' in window)) {
            this.isInView = true;
            this.startAutoplay();
            return;
        }
        const obs = new IntersectionObserver((entries) => {
            const visible = entries.some(e => e.isIntersecting);
            this.isInView = visible;
            if (visible && this.isPlaying && !document.hidden) {
                this.startAutoplay();
            } else {
                this.stopAutoplay();
            }
        }, { rootMargin: '250px 0px' });
        obs.observe(section);
    },

    getTechIconSvg(techName) {
        const name = (techName || '').toLowerCase().trim();
        if (name.includes('react')) {
            return `<svg width="22" height="22" viewBox="-11.5 -10.23174 23 20.46348"><circle cx="0" cy="0" r="2.05" fill="#6D9BB8"/><g stroke="#6D9BB8" stroke-width="1.3" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>`;
        } else if (name.includes('node')) {
            return `<svg width="22" height="22" viewBox="0 0 256 289"><path fill="#6D9BB8" d="M128 0L8.7 68.9v151.2L128 289l119.3-68.9V68.9L128 0zm-8.8 193.3c-28.7 0-41.4-14.8-41.4-38.9V89.4h26.4v63.5c0 10.6 5.3 16.5 16 16.5 10.7 0 16-5.9 16-16.5V89.4h26.4v65c0 24.1-13.7 38.9-42.4 38.9h-1z"/></svg>`;
        } else if (name.includes('mongo')) {
            return `<svg width="20" height="20" viewBox="0 0 24 24" fill="#6D9BB8"><path d="M12 1.5s-6 5.5-6 11.5c0 5 3.5 8.5 6 9.5 2.5-1 6-4.5 6-9.5 0-6-6-11.5-6-11.5zm.5 17.5v-7c0-.3-.2-.5-.5-.5s-.5.2-.5.5v7c-1.8-.8-3.5-3-3.5-6 0-3.5 3-7 4-8.5 1 1.5 4 5 4 8.5 0 3-1.7 5.2-3.5 6z"/></svg>`;
        } else if (name.includes('python')) {
            return `<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#6D9BB8" d="M11.9 2c-3.1 0-4.9.4-4.9 2.5v1.9h5v.6H5.2C3 7 2 8.7 2 11.4c0 2.4 1.3 4.2 3.6 4.4h1.7v-2.2c0-2.3 2.1-4.2 4.4-4.2h5V7c0-2-2.1-5-5.8-5zm-1.8 1.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/><path fill="#FFFFFF" d="M12.1 22c3.1 0 4.9-.4 4.9-2.5v-1.9h-5v-.6h6.8c2.2 0 3.2-1.7 3.2-4.4 0-2.4-1.3-4.2-3.6-4.4h-1.7v2.2c0 2.3-2.1 4.2-4.4 4.2h-5V17c0 2 2.1 5 5.8 5zm1.8-1.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/></svg>`;
        } else if (name.includes('script') || name === 'js') {
            return `<svg width="20" height="20" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#6D9BB8"/><path d="M7 17.5c.8.5 1.8.8 2.8.8 1.8 0 2.6-.9 2.6-2.4v-6.4h-2.1v6.3c0 .7-.3 1-1 1-.4 0-.8-.1-1.1-.3l-1.2 1zm7.4 0c1.2.6 2.6.9 3.8.9 2.7 0 4.3-1.4 4.3-3.6 0-2.2-1.3-3.1-3.2-3.9-1.3-.5-1.9-.9-1.9-1.6 0-.6.5-1.1 1.6-1.1 1 0 1.8.3 2.3.7l1-1.3c-.8-.6-1.9-.9-3.2-.9-2.5 0-3.9 1.4-3.9 3.4 0 2 1.3 3 3.1 3.7 1.4.6 2 1 2 1.8 0 .8-.7 1.3-1.9 1.3-1.1 0-2.2-.4-2.8-.9l-1.1 1.3z" fill="#050505"/></svg>`;
        } else if (name.includes('html') || name.includes('css')) {
            return `<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#6D9BB8" d="M3 2l1.6 18.2L12 23l7.4-2.8L21 2H3z"/><path fill="#FFFFFF" d="M12 21.1l6.1-2.3L19.4 3.7H12v17.4z"/><path fill="#050505" d="M12 8.6H8.3l-.3-3.1h7.7V3.7H5.2l.8 9.3H12V8.6zm0 7.8l-3.3-.9-.2-2.3H6.4l.4 4.5 5.2 1.4v-2.7z"/></svg>`;
        } else if (name.includes('docker')) {
            return `<svg width="22" height="22" viewBox="0 0 24 24" fill="#6D9BB8"><path d="M13.9 8.8h2.3v2.3h-2.3zm-3 0h2.3v2.3h-2.3zm-3 0h2.3v2.3h-2.3zm9 0h2.3v2.3h-2.3zm-6-3h2.3v2.3h-2.3zm3 0h2.3v2.3h-2.3zm3 0h2.3v2.3h-2.3zm-6-3h2.3v2.3h-2.3zm14.3 9.4c-.6-.4-1.9-.5-2.8-.2-.3-.8-.8-1.5-1.5-2.1l-.8.5c.7.7 1 1.6 1 2.5 0 .2 0 .4-.1.6-1.2.6-3 .4-4.1-.4H.5c-.3 1.3 0 3.8 1.4 5.3 1.7 1.8 4.6 2.5 8.3 2.5 7.4 0 11.7-4.4 11.7-8.7z"/></svg>`;
        }
        return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6D9BB8" stroke-width="2.2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
    },

    getFeatureIconSvg(iconName) {
        const icon = (iconName || '').toLowerCase().trim();
        if (icon === 'brain') {
            return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04z"/></svg>`;
        } else if (icon === 'location' || icon === 'coordination' || icon === 'disaster') {
            return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
        } else if (icon === 'paw' || icon === 'adoption') {
            return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="4.5" cy="9.5" r="2.5"/><circle cx="9" cy="5.5" r="2.5"/><circle cx="15" cy="5.5" r="2.5"/><circle cx="19.5" cy="9.5" r="2.5"/><path d="M12 11c-3.5 0-6 2.5-6 5.5 0 2.5 2 4.5 6 4.5s6-2 6-4.5c0-3-2.5-5.5-6-5.5z"/></svg>`;
        } else if (icon === 'card' || icon === 'donation' || icon === 'payment') {
            return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="3" ry="3"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`;
        } else if (icon === 'star' || icon === 'rewards') {
            return `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
        }
        return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
    },

    renderStage(instant = false) {
        const stage = document.getElementById('featured-stage-content');
        if (!stage || !this.projects.length) return;

        const p = this.projects[this.currentIndex];
        const totalStr = String(this.projects.length).padStart(2, '0');
        const numStr = String(this.currentIndex + 1).padStart(2, '0');
        const originalIdx = this.currentIndex;

        const techList = p.tech || ['React.js', 'Node.js', 'MongoDB', 'JavaScript', 'HTML5', 'CSS3'];
        const techIconsHtml = techList.slice(0, 6).map(t => `
            <div class="tech-icon-squircle" title="${t}">
                ${this.getTechIconSvg(t)}
            </div>
        `).join('');

        const features = p.features || [];
        const featuresHtml = features.slice(0, 5).map(f => `
            <div class="feat-item-card">
                <div class="feat-item-icon-box" aria-hidden="true">
                    ${this.getFeatureIconSvg(f.icon)}
                </div>
                <div class="feat-item-info">
                    <h4 class="feat-item-name">${f.title}</h4>
                    <p class="feat-item-desc">${f.desc || f.title}</p>
                </div>
            </div>
        `).join('');

        const titleDoodle = (p.icon === 'paw' || p.title.toLowerCase().includes('ani'))
            ? '<svg width="28" height="28" viewBox="0 0 24 24" fill="#5E8CA8" stroke="#FFFFFF" stroke-width="1.2" aria-hidden="true" style="transform: rotate(14deg); display: inline-block; vertical-align: middle;"><circle cx="4.5" cy="9.5" r="2.5"/><circle cx="9" cy="5.5" r="2.5"/><circle cx="15" cy="5.5" r="2.5"/><circle cx="19.5" cy="9.5" r="2.5"/><path d="M12 11c-3.5 0-6 2.5-6 5.5 0 2.5 2 4.5 6 4.5s6-2 6-4.5c0-3-2.5-5.5-6-5.5z"/></svg>'
            : '✦';

        const html = `
                <!-- Left Column: Dossier -->
                <div class="stage-col-left">
                    <div class="feat-counter-pill">${numStr} / ${totalStr}</div>
                    <h3 class="feat-proj-title">
                        ${p.title} <span class="feat-title-icon" aria-hidden="true">${titleDoodle}</span>
                    </h3>
                    <div class="feat-proj-role">${p.role || ''}</div>
                    <p class="feat-proj-desc">${p.description}</p>
                    
                    <div class="feat-tech-block">
                        <div class="feat-tech-header">
                            <span class="feat-tech-label">Tech Stack</span>
                            <svg class="doodle-tech-arrow" width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden="true">
                                <path d="M 6,4 Q 24,6 20,22 M 15,18 L 20,24 L 26,19" stroke="#5E8CA8" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                        <div class="feat-tech-icons-row">
                            ${techIconsHtml}
                        </div>
                    </div>

                    <div class="feat-actions-row">
                        <a href="${p.links?.[0]?.href || 'https://github.com/PiyushVerma246'}" target="_blank" rel="noopener noreferrer" class="btn-feat-live">
                            <span>Live Preview</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </a>
                        <a href="${p.links?.[1]?.href || 'https://github.com/PiyushVerma246'}" target="_blank" rel="noopener noreferrer" class="btn-feat-code" title="View Source Code">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            <span>Code</span>
                        </a>
                        <button type="button" class="btn-feat-case" onclick="DataLoader.openProjectModal(${originalIdx})" aria-label="View case study details for ${p.title}" title="Case Study & Details">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        </button>
                    </div>
                </div>

                <!-- Center Column: Device Mockup -->
                <div class="stage-col-center">
                    <div class="device-mockup-wrapper" role="button" tabindex="0" aria-label="Open case study details for ${p.title}" onclick="DataLoader.openProjectModal(${originalIdx})" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();DataLoader.openProjectModal(${originalIdx});}" title="Click to view full architecture & case study">
                        <div class="device-tilted-paper"></div>
                        <div class="device-white-frame">
                            <div class="device-featured-sticker">Featured</div>
                            <img src="${p.image}" alt="${p.imageAlt || p.title}" width="768" height="429" class="device-screen-img" loading="lazy" decoding="async">
                        </div>
                    </div>
                </div>

                <!-- Right Column: 5 Features Deck -->
                <div class="stage-col-right">
                    <div class="feat-features-deck">
                        ${featuresHtml}
                    </div>
                </div>
            `;

        if (this._stageTimer) {
            clearTimeout(this._stageTimer);
            this._stageTimer = null;
        }

        if (instant) {
            stage.innerHTML = html;
            stage.style.opacity = '1';
            stage.style.transform = 'scale(1)';
            return;
        }

        stage.style.opacity = '0';
        stage.style.transform = 'scale(0.98)';

        this._stageTimer = setTimeout(() => {
            this._stageTimer = null;
            stage.innerHTML = html;
            stage.style.opacity = '1';
            stage.style.transform = 'scale(1)';
        }, 120);
    },

    renderPolaroidReel() {
        const dock = document.getElementById('polaroid-reel-dock');
        if (!dock || !this.projects.length) return;

        dock.innerHTML = this.projects.map((p, idx) => {
            const isActive = idx === this.currentIndex;
            const thumbSrc = p.thumb || p.image;
            return `
                <button type="button" class="polaroid-card ${isActive ? 'active' : ''}" 
                        onclick="FeaturedProjectShowcase.goToProject(${idx})" 
                        aria-pressed="${isActive ? 'true' : 'false'}"
                        aria-label="View project ${p.title}">
                    <div class="polaroid-img-wrap">
                        <img src="${thumbSrc}" alt="" width="240" height="134" loading="lazy" decoding="async">
                    </div>
                    <span class="polaroid-name">${p.title}</span>
                    <div class="polaroid-active-bar" style="opacity: ${isActive ? '1' : '0'};"></div>
                </button>
            `;
        }).join('');
    },

    goToProject(index) {
        if (index < 0 || index >= this.projects.length) return;
        this.currentIndex = index;
        this.renderStage();
        this.renderPolaroidReel();
        this.pauseBriefly();
    },

    next() {
        if (this.projects.length <= 1) return;
        this.currentIndex = (this.currentIndex + 1) % this.projects.length;
        this.goToProject(this.currentIndex);
    },

    prev() {
        if (this.projects.length <= 1) return;
        this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        this.goToProject(this.currentIndex);
    },

    startAutoplay() {
        this.stopAutoplay();
        if (!this.isPlaying || !this.isInView || document.hidden) return;

        this.autoplayTimer = setInterval(() => {
            this.next();
        }, this.autoplayDuration);
    },

    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    },

    pauseBriefly() {
        if (!this.isPlaying) return;
        this.stopAutoplay();
        clearTimeout(this._resumeTimer);
        this._resumeTimer = setTimeout(() => {
            if (this.isPlaying && this.isInView && !this.autoplayTimer && !document.hidden) {
                this.startAutoplay();
            }
        }, 6000);
    },

    attachEventListeners() {
        if (this._eventsAttached) return;
        this._eventsAttached = true;

        const prevBtn = document.getElementById('feat-arrow-prev');
        const nextBtn = document.getElementById('feat-arrow-next');

        if (prevBtn) prevBtn.addEventListener('click', (e) => { e.preventDefault(); this.prev(); });
        if (nextBtn) nextBtn.addEventListener('click', (e) => { e.preventDefault(); this.next(); });

        const section = document.getElementById('projects');
        if (section) {
            section.addEventListener('mouseenter', () => this.stopAutoplay());
            section.addEventListener('mouseleave', () => {
                if (this.isPlaying && this.isInView && !this.autoplayTimer && !document.hidden) this.startAutoplay();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
            const sec = document.getElementById('projects');
            if (!sec) return;
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === 'ArrowLeft') this.prev();
                else if (e.key === 'ArrowRight') this.next();
            }
        });

        const stage = document.getElementById('featured-stage-content');
        if (stage) {
            let touchStartX = 0;
            stage.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });

            stage.addEventListener('touchend', (e) => {
                const diff = e.changedTouches[0].clientX - touchStartX;
                if (Math.abs(diff) > 45) {
                    if (diff < 0) this.next();
                    else this.prev();
                }
            }, { passive: true });
        }
    }
};

/* ==========================================================================
   360° 3D CYLINDRICAL SCROLL CAROUSEL CONTROLLER
   ========================================================================== */
const CertSlider = {
    items: [],
    allItems: [],
    activeIndex: 0,
    currentCategory: 'All',
    categories: [],
    targetAngle: 0,
    currentAngle: 0,
    stepAngle: 45,
    cachedRadius: 420,
    isLoopMode: true,
    isInView: false,
    _hasSyncedDomRadius: false,
    cardEls: [],
    animationFrameId: null,
    wheelSnapTimeout: null,
    resumeAutoplayTimeout: null,
    totalDragDist: 0,
    autoplayTimer: null,
    isPlaying: true,
    _eventsAttached: false,

    init(data) {
        if (!data) return;
        this.allItems = data.items || [];
        this.categories = data.categories || ['All', 'Programming', 'Web Development', 'Cloud & Tools', 'Data & Analytics', 'Others'];
        this.items = [...this.allItems];

        const featIdx = this.items.findIndex(i => i.featured);
        this.activeIndex = featIdx !== -1 ? featIdx : 0;

        this.configureStageGeometry();
        this.targetAngle = this.activeIndex * this.stepAngle;
        this.currentAngle = this.targetAngle;

        const eyebrowEl = document.getElementById('cert-eyebrow-text');
        if (eyebrowEl && data.eyebrow) eyebrowEl.textContent = data.eyebrow;

        const subtitleEl = document.getElementById('cert-subtitle');
        if (subtitleEl && data.subtitle) subtitleEl.textContent = data.subtitle;

        const statNumEl = document.getElementById('cert-stat-num');
        if (statNumEl && data.totalCount) statNumEl.textContent = data.totalCount;

        this.updateRadius(false);
        this.renderCategoryFilters();
        this.renderCards();
        this.updateControls();
        this.attachEventListeners();
        this.observeVisibility();
    },

    observeVisibility() {
        const container = document.getElementById('cert-slider-container');
        if (!container || !('IntersectionObserver' in window)) {
            this.isInView = true;
            this._hasSyncedDomRadius = true;
            this.updateRadius(true);
            this.renderStage(this.currentAngle);
            this.startAutoplay();
            return;
        }
        const obs = new IntersectionObserver((entries) => {
            const visible = entries.some(e => e.isIntersecting);
            this.isInView = visible;
            if (visible && !this._hasSyncedDomRadius) {
                this._hasSyncedDomRadius = true;
                this.updateRadius(true);
                this.renderStage(this.currentAngle);
            }
            if (visible && this.isPlaying && !document.hidden) {
                this.startAutoplay();
            } else {
                this.stopAutoplay();
            }
        }, { rootMargin: '350px 0px' });
        obs.observe(container);
    },

    configureStageGeometry() {
        const total = this.items.length;
        if (total >= 4) {
            this.isLoopMode = true;
            this.stepAngle = 360 / total;
        } else if (total === 2 || total === 3) {
            this.isLoopMode = false;
            this.stepAngle = total === 2 ? 54 : 52;
        } else {
            this.isLoopMode = false;
            this.stepAngle = 45;
        }
    },

    updateRadius(useDomWidth = true) {
        const stage = useDomWidth ? document.getElementById('cert-stage') : null;
        const w = (stage && stage.clientWidth) || Math.min(Math.max((window.innerWidth || 1200) - 64, 320), 1200);
        if (w < 450) this.cachedRadius = 215;
        else if (w < 768) this.cachedRadius = 285;
        else if (w < 1100) this.cachedRadius = 350;
        else this.cachedRadius = Math.min(w * 0.42, 460);
        return this.cachedRadius;
    },

    getRadius() {
        return this.cachedRadius;
    },

    snapTargetAngle(rawAngle) {
        let snapped = Math.round(rawAngle / this.stepAngle) * this.stepAngle;
        if (!this.isLoopMode && this.items.length > 0) {
            const maxAngle = Math.max(0, (this.items.length - 1) * this.stepAngle);
            snapped = Math.max(0, Math.min(maxAngle, snapped));
        }
        return snapped;
    },

    renderCategoryFilters() {
        const container = document.getElementById('cert-filters');
        if (!container) return;

        container.innerHTML = this.categories.map(cat => `
            <button type="button" class="cert-filter-pill ${cat === this.currentCategory ? 'active' : ''}" data-category="${cat}" aria-pressed="${cat === this.currentCategory ? 'true' : 'false'}">
                ${cat}
            </button>
        `).join('');

        container.querySelectorAll('.cert-filter-pill').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cat = e.currentTarget.getAttribute('data-category');
                if (cat === this.currentCategory) return;
                this.setCategory(cat);
            });
        });
    },

    setCategory(cat) {
        this.currentCategory = cat;
        this.items = cat === 'All' ? [...this.allItems] : this.allItems.filter(i => i.category === cat);
        this.activeIndex = 0;
        clearTimeout(this.wheelSnapTimeout);
        this.configureStageGeometry();
        this.targetAngle = 0;
        this.currentAngle = 0;
        this.renderCategoryFilters();
        this.renderCards();
        this.updateControls();
    },

    renderCards() {
        const stage = document.getElementById('cert-stage');
        if (!stage) return;

        if (this.items.length === 0) {
            this.cardEls = [];
            this.stopLoop();
            stage.innerHTML = `<div class="cert-no-results">No certifications found in this category.</div>`;
            return;
        }

        stage.innerHTML = this.items.map((item, idx) => `
            <div class="cert-plaque-card ${item.featured ? 'is-featured' : ''}" 
                 data-index="${idx}" 
                 data-id="${item.id}">
                
                <div class="card-clamp-pin">
                    <span class="clamp-dot"></span>
                </div>

                ${item.badge ? `<div class="card-featured-ribbon">${item.badge}</div>` : ''}

                <div class="card-top-row">
                    <div class="brand-emblem-wrap">
                        <div class="brand-icon-box">
                            ${getCertBrandIcon(item.brand)}
                        </div>
                        <span class="brand-name-tag">${item.issuer}</span>
                    </div>
                    <span class="card-category-pill">${item.category}</span>
                </div>

                <div class="card-content-block">
                    <h3 class="card-cert-title">${item.title}</h3>
                    <div class="card-cert-meta-row">
                        <span class="card-issued-date">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true">
                                <circle cx="12" cy="10" r="8"/>
                                <polyline points="12 6 12 10 15 12"/>
                            </svg>
                            ${item.issued}
                        </span>
                        <span class="card-cred-serial">${item.credentialId || ''}</span>
                    </div>
                    <p class="card-cert-desc">${item.description}</p>
                    
                    ${item.skills && item.skills.length ? `
                        <div class="card-skills-list">
                            ${item.skills.map(s => `<span class="card-skill-tag">${s}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>

                <div class="card-footer-row">
                    <div class="cert-rubber-stamp">
                        <span>VERIFIED ✓</span>
                    </div>
                    <div class="card-buttons-group">
                        <button type="button" class="btn-cert-inspect" data-action="inspect" title="Inspect Credential Plaque">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true">
                                <circle cx="11" cy="11" r="8"/>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            Inspect
                        </button>
                        <a href="${item.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn-cert-verify-link" aria-label="Verify ${item.title} credential on ${item.issuer}" title="Verify Online">
                            Verify ↗
                        </a>
                    </div>
                </div>
            </div>
        `).join('');

        this.cardEls = Array.from(stage.querySelectorAll('.cert-plaque-card'));

        this.cardEls.forEach(card => {
            card.addEventListener('click', (e) => {
                if (this.totalDragDist > 6) return;
                if (e.target.closest('.btn-cert-verify-link')) return;

                const idx = parseInt(card.getAttribute('data-index'), 10);
                if (Number.isNaN(idx)) return;

                if (e.target.closest('[data-action="inspect"]') || idx === this.activeIndex) {
                    if (idx !== this.activeIndex) {
                        this.rotateToIndex(idx);
                    }
                    DataLoader.openCertificateModal(this.items[idx]);
                } else {
                    this.rotateToIndex(idx);
                }
                this.pauseBriefly();
            });
        });

        this.renderStage(this.currentAngle);
        if (Math.abs(this.targetAngle - this.currentAngle) > 0.02) {
            this.startLoop();
        }
    },

    renderStage(angle) {
        if (!this.cardEls || this.cardEls.length === 0) return;

        const radius = this.getRadius();
        let closestIndex = 0;
        let minDistance = Infinity;

        this.cardEls.forEach((card, idx) => {
            const baseAngle = idx * this.stepAngle;
            const rawDiff = baseAngle - angle;
            const rel = this.isLoopMode
                ? (((rawDiff % 360) + 540) % 360 - 180)
                : rawDiff;

            const absRel = Math.abs(rel);
            if (absRel < minDistance) {
                minDistance = absRel;
                closestIndex = idx;
            }

            // Cylindrical coordinates
            const rad = (rel * Math.PI) / 180;
            const x = Math.sin(rad) * radius;
            const z = (Math.cos(rad) - 1) * radius;
            const rotY = -rel * 0.78;

            // Only front hemisphere |rel| <= 95 is visible
            if (absRel > 95) {
                card.style.transform = `translate3d(${Math.round(x)}px, 0px, ${Math.round(z)}px) scale(0.6)`;
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
                card.style.pointerEvents = 'none';
                card.style.zIndex = '0';
            } else {
                const depth = Math.max(0, Math.cos(rad));
                // Center front card stays crisp at scale 1.0; flanking cards scale down to 0.78
                const scale = 0.78 + 0.22 * depth;
                const opacity = Math.pow(depth, 0.85);
                const zIndex = Math.round(depth * 100);

                if (absRel < 0.35) {
                    card.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
                } else {
                    card.style.transform = `translate3d(${Math.round(x)}px, 0px, ${Math.round(z)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
                }

                card.style.opacity = opacity.toFixed(3);
                card.style.zIndex = String(zIndex);
                card.style.visibility = 'visible';
                card.style.pointerEvents = 'auto';
            }

            const isCardActive = absRel < (this.stepAngle * 0.5);
            card.classList.toggle('active', isCardActive);
        });

        if (closestIndex !== this.activeIndex) {
            this.activeIndex = closestIndex;
            this.syncIndicators();
        }
    },

    startLoop() {
        if (this.animationFrameId) return;
        const tick = () => {
            const diff = this.targetAngle - this.currentAngle;
            if (Math.abs(diff) > 0.02) {
                this.currentAngle += diff * 0.14;
                this.renderStage(this.currentAngle);
                this.animationFrameId = window.requestAnimationFrame(tick);
            } else {
                if (this.currentAngle !== this.targetAngle) {
                    this.currentAngle = this.targetAngle;
                    this.renderStage(this.currentAngle);
                }
                this.animationFrameId = null;
            }
        };
        this.animationFrameId = window.requestAnimationFrame(tick);
    },

    stopLoop() {
        if (this.animationFrameId) {
            window.cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    },

    rotateToIndex(idx) {
        const total = this.items.length;
        if (total === 0) return;

        clearTimeout(this.wheelSnapTimeout);
        const safeIdx = ((idx % total) + total) % total;

        if (this.isLoopMode) {
            const snappedCurrent = ((Math.round(this.targetAngle / this.stepAngle) % total) + total) % total;
            let diff = safeIdx - snappedCurrent;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;
            this.targetAngle = Math.round(this.targetAngle / this.stepAngle) * this.stepAngle + diff * this.stepAngle;
        } else {
            this.targetAngle = safeIdx * this.stepAngle;
        }
        this.startLoop();
    },

    next() {
        const total = this.items.length;
        if (total <= 1) return;
        clearTimeout(this.wheelSnapTimeout);

        if (this.isLoopMode) {
            this.targetAngle = Math.round((this.targetAngle + this.stepAngle) / this.stepAngle) * this.stepAngle;
        } else {
            const nextIdx = (this.activeIndex + 1) % total;
            this.targetAngle = nextIdx * this.stepAngle;
        }
        this.startLoop();
    },

    prev() {
        const total = this.items.length;
        if (total <= 1) return;
        clearTimeout(this.wheelSnapTimeout);

        if (this.isLoopMode) {
            this.targetAngle = Math.round((this.targetAngle - this.stepAngle) / this.stepAngle) * this.stepAngle;
        } else {
            const prevIdx = (this.activeIndex - 1 + total) % total;
            this.targetAngle = prevIdx * this.stepAngle;
        }
        this.startLoop();
    },

    syncIndicators() {
        const total = this.items.length;
        const currEl = document.getElementById('cert-curr-idx');
        const totalEl = document.getElementById('cert-total-idx');
        if (currEl) currEl.textContent = total > 0 ? String(this.activeIndex + 1).padStart(2, '0') : '00';
        if (totalEl) totalEl.textContent = total > 0 ? String(total).padStart(2, '0') : '00';

        const dotsWrap = document.getElementById('cert-dots');
        if (dotsWrap) {
            dotsWrap.querySelectorAll('.cert-dot').forEach((btn, i) => {
                btn.classList.toggle('active', i === this.activeIndex);
            });
        }
    },

    updateControls() {
        const dotsWrap = document.getElementById('cert-dots');
        if (dotsWrap) {
            dotsWrap.innerHTML = this.items.map((_, i) => `
                <button type="button" class="cert-dot ${i === this.activeIndex ? 'active' : ''}" 
                        data-dot-idx="${i}" 
                        aria-label="Go to certificate slide ${i + 1}">
                </button>
            `).join('');

            dotsWrap.querySelectorAll('.cert-dot').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const dotIdx = parseInt(e.currentTarget.getAttribute('data-dot-idx'), 10);
                    if (!Number.isNaN(dotIdx)) {
                        this.rotateToIndex(dotIdx);
                        this.pauseBriefly();
                    }
                });
            });
        }
        this.syncIndicators();
    },

    startAutoplay() {
        this.stopAutoplay();
        if (!this.isPlaying || !this.isInView || document.hidden) return;
        this.autoplayTimer = setInterval(() => {
            this.next();
        }, 4200);
    },

    stopAutoplay() {
        if (this.autoplayTimer) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    },

    toggleAutoplay() {
        this.isPlaying = !this.isPlaying;
        const btn = document.getElementById('cert-autoplay-btn');
        if (btn) {
            btn.setAttribute('aria-pressed', this.isPlaying ? 'true' : 'false');
            if (this.isPlaying) {
                btn.classList.remove('is-paused');
                this.startAutoplay();
            } else {
                btn.classList.add('is-paused');
                this.stopAutoplay();
            }
        }
    },

    attachEventListeners() {
        if (this._eventsAttached) return;
        this._eventsAttached = true;

        const autoplayBtn = document.getElementById('cert-autoplay-btn');
        if (autoplayBtn) {
            autoplayBtn.addEventListener('click', () => this.toggleAutoplay());
        }

        const container = document.getElementById('cert-slider-container');
        if (container) {
            container.addEventListener('mouseenter', () => this.stopAutoplay());
            container.addEventListener('mouseleave', () => { if (this.isPlaying && this.isInView && !document.hidden) this.startAutoplay(); });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
            const sec = document.getElementById('certifications');
            if (!sec) return;
            const rect = sec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === 'ArrowLeft') {
                    this.prev();
                    this.pauseBriefly();
                } else if (e.key === 'ArrowRight') {
                    this.next();
                    this.pauseBriefly();
                }
            }
        });

        let resizeRaf = null;
        window.addEventListener('resize', () => {
            if (!resizeRaf) {
                resizeRaf = window.requestAnimationFrame(() => {
                    resizeRaf = null;
                    this.updateRadius(this.isInView || this._hasSyncedDomRadius);
                    this.renderStage(this.currentAngle);
                });
            }
        }, { passive: true });

        const stage = document.getElementById('cert-stage');
        if (stage) {
            // Mouse Wheel 360° Cylindrical Scroll
            stage.addEventListener('wheel', (e) => {
                if (this.items.length <= 1) return;
                e.preventDefault();
                const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
                this.targetAngle += delta * 0.22;

                if (!this.isLoopMode) {
                    const maxAngle = (this.items.length - 1) * this.stepAngle;
                    this.targetAngle = Math.max(-18, Math.min(maxAngle + 18, this.targetAngle));
                }

                this.startLoop();
                clearTimeout(this.wheelSnapTimeout);
                this.wheelSnapTimeout = setTimeout(() => {
                    this.targetAngle = this.snapTargetAngle(this.targetAngle);
                    this.startLoop();
                }, 160);

                this.pauseBriefly();
            }, { passive: false });

            // Pointer Drag & Touch Swipe
            let isDragging = false;
            let dragStartX = 0;
            let dragStartAngle = 0;
            let hasCaptured = false;

            const onPointerMove = (e) => {
                if (!isDragging) return;
                const dx = e.clientX - dragStartX;
                this.totalDragDist = Math.abs(dx);

                if (this.totalDragDist > 6 && !hasCaptured) {
                    hasCaptured = true;
                    stage.classList.add('is-dragging');
                    try { stage.setPointerCapture?.(e.pointerId); } catch (_) {}
                }

                let nextTarget = dragStartAngle - dx * 0.38;
                if (!this.isLoopMode) {
                    const maxAngle = (this.items.length - 1) * this.stepAngle;
                    nextTarget = Math.max(-18, Math.min(maxAngle + 18, nextTarget));
                }
                this.targetAngle = nextTarget;
                this.startLoop();
            };

            const endDrag = (e) => {
                if (!isDragging) return;
                isDragging = false;
                stage.classList.remove('is-dragging');
                window.removeEventListener('pointermove', onPointerMove);
                window.removeEventListener('pointerup', endDrag);
                window.removeEventListener('pointercancel', endDrag);

                if (hasCaptured) {
                    try { stage.releasePointerCapture?.(e.pointerId); } catch (_) {}
                }

                if (this.totalDragDist > 6) {
                    this.targetAngle = this.snapTargetAngle(this.targetAngle);
                    this.startLoop();
                    this.pauseBriefly();
                }

                setTimeout(() => {
                    this.totalDragDist = 0;
                }, 0);
            };

            stage.addEventListener('pointerdown', (e) => {
                if (this.items.length <= 1) return;
                if (e.button && e.button !== 0) return;
                if (e.target.closest('a') || e.target.closest('button')) return;

                isDragging = true;
                dragStartX = e.clientX;
                dragStartAngle = this.targetAngle;
                this.totalDragDist = 0;
                hasCaptured = false;
                clearTimeout(this.wheelSnapTimeout);

                window.addEventListener('pointermove', onPointerMove, { passive: true });
                window.addEventListener('pointerup', endDrag);
                window.addEventListener('pointercancel', endDrag);
            });
        }
    },

    pauseBriefly() {
        if (!this.isPlaying) return;
        this.stopAutoplay();
        clearTimeout(this.resumeAutoplayTimeout);
        this.resumeAutoplayTimeout = setTimeout(() => {
            if (this.isPlaying && this.isInView && !this.autoplayTimer && !document.hidden) {
                this.startAutoplay();
            }
        }, 6000);
    }
};

/* ==========================================================================
   REACT BITS OPTION WHEEL SHOWCASE INITIALIZATION
   ========================================================================== */
function initOptionWheelShowcase() {
    const rootEl = document.getElementById('skills-option-wheel-root');
    if (!rootEl || typeof OptionWheel !== 'function') return;

    const domains = [
        {
            title: "Frontend Architecture",
            desc: "Engineering high-performance, component-based user interfaces with modern React ecosystems, micro-frontends, and fluid animations.",
            tags: ["React.js", "Next.js", "TypeScript", "TailwindCSS", "GSAP Motion", "HTML5 & CSS3"]
        },
        {
            title: "Backend & Systems",
            desc: "Designing resilient RESTful and event-driven architectures, scalable backend services, and clean API gateways.",
            tags: ["Node.js", "Express", "Python", "C++", "REST APIs", "Microservices"]
        },
        {
            title: "Database & Storage",
            desc: "Architecting structured relational schemas and dynamic NoSQL data layers optimized for high concurrency and speed.",
            tags: ["MongoDB", "MySQL", "PostgreSQL", "Redis Cache", "ORM / Prisma"]
        },
        {
            title: "DevOps & Cloud",
            desc: "Streamlining continuous integration, containerization, reproducible environments, and automated cloud deployments.",
            tags: ["Docker", "Git & GitHub", "Linux CLI", "Vercel", "CI/CD Pipelines"]
        },
        {
            title: "AI & Smart Agents",
            desc: "Leveraging cutting-edge Large Language Models, agentic coding workflows, prompt systems, and multimodal APIs.",
            tags: ["Gemini API", "OpenAI", "Agentic Architecture", "LangChain", "Vector DBs"]
        },
        {
            title: "Creative Engineering",
            desc: "Crafting bespoke interactive experiences, 60fps micro-interactions, canvas visualizations, and tactile UI controls.",
            tags: ["WebGL", "Three.js", "CSS Shaders", "Physics Engines", "UI Acoustics"]
        }
    ];

    const items = domains.map(d => d.title);
    const indexEl = document.getElementById('wheel-item-index');
    const titleEl = document.getElementById('wheel-item-title');
    const descEl = document.getElementById('wheel-item-desc');
    const tagsEl = document.getElementById('wheel-item-tags');

    const updateDetails = (index) => {
        const item = domains[index];
        if (!item) return;
        if (indexEl) indexEl.textContent = String(index + 1).padStart(2, '0');
        if (titleEl) titleEl.textContent = item.title;
        if (descEl) descEl.textContent = item.desc;
        if (tagsEl) {
            tagsEl.innerHTML = item.tags.map(t => `<span class="wheel-tag">${t}</span>`).join('');
        }
    };

    // Instantiate OptionWheel directly using the React Bits specifications
    window.portfolioOptionWheel = new OptionWheel(rootEl, {
        items: items,
        defaultSelected: 0,
        side: 'left',
        fontSize: 2.1,
        spacing: 1.45,
        curve: 1,
        tilt: 6,
        blur: 2,
        fade: 0.28,
        minOpacity: 0.05,
        smoothing: 200,
        inset: 48,
        loop: true,
        draggable: true,
        activeColor: '#FFFFFF',
        textColor: '#8C959E',
        onChange: (index, label) => {
            updateDetails(index);
        }
    });

    updateDetails(0);
}

/* ==========================================================================
   REACT BITS PARTICLES SHOWCASE INITIALIZATION
   Interactive WebGL2 dark powder-blue & white particles for Skills, Experience, & Certifications
   Lazy-mounted via IntersectionObserver so initial load stays fast and main-thread light
   ========================================================================== */
function initSectionParticles() {
    if (typeof Particles !== 'function') return;

    const isMobile = window.innerWidth < 768 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

    const baseConfig = {
        particleColors: ['#4B7691', '#5E8CA8', '#FFFFFF'],
        particleCount: isMobile ? 65 : 160,
        particleSpread: 10,
        speed: 0.1,
        particleBaseSize: isMobile ? 80 : 100,
        sizeRandomness: 1,
        shape: 'circle',
        glow: isMobile ? 0.35 : 0.55,
        twinkle: 0.25,
        alphaParticles: false,
        moveParticlesOnHover: !isCoarse,
        hoverEffect: isCoarse ? 'none' : 'parallax',
        particleHoverFactor: 1,
        clickBurst: !isCoarse,
        cameraDistance: 20,
        disableRotation: false,
        intro: true,
        opacity: 0.85
    };

    const targets = [
        { id: 'particles-skills', variation: 0 },
        { id: 'particles-experience', variation: 17 },
        { id: 'particles-certifications', variation: 42 }
    ];

    window.portfolioParticles = window.portfolioParticles || [];

    const scheduleIdle = (fn) => {
        if (typeof window.requestIdleCallback === 'function') {
            window.requestIdleCallback(fn, { timeout: 1400 });
        } else {
            setTimeout(fn, 280);
        }
    };

    const mountTarget = (el, variation) => {
        if (!el || el.dataset.particlesMounted === '1') return;
        el.dataset.particlesMounted = '1';
        scheduleIdle(() => {
            window.requestAnimationFrame(() => {
                try {
                    const instance = new Particles(el, {
                        ...baseConfig,
                        variation
                    });
                    window.portfolioParticles.push(instance);
                } catch (e) { }
            });
        });
    };

    if (!('IntersectionObserver' in window)) {
        targets.forEach(t => mountTarget(document.getElementById(t.id), t.variation));
        return;
    }

    const variationById = new Map(targets.map(t => [t.id, t.variation]));
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const variation = variationById.get(el.id) ?? 0;
            obs.unobserve(el);
            mountTarget(el, variation);
        });
    }, { rootMargin: '80px 0px' });

    targets.forEach(target => {
        const el = document.getElementById(target.id);
        if (el) observer.observe(el);
    });
}

/* ==========================================================================
   ABOUT ME SECTION CONTROLLER (Reveal, Eyebrow Scramble, JSON Hydration & Spotlight)
   ========================================================================== */
const AboutShowcase = {
    _initialized: false,

    escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    },

    init() {
        if (this._initialized) return;
        const section = document.getElementById('about');
        if (!section) return;
        this._initialized = true;

        this.reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

        this.initReveal(section);
        this.initDecryptedText();
        this.initBentoSpotlight();
    },

    hydrate(data) {
        if (!data) return;

        const eyebrowEl = document.getElementById('about-eyebrow-text');
        const statusEl = document.getElementById('about-status-value');
        const headingMain = document.getElementById('about-heading-main');
        const headingHighlight = document.getElementById('about-heading-highlight');
        const subroleEl = document.getElementById('about-subrole');
        const bioCopy = document.getElementById('about-bio-copy');
        const likesList = document.getElementById('about-likes-list');
        const dislikesList = document.getElementById('about-dislikes-list');
        const vibeList = document.getElementById('about-vibe-list');
        const mottoEl = document.getElementById('about-motto-text');

        if (eyebrowEl && data.eyebrow) {
            eyebrowEl.textContent = data.eyebrow;
            eyebrowEl.setAttribute('data-decrypt', data.eyebrow);
        }
        if (statusEl && data.status) statusEl.textContent = data.status;
        if (headingMain && data.heading) headingMain.textContent = data.heading;
        if (headingHighlight && data.headingHighlight) headingHighlight.textContent = data.headingHighlight;
        if (subroleEl && data.subrole) subroleEl.textContent = data.subrole;
        if (bioCopy && data.description) bioCopy.innerHTML = data.description;
        if (mottoEl && data.motto) mottoEl.innerHTML = `&ldquo;${this.escapeHtml(data.motto)}&rdquo;`;

        if (likesList && Array.isArray(data.likes)) {
            likesList.innerHTML = data.likes.map(item => `
                <li class="about-compact-row">
                    <span class="compact-glyph" aria-hidden="true">+</span>
                    <span class="compact-label">${this.escapeHtml(typeof item === 'string' ? item : item.title)}</span>
                </li>
            `).join('');
        }

        if (dislikesList && Array.isArray(data.dislikes)) {
            dislikesList.innerHTML = data.dislikes.map(item => `
                <li class="about-compact-row">
                    <span class="compact-glyph" aria-hidden="true">&times;</span>
                    <span class="compact-label">${this.escapeHtml(typeof item === 'string' ? item : item.title)}</span>
                </li>
            `).join('');
        }

        if (vibeList && Array.isArray(data.vibes)) {
            vibeList.innerHTML = data.vibes.map(item => `
                <div class="about-vibe-row">
                    <dt>${this.escapeHtml(item.label)}</dt>
                    <dd>${this.escapeHtml(item.value)}</dd>
                </div>
            `).join('');
        }
    },

    initReveal(section) {
        const items = Array.from(section.querySelectorAll('[data-ed-reveal]'));
        if (!items.length || this.reducedMotion || !('IntersectionObserver' in window)) return;

        section.classList.add('js-about-anim');

        const showItem = (el, idx) => {
            if (el.classList.contains('is-visible')) return;
            el.style.transitionDelay = `${Math.max(0, idx) * 45}ms`;
            el.classList.add('is-visible');
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = items.indexOf(entry.target);
                    showItem(entry.target, idx);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.04, rootMargin: '120px 0px -10px 0px' });

        items.forEach(el => observer.observe(el));
    },

    scrambleElement(el, duration = 420) {
        if (!el || this.reducedMotion) return;
        const targetText = el.getAttribute('data-decrypt') || el.textContent;
        const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/';
        const length = targetText.length;

        if (el._decryptTimer) {
            window.cancelAnimationFrame(el._decryptTimer);
        }

        const start = performance.now();
        const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / duration);
            const revealedCount = Math.floor(progress * length);

            let out = '';
            for (let i = 0; i < length; i++) {
                const ch = targetText[i];
                if (ch === ' ' || ch === '/') {
                    out += ch;
                } else if (i < revealedCount) {
                    out += ch;
                } else {
                    out += glyphs[Math.floor(Math.random() * glyphs.length)];
                }
            }

            el.textContent = out;

            if (progress < 1) {
                el._decryptTimer = window.requestAnimationFrame(step);
            } else {
                el.textContent = targetText;
                el._decryptTimer = null;
            }
        };

        el._decryptTimer = window.requestAnimationFrame(step);
    },

    initDecryptedText() {
        const nodes = document.querySelectorAll('#about [data-decrypt]');
        if (!nodes.length || this.reducedMotion) return;

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.scrambleElement(entry.target, 440);
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.25 });

            nodes.forEach(node => observer.observe(node));
        }

        nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                this.scrambleElement(node, 320);
            });
        });
    },

    initBentoSpotlight() {
        const grid = document.getElementById('about-bento-grid');
        if (!grid || this.isCoarsePointer) return;

        const cards = Array.from(grid.querySelectorAll('.about-bento-card'));
        if (!cards.length) return;

        let rafId = null;
        let lastEvt = null;

        const paintCards = () => {
            rafId = null;
            if (!lastEvt) return;
            const cx = lastEvt.clientX;
            const cy = lastEvt.clientY;
            // Read all rects before writing CSS properties
            const rects = cards.map(card => card.getBoundingClientRect());
            cards.forEach((card, idx) => {
                const rect = rects[idx];
                card.style.setProperty('--ax', `${(cx - rect.left).toFixed(1)}px`);
                card.style.setProperty('--ay', `${(cy - rect.top).toFixed(1)}px`);
                const dx = Math.max(rect.left - cx, 0, cx - rect.right);
                const dy = Math.max(rect.top - cy, 0, cy - rect.bottom);
                const dist = Math.hypot(dx, dy);
                const glow = Math.max(0, 1 - dist / 240);
                card.style.setProperty('--ab-glow', glow.toFixed(3));
            });
        };

        grid.addEventListener('pointermove', (e) => {
            lastEvt = e;
            if (!rafId) rafId = window.requestAnimationFrame(paintCards);
        }, { passive: true });

        grid.addEventListener('pointerleave', () => {
            lastEvt = null;
            cards.forEach(card => card.style.setProperty('--ab-glow', '0'));
        });
    }
};

function initAboutShowcase() {
    AboutShowcase.init();
}

/* ==========================================================================
   CONTACT / TRANSMISSION SECTION & ARCHITECTURAL FOOTER CONTROLLER
   ========================================================================== */
function initConnectSection() {
    const section = document.getElementById('contact');
    if (!section) return;

    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    const reveals = Array.from(section.querySelectorAll('[data-connect-reveal]'));

    if (reveals.length && !reducedMotion && 'IntersectionObserver' in window) {
        section.classList.add('js-connect-anim');
        const revealEl = (el, idx) => {
            if (el.classList.contains('is-visible')) return;
            el.style.transitionDelay = `${Math.max(0, idx) * 45}ms`;
            el.classList.add('is-visible');
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const idx = reveals.indexOf(entry.target);
                    revealEl(entry.target, idx);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.04, rootMargin: '120px 0px -10px 0px' });

        reveals.forEach(el => observer.observe(el));
    }

    // Live Lucknow IST Clock beside (IST UTC +5:30) — starts lazily when Contact approaches viewport
    const clockEl = document.getElementById('connect-live-time');
    if (clockEl) {
        let clockStarted = false;
        let istFmt = null;

        const updateClock = () => {
            try {
                if (!istFmt) {
                    istFmt = new Intl.DateTimeFormat('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    });
                }
                clockEl.textContent = `${istFmt.format(new Date()).toUpperCase()} LOCAL`;
            } catch (e) {
                clockEl.textContent = 'LIVE IST';
            }
        };

        const startClock = () => {
            if (clockStarted) return;
            clockStarted = true;
            updateClock();
            setInterval(updateClock, 30000);
        };

        if ('IntersectionObserver' in window) {
            const clockObs = new IntersectionObserver((entries, obs) => {
                if (entries.some(e => e.isIntersecting)) {
                    obs.disconnect();
                    startClock();
                }
            }, { rootMargin: '350px 0px' });
            clockObs.observe(section);
        } else {
            startClock();
        }
    }

    // Cursor Radial Spotlight Across Architectural Social Rows
    const linkList = document.getElementById('connect-link-list');
    if (linkList && !isCoarsePointer) {
        const rows = Array.from(linkList.querySelectorAll('.connect-link-row'));
        let listRaf = null;
        let lastListEvt = null;

        const paintRows = () => {
            listRaf = null;
            if (!lastListEvt) return;
            const cx = lastListEvt.clientX;
            const cy = lastListEvt.clientY;
            // Batch all row measurements before style writes
            const rects = rows.map(row => row.getBoundingClientRect());
            rows.forEach((row, idx) => {
                const rect = rects[idx];
                row.style.setProperty('--lx', `${(cx - rect.left).toFixed(1)}px`);
                row.style.setProperty('--ly', `${(cy - rect.top).toFixed(1)}px`);
                const dx = Math.max(rect.left - cx, 0, cx - rect.right);
                const dy = Math.max(rect.top - cy, 0, cy - rect.bottom);
                const dist = Math.hypot(dx, dy);
                const glow = Math.max(0, 1 - dist / 220);
                row.style.setProperty('--row-glow', glow.toFixed(3));
            });
        };

        linkList.addEventListener('pointermove', (e) => {
            lastListEvt = e;
            if (!listRaf) listRaf = window.requestAnimationFrame(paintRows);
        }, { passive: true });

        linkList.addEventListener('pointerleave', () => {
            lastListEvt = null;
            rows.forEach(row => row.style.setProperty('--row-glow', '0'));
        });
    }

    // Interactive Cursor Aura on Dot-Matrix World Map
    const worldCard = document.getElementById('connect-world-card');
    if (worldCard && !isCoarsePointer) {
        let mapRaf = null;
        let lastMapEvt = null;

        const paintMap = () => {
            mapRaf = null;
            if (!lastMapEvt) return;
            const rect = worldCard.getBoundingClientRect();
            worldCard.style.setProperty('--wx', `${(lastMapEvt.clientX - rect.left).toFixed(1)}px`);
            worldCard.style.setProperty('--wy', `${(lastMapEvt.clientY - rect.top).toFixed(1)}px`);
            worldCard.style.setProperty('--map-glow', '1');
        };

        worldCard.addEventListener('pointermove', (e) => {
            lastMapEvt = e;
            if (!mapRaf) mapRaf = window.requestAnimationFrame(paintMap);
        }, { passive: true });

        worldCard.addEventListener('pointerleave', () => {
            lastMapEvt = null;
            worldCard.style.setProperty('--map-glow', '0');
        });
    }

    // Back to Top Smooth Scroll
    const topBtn = document.getElementById('connect-back-top');
    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? 'auto' : 'smooth'
            });
        });
    }

    // Dual-Action Email Command Capsule Copy
    const emailCmd = document.getElementById('connect-email-cmd');
    const copyBtn = document.getElementById('connect-copy-btn');
    const copyLabel = document.getElementById('connect-copy-label');
    if (!copyBtn || !copyLabel) return;

    const defaultLabel = 'SEND ME AN EMAIL';
    let resetTimer = null;

    copyBtn.addEventListener('click', async () => {
        const email = copyBtn.getAttribute('data-email') || 'piyushverma7419@gmail.com';
        let copied = false;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(email);
                copied = true;
            } catch (e) { }
        }

        if (!copied) {
            try {
                const ta = document.createElement('textarea');
                ta.value = email;
                ta.setAttribute('readonly', '');
                ta.style.position = 'fixed';
                ta.style.opacity = '0';
                document.body.appendChild(ta);
                ta.select();
                copied = document.execCommand('copy');
                ta.remove();
            } catch (e) { }
        }

        if (copied) {
            copyBtn.classList.add('copied');
            if (emailCmd) emailCmd.classList.add('copied');
            copyLabel.textContent = 'COPIED TO CLIPBOARD ✓';
            if (resetTimer) clearTimeout(resetTimer);
            resetTimer = setTimeout(() => {
                copyBtn.classList.remove('copied');
                if (emailCmd) emailCmd.classList.remove('copied');
                copyLabel.textContent = defaultLabel;
            }, 2200);
        }
    });
}

// Smooth subtle background movement for cinematic feel
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const bg = document.querySelector('.tech-bg');
    if (bg) {
        // Very slow, expensive-feeling parallax
        const moveX = (x - 0.5) * 15;
        const moveY = (y - 0.5) * 15;
        bg.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
    }
    
    const portrait = document.querySelector('.portrait-img');
    if (portrait && window.innerWidth > 1024) {
        // Even subtler portrait movement
        const pMoveX = (x - 0.5) * 8;
        const pMoveY = (y - 0.5) * 8;
        portrait.style.transform = `translate(${-pMoveX}px, ${-pMoveY}px) scale(1.02)`;
    }
});

// Reset transform on mouse leave to prevent getting stuck
document.addEventListener('mouseleave', () => {
    const bg = document.querySelector('.tech-bg');
    const portrait = document.querySelector('.portrait-img');
    
    if (bg) bg.style.transform = 'translate(0px, 0px)';
    if (portrait) portrait.style.transform = 'translate(0px, 0px) scale(1.02)';
});

// Simple mobile menu toggle
const hamburger = document.querySelector('.hamburger');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        // Mobile menu logic would go here
    });
}

// Scroll Animations Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Unobserve to trigger only once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-fade-up').forEach(el => {
    scrollObserver.observe(el);
});

// Experience Cards — 3D tilt on mouse move
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -3;
        const rotateY = ((x - centerX) / centerX) * 3;
        
        card.querySelector('.xp-card-inner').style.transform = 
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.xp-card-inner').style.transform = 
            'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});

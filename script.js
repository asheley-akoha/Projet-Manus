/**
 * ASHFAG DESIGN - SCRIPT PRINCIPAL
 * Gestion de la navigation, animations et interactions
 */

// ============================================
// GESTION DE LA NAVIGATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Détection du scroll pour la navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Permettre la navigation normale
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// ============================================
// ANIMATIONS À L'INTERSECTION (Intersection Observer)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.addEventListener('DOMContentLoaded', function() {
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .portfolio-item, .contact-card'
    );

    elementsToObserve.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
});

// ============================================
// GESTION DES BOUTONS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ============================================
// GESTION DES CARTES DE SERVICE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'var(--shadow-lg)';
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow-sm)';
            this.style.transform = 'translateY(0)';
        });
    });
});

// ============================================
// GESTION DES IMAGES DU PORTFOLIO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioItems.forEach(item => {
        const image = item.querySelector('.portfolio-image img');
        
        item.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });

        item.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
});

// ============================================
// GESTION DES CARTES DE CONTACT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'var(--shadow-lg)';
            this.style.transform = 'translateY(-4px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow-sm)';
            this.style.transform = 'translateY(0)';
        });
    });
});

// ============================================
// SMOOTH SCROLL POUR LES ANCRES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ============================================
// GESTION DU COMPTEUR (Scroll Counter)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

document.addEventListener('DOMContentLoaded', function() {
    let statsAnimated = false;
    const stats = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                stats.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text);
                    if (!isNaN(number)) {
                        animateCounter(stat, number);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ============================================
// GESTION DES LIENS EXTERNES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');

    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Laisser le comportement par défaut (ouverture dans un nouvel onglet)
            // Mais on peut ajouter du tracking ici si nécessaire
        });
    });
});

// ============================================
// GESTION DE LA PERFORMANCE (Lazy Loading)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// GESTION DU CLAVIER (Accessibilité)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ============================================
// GESTION DES ÉVÉNEMENTS PERSONNALISÉS
// ============================================

// Événement personnalisé : Page chargée
document.addEventListener('DOMContentLoaded', function() {
    const event = new CustomEvent('pageLoaded', { detail: { timestamp: new Date() } });
    document.dispatchEvent(event);
});

// ============================================
// GESTION DE LA NAVIGATION MOBILE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Détection de la taille de l'écran
    function handleResize() {
        const width = window.innerWidth;
        if (width < 768) {
            // Mobile
            document.body.classList.add('mobile');
        } else {
            // Desktop
            document.body.classList.remove('mobile');
        }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
});

// ============================================
// GESTION DES ERREURS
// ============================================

window.addEventListener('error', function(e) {
    console.error('Erreur détectée:', e.message);
    // Vous pouvez ajouter du logging ou du reporting ici
});

// ============================================
// INITIALISATION
// ============================================

console.log('Ashfag Design - Site chargé avec succès');

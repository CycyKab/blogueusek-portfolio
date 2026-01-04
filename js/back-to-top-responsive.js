// back-to-top-responsive.js
console.log('🔼 Initialisation du bouton retour en haut responsive...');

class BackToTop {
    constructor() {
        this.button = null;
        this.scrollThreshold = 300;
        this.isVisible = false;
        this.lastScrollTop = 0;
        this.init();
    }
    
    init() {
        this.createButton();
        this.setupEvents();
        this.checkScroll();
        this.adaptToViewport();
        
        console.log('✅ Bouton retour en haut initialisé');
    }
    
    createButton() {
        // Vérifier si le bouton existe déjà
        this.button = document.querySelector('.back-to-top, #back-to-top, .back-to-top-btn');
        
        if (!this.button) {
            // Créer le bouton
            this.button = document.createElement('button');
            this.button.className = 'back-to-top';
            this.button.setAttribute('aria-label', 'Retour en haut de la page');
            this.button.innerHTML = `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
                <span class="text-label" style="display:none;">Haut</span>
            `;
            
            document.body.appendChild(this.button);
            
            // Ajouter les styles de base
            this.applyBaseStyles();
        }
        
        // Ajouter la classe responsive
        this.button.classList.add('glass-effect', 'show-animation');
    }
    
    applyBaseStyles() {
        const baseStyles = {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            opacity: '0',
            visibility: 'hidden',
            transition: 'all 0.3s ease',
            background: 'rgba(196, 164, 132, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(196, 164, 132, 0.3)',
            color: '#c4a484'
        };
        
        Object.assign(this.button.style, baseStyles);
    }
    
    setupEvents() {
        // Click event
        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            this.scrollToTop();
        });
        
        // Scroll event
        window.addEventListener('scroll', () => {
            this.checkScroll();
            this.handleScrollBehavior();
        });
        
        // Resize event
        window.addEventListener('resize', () => {
            this.adaptToViewport();
        });
        
        // Touch events pour mobile
        this.button.addEventListener('touchstart', () => {
            this.button.style.transform = 'scale(0.95)';
        });
        
        this.button.addEventListener('touchend', () => {
            this.button.style.transform = '';
        });
        
        // Keyboard event
        this.button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                this.scrollToTop();
            }
        });
    }
    
    checkScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > this.scrollThreshold) {
            if (!this.isVisible) {
                this.show();
            }
        } else {
            if (this.isVisible) {
                this.hide();
            }
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    handleScrollBehavior() {
        const scrollTop = window.pageYOffset;
        
        // Cacher le bouton quand on scroll vers le bas
        if (scrollTop > this.lastScrollTop && scrollTop > 100) {
            this.button.style.transform = 'translateY(70px)';
        } else {
            this.button.style.transform = 'translateY(0)';
        }
        
        this.lastScrollTop = scrollTop;
    }
    
    adaptToViewport() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Ajuster selon la taille de l'écran
        if (width <= 768) {
            // Mobile
            this.button.style.width = '45px';
            this.button.style.height = '45px';
            this.button.style.bottom = '20px';
            this.button.style.right = '20px';
            
            // Cacher le texte sur mobile
            const textLabel = this.button.querySelector('.text-label');
            if (textLabel) textLabel.style.display = 'none';
            
            // Ajouter animation pulse sur mobile
            this.button.classList.add('pulse-on-scroll');
            
            // Vérifier l'orientation
            if (height < 500) { // Paysage
                this.button.style.bottom = '10px';
                this.button.style.right = '10px';
            }
            
            // Safe area pour iOS
            if (CSS.supports('padding-bottom: env(safe-area-inset-bottom)')) {
                this.button.style.bottom = 'calc(20px + env(safe-area-inset-bottom))';
            }
            
        } else if (width <= 1024) {
            // Tablette
            this.button.style.width = '50px';
            this.button.style.height = '50px';
            this.button.style.bottom = '25px';
            this.button.style.right = '25px';
            
            // Afficher le texte si espace
            if (width >= 900) {
                const textLabel = this.button.querySelector('.text-label');
                if (textLabel) {
                    textLabel.style.display = 'inline';
                    this.button.classList.add('has-text');
                    this.button.style.width = 'auto';
                    this.button.style.padding = '12px 15px';
                    this.button.style.borderRadius = '25px';
                }
            }
            
        } else {
            // Desktop
            this.button.style.width = '55px';
            this.button.style.height = '55px';
            this.button.style.bottom = '30px';
            this.button.style.right = '30px';
            
            // Afficher le texte
            const textLabel = this.button.querySelector('.text-label');
            if (textLabel) {
                textLabel.style.display = 'inline';
                this.button.classList.add('has-text');
                this.button.style.width = 'auto';
                this.button.style.padding = '15px 20px';
                this.button.style.borderRadius = '30px';
            }
        }
        
        // Ajuster la taille de l'icône
        const icon = this.button.querySelector('svg, i');
        if (icon) {
            if (width <= 480) {
                icon.style.width = '16px';
                icon.style.height = '16px';
            } else if (width <= 768) {
                icon.style.width = '18px';
                icon.style.height = '18px';
            } else if (width <= 1024) {
                icon.style.width = '20px';
                icon.style.height = '20px';
            }
        }
    }
    
    show() {
        this.button.style.opacity = '0.9';
        this.button.style.visibility = 'visible';
        this.button.setAttribute('aria-hidden', 'false');
        this.isVisible = true;
        
        // Animation
        this.button.classList.add('visible');
    }
    
    hide() {
        this.button.style.opacity = '0';
        this.button.style.visibility = 'hidden';
        this.button.setAttribute('aria-hidden', 'true');
        this.isVisible = false;
        
        this.button.classList.remove('visible');
    }
    
    scrollToTop() {
        // Animation smooth
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Feedback visuel
        this.button.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.button.style.transform = '';
        }, 200);
    }
}

// Initialiser quand la page est prête
document.addEventListener('DOMContentLoaded', () => {
    new BackToTop();
});

// Pour les Single Page Apps
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
        if (!document.querySelector('.back-to-top')) {
            new BackToTop();
        }
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
}
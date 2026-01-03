// mobile-fixes-final.js - VERSION CORRIGÉE (sans gestion de menu)
console.log('📱 Application des correctifs mobiles...');

document.addEventListener('DOMContentLoaded', function() {
    
    // NE PAS gérer le menu burger ici - laisser le script principal le faire
    // function fixBurgerMenu() { ... } // SUPPRIMEZ CETTE FONCTION
    
    // 2. FIX PORTFOLIO FILTERS SCROLL
    function fixPortfolioFilters() {
        const filters = document.querySelector('.portfolio-filters');
        if (!filters) return;
        
        // Rendre scrollable horizontalement
        filters.style.overflowX = 'auto';
        filters.style.overflowY = 'hidden';
        filters.style.whiteSpace = 'nowrap';
        filters.style.webkitOverflowScrolling = 'touch';
        
        // Cacher la scrollbar
        filters.style.scrollbarWidth = 'none';
        
        // Ajouter un indicateur de scroll
        const hasScroll = filters.scrollWidth > filters.clientWidth;
        if (hasScroll) {
            filters.style.position = 'relative';
            
            const indicator = document.createElement('div');
            indicator.className = 'scroll-indicator';
            indicator.style.cssText = `
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 30px;
                background: linear-gradient(to right, transparent, var(--bg-color, #faf8f5));
                pointer-events: none;
                z-index: 1;
            `;
            filters.appendChild(indicator);
        }
    }
    
    // 3. FIX CONTACT HERO
    function fixContactHero() {
        const contactHero = document.querySelector('.contactHero');
        if (!contactHero) return;
        
        // Réorganiser pour mobile
        if (window.innerWidth <= 768) {
            const grid = contactHero.querySelector('.contactHeroGrid');
            const image = contactHero.querySelector('.contactHeroImage');
            const content = contactHero.querySelector('.contactHeroContent');
            
            if (grid && image && content) {
                // Mettre l'image après le texte
                grid.style.display = 'flex';
                grid.style.flexDirection = 'column';
                image.style.order = '2';
                content.style.order = '1';
                
                // Ajuster l'image
                image.style.height = '300px';
                image.style.minHeight = '300px';
                image.style.borderRadius = '20px';
                image.style.margin = '20px';
                image.style.backgroundPosition = 'center 30%';
            }
        }
    }
    
    // 4. REMOVE BEIGE MODE
    function removeBeigeMode() {
        // Supprimer la classe beige-mode
        document.body.classList.remove('beige-mode');
        
        // Si localStorage contient 'beige', changer en 'light'
        const savedTheme = localStorage.getItem('portfolio_theme');
        if (savedTheme === 'beige') {
            localStorage.setItem('portfolio_theme', 'light');
        }
        
        // Simplifier le thème toggle
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.onclick = function() {
                const body = document.body;
                const isDark = body.classList.contains('dark-theme');
                
                if (isDark) {
                    // Dark → Light
                    body.classList.remove('dark-theme');
                    localStorage.setItem('portfolio_theme', 'light');
                } else {
                    // Light → Dark
                    body.classList.add('dark-theme');
                    localStorage.setItem('portfolio_theme', 'dark');
                }
            };
        }
    }
    
    // 5. APPLIQUER TOUS LES FIXES
    function applyAllFixes() {
        // NE PAS appeler fixBurgerMenu()
        fixPortfolioFilters();
        fixContactHero();
        removeBeigeMode();
        
        // Détection iOS pour ajustements spéciaux
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            document.body.classList.add('ios-device');
            
            // Fix pour les inputs iOS
            document.querySelectorAll('input, textarea, select').forEach(el => {
                el.addEventListener('focus', function() {
                    setTimeout(() => {
                        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                });
            });
        }
        
        console.log('✅ Correctifs mobiles appliqués (sans gestion de menu)');
    }
    
    // Exécuter au chargement
    applyAllFixes();
    
    // Ré-appliquer au redimensionnement
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            fixPortfolioFilters();
            fixContactHero();
        }, 250);
    });
});
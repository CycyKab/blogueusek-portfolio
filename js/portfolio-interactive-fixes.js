// portfolio-interactive-fixes.js
console.log('🎯 Application des corrections interactives...');

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. GESTION DE LA BARRE DE FILTRES PORTFOLIO
    function initPortfolioFilters() {
        const filters = document.querySelector('.portfolio-filters');
        if (!filters) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Rétrécir la barre quand on scroll
            if (currentScroll > 100) {
                filters.classList.add('scrolled');
            } else {
                filters.classList.remove('scrolled');
            }
            
            // Coller en haut
            if (currentScroll > 200) {
                filters.style.position = 'fixed';
                filters.style.top = '60px';
                filters.style.left = '0';
                filters.style.right = '0';
                filters.style.width = '100%';
                
                // Ajuster le padding du contenu
                const portfolioGrid = document.querySelector('.portfolio-grid');
                if (portfolioGrid) {
                    portfolioGrid.style.marginTop = `${filters.offsetHeight + 20}px`;
                }
            } else {
                filters.style.position = 'relative';
                filters.style.top = 'auto';
                
                const portfolioGrid = document.querySelector('.portfolio-grid');
                if (portfolioGrid) {
                    portfolioGrid.style.marginTop = '0';
                }
            }
            
            lastScroll = currentScroll;
        });
        
        console.log('✅ Barre de filtres portfolio initialisée');
    }
    
    // 2. EFFET ESCALIER POUR MOBILE/TABLETTE
    function initMobileStairEffect() {
        if (window.innerWidth <= 1024) {
            const serviceCards = document.querySelectorAll('.service-card, .stair-item');
            
            serviceCards.forEach((card, index) => {
                // Réinitialiser les styles
                card.style.transform = 'none';
                card.style.opacity = '1';
                card.style.position = 'relative';
                card.style.width = '100%';
                card.style.setProperty('--index', index);
                
                // Effet au scroll
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('scrolled');
                            setTimeout(() => {
                                entry.target.classList.remove('scrolled');
                            }, 1000);
                        }
                    });
                }, { threshold: 0.3 });
                
                observer.observe(card);
            });
            
            console.log('✅ Effet escalier adapté pour mobile');
        }
    }
    
    // 3. CORRECTION COULEURS DES TEXTES
    function fixTextColors() {
        // Titre Portfolio
        const portfolioTitles = document.querySelectorAll('.portfolio-hero-title, .portfolio-section-title');
        portfolioTitles.forEach(title => {
            if (!title.style.color || title.style.color === 'inherit') {
                title.style.color = '#2c2420';
                title.style.textShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }
        });
        
        // Textes sur fond blur
        const blurSections = document.querySelectorAll('.glass-section, .blur-section, [style*="backdrop-filter"]');
        blurSections.forEach(section => {
            const texts = section.querySelectorAll('h2, h3, h4, p:not(.btn):not(button)');
            texts.forEach(text => {
                text.classList.add('enhanced-text');
                
                // S'assurer d'une bonne visibilité
                const computedColor = getComputedStyle(text).color;
                if (computedColor.includes('rgba') && computedColor.includes('0.7')) {
                    text.style.color = computedColor.replace('0.7', '1');
                }
            });
        });
        
        // Sections spécifiques
        const specialSections = document.querySelectorAll('.collaborate-section, .ready-collab-section');
        specialSections.forEach(section => {
            const texts = section.querySelectorAll('h2, h3, p');
            texts.forEach(text => {
                if (!text.style.color) {
                    text.style.color = '#2c2420';
                    text.style.fontWeight = '500';
                }
            });
        });
        
        console.log('✅ Couleurs des textes corrigées');
    }
    
    // 4. RESPONSIVE DES TÉMOIGNAGES
    function fixTestimonialsResponsive() {
        const testimonialsContainer = document.querySelector('.testimonials-container, .testimonials-grid');
        if (!testimonialsContainer) return;
        
        function adjustTestimonials() {
            const width = window.innerWidth;
            
            if (width <= 768) {
                // Mobile
                testimonialsContainer.style.gridTemplateColumns = '1fr';
                testimonialsContainer.style.gap = '20px';
                testimonialsContainer.style.padding = '0 10px';
                
                const cards = testimonialsContainer.querySelectorAll('.testimonial-card');
                cards.forEach(card => {
                    card.style.minHeight = 'auto';
                    card.style.padding = '20px';
                    card.style.margin = '0 5px';
                });
                
            } else if (width <= 1024) {
                // Tablette
                testimonialsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
                testimonialsContainer.style.gap = '25px';
                
                const cards = testimonialsContainer.querySelectorAll('.testimonial-card');
                cards.forEach(card => {
                    card.style.minHeight = '250px';
                });
                
            } else {
                // Desktop
                testimonialsContainer.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
                testimonialsContainer.style.gap = '30px';
            }
        }
        
        adjustTestimonials();
        window.addEventListener('resize', adjustTestimonials);
        
        console.log('✅ Témoignages responsive corrigés');
    }
    
    // 5. ALIGNEMENT ABOUT PAGE
    function fixAboutPageAlignment() {
        const aboutSections = document.querySelectorAll('.about-content-section, .about-details');
        
        aboutSections.forEach(section => {
            if (window.innerWidth <= 1024) {
                section.style.display = 'flex';
                section.style.flexDirection = 'column';
                section.style.alignItems = 'center';
                section.style.textAlign = 'center';
                
                // Centrer tous les textes
                const texts = section.querySelectorAll('p, h2, h3, h4, li');
                texts.forEach(text => {
                    text.style.textAlign = 'center';
                    text.style.marginLeft = 'auto';
                    text.style.marginRight = 'auto';
                });
                
                // Ajuster les conteneurs
                const containers = section.querySelectorAll('.about-text-block, .about-paragraph');
                containers.forEach(container => {
                    container.style.maxWidth = '600px';
                    container.style.margin = '0 auto';
                });
            }
        });
        
        console.log('✅ Page About alignée');
    }
    
    // 6. CORRECTION SERVICES PAGE
    function fixServicesPage() {
        const servicesGrid = document.querySelector('.services-grid');
        if (!servicesGrid) return;
        
        function adjustServicesGrid() {
            const width = window.innerWidth;
            
            if (width <= 768) {
                servicesGrid.style.gridTemplateColumns = '1fr';
                servicesGrid.style.gap = '20px';
                
                const sections = document.querySelectorAll('.service-section');
                sections.forEach(section => {
                    section.style.padding = '30px 15px';
                });
                
            } else if (width <= 1024) {
                servicesGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
                servicesGrid.style.gap = '25px';
                
                const sections = document.querySelectorAll('.service-section');
                sections.forEach(section => {
                    section.style.padding = '40px 20px';
                });
            }
        }
        
        adjustServicesGrid();
        window.addEventListener('resize', adjustServicesGrid);
        
        console.log('✅ Page Services corrigée');
    }
    
    // 7. APPLIQUER TOUTES LES CORRECTIONS
    function applyAllFixes() {
        initPortfolioFilters();
        initMobileStairEffect();
        fixTextColors();
        fixTestimonialsResponsive();
        fixAboutPageAlignment();
        fixServicesPage();
        
        // Forcer un reflow pour certaines corrections
        setTimeout(() => {
            document.body.classList.add('fixes-applied');
        }, 100);
        
        console.log('✅ Toutes les corrections appliquées');
    }
    
    // Initialisation
    applyAllFixes();
    
    // Réappliquer au redimensionnement
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            initMobileStairEffect();
            fixTestimonialsResponsive();
            fixAboutPageAlignment();
            fixServicesPage();
        }, 250);
    });
    
    // Re-apply on page change (for SPA)
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    setTimeout(applyAllFixes, 100);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});

// Fonctions exposées pour debug
window.fixPortfolioColors = fixTextColors;
window.fixResponsive = function() {
    fixTestimonialsResponsive();
    fixAboutPageAlignment();
    fixServicesPage();
};
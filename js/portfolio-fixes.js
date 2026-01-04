// portfolio-fixes.js
console.log('🔧 Application des correctifs portfolio...');

document.addEventListener('DOMContentLoaded', function() {
    
    // Sticky filters dans portfolio
    function initStickyFilters() {
        const filters = document.querySelector('.portfolio-filters');
        const portfolioSection = document.querySelector('.portfolio-section');
        
        if (!filters || !portfolioSection) return;
        
        let isSticky = false;
        const stickyOffset = filters.offsetTop - 60; // Hauteur du menu
        
        function checkScroll() {
            const scrollY = window.scrollY;
            
            if (scrollY > stickyOffset && !isSticky) {
                filters.classList.add('sticky');
                portfolioSection.style.paddingTop = `${filters.offsetHeight + 20}px`;
                isSticky = true;
            } else if (scrollY <= stickyOffset && isSticky) {
                filters.classList.remove('sticky');
                portfolioSection.style.paddingTop = '0';
                isSticky = false;
            }
        }
        
        window.addEventListener('scroll', checkScroll);
        console.log('✅ Sticky filters initialisé');
    }
    
    // 3. FAQ fonctionnelles
    function initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) return;
            
            // Créer l'icône si elle n'existe pas
            if (!question.querySelector('.faq-icon')) {
                const icon = document.createElement('span');
                icon.className = 'faq-icon';
                icon.innerHTML = '+';
                question.appendChild(icon);
            }
            
            question.addEventListener('click', () => {
                // Fermer les autres
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Ouvrir/fermer celui-ci
                item.classList.toggle('active');
                
                // Animation smooth
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });
        });
        
        console.log('✅ FAQ initialisées');
    }
    
    // 4. Correction effet escalier sur mobile
    function fixMobileStairEffect() {
        if (window.innerWidth <= 1024) {
            const servicesSection = document.querySelector('.luxury-services-section');
            if (!servicesSection) return;
            
            // Désactiver les animations de position
            const serviceCards = servicesSection.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                card.style.transform = 'none';
                card.style.opacity = '1';
                card.style.transition = 'none';
            });
            
            // Convertir en grid simple
            const grid = servicesSection.querySelector('.luxury-services-grid');
            if (grid) {
                grid.style.display = 'grid';
                grid.style.gridTemplateColumns = '1fr';
                grid.style.gap = '30px';
            }
            
            console.log('✅ Effet escalier désactivé pour mobile');
        }
    }
    
    // 5. Marquee contact fonctionnel
    function initContactMarquee() {
        const contactMarquee = document.querySelector('.contact-marquee, .booking-marquee');
        if (!contactMarquee) return;
        
        // S'assurer que l'animation fonctionne
        contactMarquee.style.animation = 'marqueeContact 40s linear infinite';
        contactMarquee.style.animationPlayState = 'running';
        
        // Dupliquer le contenu pour l'effet infini
        const content = contactMarquee.innerHTML;
        contactMarquee.innerHTML = content + content;
        
        console.log('✅ Marquee contact initialisé');
    }
    
    // 6. Appliquer le mode soleil à toutes les pages
    function applySunModeToAllPages() {
        // Vérifier le thème actuel
        const isDarkMode = document.body.classList.contains('dark-theme');
        const isBeigeMode = document.body.classList.contains('beige-mode');
        
        // Si en mode clair (soleil), appliquer à tous les héros
        if (!isDarkMode && !isBeigeMode) {
            const allHeros = document.querySelectorAll('.page-hero, .hero-section, .section-hero');
            allHeros.forEach(hero => {
                hero.classList.add('page-hero');
                hero.style.background = 'linear-gradient(135deg, #fef9f3 0%, #fff9f0 100%)';
                hero.style.color = '#2c2420';
            });
        }
    }
    
    // 7. Améliorer la lisibilité du texte sur fond blur
    function improveTextReadability() {
        const blurSections = document.querySelectorAll('.glass-effect, .blur-background, [style*="backdrop-filter"]');
        
        blurSections.forEach(section => {
            // Ajouter une ombre portée aux textes
            const texts = section.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');
            texts.forEach(text => {
                if (!text.style.textShadow) {
                    text.style.textShadow = '0 2px 4px rgba(0,0,0,0.3)';
                }
                
                // S'assurer d'un contraste suffisant
                const computedColor = window.getComputedStyle(text).color;
                if (computedColor.includes('rgba') && computedColor.includes('0.7')) {
                    text.style.color = computedColor.replace('0.7', '1');
                }
            });
            
            // Ajouter un arrière-plan semi-transparent si nécessaire
            if (window.getComputedStyle(section).backgroundColor === 'rgba(0, 0, 0, 0)') {
                section.classList.add('text-on-blur');
            }
        });
    }
    
    // 8. Responsive pour toutes les pages
    function enhanceResponsive() {
        // Portfolio page responsive
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (portfolioGrid) {
            if (window.innerWidth <= 768) {
                portfolioGrid.style.gridTemplateColumns = '1fr';
                portfolioGrid.style.gap = '20px';
            }
        }
        
        // Services page responsive
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid && window.innerWidth <= 768) {
            servicesGrid.style.gridTemplateColumns = '1fr';
        }
        
        // About page responsive
        const aboutStats = document.querySelector('.about-stats');
        if (aboutStats) {
            if (window.innerWidth <= 768) {
                aboutStats.style.gridTemplateColumns = 'repeat(2, 1fr)';
            }
            if (window.innerWidth <= 480) {
                aboutStats.style.gridTemplateColumns = '1fr';
            }
        }
        
        // Contact page responsive
        const contactFormGrid = document.querySelector('.contact-form-grid');
        if (contactFormGrid && window.innerWidth <= 768) {
            contactFormGrid.style.gridTemplateColumns = '1fr';
        }
    }
    
    // Exécuter tous les correctifs
    function applyAllFixes() {
        addLogoToMenu();
        initStickyFilters();
        initFAQ();
        fixMobileStairEffect();
        initContactMarquee();
        applySunModeToAllPages();
        improveTextReadability();
        enhanceResponsive();
        
        console.log('✅ Tous les correctifs appliqués');
    }
    
    // Initialiser
    applyAllFixes();
    
    // Réappliquer au redimensionnement
    window.addEventListener('resize', function() {
        fixMobileStairEffect();
        enhanceResponsive();
    });
    
    // Vérifier le scroll pour les filtres stickys
    window.addEventListener('scroll', function() {
        const filters = document.querySelector('.portfolio-filters');
        if (filters) {
            const stickyOffset = filters.offsetTop - 60;
            if (window.scrollY > stickyOffset) {
                filters.classList.add('sticky');
            } else {
                filters.classList.remove('sticky');
            }
        }
    });
});
// fix-speed-space.js
console.log('🎬 Correction des vitesses d\'animation...');

document.addEventListener('DOMContentLoaded', function() {
    // 1. Fixer les vitesses des marquees
    const marquees = document.querySelectorAll('.booking-marquee, .testimonials-carousel, .portfolio-hero-title-wrapper');
    
    marquees.forEach(marquee => {
        if (marquee.classList.contains('booking-marquee')) {
            marquee.style.animationDuration = '40s';
        } else if (marquee.classList.contains('testimonials-carousel')) {
            marquee.style.animationDuration = '60s';
        } else if (marquee.classList.contains('portfolio-hero-title-wrapper')) {
            marquee.style.animationDuration = '80s';
        }
        
        marquee.style.animationPlayState = 'running';
    });
    
    // 2. Fixer l'espacement des sections
    function fixSectionSpacing() {
        const introSticky = document.querySelector('.intro-sticky');
        const luxuryServices = document.querySelector('.luxury-services-section');
        
        if (introSticky && luxuryServices) {
            // S'assurer qu'ils sont proches
            introSticky.style.marginBottom = '-40px';
            luxuryServices.style.marginTop = '-40px';
            luxuryServices.style.paddingTop = '80px';
            
            // Sur mobile
            if (window.innerWidth <= 768) {
                introSticky.style.marginBottom = '-30px';
                luxuryServices.style.marginTop = '-30px';
                luxuryServices.style.paddingTop = '60px';
            }
        }
    }
    
    // 3. Fixer les vitesses d'animation CSS
    function fixAnimationSpeeds() {
        // Supprimer la règle * qui force les vitesses
        const styleSheets = document.styleSheets;
        for (let sheet of styleSheets) {
            try {
                const rules = sheet.cssRules || sheet.rules;
                for (let i = 0; i < rules.length; i++) {
                    const rule = rules[i];
                    if (rule.cssText && rule.cssText.includes('animation-duration: 0.3s !important')) {
                        sheet.deleteRule(i);
                        console.log('✅ Règle de vitesse supprimée');
                    }
                }
            } catch (e) {}
        }
        
        // Ajouter des vitesses normales
        const style = document.createElement('style');
        style.id = 'normal-speeds';
        style.textContent = `
            /* Vitesses normales */
            .service-card,
            .mission-card,
            .tool-category,
            .stat-item,
            .form-group,
            .location-card,
            .info-item,
            .pricing-card,
            .faq-item {
                animation-duration: 0.8s !important;
                transition-duration: 0.4s !important;
            }
            
            .service-card:hover,
            .portfolio-project:hover,
            .mission-card:hover,
            .location-card:hover {
                transition-duration: 0.5s !important;
            }
            
            /* Marquees lentes */
            .booking-marquee {
                animation: bookingMarquee 40s linear infinite !important;
            }
            
            .testimonials-carousel {
                animation: carousel 60s linear infinite !important;
            }
            
            .portfolio-hero-title-wrapper {
                animation: scrollTitle 80s linear infinite !important;
            }
            
            @media (max-width: 768px) {
                .booking-marquee {
                    animation: bookingMarquee 60s linear infinite !important;
                }
                
                .testimonials-carousel {
                    animation: carousel 80s linear infinite !important;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
    
    // Exécuter les correctifs
    fixAnimationSpeeds();
    fixSectionSpacing();
    
    // Ré-appliquer au redimensionnement
    window.addEventListener('resize', fixSectionSpacing);
    
    console.log('✅ Vitesses et espacements corrigés');
});
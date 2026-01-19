// force-responsive-fix.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Forçage des corrections responsive...');
    
    // 1. Trouver toutes les sections problématiques
    const sections = Array.from(document.querySelectorAll('section')).filter(section => {
        const text = section.textContent.toLowerCase();
        return text.includes('travailons') || 
               text.includes('intéressé') || 
               text.includes('prêt') || 
               text.includes('collaborer') || 
               text.includes('work with me') ||
               text.includes('work together');
    });
    
    console.log(`📋 ${sections.length} section(s) de collaboration trouvée(s)`);
    
    // 2. Appliquer les corrections FORCÉES
    sections.forEach((section, index) => {
        console.log(`🔧 Correction de la section ${index + 1}:`, section);
        
        // Ajouter une classe d'identification
        section.classList.add('kmd-collab-section', `collab-section-${index}`);
        
        // FORCER les styles inline
        section.style.cssText = `
            padding: 80px 20px !important;
            max-width: 100% !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
            position: relative !important;
            display: block !important;
        `;
        
        // Trouver le titre (h1, h2, h3)
        const title = section.querySelector('h1, h2, h3');
        if (title) {
            title.classList.add('responsive-title');
            // If you ever need to remove it later, call:
            // title.classList.remove('responsive-title');
        }
        
        // Trouver tous les paragraphes
        const paragraphs = section.querySelectorAll('p');
        paragraphs.forEach(p => {
            p.style.cssText = `
                font-size: clamp(16px, 2vw, 18px) !important;
                line-height: 1.6 !important;
                max-width: 800px !important;
                margin: 0 auto 20px !important;
                text-align: center !important;
                padding: 0 10px !important;
            `;
        });
        
        // Trouver tous les boutons
        const buttons = section.querySelectorAll('.btn, button, a[class*="btn"]');
        buttons.forEach(btn => {
            btn.style.cssText = `
                display: block !important;
                margin: 15px auto !important;
                max-width: 300px !important;
                width: auto !important;
                padding: 12px 25px !important;
                text-align: center !important;
            `;
        });
        
        // Trouver les conteneurs
        const containers = section.querySelectorAll('.container, .content, .wrapper');
        containers.forEach(container => {
            container.style.cssText = `
                max-width: 100% !important;
                padding: 0 20px !important;
                box-sizing: border-box !important;
                margin: 0 auto !important;
            `;
        });
        
        // Trouver les grids
        const grids = section.querySelectorAll('.grid, [class*="grid"], .row');
        grids.forEach(grid => {
            grid.style.cssText = `
                display: grid !important;
                grid-template-columns: 1fr !important;
                gap: 20px !important;
                max-width: 500px !important;
                margin: 0 auto !important;
            `;
        });
    });
    
    // 3. Fonction pour ajuster au redimensionnement
    function adjustOnResize() {
        const width = window.innerWidth;
        
        sections.forEach(section => {
            const title = section.querySelector('h1, h2, h3');
            const paragraphs = section.querySelectorAll('p');
            const buttons = section.querySelectorAll('.btn, button, a[class*="btn"]');
            const grids = section.querySelectorAll('.grid, [class*="grid"], .row');
            
            if (width <= 768) {
                // MOBILE
                section.style.padding = '40px 10px !important';
                
                if (title) {
                    title.style.fontSize = '28px !important';
                }
                
                paragraphs.forEach(p => {
                    p.style.fontSize = '16px !important';
                    p.style.lineHeight = '1.5 !important';
                });
                
                buttons.forEach(btn => {
                    btn.style.width = '100% !important';
                    btn.style.maxWidth = '100% !important';
                });
                
                grids.forEach(grid => {
                    grid.style.gridTemplateColumns = '1fr !important';
                    grid.style.maxWidth = '100% !important';
                });
                
            } else if (width <= 1024) {
                // TABLETTE
                section.style.padding = '60px 15px !important';
                
                if (title) {
                    title.style.fontSize = '36px !important';
                }
                
                paragraphs.forEach(p => {
                    p.style.fontSize = '17px !important';
                });
                
                grids.forEach(grid => {
                    grid.style.gridTemplateColumns = 'repeat(2, 1fr) !important';
                    grid.style.maxWidth = '800px !important';
                });
                
            } else {
                // DESKTOP
                section.style.padding = '80px 20px !important';
                
                if (title) {
                    title.style.fontSize = 'clamp(32px, 5vw, 48px) !important';
                }
                
                grids.forEach(grid => {
                    grid.style.gridTemplateColumns = 'repeat(3, 1fr) !important';
                    grid.style.maxWidth = '1200px !important';
                });
            }
        });
    }
    
    // Appliquer maintenant
    adjustOnResize();
    
    // Réappliquer au redimensionnement
    window.addEventListener('resize', function() {
        setTimeout(adjustOnResize, 100);
    });
    
    // 4. Forcer un re-render
    setTimeout(() => {
        document.body.style.display = 'none';
        setTimeout(() => {
            document.body.style.display = 'block';
        }, 50);
    }, 500);
    
    console.log('✅ Corrections responsive FORCÉES appliquées');
});

// Exposer une fonction pour réparer manuellement
window.forceFixSections = function() {
    document.querySelectorAll('section').forEach(section => {
        section.style.cssText = '';
    });
    document.dispatchEvent(new Event('DOMContentLoaded'));
};

// find-sections.js
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, i) => {
        const text = section.textContent.substring(0, 50).toLowerCase();
        
        if (text.includes('travailons') || text.includes('work')) {
            console.log(`🔍 Section ${i}:`, {
                classes: section.className,
                id: section.id,
                tagName: section.tagName,
                parent: section.parentElement.className,
                h2: section.querySelector('h2')?.textContent
            });
        }
    });
});
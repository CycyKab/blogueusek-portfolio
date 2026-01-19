// portfolio-loader.js - VERSION CORRIGÉE
// Ce fichier affiche les données du CMS sur ton portfolio

console.log('🎨 Portfolio Loader initialisé');

class PortfolioLoader {
    constructor() {
        console.log('📦 PortfolioLoader créé');
        this.data = window.portfolioData;
    }

    // ========== CHARGER LES PROJETS ==========
    loadProjects(containerId, category = 'all') {
        console.log(`📸 Chargement projets (catégorie: ${category})`);
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`❌ Container "${containerId}" non trouvé`);
            return;
        }

        let projects = [];
        try {
            projects = this.data.getProjectsByCategory(category);
            console.log(`📊 ${projects.length} projets trouvés`);
        } catch (error) {
            console.error('Erreur lors du chargement des projets:', error);
        }

        if (projects.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: rgba(232, 220, 199, 0.5);">
                    <p style="font-size: 18px; margin-bottom: 20px;">Nouveaux projets à venir</p>
                    <p style="font-size: 14px;">Restez connectés pour découvrir mes prochaines créations !</p>
                </div>
            `;
            return;
        }

        // Afficher les projets
        container.innerHTML = projects.map(project => this.renderProject(project)).join('');
        
        // Réinitialiser les animations
        this.initProjectAnimations();
    }

    // Rendu d'un projet
    renderProject(project) {
        const categoryNames = {
            'events': 'Événement',
            'collaborations': 'Collaboration',
            'digital': 'Contenu Digital',
            'inspirations': 'Inspiration'
        };

        const categoryName = categoryNames[project.category] || project.category;
        const imageStyle = project.image ? `background-image: url('${project.image}');` : 
                          'background: linear-gradient(135deg, #2c2420 0%, #1a1614 100%);';

        return `
            <div class="portfolio-project ${project.layout || 'portrait'}" data-category="${project.category}">
                <div class="portfolio-project-image" style="${imageStyle}"></div>
                <div class="portfolio-project-overlay">
                    <div class="portfolio-project-category">${categoryName}</div>
                    <h3 class="portfolio-project-title">${project.title}</h3>
                    <p class="portfolio-project-description">${project.description}</p>
                    ${project.client ? `<p style="font-size: 14px; opacity: 0.8; margin-top: 10px;">Client: ${project.client}</p>` : ''}
                    <a href="#" class="portfolio-project-link" onclick="alert('Détails du projet à venir')">Voir le Projet →</a>
                </div>
            </div>
        `;
    }

    // ========== CHARGER LES SERVICES ==========
    loadServices(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`❌ Container "${containerId}" non trouvé`);
            return;
        }

        const services = this.data.getServices();

        if (services.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: rgba(232, 220, 199, 0.5);">
                    <p style="font-size: 18px; margin-bottom: 20px;">Services en préparation</p>
                    <p style="font-size: 14px;">Mes offres seront bientôt disponibles.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = services.map(service => this.renderService(service)).join('');
        this.initServiceAnimations();
    }

    // Rendu d'un service
    renderService(service) {
        return `
            <div class="service-card" data-service="${service.id}">
                <div class="service-icon">
                    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="32" cy="32" r="28"></circle>
                        <path d="M32 16 L32 48 M16 32 L48 32"></path>
                    </svg>
                </div>
                <h3>${service.title}</h3>
                <p>${service.shortDescription}</p>
            </div>
        `;
    }

    // ========== CHARGER LES TÉMOIGNAGES ==========
    loadTestimonials(containerId) {
        console.log(`💬 Chargement témoignages`);
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`❌ Container "${containerId}" non trouvé`);
            return;
        }

        let testimonials = [];
        try {
            testimonials = this.data.getTestimonials();
            console.log(`📊 ${testimonials.length} témoignages trouvés`);
        } catch (error) {
            console.error('Erreur lors du chargement des témoignages:', error);
        }

        // js/portfolio-loader.js (après)
if (testimonials.length === 0) {
    const empty = document.createElement('div');
    empty.style.cssText = 'text-align:center; padding:60px 20px; color:rgba(232,220,199,0.5);';
    const p = document.createElement('p');
    p.style.fontSize = '18px';
    p.textContent = 'Témoignages à venir';
    empty.appendChild(p);
    container.innerHTML = '';
    container.appendChild(empty);
    return;
}

// Dupliquer pour l'effet carousel (mais insérer nodes via fragment pour éviter reflow massif)
const duplicated = [...testimonials, ...testimonials];
container.innerHTML = ''; // vider avant d'ajouter
const frag = document.createDocumentFragment();

duplicated.forEach(testimonial => {
  // créer un élément DOM au lieu de construire une grosse string
  const card = document.createElement('div');
  card.className = 'testimonial-card';

  // Insérer les sous-éléments (évite concaténation string, plus sûr)
  const quote = document.createElement('p');
  quote.className = 'testimonial-quote';
  quote.textContent = `"${testimonial.quote}"`;
  card.appendChild(quote);

  const author = document.createElement('div');
  author.className = 'testimonial-author';
  author.innerHTML = `
    <div class="author-avatar">${testimonial.avatarInitial}</div>
    <div class="author-info">
      <h4>${testimonial.authorName}</h4>
      <p>${testimonial.authorPosition}, ${testimonial.company}</p>
    </div>
  `;
  card.appendChild(author);

  frag.appendChild(card);
});

container.appendChild(frag);

    // Rendu d'un témoignage
    renderTestimonial(testimonial) {
        return `
            <div class="testimonial-card">
                <p class="testimonial-quote">"${testimonial.quote}"</p>
                <div class="testimonial-author">
                    <div class="author-avatar">${testimonial.avatarInitial}</div>
                    <div class="author-info">
                        <h4>${testimonial.authorName}</h4>
                        <p>${testimonial.authorPosition}, ${testimonial.company}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // ========== CHARGER LES MARQUES ==========
    loadBrands(containerId) {
        console.log(`✨ Chargement marques`);
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`❌ Container "${containerId}" non trouvé`);
            return;
        }

        let brands = [];
        try {
            brands = this.data.getBrands();
            console.log(`📊 ${brands.length} marques trouvées`);
        } catch (error) {
            console.error('Erreur lors du chargement des marques:', error);
        }

        if (brands.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: rgba(232, 220, 199, 0.5);">
                    <p style="font-size: 18px;">Collaborations à venir</p>
                </div>
            `;
            return;
        }

        // Chercher le conteneur .brands-wall
        let brandsWall = container.querySelector('.brands-wall');
        if (!brandsWall) {
            brandsWall = document.createElement('div');
            brandsWall.className = 'brands-wall';
            container.appendChild(brandsWall);
        }

        // Afficher avec animation progressive
        
brandsWall.innerHTML = ''; // vider
const brandFrag = document.createDocumentFragment();
brands.forEach((brand, index) => {
  const span = document.createElement('span');
  span.className = 'brand-name';
  span.style.animationDelay = `${index * 0.1}s`;
  span.textContent = brand.name;
  brandFrag.appendChild(span);
});
brandsWall.appendChild(brandFrag);


    // ========== CHARGER À PROPOS ==========
    loadAbout() {
        console.log(`👤 Chargement page À Propos`);
        
        const about = this.data.getAbout();

        // Mettre à jour le titre hero
        const heroTitle = document.querySelector('.about-headline');
        if (heroTitle && about.heroTitle) {
            // use textContent to avoid parsing HTML and reduce reflows/XSS risk
            heroTitle.textContent = about.heroTitle;
        }

        // Mettre à jour la description
        const heroDescription = document.querySelector('.about-description');
        if (heroDescription && about.heroDescription) {
            heroDescription.textContent = about.heroDescription;
        }

        // Mettre à jour mission
        const missionCards = document.querySelectorAll('.mission-card');
        if (missionCards.length >= 1 && about.mission) {
            const missionP = missionCards[0].querySelector('p');
            if (missionP) missionP.textContent = about.mission;
        }

        // Mettre à jour vision
        if (missionCards.length >= 2 && about.vision) {
            const visionP = missionCards[1].querySelector('p');
            if (visionP) visionP.textContent = about.vision;
        }
    }

    // ========== ANIMATIONS ==========
    initProjectAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.portfolio-project').forEach(project => {
            observer.observe(project);
        });
    }

    initServiceAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.service-card').forEach(card => {
            observer.observe(card);
        });
    }
    
    restartCarouselAnimation(container) {
        // Redémarrer l'animation CSS
        container.style.animation = 'none';
        setTimeout(() => {
            container.style.animation = 'carousel 60s linear infinite';
        }, 10);
    }
    
    // ========== UTILITAIRE ==========
    getStats() {
        return {
            projects: this.data.getProjects().length,
            services: this.data.getServices().length,
            testimonials: this.data.getTestimonials().length,
            brands: this.data.getBrands().length
        };
    }
}

// Créer une instance unique
const portfolioLoader = new PortfolioLoader();

// Rendre disponible globalement
window.portfolioLoader = portfolioLoader;

// ========== AUTO-CHARGEMENT ==========
// Charger automatiquement quand la page est prête
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Portfolio Loader - DOM prêt');
    
    // Vérifier si on a des données
    if (!window.portfolioData) {
        console.warn('⚠️ portfolioData non défini. Vérifiez portfolio-data.js');
        return;
    }
    
    if (!portfolioData.hasData()) {
        console.warn('⚠️ Aucune donnée CMS trouvée. Ajoute du contenu dans le CMS !');
        console.log('👉 Ouvre admin-secret-blogueusek.html pour ajouter du contenu');
    } else {
        console.log('✅ Données CMS trouvées:', portfolioLoader.getStats());
    }

    // Fonction pour charger dynamiquement selon la page active
    function loadForCurrentPage() {
        const activePage = document.querySelector('.page.active');
        if (!activePage) return;
        
        const pageId = activePage.id;
        
        switch(pageId) {
            case 'home':
                // Marques sur la page d'accueil
                const homeBrands = document.querySelector('#home .brands-wall');
                if (homeBrands) {
                    portfolioLoader.loadBrands('brands-carousel-track');
                }
                break;
                
            case 'portfolio':
                // Projets sur la page portfolio
                const portfolioGrid = document.getElementById('portfolio-grid');
                if (portfolioGrid) {
                    portfolioLoader.loadProjects('portfolio-grid');
                }
                break;
                
            case 'about':
                // À propos + témoignages
                portfolioLoader.loadAbout();
                const aboutTestimonials = document.querySelector('#about .testimonials-carousel');
                if (aboutTestimonials) {
                    portfolioLoader.loadTestimonials('testimonials-carousel');
                }
                break;
                
            case 'services':
                // Services sont gérés par services-updater.js
                console.log('💼 Services gérés par services-updater.js');
                break;
        }
    }
    
    // Charger initialement
    loadForCurrentPage();
    
    // Écouter les changements de page (si votre système de navigation le permet)
    // Vous devrez peut-être adapter cette partie selon votre système de navigation
    const pageObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('active')) {
                    setTimeout(loadForCurrentPage, 300);
                }
            }
        });
    });
    
    // Observer toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        pageObserver.observe(page, { attributes: true });
    });
});

console.log('✅ Portfolio Loader chargé');
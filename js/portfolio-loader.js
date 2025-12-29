// portfolio-loader.js
// Ce fichier affiche les données du CMS sur ton portfolio

class PortfolioLoader {
    constructor() {
        this.data = window.portfolioData;
    }

    // ========== CHARGER LES PROJETS ==========
    loadProjects(containerId, category = 'all') {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container "${containerId}" non trouvé`);
            return;
        }

        const projects = this.data.getProjectsByCategory(category);

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
            console.warn(`Container "${containerId}" non trouvé`);
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
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container "${containerId}" non trouvé`);
            return;
        }

        const testimonials = this.data.getTestimonials();

        if (testimonials.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: rgba(232, 220, 199, 0.5);">
                    <p style="font-size: 18px;">Témoignages à venir</p>
                </div>
            `;
            return;
        }

        // Dupliquer pour l'effet carousel
        const duplicated = [...testimonials, ...testimonials];
        container.innerHTML = duplicated.map(testimonial => this.renderTestimonial(testimonial)).join('');
    }

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
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn(`Container "${containerId}" non trouvé`);
            return;
        }

        const brands = this.data.getBrands();

        if (brands.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; color: rgba(232, 220, 199, 0.5);">
                    <p style="font-size: 18px;">Collaborations à venir</p>
                </div>
            `;
            return;
        }

        // Trouver le conteneur .brands-wall
        let brandsWall = container.querySelector('.brands-wall');
        if (!brandsWall) {
            brandsWall = document.createElement('div');
            brandsWall.className = 'brands-wall';
            container.appendChild(brandsWall);
        }

        brandsWall.innerHTML = brands.map(brand => `
            <span class="brand-name">${brand.name}</span>
        `).join('');
    }

    // ========== CHARGER À PROPOS ==========
    loadAbout() {
        const about = this.data.getAbout();

        // Mettre à jour le titre hero
        const heroTitle = document.querySelector('.about-headline');
        if (heroTitle && about.heroTitle) {
            heroTitle.innerHTML = about.heroTitle;
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
}

// Créer une instance unique
const portfolioLoader = new PortfolioLoader();

// Rendre disponible globalement
window.portfolioLoader = portfolioLoader;

// ========== AUTO-CHARGEMENT ==========
// Charger automatiquement quand la page est prête
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Portfolio Loader activé');
    
    // Vérifier si on a des données
    if (!portfolioData.hasData()) {
        console.warn('⚠️ Aucune donnée trouvée. Ajoute du contenu dans le CMS !');
        console.log('👉 Ouvre cms.html pour ajouter du contenu');
    } else {
        console.log('✅ Données trouvées:', portfolioData.getStats());
    }

    // Charger automatiquement selon les conteneurs présents
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        portfolioLoader.loadProjects('portfolio-grid');
        console.log('📸 Projets chargés');
    }

    // Services sont gérés directement dans le HTML avec services-updater.js
    // On ne charge PAS les services ici
    console.log('💼 Services gérés par services-updater.js');

    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    if (testimonialsCarousel) {
        portfolioLoader.loadTestimonials('testimonials-carousel');
        console.log('💬 Témoignages chargés');
    }

    const brandsContainer = document.querySelector('.brands-carousel-track');
    if (brandsContainer) {
        portfolioLoader.loadBrands('brands-carousel-track');
        console.log('✨ Marques chargées');
    }

    const aboutPage = document.getElementById('about');
    if (aboutPage) {
        portfolioLoader.loadAbout();
        console.log('👤 À Propos chargé');
    }
});
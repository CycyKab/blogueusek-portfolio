// portfolio-data.js - VERSION CORRIGÉE
// Ce fichier récupère les données que tu as ajoutées dans le CMS

console.log('📊 Portfolio Data initialisé');

class PortfolioData {
    constructor() {
        // Clés de stockage (même que dans le CMS)
        this.keys = {
            projects: 'kathy_portfolio_projects',
            services: 'kathy_portfolio_services',
            about: 'kathy_portfolio_about',
            brands: 'kathy_portfolio_brands',
            testimonials: 'kathy_portfolio_testimonials',
            services_text: 'kathy_portfolio_services_text'
        };
        
        console.log('🔑 Clés de stockage:', this.keys);
    }

    // Récupérer tous les projets
    getProjects() {
        try {
            const data = localStorage.getItem(this.keys.projects);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des projets:', error);
            return [];
        }
    }

    // Récupérer les projets par catégorie
    getProjectsByCategory(category) {
        const projects = this.getProjects();
        if (category === 'all') {
            return projects;
        }
        return projects.filter(project => project.category === category);
    }

    // Récupérer un projet spécifique par ID
    getProjectById(id) {
        const projects = this.getProjects();
        return projects.find(project => project.id === id);
    }

    // Récupérer tous les services
    getServices() {
        try {
            const data = localStorage.getItem(this.keys.services);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des services:', error);
            return [];
        }
    }

    // Récupérer les textes des services (pour l'édition)
    getServicesText() {
        try {
            const data = localStorage.getItem(this.keys.services_text);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des textes services:', error);
            return null;
        }
    }

    // Récupérer les informations À Propos
    getAbout() {
        try {
            const data = localStorage.getItem(this.keys.about);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des infos À Propos:', error);
            return {};
        }
    }

    // Récupérer toutes les marques
    getBrands() {
        try {
            const data = localStorage.getItem(this.keys.brands);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des marques:', error);
            return [];
        }
    }

    // Récupérer tous les témoignages
    getTestimonials() {
        try {
            const data = localStorage.getItem(this.keys.testimonials);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des témoignages:', error);
            return [];
        }
    }

    // Vérifier si des données existent
    hasData() {
        const hasProjects = this.getProjects().length > 0;
        const hasBrands = this.getBrands().length > 0;
        const hasTestimonials = this.getTestimonials().length > 0;
        const hasAbout = Object.keys(this.getAbout()).length > 0;
        
        return hasProjects || hasBrands || hasTestimonials || hasAbout;
    }

    // Obtenir les statistiques
    getStats() {
        return {
            projects: this.getProjects().length,
            services: this.getServices().length,
            testimonials: this.getTestimonials().length,
            brands: this.getBrands().length,
            hasAbout: Object.keys(this.getAbout()).length > 0,
            hasServicesText: this.getServicesText() !== null
        };
    }
    
    // Nettoyer les données (pour le debug)
    clearAll() {
        Object.values(this.keys).forEach(key => {
            localStorage.removeItem(key);
        });
        console.log('🧹 Toutes les données ont été effacées');
    }
}

// Créer une instance unique
const portfolioData = new PortfolioData();

// Rendre disponible globalement
window.portfolioData = portfolioData;

// Log initial
console.log('📊 Données disponibles:', portfolioData.getStats());
console.log('✅ Portfolio Data prêt');
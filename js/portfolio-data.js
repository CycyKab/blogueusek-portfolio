// portfolio-data.js
// Ce fichier récupère les données que tu as ajoutées dans le CMS

class PortfolioData {
    constructor() {
        // Clés de stockage (même que dans le CMS)
        this.keys = {
            projects: 'kathy_portfolio_projects',
            services: 'kathy_portfolio_services',
            about: 'kathy_portfolio_about',
            brands: 'kathy_portfolio_brands',
            testimonials: 'kathy_portfolio_testimonials'
        };
    }

    // Récupérer tous les projets
    getProjects() {
        try {
            const data = localStorage.getItem(this.keys.projects);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erreur lors de la récupération des projets:', error);
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
            console.error('Erreur lors de la récupération des services:', error);
            return [];
        }
    }

    // Récupérer les informations À Propos
    getAbout() {
        try {
            const data = localStorage.getItem(this.keys.about);
            return data ? JSON.parse(data) : {};
        } catch (error) {
            console.error('Erreur lors de la récupération des infos À Propos:', error);
            return {};
        }
    }

    // Récupérer toutes les marques
    getBrands() {
        try {
            const data = localStorage.getItem(this.keys.brands);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erreur lors de la récupération des marques:', error);
            return [];
        }
    }

    // Récupérer tous les témoignages
    getTestimonials() {
        try {
            const data = localStorage.getItem(this.keys.testimonials);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Erreur lors de la récupération des témoignages:', error);
            return [];
        }
    }

    // Vérifier si des données existent
    hasData() {
        return this.getProjects().length > 0 || 
               this.getServices().length > 0 || 
               this.getBrands().length > 0;
    }

    // Obtenir les statistiques
    getStats() {
        return {
            projects: this.getProjects().length,
            services: this.getServices().length,
            testimonials: this.getTestimonials().length,
            brands: this.getBrands().length
        };
    }
}

// Créer une instance unique
const portfolioData = new PortfolioData();

// Rendre disponible globalement
window.portfolioData = portfolioData;
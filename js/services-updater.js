// services-updater.js
// Met à jour les textes des services depuis le CMS

function updateServicesText() {
    // Récupérer les textes depuis le localStorage
    const servicesText = localStorage.getItem('kathy_portfolio_services_text');
    
    if (!servicesText) {
        console.log('📝 Aucune personnalisation des services');
        return;
    }

    const services = JSON.parse(servicesText);

    // Mettre à jour chaque service
    updateServiceCard('content', services.content);
    updateServiceCard('model', services.model);
    updateServiceCard('brand', services.brand);
    updateServiceCard('event', services.event);

    console.log('✅ Textes des services mis à jour');
}

function updateServiceCard(serviceId, data) {
    if (!data) return;

    // Trouver la carte du service
    const card = document.querySelector(`[data-service-id="${serviceId}"]`);
    if (!card) {
        console.warn(`Service "${serviceId}" non trouvé dans le HTML`);
        return;
    }

    // Mettre à jour le titre
    const title = card.querySelector('[data-editable="title"]');
    if (title && data.title) {
        title.textContent = data.title;
    }

    // Mettre à jour la description
    const description = card.querySelector('[data-editable="description"]');
    if (description && data.description) {
        description.textContent = data.description;
    }
}

// Exécuter automatiquement au chargement
document.addEventListener('DOMContentLoaded', function() {
    updateServicesText();
});

// Rendre disponible globalement
window.updateServicesText = updateServicesText;
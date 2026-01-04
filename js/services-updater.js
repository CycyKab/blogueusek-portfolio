// services-updater.js - VERSION CORRIGÉE
// Met à jour les textes des services depuis le CMS

console.log('💼 Services Updater initialisé');

function updateServicesText() {
    console.log('🔄 Mise à jour des textes des services...');
    
    // Récupérer les textes depuis le localStorage
    const servicesText = localStorage.getItem('kathy_portfolio_services_text');
    
    if (!servicesText) {
        console.log('📝 Aucune personnalisation des services trouvée');
        return;
    }

    try {
        const services = JSON.parse(servicesText);
        console.log('📄 Textes de services trouvés:', services);

        // Mettre à jour chaque service
        updateServiceCard('content', services.content);
        updateServiceCard('model', services.model);
        updateServiceCard('brand', services.brand);
        updateServiceCard('event', services.event);

        console.log('✅ Textes des services mis à jour');
    } catch (error) {
        console.error('❌ Erreur lors de la mise à jour des services:', error);
    }
}

function updateServiceCard(serviceId, data) {
    if (!data) {
        console.warn(`⚠️ Données manquantes pour le service ${serviceId}`);
        return;
    }

    // Trouver la carte du service
    const card = document.querySelector(`[data-service-id="${serviceId}"]`);
    if (!card) {
        console.warn(`⚠️ Service "${serviceId}" non trouvé dans le HTML`);
        return;
    }

    // Mettre à jour le titre
    const title = card.querySelector('[data-editable="title"]');
    if (title && data.title) {
        title.textContent = data.title;
        console.log(`📝 Titre mis à jour pour ${serviceId}: ${data.title}`);
    }

    // Mettre à jour la description
    const description = card.querySelector('[data-editable="description"]');
    if (description && data.description) {
        description.textContent = data.description;
        console.log(`📝 Description mise à jour pour ${serviceId}`);
    }
}

// Fonction pour sauvegarder les services depuis le CMS
function saveServicesToCMS() {
    console.log('💾 Sauvegarde des services dans le CMS...');
    
    const services = {
        content: {
            title: document.getElementById('service-content-title')?.value || '',
            description: document.getElementById('service-content-desc')?.value || ''
        },
        model: {
            title: document.getElementById('service-model-title')?.value || '',
            description: document.getElementById('service-model-desc')?.value || ''
        },
        brand: {
            title: document.getElementById('service-brand-title')?.value || '',
            description: document.getElementById('service-brand-desc')?.value || ''
        },
        event: {
            title: document.getElementById('service-event-title')?.value || '',
            description: document.getElementById('service-event-desc')?.value || ''
        }
    };

    try {
        localStorage.setItem('kathy_portfolio_services_text', JSON.stringify(services));
        console.log('✅ Services sauvegardés dans le CMS');
        return true;
    } catch (error) {
        console.error('❌ Erreur lors de la sauvegarde:', error);
        return false;
    }
}

// Exécuter automatiquement au chargement
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM prêt - Mise à jour des services');
    updateServicesText();
});

// Rendre disponible globalement
window.updateServicesText = updateServicesText;
window.saveServicesToCMS = saveServicesToCMS;

console.log('✅ Services Updater prêt');
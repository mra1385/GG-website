// Transactions Module
export const Transactions = {
    init() {
        console.log('Transactions module initialized'); // Debug log
        this.loadMapComponent();
    },

    loadMapComponent() {
        const mapContainer = document.getElementById('map-container');
        if (!mapContainer) {
            console.error('Map container not found');
            return;
        }

        // Create iframe to load the map
        const iframe = document.createElement('iframe');
        iframe.src = 'map_data.html';
        iframe.width = '100%';
        iframe.height = '100%'; // Use 100% height to fill the container
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        
        // Remove loading indicator when iframe is loaded
        iframe.onload = function() {
            const loadingIndicator = mapContainer.querySelector('.map-loading');
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            console.log('Map iframe loaded successfully');
        };

        // Add iframe to container
        mapContainer.appendChild(iframe);
        console.log('Map iframe added to container');
    }
}; 
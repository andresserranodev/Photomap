// mapConfig.js
const photoGalleryDefault = 'https://photos.google.com/share/AF1QipNj3g2SbO56SdZJCfOrcUIvZScycBj_LNjRQDeeabcoEj_2tKvT-3qJq__NreBACw/memory/AF1QipOG-Z8Y6PgC3D7RhU1yQwyq4ChUomjDJrgVD-1D4nO-xZ6kMD-38P5mbKqGXDdWqg?key=OF94SFg5TEotaEhteGdIa3RvY0Z0Z3d5TkVoUk9n';

export class CountryMap {
    constructor(countryConfig) {
        this.coords = countryConfig.coords;
        this.initialZoom = countryConfig.initialZoom || 4;
        this.focusZoom = countryConfig.focusZoom || 9;
        this.timeoutZoom = countryConfig.timeoutZoom || 800;
        this.markerIcon = this.createMarkerIcon(countryConfig.iconColor || 'blue');
        this.photoGalleryLink = countryConfig.photoGalleryLink || photoGalleryDefault;
    }

    init(containerId) {
        // Initialize map
        this.map = L.map(containerId, {
            zoomControl: false,
            minZoom: 3,
            maxZoom: 18
        }).setView(this.coords, this.initialZoom);

        // Add tile layer
        L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
            attribution: '© CyclOSM contributors'
        }).addTo(this.map);

        // Add zoom control
        L.control.zoom({
            position: 'bottomright'
        }).addTo(this.map);

        // Add marker
        this.marker = L.marker(this.coords, { icon: this.markerIcon }).addTo(this.map);
        this.marker.on('click', () => window.location.href = link);

        // Init zoom
        this.initZoom();        
        return this;
    }

    createMarkerIcon(color) {
        return L.icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }

    initZoom() {
        this.map.whenReady(() => {
            setTimeout(() => this.zoomToCountry(), this.timeoutZoom);
        });
    }

    zoomToCountry() {
        const link = this.photoGalleryLink;

        this.map.flyTo(this.coords, this.focusZoom, {
            duration: 2.0,
            easeLinearity: 0.1
        });
        this.map.once('zoomend', function() {
            setTimeout(() => {
                window.location.href = link;
            }, 100);
        });
    }
}
// Initialize gallery http://localhost:3000/ecuador/ecuador

// Colombia coordinates (Ecuador)
const ecuadorCoords = [-0.7287461,-78.6389962];
const initalZoom = 4;
const focusZoom = 9;
const timeOutZoom = 800;
const delayZoom = 100;
const zoomDuration = 2.0;

// Touch handling variables
let touchStartY = 0;
let currentTranslate = 0;

// Initialize map
const map = L.map('map', {
    zoomControl: false,
    minZoom: 3,
    maxZoom: 18
}).setView([ecuadorCoords[0], ecuadorCoords[1]], initalZoom); // Center on South America

// Add tile layer (OpenStreetMap)
// 5. CyclOSM - Detailed map optimized for cycling/outdoor activities
L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    attribution: '© CyclOSM contributors'
}).addTo(map);

// Add zoom control to bottom right
L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// Create custom icon
const ecuadorIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// set marker to map
const marker = L.marker(ecuadorCoords, { icon: ecuadorIcon }).addTo(map);
marker.on('click', () => { initPhotoSwipe(); });

// Init Zoom when the maps is ready
map.whenReady(() => {
    setTimeout(() => { 
        zoomToColombia(); 
    }, timeOutZoom);
});

function zoomToColombia1() {
    setTimeout(() => {
        map.flyTo(
            ecuadorCoords, 
            focusZoom, 
            { animate: true, duration: zoomDuration });
    }, timeOutZoom);
 
}

const photoGallery = 'https://photos.google.com/share/AF1QipNj3g2SbO56SdZJCfOrcUIvZScycBj_LNjRQDeeabcoEj_2tKvT-3qJq__NreBACw?key=OF94SFg5TEotaEhteGdIa3RvY0Z0Z3d5TkVoUk9n';

function zoomToColombia() {
    const redirectBtn = document.getElementById('redirect-btn');
    
    map.once('zoomend', function() {
        setTimeout(() => {
            window.location.href = photoGallery;
        }, 100);
    });

    map.flyTo(ecuadorCoords, focusZoom, {
        duration: zoomDuration,
        easeLinearity: 0.1
    });
}
// Evento para mostrar el carrusel cuando termine el zoom (si el zoom es 6, se muestra el carrusel)
map.on('moveend', () => {
    // Bloquear el mapa después del zoom
    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
});

// Handle map click outside marker
map.on('click', (e) => {
    const markerPoint = map.latLngToContainerPoint(ecuadorCoords);
    const clickPoint = map.latLngToContainerPoint(e.latlng);
    const distance = markerPoint.distanceTo(clickPoint);
    
    if (distance > 50) { // If click is far from marker
        galleryContainer.classList.remove('visible');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        map.setView(ecuadorCoords, 5);
    } else {
        map.setView(ecuadorCoords, focusZoom);
    }
})

// Map click handler
map.on('click', (e) => {
    const markerPoint = map.latLngToContainerPoint(ecuadorCoords);
    const clickPoint = map.latLngToContainerPoint(e.latlng);
    const distance = markerPoint.distanceTo(clickPoint);
});

// Add listeners
window.addEventListener('orientationchange', () => {
    setTimeout(updateMapHeight, delayZoom); // Delay to handle orientation change
});
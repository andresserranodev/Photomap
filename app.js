// Initialize gallery

// Colombia coordinates (Bogotá)
const colombiaCoords = [4.5709, -74.2973];
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
}).setView([colombiaCoords[0], colombiaCoords[1]], initalZoom); // Center on South America

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
const colombiaIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// set marker to map
const marker = L.marker(colombiaCoords, { icon: colombiaIcon }).addTo(map);
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
            colombiaCoords, 
            focusZoom, 
            { animate: true, duration: zoomDuration });
    }, timeOutZoom);
 
}

const photoGallery = 'https://photos.google.com/share/AF1QipPjwltaq3t0viHGxElXbPLhTI20kRVJ49OAfSbvaBLfLKZ8ub9iIvKHz0U-YWu-5w/memory/AF1QipPXGpTOGl1ZWvGpnPl5TL4-0YRk2AzIPm8OTYG2bpeh4NeTmFbQ6BurI9xVvEt9gw?key=ZkZQLUdpalU2TktnN0xBUDVQeURWdUpVSzFTamFR';

function zoomToColombia() {
    const redirectBtn = document.getElementById('redirect-btn');
    
    map.once('zoomend', function() {
        setTimeout(() => {
            window.location.href = photoGallery;
        }, 100);
    });

    map.flyTo(colombiaCoords, focusZoom, {
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
    const markerPoint = map.latLngToContainerPoint(colombiaCoords);
    const clickPoint = map.latLngToContainerPoint(e.latlng);
    const distance = markerPoint.distanceTo(clickPoint);
    
    if (distance > 50) { // If click is far from marker
        galleryContainer.classList.remove('visible');
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        map.setView(colombiaCoords, 5);
    } else {
        map.setView(colombiaCoords, focusZoom);
    }
})

// Map click handler
map.on('click', (e) => {
    const markerPoint = map.latLngToContainerPoint(colombiaCoords);
    const clickPoint = map.latLngToContainerPoint(e.latlng);
    const distance = markerPoint.distanceTo(clickPoint);
});

// Add listeners
window.addEventListener('orientationchange', () => {
    setTimeout(updateMapHeight, delayZoom); // Delay to handle orientation change
});

// Create gallery items
// Sample images for Colombia (you should replace these with your actual images)
const colombiaImages = [
    {
        src: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&h=800&fit=crop',
        caption: 'Cartagena, Colombia',
        width: 1200,
        height: 800
    },
    {
        src: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&h=800&fit=crop',
        caption: 'Bogotá, Colombia',
        width: 1200,
        height: 800
    },
    {
        src: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&h=800&fit=crop',
        caption: 'Medellín, Colombia',
        width: 1200,
        height: 800
    }
];
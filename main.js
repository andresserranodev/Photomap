// main.js
import { CountryMap } from './mapConfig.js';

const countries = {
    colombia: {
        coords: [4.5709, -74.2973],
        photoGallery: 'https://photos.google.com/share/AF1QipPjwltaq3t0viHGxElXbPLhTI20kRVJ49OAfSbvaBLfLKZ8ub9iIvKHz0U-YWu-5w/memory/AF1QipPXGpTOGl1ZWvGpnPl5TL4-0YRk2AzIPm8OTYG2bpeh4NeTmFbQ6BurI9xVvEt9gw?key=ZkZQLUdpalU2TktnN0xBUDVQeURWdUpVSzFTamFR'
    },
    ecuador: {
        coords: [-0.7287461,-78.6389962],
        photoGallery: 'https://photos.google.com/share/AF1QipNj3g2SbO56SdZJCfOrcUIvZScycBj_LNjRQDeeabcoEj_2tKvT-3qJq__NreBACw?key=OF94SFg5TEotaEhteGdIa3RvY0Z0Z3d5TkVoUk9n'
    }
};

function initMap() {
    // Get country from URL parameter
    const params = new URLSearchParams(window.location.search);
    const country = params.get('country') || 'colombia';
    
    const countryData = countries[country];
    if (!countryData) return;

    const config = {
        coords: countryData.coords,
        initialZoom: 4,
        focusZoom: 9,
        iconColor: 'blue',
        photoGalleryLink: countryData.photoGallery
    };

    document.title = `Mapa de ${country.charAt(0).toUpperCase() + country.slice(1)}`;
    new CountryMap(config).init('map');
}

initMap();
// main.js
import { CountryMap } from './mapConfig.js';

const countries = {
    cap1: {
        coords: [4.5709, -74.2973],
        description: 'Cap1:Saliendo de Colombia.',
        url: '?cap=cap1',
        photoGallery: 'https://photos.google.com/share/AF1QipPjwltaq3t0viHGxElXbPLhTI20kRVJ49OAfSbvaBLfLKZ8ub9iIvKHz0U-YWu-5w/memory/AF1QipPXGpTOGl1ZWvGpnPl5TL4-0YRk2AzIPm8OTYG2bpeh4NeTmFbQ6BurI9xVvEt9gw?key=ZkZQLUdpalU2TktnN0xBUDVQeURWdUpVSzFTamFR'
    },
    cap2: {
        coords: [0.0,0.0],
        description: 'Cap 2: NA',
        photoGallery: 'na'
    },
    cap3: {
        coords: [-0.7287461,-78.6389962],
        description: 'Cap 3:El hermoso Ecuador y el imponente Cotopaxi.',
        url: '?cap=cap3',
        photoGallery: 'https://photos.google.com/share/AF1QipNj3g2SbO56SdZJCfOrcUIvZScycBj_LNjRQDeeabcoEj_2tKvT-3qJq__NreBACw?key=OF94SFg5TEotaEhteGdIa3RvY0Z0Z3d5TkVoUk9n'
    },
    cap4 : {
        coords: [-9.189967,-75.015152],
        description: 'Cap 4: El viento de la costa peruana, e Imata el error que casi me mata.',
        photoGallery: 'https://photos.google.com/share/AF1QipO5nCdHgUTehqK8iDVdlJuN0-pYgIS4P7uvxGNOSpK8zYQK7i1FcsakvoIHD55lLQ?key=YmtVcmRZNE1tbmlWQWphZTdlUFl0YnQ5TWpsd0tR'
    },
    cap5 : {
        coords: [-15.825, -69.325],
        description: 'Cap 5:Hablando con la parca.',
        photoGallery: 'https://photos.google.com/share/AF1QipMJlAgb0qwGSxrh54_9XOg66HMEij7NGMH1Ue5GtRKinTNzjjdlfvkiKY_-y5ZAYQ?key=Mlp5TDB5ZDh0a1lfLWtqUE1NcnhlMWhDbEZCNHZB'
    },
    cap6 : {
        coords: [-20.33333,-67.7],
        description: 'Cap 6: El majestuoso Uyuni.',
        photoGallery: 'https://photos.google.com/share/AF1QipP_rMoXm9AKo6prMlor_tHtJ4vfo0cSVIQCl-4YgkQ6aeQl2i2U4p6UZwZMhGsxPA/memory/AF1QipMWFcEY_Z9m_4Ue4b7oKs5pOciLxRj0vuQKlRh2oZH2CX4QxaCRB3pDQt-UTq04QQ?key=bkdfdzA4OFpWN0dxX2oyRzFMcFJ5LWk1ZG0zVXNR'
    },
    cap7 : {
        coords: [-34.61315 ,-58.37723],
        description: 'Cap 7: El Norte Argentino.',
        photoGallery: 'https://photos.app.goo.gl/gmzrnmUGWoifrWAN7'
    },
    cap8 : {
        coords: [-42.47666667, -63.60888889],
        description: 'Cap 8: La Patagonia, el inicio del fin.',
        photoGallery: 'https://photos.app.goo.gl/7r4KSKHb9R1Ewhj39'

    },
    cap9 : {
        coords: [54.807222222222,-68.304444444444],
        description: 'Cap 9: Entrada a Tierra del Fuego.',
        initialZoom: 2,
        photoGallery: 'https://photos.app.goo.gl/qL99mmiZvVpxBFWV8'
    }
    ,
    cap10 : {
        coords: [0.0,0.0],
        description: 'Cap 10: Extras Pijamas',
        photoGallery: 'https://photos.app.goo.gl/evtwuSN6Qtk2895C7'
    }
};

function initMap() {
    // Get country from URL parameter
    const params = new URLSearchParams(window.location.search);
    const country = params.get('cap') || 'cap1';
    
    const countryData = countries[country];
    if (!countryData) return;

    const config = {
        coords: countryData.coords,
        initialZoom: countryData.initialZoom || 4,
        focusZoom: 9,
        iconColor: 'blue',
        photoGalleryLink: countryData.photoGallery
    };

    document.title = `Mapa de ${country.charAt(0).toUpperCase() + country.slice(1)}`;
    new CountryMap(config).init('map');
}

initMap();
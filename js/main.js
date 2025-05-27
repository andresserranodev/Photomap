// main.js
import { CountryMap } from "./mapConfig.js";

const countries = {
  cap0: {
    startCoords: [4.704042292094893, -74.1460222897927],
    endCoords: [-54.8322943, -68.56203],
    centerMapCorrds: [-16.1655508, -69.0880394],
    focusZoom: 3,
    initialZoom: 2,
    ruteFile: "./data/Intro.geojson",
    description: "Resumen de la travesía.",
    url: "?cap=cap0",
    photoGallery:"https://www.instagram.com/p/CmNVqQBsKRX/",
  },
  cap1: {
    startCoords: [4.704042292094893, -74.1460222897927],
    endCoords: [0.8139834, -77.6640276],
    ruteFile: "./data/Cap1.geojson",
    description: "Cap 1:Saliendo de Colombia.",
    url: "?cap=cap1",
    photoGallery:
      "https://photos.google.com/share/AF1QipPjwltaq3t0viHGxElXbPLhTI20kRVJ49OAfSbvaBLfLKZ8ub9iIvKHz0U-YWu-5w/memory/AF1QipPXGpTOGl1ZWvGpnPl5TL4-0YRk2AzIPm8OTYG2bpeh4NeTmFbQ6BurI9xVvEt9gw?key=ZkZQLUdpalU2TktnN0xBUDVQeURWdUpVSzFTamFR",
  },
  cap2: {
    startCoords: [0.0, 0.0],
    description: "Cap 2: NA",
    photoGallery: "na",
  },
  cap3: {
    startCoords: [0.8139834, -77.6640276],
    endCoords: [-4.4921354, -80.407678],
    ruteFile: "./data/Cap3.geojson",
    description: "Cap 3:El hermoso Ecuador y el imponente Cotopaxi.",
    url: "?cap=cap3",
    photoGallery:
      "https://photos.google.com/share/AF1QipNj3g2SbO56SdZJCfOrcUIvZScycBj_LNjRQDeeabcoEj_2tKvT-3qJq__NreBACw?key=OF94SFg5TEotaEhteGdIa3RvY0Z0Z3d5TkVoUk9n",
  },
  cap4: {
    startCoords: [-4.4921354, -80.407678],
    endCoords: [-16.1655508, -69.0880394],
    ruteFile: "./data/Cap4.geojson",
    focusZoom: 6,
    initialZoom: 4,
    description:
      "Cap 4: El viento de la costa peruana, e Imata el error que casi me mata.",
    photoGallery:
      "https://photos.google.com/share/AF1QipO5nCdHgUTehqK8iDVdlJuN0-pYgIS4P7uvxGNOSpK8zYQK7i1FcsakvoIHD55lLQ?key=YmtVcmRZNE1tbmlWQWphZTdlUFl0YnQ5TWpsd0tR",
  },
  cap5: {
    startCoords: [-16.1655508, -69.0880394],
    focusZoom: 10,
    initialZoom: 6,
    description: "Cap 5:Hablando con la parca.",
    photoGallery:
      "https://photos.google.com/share/AF1QipMJlAgb0qwGSxrh54_9XOg66HMEij7NGMH1Ue5GtRKinTNzjjdlfvkiKY_-y5ZAYQ?key=Mlp5TDB5ZDh0a1lfLWtqUE1NcnhlMWhDbEZCNHZB",
  },
  cap6: {
    startCoords: [-17.9716805, -67.0931305],
    endCoords: [-22.1076728, -65.5975246],
    ruteFile: "./data/Cap6.geojson",
    description: "Cap 6: El majestuoso Uyuni.",
    photoGallery:
      "https://photos.google.com/share/AF1QipP_rMoXm9AKo6prMlor_tHtJ4vfo0cSVIQCl-4YgkQ6aeQl2i2U4p6UZwZMhGsxPA/memory/AF1QipMWFcEY_Z9m_4Ue4b7oKs5pOciLxRj0vuQKlRh2oZH2CX4QxaCRB3pDQt-UTq04QQ?key=bkdfdzA4OFpWN0dxX2oyRzFMcFJ5LWk1ZG0zVXNR",
  },
  cap7: {
    startCoords: [-22.1076728, -65.5975246],
    endCoords: [-38.7183177, -62.2663478],
    focusZoom: 5,
    initialZoom: 4,
    ruteFile: "./data/Cap7.geojson",
    description: "Cap 7: El Norte Argentino.",
    photoGallery: "https://photos.app.goo.gl/gmzrnmUGWoifrWAN7",
  },
  cap8: {
    startCoords: [-38.7183177, -62.2663478],
    endCoords: [-50.3379994, -72.2647918],
    focusZoom: 4,
    initialZoom: 3,
    ruteFile: "./data/Cap8.geojson",
    description: "Cap 8: La Patagonia, el inicio del fin.",
    photoGallery: "https://photos.app.goo.gl/7r4KSKHb9R1Ewhj39",
  },
  cap9: {
    startCoords: [-50.3379994, -72.2647918],
    endCoords: [-54.8322943, -68.56203],
    focusZoom: 5,
    initialZoom: 4,
    ruteFile: "./data/Cap9.geojson",
    description: "Cap 9: Entrada a Tierra del Fuego.",
    photoGallery: "https://photos.app.goo.gl/qL99mmiZvVpxBFWV8",
  },
  cap10: {
    startCoords: [0.0, 0.0],
    description: "Cap 10: Extras Pijamas",
    photoGallery: "https://photos.app.goo.gl/evtwuSN6Qtk2895C7",
  },
};

async function initMap() {
  const params = new URLSearchParams(window.location.search);
  const country = params.get("cap") || "cap0";

  const countryData = countries[country];
  if (!countryData) return;

  const config = {
    startCoords: countryData.startCoords,
    endCoords: countryData.endCoords,
    centerMapCorrds: countryData.centerMapCorrds,
    focusZoom: countryData.focusZoom,
    initialZoom: countryData.initialZoom,
    ruteFile: countryData.ruteFile,
    photoGalleryLink: countryData.photoGallery,
  };

  document.title = countryData.description || "Map Viewer";
  const map = new CountryMap(config);
  await map.init("map");
}

// Call initMap and handle promise
initMap().catch((error) => {
  console.error("Error initializing map:", error);
});

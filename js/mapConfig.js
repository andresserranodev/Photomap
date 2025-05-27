// CountryMap configuration and initialization script
const photoGalleryDefault ="https://photos.google.com/share/AF1QipNj3g2SbO56SdZJCfOrcUIvZScycBj_LNjRQDeeabcoEj_2tKvT-3qJq__NreBACw/memory/AF1QipOG-Z8Y6PgC3D7RhU1yQwyq4ChUomjDJrgVD-1D4nO-xZ6kMD-38P5mbKqGXDdWqg?key=OF94SFg5TEotaEhteGdIa3RvY0Z0Z3d5TkVoUk9n";

// constants
const ANIMATION_DURATION = 2.0;
const EASE_LINEARITY = 2.0;

const ZOOM_DELAY = 800;
const REDIRECT_DELAY = 2000;
/**
 * @class CountryMap
 * @param {Object} countryConfig - Configuration object
 * @param {Array} countryConfig.startCoords - Starting coordinates [lat, lng]
 * @param {Array} countryConfig.endCoords - Ending coordinates [lat, lng]
 * @param {string} countryConfig.ruteFile - Path to GeoJSON route file
 */export class CountryMap {
  constructor(countryConfig) {
    if (!countryConfig.startCoords) {
        throw new Error('Start coordinates are required');
    }
    this.startCoords = countryConfig.startCoords;
    this.endCoords = countryConfig.endCoords;
    this.centerMapCorrds = countryConfig.centerMapCorrds || this.startCoords;
    this.initialZoom = countryConfig.initialZoom || 5;
    this.focusZoom = countryConfig.focusZoom || 7;
    this.photoGalleryLink =
      countryConfig.photoGalleryLink || photoGalleryDefault;
    this.ruteFile = countryConfig.ruteFile;
  }
  
  async init(containerId) {
    // Initialize map
    this.map = L.map(containerId, {
      zoomControl: false,
      minZoom: 2,
      maxZoom: 10,
    }).setView(this.centerMapCorrds, this.initialZoom);

    // Add tile layer
    L.tileLayer(
      "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
      {
        attribution: "© CyclOSM contributors",
      }
    ).addTo(this.map);

    // Add start and end marker
    this.marker = L.marker(this.startCoords, {
      icon: this.createCustomMarker("start"),
    }).addTo(this.map);

    if (this.endCoords && this.endCoords.length === 2) {
      this.endMarker = L.marker(this.endCoords, {
        icon: this.createCustomMarker("end"),
      }).addTo(this.map);
    }

    // Init zoom
    this.initZoom();
    return this;
  }

  /**
   * Initializes the zoom functionality of the map when the maps ready.
   */
  async initZoom() {
    this.map.whenReady(() => {
      setTimeout(() => this.zoomToStartPoint(), ZOOM_DELAY);
    });
  }
    /**
     * Creates a custom marker based on the type.
     * @param {string} type - The type of marker ('start', 'end', or 'waypoint').
     * @returns {L.Icon} - The custom marker icon.
     */
  createCustomMarker(type = "start") {
    const markerTypes = {
      start: {
        iconUrl: "img/moto_marker.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [30, 30],
        iconAnchor: [6, 21],
        shadowSize: [41, 41],
      },
      end: {
        iconUrl: "img/start_marker.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [30, 30],
        iconAnchor: [6, 21],
        shadowSize: [41, 41],
      },
    };

    return L.icon(markerTypes[type] || markerTypes.waypoint);
}

    /**
     * Zooms the map to the start point and loads the GeoJSON route if available.
     */
  async zoomToStartPoint() {
    const link = this.photoGalleryLink;
    const ruteFile = this.ruteFile;

    this.map.flyTo(this.centerMapCorrds, this.focusZoom, {
      duration: ANIMATION_DURATION,
      easeLinearity: EASE_LINEARITY,
    });

    // Wait for zoom to complete and load GeoJSON
    this.map.once("zoomend", async () => {
      // Delay to open the photo gallery link
      setTimeout(() => {
        //window.location.href = link;
      }, REDIRECT_DELAY);

      // Only load GeoJSON if ruteFile exists and is not empty
      if (ruteFile && ruteFile.trim() !== "") {
        const geoJSONLayer = await this.loadGeoJSON(ruteFile);
        if (geoJSONLayer) {
          geoJSONLayer.addTo(this.map);
          this.map.fitBounds(geoJSONLayer.getBounds(), {
            padding: [50, 50],
            animate: true,
            duration: ANIMATION_DURATION,
            easeLinearity: EASE_LINEARITY,
          });
        }
      }
    });
  }

    /** 
     * Loads a GeoJSON file and returns a Leaflet GeoJSON layer.
     * @param {string} ruteFile - The path to the GeoJSON file.
     * @returns {Promise<L.GeoJSON>} - A promise that resolves to a Leaflet GeoJSON layer.
     */
  async loadGeoJSON(ruteFile) {
    try {
      const response = await fetch(ruteFile);
      const geoData = await response.json();
      return L.geoJSON(geoData, {
        style: {
          color: "#0f53ff",
          weight: 5,
          opacity: 0.65,
        },
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 5, // Size of circle
            fillColor: "#ffffff", // White fill
            color: "#000000", // Black border
            weight: 1, // Border width
            opacity: 1, // Border opacity
            fillOpacity: 0.8, // Fill opacity
          });
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
          }
        },
      });
    } catch (error) {
      console.error("Error loading GeoJSON:", error);
      return null;
    }
  }
}

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import axios from 'axios';
import mapicon from '../images/image.png';


const LeafletMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (!mapInstance.current) {
      // Initialize map
      mapInstance.current = L.map(mapRef.current, {
        center: [28.3949, 84.1240], // Default center: Nepal
        zoom: 6,
        dragging: true,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
      });

      // Add base tile layer
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
        minZoom: 0,
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(mapInstance.current);

      // Add geocoder control
      L.Control.geocoder().addTo(mapInstance.current);

      // Load GeoJSON for provinces
      fetch('/nepal_provinces.geojson')
        .then(response => response.json())
        .then(data => {
          L.geoJSON(data, {
            style: {
              color: '#800000',
              weight: 0.5,
              fillOpacity: 0,
            },
            onEachFeature: (feature, layer) => {
              layer.bindPopup(`Province: ${feature.properties.name}`);
            },
          }).addTo(mapInstance.current);

          mapInstance.current.fitBounds(L.geoJSON(data).getBounds());
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
    }

    // Fetch locations from backend
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://map-backend-eight.vercel.app/api/locations');
        setLocations(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstance.current) {
      // Remove existing markers
      mapInstance.current.eachLayer(layer => {
        if (layer instanceof L.Marker) {
          mapInstance.current.removeLayer(layer);
        }
      });

      // Create custom icon
      const customIcon = L.icon({
        iconUrl: mapicon,
        iconSize: [22, 22],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Add markers for each location
      locations.forEach(location => {
        const marker = L.marker([parseFloat(location.longitude), parseFloat(location.latitude)], { icon: customIcon });

        const hoverPopup = `
          <div class="popup-outer">
            <div class="popup-inner">
              <span>${location.district || 'Unknown District'}</span> /
              <span>${location.momentIssue || 'No Issue'}</span>
            </div>
          </div>
        `;

        marker.bindPopup(hoverPopup, { closeButton: false }).addTo(mapInstance.current);

        marker.on('mouseover', function () {
          this.openPopup();
        });

        marker.on('mouseout', function () {
          this.closePopup();
        });
      });
    }
  }, [locations]);

  return (
    <div ref={mapRef} id="map" className="relative z-10" style={{ height: '100%' }}></div>
  );
};

export default LeafletMap;

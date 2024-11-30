import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import L from 'leaflet';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

const Map = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        const mapContainer = mapRef.current;
        const map = L.map(mapContainer).setView([28.3949, 84.1240], 7);

        L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
            minZoom: 0,
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
        }).addTo(map);

        fetch('/nepal_provinces.geojson')
            .then(response => response.json())
            .then(data => {
                const geojsonLayer = L.geoJSON(data, {
                    style: function (feature) {
                        return { color: '#9A1D20', weight: 0.9, fillOpacity: 0 };
                    },
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup('District: ' + feature.properties.name);
                    }
                }).addTo(map);

                map.fitBounds(geojsonLayer.getBounds());
            })
            .catch(error => console.error('Error loading GeoJSON data:', error));

        L.Control.geocoder().addTo(map);

        const provinces = [
            { name: "Koshi", coords: [26.9890, 87.2931] },
            { name: "Madhesh", coords: [26.7289, 86.0980] },
            { name: "Bagmati Province", coords: [27.4272, 85.6240] },
            { name: "Gandaki Province", coords: [28.5096, 83.9856] },
            { name: "Lumbini Province", coords: [27.9083, 82.7653] },
            { name: "Karnali Province", coords: [29.075375179558346, 82.39701185836428] },
            { name: "Sudurpashchim Province", coords: [29.6743, 80.9645] }
        ];

        provinces.forEach(function (province) {
            const myIcon = L.divIcon({
                className: 'custom-div-icon',
                html: "<div class='text-center'>" + province.name + "</div>",
                iconSize: [120, 30],
                iconAnchor: [60, 15]
            });

            L.marker(province.coords, { icon: myIcon }).addTo(map);
        });

        // Ensure map resizes on window resize
        const resizeMap = () => {
            map.invalidateSize();
        };

        window.addEventListener('resize', resizeMap);

        return () => {
            window.removeEventListener('resize', resizeMap);
            map.remove();
        };

    }, []); // Empty dependency array ensures useEffect runs only once

    return (
        <div ref={mapRef} id="map" className="h-screen"></div>
    );
}

export default Map;
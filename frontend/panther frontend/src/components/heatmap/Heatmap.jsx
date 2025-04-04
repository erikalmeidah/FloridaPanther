import { MapContainer, TileLayer } from 'react-leaflet';
import L, { circleMarker } from 'leaflet';
import 'leaflet.heat';
import './Heatmap.css';
import { useEffect, useRef, useState } from 'react';

function HeatMap({ data }) {
  const mapRef = useRef(null);
  const [heatMapData, setHeatMapData] = useState([]);
  const markerRefs = useRef([]);

  useEffect(() => {
    const newHeatMapData = data.map(point => {
      const x = parseFloat(point.X);
      const y = parseFloat(point.Y);
      const latLng = L.Projection.SphericalMercator.unproject({ x, y });
      return [latLng.lat, latLng.lng, point.MortalityCount];
    });
    setHeatMapData(newHeatMapData);
  }, [data]);

  useEffect(() => {
    const map = mapRef.current;
    
    if (!map || heatMapData.length === 0) {
      return;
    }

    if (window.heatLayer) {
      map.removeLayer(window.heatLayer);
    }

    markerRefs.current.forEach(marker => {
      map.removeLayer(marker);
    });
    markerRefs.current = [];

    window.heatLayer = L.heatLayer(heatMapData, {
      radius: 20,
      blur: 20,
      maxZoom: 18,
      minOpacity: 0.3,
      max: Math.max(...heatMapData.map(p => p[2] || 1), 1),
      gradient: {
        0.2: 'blue',
        0.4: 'cyan',
        0.6: 'lime',
        0.8: 'yellow',
        1.0: 'red'
      }
    }).addTo(map);

    heatMapData.forEach(point => {
      const marker = L.circleMarker([point[0], point[1]], {
        radius: 1,
        color: 'red',
        fillOpacity: 0.5
      }).addTo(map);
      markerRefs.current.push(marker);
    });

    return () => {
      if (window.heatLayer) {
        map.removeLayer(window.heatLayer);
      }
      markerRefs.current.forEach(point => {
        map.removeLayer(point);
      });
      markerRefs.current = [];
    };
  }, [heatMapData]);

  const setMapRef = (map) => {
    mapRef.current = map;
  };

  return (
    <MapContainer
      center={[26.23, -81.59]}
      zoom={10}
      style={{ height: '100%', width: '100%' }}
      ref={setMapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default HeatMap;

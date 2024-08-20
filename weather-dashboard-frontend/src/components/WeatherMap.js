// src/components/WeatherMap.js

import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function WeatherMap({ lat, lon, city }) {
  const position = [lat, lon];
  const zoom = 10;
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(position, zoom);
    }
  }, [lat, lon, zoom]);

  return (
    <MapContainer center={position} zoom={zoom} ref={mapRef} style={{ height: '300px', width: '100%' }}>
      <ChangeView center={position} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Weather in {city}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default WeatherMap;
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import './map.scss';
import 'leaflet/dist/leaflet.css';
import Pin from '../pin/Pin';

const Map = ({ items }) => {
  const groupItemsByCoordinates = (items) => {
    const grouped = {};
    items.forEach(item => {
      const key = `${item.latitude},${item.longitude}`;
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(item);
    });
    return grouped;
  };

  const groupedItems = groupItemsByCoordinates(items);

  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude]
          : [1.2966, 103.7764] // Default center coordinates if no items or multiple items
      }
      zoom={13}
      scrollWheelZoom={true}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {Object.values(groupedItems).map((group, index) => (
        <Pin key={index} items={group} />
      ))}
    </MapContainer>
  );
};

export default Map;

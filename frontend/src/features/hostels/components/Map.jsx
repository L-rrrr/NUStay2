import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Pin from './Pin';
import './map.scss';

const Map = ({ items }) => {
  const groupItemsByCoordinates = (sourceItems) => {
    const grouped = {};
    sourceItems.forEach((item) => {
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
      center={items.length === 1 ? [items[0].latitude, items[0].longitude] : [1.2966, 103.7764]}
      zoom={13}
      scrollWheelZoom
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

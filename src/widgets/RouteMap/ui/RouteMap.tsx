import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Фикс для иконок (Leaflet в React часто теряет пути к картинкам маркеров)
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export const RouteMap = () => {
  // В Leaflet: [Широта, Долгота]
  const points: [number, number][] = [
    [55.75, 37.58],
    [55.76, 37.62],
    [55.74, 37.64],
  ];

  const center = points[1];

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ width: '100%', height: '500px' }}
    >
      {/* Бесплатные карты OpenStreetMap */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Линия маршрута */}
      <Polyline positions={points} pathOptions={{ color: 'red', weight: 5 }} />

      {/* Маркеры с балунами */}
      {points.map((coords, index) => (
        <Marker key={index} position={coords}>
          <Popup>Остановка №{index + 1}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

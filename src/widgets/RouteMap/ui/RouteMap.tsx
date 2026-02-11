import { useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { skipToken } from '@reduxjs/toolkit/query';
import { Skeleton } from '@citydrive/shared/ui/Skeleton/Skeleton';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useGetStopsQuery } from '@citydrive/entities/Route';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface RouteMapProps {
  stopsIds?: string[];
  isLoading?: boolean;
}

const ChangeView = ({ points }: { points: [number, number][] }) => {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [points, map]);
  return null;
};

export const RouteMap = ({
  stopsIds,
  isLoading: isTripLoading,
}: RouteMapProps) => {
  const { data: stops, isLoading: isStopsLoading } = useGetStopsQuery(
    stopsIds ?? skipToken,
  );

  const isLoading = isTripLoading || isStopsLoading;

  if (isLoading) {
    return <Skeleton width="full" height={500} borderRadius={16} />;
  }

  const points = stops?.map((stop) => stop.coords) || [];

  const defaultCenter: [number, number] = [55.75, 37.58];

  return (
    <MapContainer
      center={points[0] || defaultCenter}
      zoom={12}
      style={{ width: '100%', height: '500px', borderRadius: '16px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {points.length > 0 && (
        <>
          <Polyline
            positions={points}
            pathOptions={{ color: 'red', weight: 5 }}
          />
          {stops?.map((stop, index) => (
            <Marker key={stop.id} position={stop.coords}>
              <Popup>
                {index === 0
                  ? 'Старт: '
                  : index === stops.length - 1
                    ? 'Финиш: '
                    : `Остановка №${index + 1}: `}
                {stop.address}
              </Popup>
            </Marker>
          ))}
          <ChangeView points={points} />
        </>
      )}
    </MapContainer>
  );
};

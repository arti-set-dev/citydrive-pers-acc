import { Map, Placemark, Polyline, YMaps } from '@pbe/react-yandex-maps';

export const RouteMap = () => {
  const apiKey = '25dfd032-cc04-49f0-a949-cf5be18767fa';
  const points: number[][] = [
    [55.75, 37.58],
    [55.76, 37.62],
    [55.74, 37.64],
  ];

  return (
    <YMaps query={{ apikey: apiKey, load: 'package.full' }}>
      <Map
        defaultState={{ center: points[1], zoom: 12, controls: [] }}
        style={{ width: '100%', height: '500px' }}
        options={{
          suppressMapOpenBlock: true,
        }}
      >
        <Polyline
          geometry={points}
          options={{
            strokeColor: '#FF0000',
            strokeWidth: 5,
          }}
        />

        {points.map((coords, index) => (
          <Placemark
            key={index}
            geometry={coords}
            properties={{
              balloonContent: `Остановка №${index + 1}`,
            }}
            options={{
              preset: 'islands#redDotIcon',
              balloonCloseButton: false,
            }}
            onMouseEnter={(e: any) => {
              const instance = e.get('target');
              if (instance && instance.balloon) {
                instance.balloon.open();
              }
            }}
            onMouseLeave={(e: any) => {
              const instance = e.get('target');
              if (instance && instance.balloon) {
                instance.balloon.close();
              }
            }}
          />
        ))}
      </Map>
    </YMaps>
  );
};

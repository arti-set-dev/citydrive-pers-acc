import { IRoute, RouteItem } from '@/entities/Route';

export const RoutePath = () => {
  const route: IRoute = {
    id: '1',
    stops: [
      {
        id: '1',
        address: 'Ул. Пенькова, 28',
        city: 'Москва',
        date: '18 сентября',
        time: '15:32',
        isStart: true,
      },
      {
        id: '2',
        address: 'Ул. Новолесная, 2',
        city: 'Москва',
        date: '18 сентября',
        time: '15:32',
      },
      {
        id: '3',
        address: 'Ул. Бретская, 44',
        city: 'Москва',
        date: '18 сентября',
        time: '15:32',
      },
      {
        id: '4',
        address: 'Ул. Рассольникова, 1',
        city: 'Москва',
        date: '18 сентября',
        time: '15:32',
        isEnd: true,
      },
    ],
  };
  return <RouteItem route={route} />;
};

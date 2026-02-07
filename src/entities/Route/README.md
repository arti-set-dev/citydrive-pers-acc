# Route Entity

## Описание

Сущность `Route` представляет собой модель маршрута поездки в системе CityDrive. Поддерживает два типа маршрутов: прямые маршруты (точка А → точка Б) и маршруты с промежуточными остановками.

## Как использовать

```typescript
import { IRoute, IStop } from '@/entities/Route';
```

## Типы данных

### IRoute

Основной тип маршрута, который может быть одним из двух вариантов:

```typescript
type IRoute = IDirectRoute | IStopsRoute;
```

### IDirectRoute

Прямой маршрут с начальной и конечной точкой:

```typescript
interface IDirectRoute extends IBaseRoute {
  routeStart: IStop;    // Начальная точка
  routeEnd: IStop;      // Конечная точка
  stops?: never;        // Нет промежуточных остановок
}
```

### IStopsRoute

Маршрут с промежуточными остановками:

```typescript
interface IStopsRoute extends IBaseRoute {
  stops: IStop[];       // Массив остановок
  routeStart?: never;   // Нет отдельной начальной точки
  routeEnd?: never;     // Нет отдельной конечной точки
}
```

### IBaseRoute

Базовый интерфейс для всех маршрутов:

```typescript
interface IBaseRoute {
  id: string;           // Уникальный идентификатор маршрута
  price?: string;       // Стоимость поездки
}
```

### IStop

Интерфейс остановки/точки маршрута:

```typescript
interface IStop {
  id: string;           // Уникальный идентификатор остановки
  address: string;      // Адрес остановки
  city: string;         // Город
  time?: string;        // Время прибытия/отправления
  date?: string;        // Дата поездки
  isStart?: boolean;    // Флаг начальной точки
  isEnd?: boolean;      // Флаг конечной точки
}
```

## Особенности

- **Гибкая структура**: Поддерживает как простые прямые маршруты, так и сложные маршруты с остановками
- **Типизация**: Использует TypeScript discriminated unions для строгой типизации
- **Расширяемость**: Легко добавить новые типы маршрутов на основе базового интерфейса
- **Временные данные**: Поддерживает информацию о времени и датах для каждой остановки

## Примеры использования

### Прямой маршрут

```typescript
const directRoute: IDirectRoute = {
  id: 'route-1',
  price: '1500',
  routeStart: {
    id: 'stop-1',
    address: 'ул. Ленина, 1',
    city: 'Москва',
    isStart: true,
    time: '09:00'
  },
  routeEnd: {
    id: 'stop-2', 
    address: 'ул. Садовая, 5',
    city: 'Москва',
    isEnd: true,
    time: '09:30'
  }
};
```

### Маршрут с остановками

```typescript
const stopsRoute: IStopsRoute = {
  id: 'route-2',
  price: '2000',
  stops: [
    {
      id: 'stop-1',
      address: 'ул. Ленина, 1',
      city: 'Москва',
      time: '09:00',
      isStart: true
    },
    {
      id: 'stop-2',
      address: 'ул. Садовая, 5', 
      city: 'Москва',
      time: '09:15'
    },
    {
      id: 'stop-3',
      address: 'ул. Цветная, 10',
      city: 'Москва',
      time: '09:30',
      isEnd: true
    }
  ]
};
```

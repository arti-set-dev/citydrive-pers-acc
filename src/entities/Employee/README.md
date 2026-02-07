# Employee Entity

## Описание

Сущность `Employee` представляет собой модель сотрудника компании в системе CityDrive. Содержит полную информацию о сотруднике, включая его личные данные, рабочие параметры, финансовые ограничения и настройки уведомлений.

## Как использовать

```typescript
import { 
  Employee, 
  EmployeeSchema,
  EmployeeList,
  employeeActions,
  employeeReducer,
  getEmployeeData,
  getEmployeeInited,
  useGetEmployeeDataQuery,
  useGetEmployeesListQuery,
  useGetStatsQuery,
  useUpdateFeatureFlagsMutation
} from '@/entities/Employee';
```

## Типы данных

### Employee

Основной интерфейс сотрудника:

```typescript
interface Employee {
  id: string;                           // Уникальный идентификатор
  name: string;                         // Имя сотрудника
  lastTimeTrip?: string;                // Время последней поездки
  phone?: string;                       // Телефонный номер
  role?: string;                        // Роль в системе
  department?: string;                  // Название отдела
  limit?: number;                       // Лимит расходов
  spent?: number;                       // Потраченная сумма
  email?: string;                       // Email адрес
  status?: Status;                      // Статус (active | inactive)
  companyName: string;                  // Название компании
  companyId: string;                    // ID компании
  balance: number;                      // Баланс сотрудника
  features?: {                          // Дополнительные фичи
    isExperimental?: boolean;
  };
  notifications: {                       // Настройки уведомлений
    newEmployees: boolean;
  };
  departmentId: string;                 // ID отдела
  time: {                               // Рабочее время
    start: string;
    end: string;
  };
  days: number[];                       // Рабочие дни
  cars: [Cars];                         // Доступные классы авто
  city: number[];                       // Доступные города
}
```

### EmployeeStats

Статистика сотрудника:

```typescript
interface EmployeeStats {
  id?: string;                          // ID записи
  employeeId: string;                   // ID сотрудника
  date: string;                         // Дата
  trips: number;                        // Количество поездок
  spent: number;                        // Потрачено
  remaining: number;                    // Остаток
}
```

### EmployeeSchema

Схема состояния в Redux:

```typescript
interface EmployeeSchema {
  data?: Employee;                      // Данные сотрудника
  _inited: boolean;                     // Флаг инициализации
}
```

### Вспомогательные типы

```typescript
type Role = 'admin' | 'user';           // Роли пользователя
type Status = 'active' | 'inactive';    // Статусы сотрудника
type Cars = 'comfort' | 'economy' | 'premium'; // Классы автомобилей
```

## Public API

### Компоненты
- `EmployeeList` - Компонент для отображения списка сотрудников

### Redux
- `employeeActions` - Actions для управления состоянием сотрудника
- `employeeReducer` - Reducer для сущности Employee
- `getEmployeeData` - Selector для получения данных сотрудника
- `getEmployeeInited` - Selector для проверки инициализации

### API хуки (RTK Query)
- `useGetEmployeeDataQuery` - Получение данных сотрудника
- `useGetEmployeesListQuery` - Получение списка сотрудников
- `useGetStatsQuery` - Получение статистики сотрудника
- `useUpdateFeatureFlagsMutation` - Обновление feature flags

## Особенности

- Сущность использует RTK Query для работы с API
- Поддерживает кэширование данных и оптимистичные обновления
- Интегрирована с системой уведомлений
- Поддерживает управление ролями и правами доступа

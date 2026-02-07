# Department Entity

## Описание

Сущность `Department` представляет собой модель отдела компании в системе CityDrive. Содержит информацию об отделе, включая финансовые лимиты, расходы и привязанных сотрудников.

## Как использовать

```typescript
import { 
  Department,
  DepartmentList,
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery
} from '@/entities/Department';
```

## Типы данных

### Department

Основной интерфейс отдела:

```typescript
interface Department {
  id: string;              // Уникальный идентификатор отдела
  name: string;            // Название отдела
  limit: number;           // Финансовый лимит отдела
  spent: number;           // Потраченная сумма
  employeesIds: string[];  // Массив ID сотрудников отдела
  companyId: string;       // ID компании
}
```

## Public API

### Компоненты
- `DepartmentList` - Компонент для отображения списка отделов

### API хуки (RTK Query)
- `useGetDepartmentsQuery` - Получение списка всех отделов
- `useGetDepartmentByIdQuery` - Получение отдела по ID

## Особенности

- Управление финансовыми лимитами на уровне отдела
- Отслеживание расходов отдела
- Связь с сотрудниками через массив ID
- Интеграция с системой управления компанией
- Поддержка кэширования данных через RTK Query

## Пример использования

```typescript
// Получение списка отделов
const { data: departments, isLoading } = useGetDepartmentsQuery();

// Получение конкретного отдела
const { data: department } = useGetDepartmentByIdQuery('dept-123');

// Расчет остатка лимита
const remainingLimit = department ? department.limit - department.spent : 0;
```

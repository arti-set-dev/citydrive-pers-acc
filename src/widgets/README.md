# Widgets Layer

## Описание

Слой `widgets` содержит составные UI компоненты, которые объединяют в себе несколько фич и сущностей. Виджеты являются переиспользуемыми компонентами высокого уровня, которые могут использоваться на разных страницах.

## Структура

Каждый виджет следует структуре:
```
WidgetName/
├── index.ts          # Public API виджета
├── ui/               # UI компоненты виджета
└── WidgetName.module.scss # Стили виджета
```

## Доступные виджеты

### 🧭 Навигация
- **Navbar** - Основная навигационная панель
- **Sidebar** - Боковая панель навигации

### 👤 Информационные виджеты
- **EmployeeInfo** - Информационная карточка сотрудника
- **Rate** - Виджет рейтинга/оценки

### 🗺️ Карты и маршруты
- **RouteMap** - Карта с маршрутами
- **RouteDitails** - Детали маршрута
- **RoutePath** - Визуализация пути маршрута

### 📊 Статистика
- **Stat** - Базовый виджет статистики
- **TripsInfoByMonth** - Информация о поездках по месяцам
- **RideInfo** - Информация о поездке

### ⚡ Служебные виджеты
- **PageLoader** - Индикатор загрузки страницы

## Принципы построения виджетов

### Композиция
Виджеты объединяют:
- **Несколько фич** - бизнес-логику
- **Сущности** - данные и модели
- **UI компоненты** - из shared слоя
- **Стили** - специфичные для виджета

### Переиспользование
Виджеты должны быть:
- **Независимыми** - работать в разных контекстах
- **Конфигурируемыми** - через props
- **Адаптивными** - работать на разных устройствах

### Пример структуры виджета
```typescript
interface EmployeeInfoProps {
  employeeId: string;
  showActions?: boolean;
  compact?: boolean;
}

export const EmployeeInfo: React.FC<EmployeeInfoProps> = ({
  employeeId,
  showActions = true,
  compact = false
}) => {
  const { data: employee } = useGetEmployeeDataQuery(employeeId);
  
  return (
    <Card compact={compact}>
      <EmployeeAvatar src={employee?.avatar} />
      <EmployeeName name={employee?.name} />
      <EmployeeDepartment department={employee?.department} />
      {showActions && <EmployeeActions employeeId={employeeId} />}
    </Card>
  );
};
```

## Особенности

- **Инкапсуляция**: Виджет инкапсулирует сложную логику
- **Состояние**: Может иметь собственное состояние
- **API**: Предоставляет четкий public API
- **Стили**: Изолированные стили для предотвращения конфликтов

## Public API

Каждый виджет экспортирует:
- Основной компонент виджета
- Типы props (если сложные)
- Вспомогательные компоненты (если есть)

## Примеры использования

```typescript
// На странице сотрудника
<Page>
  <EmployeeInfo employeeId="123" />
  <TripsInfoByMonth employeeId="123" />
</Page>

// На странице отдела
<Page>
  <DepartmentInfo departmentId="dept-1" />
  <EmployeeList departmentId="dept-1" compact />
</Page>
```

## Интеграция

Виджеты интегрированы с:
- **Роутером** - для навигации
- **Хранилищем** - для доступа к данным
- **API** - для загрузки данных
- **Системой уведомлений** - для обратной связи

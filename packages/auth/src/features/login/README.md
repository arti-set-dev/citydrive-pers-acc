# Login Feature

## Описание

Фича `login` предоставляет функционал для аутентификации пользователей в системе CityDrive. Включает формы входа, регистрации, восстановления пароля и управления сессией пользователя.

## Как использовать

```typescript
import { 
  LoginForm,
  LogoutButton,
  ForgotPasswordForm,
  RegistrationForm,
  ResetPasswordForm,
  LoginSchema,
  getIsAuth,
  loginReducer
} from '@citydrive/auth';
```

## Типы данных

### LoginForm

Интерфейс формы входа:

```typescript
interface LoginForm {
  name: string;        // Имя пользователя
  email: string;       // Email адрес
  password: string;    // Пароль
  isAuth: boolean;     // Флаг аутентификации
}
```

### LoginSchema

Схема состояния в Redux:

```typescript
interface LoginSchema {
  data: LoginForm;     // Данные формы входа
}
```

## Public API

### Компоненты
- `LoginForm` - Форма входа в систему
- `LogoutButton` - Кнопка выхода из системы
- `ForgotPasswordForm` - Форма восстановления пароля
- `RegistrationForm` - Форма регистрации нового пользователя
- `ResetPasswordForm` - Форма сброса пароля

### Redux
- `loginReducer` - Reducer для управления состоянием аутентификации
- `getIsAuth` - Selector для проверки статуса аутентификации

## Особенности

- Поддерживает полную цикл аутентификации: вход, регистрация, восстановление пароля
- Интегрирована с системой управления сессиями
- Валидация форм на стороне клиента
- Поддерживает запоминание пользователя между сессиями
- Безопасная обработка паролей и токенов

## Поток использования

1. **Вход**: Пользователь использует `LoginForm` для входа
2. **Регистрация**: Новые пользователи проходят через `RegistrationForm`
3. **Восстановление**: При забытом пароле используется `ForgotPasswordForm`
4. **Сброс**: После получения ссылки используется `ResetPasswordForm`
5. **Выход**: `LogoutButton` для завершения сессии


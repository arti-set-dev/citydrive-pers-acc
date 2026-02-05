import {
  getLoginName,
  getLoginEmail,
  getLoginPassword,
  getIsAuth,
  StateWithLogin,
} from './loginSelectors';

describe('loginSelectors', () => {
  test('should return name', () => {
    const state: DeepPartial<StateWithLogin> = {
      login: {
        data: {
          name: 'admin',
        },
      },
    };
    expect(getLoginName(state as StateWithLogin)).toBe('admin');
  });

  test('should return email', () => {
    const state: DeepPartial<StateWithLogin> = {
      login: {
        data: {
          email: 'test@test.ru',
        },
      },
    };
    expect(getLoginEmail(state as StateWithLogin)).toBe('test@test.ru');
  });

  test('should return password', () => {
    const state: DeepPartial<StateWithLogin> = {
      login: {
        data: {
          password: '123',
        },
      },
    };
    expect(getLoginPassword(state as StateWithLogin)).toBe('123');
  });

  test('should return isAuth', () => {
    const state: DeepPartial<StateWithLogin> = {
      login: {
        data: {
          isAuth: true,
        },
      },
    };
    expect(getIsAuth(state as StateWithLogin)).toBe(true);
  });

  test('should work with empty state name', () => {
    const state: DeepPartial<StateWithLogin> = {};
    expect(getLoginName(state as StateWithLogin)).toBe('');
  });

  test('should work with empty state isAuth', () => {
    const state: DeepPartial<StateWithLogin> = {};
    expect(getIsAuth(state as StateWithLogin)).toBe(false);
  });
});

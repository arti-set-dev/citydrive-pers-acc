import { loginReducer, loginActions } from './loginSlice';
import { LoginSchema } from '../../types/login';

describe('loginSlice', () => {
  test('test setLoginName', () => {
    const state: DeepPartial<LoginSchema> = { data: { name: '' } };
    expect(
      loginReducer(state as LoginSchema, loginActions.setLoginName('admin')),
    ).toEqual({ data: { name: 'admin' } });
  });

  test('test setLoginEmail', () => {
    const state: DeepPartial<LoginSchema> = { data: { email: '' } };
    expect(
      loginReducer(
        state as LoginSchema,
        loginActions.setLoginEmail('test@test.ru'),
      ),
    ).toEqual({ data: { email: 'test@test.ru' } });
  });

  test('test setLoginPassword', () => {
    const state: DeepPartial<LoginSchema> = { data: { password: '' } };
    expect(
      loginReducer(
        state as LoginSchema,
        loginActions.setLoginPassword('12345'),
      ),
    ).toEqual({ data: { password: '12345' } });
  });

  test('test setIsAuth', () => {
    const state: DeepPartial<LoginSchema> = { data: { isAuth: false } };
    expect(
      loginReducer(state as LoginSchema, loginActions.setIsAuth(true)),
    ).toEqual({ data: { isAuth: true } });
  });

  describe('initialState logic', () => {
    beforeEach(() => {
      jest.resetModules();

      localStorage.clear();
      jest.clearAllMocks();
    });

    test('should return isAuth true if token exists in localStorage', () => {
      localStorage.setItem('token', 'some_token');

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { loginReducer } = require('./loginSlice');

      const state = loginReducer(undefined, { type: '@@INIT' });

      expect(state.data.isAuth).toBe(true);
    });

    test('should return isAuth false if token does not exist', () => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { loginReducer } = require('./loginSlice');

      const state = loginReducer(undefined, { type: '@@INIT' });
      expect(state.data.isAuth).toBe(false);
    });
  });
});

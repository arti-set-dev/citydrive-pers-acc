/* eslint-disable @typescript-eslint/no-explicit-any */
import { $api } from '@/shared/api/interceptors';
import { loginApi } from './loginApi';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { LoginForm } from '../../model/types/login';

jest.mock('@/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as jest.MockedFunction<typeof $api>;

describe('loginApi', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
      },
      middleware: (getDefault) => getDefault().concat(baseApi.middleware),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('login mutation success', async () => {
    const mockUserData = { id: '1', name: 'Ivan', token: 'fake_token' };
    const loginPayload: LoginForm = {
      name: 'Ivan',
      email: 'test@test.ru',
      password: '123',
      isAuth: false,
    };

    mockedApi.mockResolvedValue({
      data: mockUserData,
      headers: {},
    });

    const result = await store.dispatch(
      loginApi.endpoints.login.initiate(loginPayload),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/auth',
        method: 'post',
        data: loginPayload,
      }),
    );

    expect(result.data).toEqual(mockUserData);
    expect(result.error).toBeUndefined();
  });

  test('login mutation error', async () => {
    mockedApi.mockRejectedValue({
      response: {
        status: 401,
        data: { message: 'Unauthorized' },
      },
    });

    const result = await store.dispatch(
      loginApi.endpoints.login.initiate({
        name: 'bad_user',
        password: 'bad_password',
        email: 'bad@test.ru',
        isAuth: false,
      }),
    );

    expect(result.error).toBeDefined();
    expect(result.error.status).toBe(401);
  });
});

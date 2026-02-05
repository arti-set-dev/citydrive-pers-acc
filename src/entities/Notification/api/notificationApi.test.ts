/* eslint-disable @typescript-eslint/no-explicit-any */
import { notificationApi } from './notificationApi';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/baseApi';
import { $api } from '@/shared/api/interceptors';
import { Notification } from '../model/types/notification';

jest.mock('@/shared/api/interceptors', () => ({
  $api: jest.fn(),
}));

const mockedApi = $api as jest.MockedFunction<typeof $api>;

describe('notificationApi', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: { [baseApi.reducerPath]: baseApi.reducer },
      middleware: (g) => g().concat(baseApi.middleware),
    });
    jest.clearAllMocks();
  });

  test('getNotifications should make GET request', async () => {
    mockedApi.mockResolvedValue({
      data: [{ id: '1', title: 'Test' }],
      headers: {},
    });

    const result = await store.dispatch(
      notificationApi.endpoints.getNotifications.initiate(),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/notifications',
        method: 'GET',
      }),
    );
    expect(result.data).toHaveLength(1);
  });

  test('createNotification should make POST request with data', async () => {
    const newNotification: Partial<Notification> = {
      message: 'New Alert',
      employeeId: 'emp-123',
      read: false,
    };

    mockedApi.mockResolvedValue({
      data: { id: 'notif-1', ...newNotification },
      headers: {},
    });

    const result = await store.dispatch(
      notificationApi.endpoints.createNotification.initiate(newNotification),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/notifications',
        method: 'POST',
        data: newNotification,
      }),
    );

    expect(result.data?.message).toBe('New Alert');
  });

  test('updateNotificationSettings should make PATCH request with nested data', async () => {
    mockedApi.mockResolvedValue({ data: {}, headers: {} });

    await store.dispatch(
      notificationApi.endpoints.updateNotificationSettings.initiate({
        id: 'emp-1',
        enabled: true,
      }),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/employees/emp-1',
        method: 'PATCH',
        data: { notifications: { newEmployees: true } },
      }),
    );
  });

  test('markAsRead should send read: true via PATCH', async () => {
    mockedApi.mockResolvedValue({ data: {}, headers: {} });

    await store.dispatch(
      notificationApi.endpoints.markAsRead.initiate('notif-123'),
    );

    expect(mockedApi).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/notifications/notif-123',
        method: 'PATCH',
        data: { read: true },
      }),
    );
  });
});

import { baseApi } from '@/shared/api/baseApi';
import { Notification } from '../model/types/notification';

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<Notification[], void>({
      query: () => ({
        url: '/notifications',
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),
    createNotification: build.mutation<Notification, Partial<Notification>>({
      query: (notification) => ({
        url: '/notifications',
        method: 'POST',
        data: notification,
      }),
      invalidatesTags: ['Notifications'],
    }),
    updateNotificationSettings: build.mutation<
      void,
      { id: string; enabled: boolean }
    >({
      query: ({ id, enabled }) => ({
        url: `/employees/${id}`,
        method: 'PATCH',
        data: { notifications: { newEmployees: enabled } },
      }),
    }),
    markAsRead: build.mutation<void, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
        data: { read: true },
      }),
      invalidatesTags: ['Notifications'],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useCreateNotificationMutation,
  useUpdateNotificationSettingsMutation,
  useMarkAsReadMutation,
} = notificationApi;

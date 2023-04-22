import { rtkApi } from 'shared/api/rtkApi';
import { Article } from 'entities/Article';
import { Notification } from '../model/types/notifications';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotificationList: build.query<Notification[], number>({
            query: (limit) => ({
                url: '/notifications',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const useNotifications = notificationApi.useGetNotificationListQuery;

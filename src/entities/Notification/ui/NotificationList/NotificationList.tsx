import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { useNotifications } from '../../api/notificationApi';
import cls from './NotificationList.module.scss';

interface NotificationListProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
    const { className } = props;

    const { data, isLoading } = useNotifications(4, {
        pollingInterval: 5000,
    });

    if (isLoading) {
        return (
            <VStack
                gap="8"
                max
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width="100%" borderRadius="8px" height="280px" />
                <Skeleton width="100%" borderRadius="8px" height="280px" />
                <Skeleton width="100%" borderRadius="8px" height="280px" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="8"
            max
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
});

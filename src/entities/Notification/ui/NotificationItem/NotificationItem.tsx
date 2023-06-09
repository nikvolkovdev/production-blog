import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardVariant } from '@/shared/ui/Card';
import { AppText } from '@/shared/ui/AppText';
import { AppLink } from '@/shared/ui/AppLink';
import { Notification } from '../../model/types/notifications';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <Card
            variant={CardVariant.OUTLINE}
            className={classNames(cls.NotificationItem, {}, [className])}
        >
            <AppText
                title={item.title}
                description={item.description}
            />
        </Card>
    );

    if (item.href) {
        return (
            <AppLink
                className={cls.link}
                target="_blank"
                to={item.href}
            >
                {content}
            </AppLink>
        );
    }

    return content;
});

import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { AppIcon } from 'shared/ui/AppIcon/AppIcon';
import NotificationIcon from 'shared/assets/icons/notificaton.svg';
import { NotificationList } from 'entities/Notification';
import { Popover } from 'shared/ui/Popups';
import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const {
        className,
    } = props;

    return (
        <Popover
            className={classNames('', {}, [className])}
            direction="bottom left"
            trigger={(
                <AppButton variant={ButtonVariant.CLEAR}>
                    <AppIcon Svg={NotificationIcon} inverted />
                </AppButton>
            )}
        >
            <NotificationList className={cls.NotificationButton} />
        </Popover>
    );
});

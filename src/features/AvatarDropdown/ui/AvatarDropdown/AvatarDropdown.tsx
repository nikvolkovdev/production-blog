import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppAvatar } from '@/shared/ui/AppAvatar';
import { Dropdown } from '@/shared/ui/Popups';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/User';
import cls from './AvatarDropdown.module.scss';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const {
        className,
    } = props;

    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const isAdminPanelAvailable = isAdmin || isManager;
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    return (
        <Dropdown
            className={classNames(cls.AvatarDropdown, {}, [className, cls.dropdown])}
            direction="bottom left"
            items={[
                ...(isAdminPanelAvailable ? [{
                    content: 'Админка',
                    href: getRouteAdmin(),
                }] : []),
                {
                    content: 'Профиль',
                    href: getRouteProfile(authData.id),
                },
                {
                    content: 'Выйти',
                    onClick: onLogout,
                },

            ]}
            trigger={<AppAvatar size={30} src={authData.avatar} fallbackInverted />}
        />
    );
});

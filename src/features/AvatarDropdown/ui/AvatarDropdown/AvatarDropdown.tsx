import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import { AppAvatar } from 'shared/ui/AppAvatar/AppAvatar';
import { Dropdown } from 'shared/ui/Popups';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import cls from './AvatarDropdown.module.scss';

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
                    href: ROUTE_PATH.admin_panel,
                }] : []),
                {
                    content: 'Профиль',
                    href: ROUTE_PATH.profile + authData.id,
                },
                {
                    content: 'Выйти',
                    onClick: onLogout,
                },

            ]}
            trigger={<AppAvatar size={30} src={authData.avatar} />}
        />

    );
});

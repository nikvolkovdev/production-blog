import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from 'entities/User';
import { AppText, AppTextVariant } from 'shared/ui/AppText/AppText';
import { AppLink, AppLinkVariant } from 'shared/ui/AppLink/AppLink';
import { ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { AppAvatar } from 'shared/ui/AppAvatar/AppAvatar';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    const [isAuthModal, setIsAuthModal] = useState(false);

    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const onCloseModal = () => {
        setIsAuthModal(false);
    };

    const onShowModal = () => {
        setIsAuthModal(true);
    };

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <AppText className={cls.appName} title="Hmm..!?" variant={AppTextVariant.INVERTED} />
                <AppLink
                    to={ROUTE_PATH.article_create}
                    variant={AppLinkVariant.INVERTED}
                    className={cls.createBtn}
                >
                    Создать статью
                </AppLink>
                <Dropdown
                    direction="bottom left"
                    className={cls.dropdown}
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
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <AppButton
                className={cls.links}
                buttonType="button"
                variant={ButtonVariant.CLEAR_INVERTED}
                onClick={onShowModal}
            >
                Войти
            </AppButton>
            {isAuthModal && <LoginModal onClose={onCloseModal} isOpen={isAuthModal} />}
        </header>
    );
});

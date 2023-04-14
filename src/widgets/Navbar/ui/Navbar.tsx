import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { AppText, AppTextVariant } from 'shared/ui/AppText/AppText';
import { AppLink, AppLinkVariant } from 'shared/ui/AppLink/AppLink';
import { ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    const [isAuthModal, setIsAuthModal] = useState(false);

    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();

    const onCloseModal = () => {
        setIsAuthModal(false);
    };

    const onShowModal = () => {
        setIsAuthModal(true);
    };

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

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
                <AppButton
                    variant={ButtonVariant.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onLogout}
                >
                    Выйти
                </AppButton>
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

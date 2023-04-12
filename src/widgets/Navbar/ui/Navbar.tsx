import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
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

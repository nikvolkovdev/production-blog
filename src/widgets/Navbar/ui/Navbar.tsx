import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { LoginModal } from 'features/AuthByUsername';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onCloseModal = () => {
        setIsAuthModal(false);
    };

    const onShowModal = () => {
        setIsAuthModal(true);
    };

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <AppButton
                className={cls.links}
                buttonType="button"
                variant={ButtonVariant.CLEAR_INVERTED}
                onClick={onShowModal}
            >
                Войти
            </AppButton>
            <LoginModal onClose={onCloseModal} isOpen={isAuthModal} />
        </div>
    );
});

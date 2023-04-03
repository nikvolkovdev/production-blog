import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { AppButton, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { Modal } from 'shared/ui/Modal/Modal';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    const [isAuthModal, setIsAuthModal] = useState(false);

    const onToggleModal = () => {
        setIsAuthModal((prevState) => !prevState);
    };

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <AppButton
                className={cls.links}
                buttonType="button"
                onClick={onToggleModal}
                variant={ButtonVariant.CLEAR_INVERTED}
            >
                Войти
            </AppButton>
            <Modal onClose={onToggleModal} isOpen={isAuthModal}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab atque cum debitis dicta eum hic
                impedit inventore itaque iure minima neque nihil quaerat quibusdam quis, reiciendis repellat
                repellendus tempore vero?
            </Modal>
        </div>
    );
});

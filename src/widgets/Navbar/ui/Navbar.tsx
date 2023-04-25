import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppButton, ButtonVariant } from '@/shared/ui/AppButton';
import { LoginModal } from '@/features/AuthByUsername';
import {
    getUserAuthData,
} from '@/entities/User';
import { AppText, AppTextVariant } from '@/shared/ui/AppText';
import { AppLink, AppLinkVariant } from '@/shared/ui/AppLink';
import { HStack } from '@/shared/ui/Stack';
import { NotificationButton } from '@/features/NotificationButton';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import cls from './Navbar.module.scss';
import { ROUTE_PATH } from '@/shared/const/router';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo((props: NavbarProps) => {
    const { className } = props;

    const [isAuthModal, setIsAuthModal] = useState(false);

    const authData = useSelector(getUserAuthData);

    const onCloseModal = () => {
        setIsAuthModal(false);
    };

    const onShowModal = () => {
        setIsAuthModal(true);
    };

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
                <HStack gap="16" max={false} className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
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

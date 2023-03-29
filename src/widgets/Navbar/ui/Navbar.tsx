import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => (
    <div className={classNames(cls.Navbar, {}, [className])}>
        <div className={cls.links}>
            <AppLink to="/" className={cls.mainLink}>Main Page</AppLink>
            <AppLink to="/about">About Page</AppLink>
        </div>
    </div>
));

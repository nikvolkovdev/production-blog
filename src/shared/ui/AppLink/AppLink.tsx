import {classNames} from 'shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';
import {memo, ReactNode} from 'react';
import {Link, LinkProps} from "react-router-dom";

export enum AppLinkVariant {
    PRIMARY = 'primary',
    INVERTED = 'inverted'
}


interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {

    const {
        className,
        children,
        variant = AppLinkVariant.PRIMARY,
        ...otherProps
    } = props;

    return (
        <Link
            className={classNames(cls.AppLink, {}, [className, cls[variant]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});
import React, { ForwardedRef, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppLink.module.scss';

export enum AppLinkVariant {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children: ReactNode;
}

export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(
    (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
        const { className, children, variant = AppLinkVariant.PRIMARY, ...otherProps } = props;

        return (
            <Link
                className={classNames(cls.AppLink, {}, [className, cls[variant]])}
                {...otherProps}
                ref={ref}
            >
                {children}
            </Link>
        );
    },
);

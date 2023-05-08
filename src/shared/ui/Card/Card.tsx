import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardVariant {
    NORMAL = 'normal',
    OUTLINE = 'outline',
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
}

export const Card = memo((props: CardProps) => {
    const { className, children, variant = CardVariant.NORMAL, max = false, ...otherProps } = props;

    return (
        <div
            className={classNames(cls.Card, { [cls.max]: max }, [className, cls[variant]])}
            {...otherProps}
        >
            {children}
        </div>
    );
});

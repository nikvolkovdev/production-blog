import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './AppText.module.scss';

export enum AppTextVariant {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center'
}

interface AppTextProps {
    className?: string;
    title?: string;
    description?: string;
    variant?: AppTextVariant;
    align?: TextAlign
}

export const AppText = memo((props: AppTextProps) => {
    const {
        className,
        title,
        description,
        variant = AppTextVariant.PRIMARY,
        align = TextAlign.LEFT,
    } = props;

    return (
        <div className={classNames(cls.AppText, {}, [className, cls[variant], cls[align]])}>
            {title && <p className={cls.title}>{title}</p>}
            {description && <p className={cls.description}>{description}</p>}
        </div>
    );
});

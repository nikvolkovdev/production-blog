import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './AppText.module.scss';

export enum AppTextVariant {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center'
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface AppTextProps {
    className?: string;
    title?: string;
    description?: string;
    variant?: AppTextVariant;
    align?: TextAlign
    size?: TextSize;
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};

export const AppText = memo((props: AppTextProps) => {
    const {
        className,
        title,
        description,
        variant = AppTextVariant.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div className={classNames(cls.AppText, {}, [className, cls[variant], cls[align], cls[size]])}>
            {title && <HeaderTag className={cls.title}>{title}</HeaderTag>}
            {description && <p className={cls.description}>{description}</p>}
        </div>
    );
});

import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo } from 'react';
import cls from './AppIcon.module.scss';

interface AppIconProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    inverted?: boolean;
}

export const AppIcon = memo((props: AppIconProps) => {
    const {
        className,
        Svg,
        inverted,
    } = props;

    return (
        <Svg className={classNames(inverted ? cls.inverted : cls.AppIcon, {}, [className])} />
    );
});

import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo, useMemo } from 'react';
import cls from './AppAvatar.module.scss';

interface AppAvatarProps {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
}

export const AppAvatar = memo((props: AppAvatarProps) => {
    const {
        className,
        src,
        alt,
        size,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    return (
        <img
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.AppAvatar, {}, [className])}
        />
    );
});

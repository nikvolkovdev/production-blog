import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AppAvatar.module.scss';
import { AppImage } from '../../ui/AppImage';
import UserIcon from '@/shared/assets/icons/user-filled.svg';
import { AppIcon } from '../AppIcon';
import { Skeleton } from '../Skeleton/Skeleton';

interface AppAvatarProps {
    className?: string;
    src?: string;
    alt?: string;
    size?: number;
    fallbackInverted?: boolean;
}

export const AppAvatar = memo((props: AppAvatarProps) => {
    const {
        className,
        src,
        alt,
        size,
        fallbackInverted,
    } = props;

    const styles = useMemo<CSSProperties>(() => ({
        width: size || 100,
        height: size || 100,
    }), [size]);

    const fallback = <Skeleton width={size} height={size} borderRadius="50%" />;
    const errorFallback = <AppIcon inverted={fallbackInverted} Svg={UserIcon} width={size} height={size} />;

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            alt={alt}
            style={styles}
            className={classNames(cls.AppAvatar, {}, [className])}
        />
    );
});

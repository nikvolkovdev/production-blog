import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = memo((props: PageLoaderProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(cls.PageLoader, {}, [className])}>
            <Loader />
        </div>
    );
});

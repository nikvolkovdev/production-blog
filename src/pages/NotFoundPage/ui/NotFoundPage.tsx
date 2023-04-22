import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppPage } from '@/widgets/AppPage/AppPage';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = memo((props: NotFoundPageProps) => {
    const {
        className,
    } = props;

    return (
        <AppPage className={classNames(cls.NotFoundPage, {}, [className])}>
            Страница не найдена
        </AppPage>
    );
});

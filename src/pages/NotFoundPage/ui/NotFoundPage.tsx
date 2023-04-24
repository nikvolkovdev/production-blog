import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NotFoundPage.module.scss';
import { AppPage } from '@/widgets/AppPage';

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

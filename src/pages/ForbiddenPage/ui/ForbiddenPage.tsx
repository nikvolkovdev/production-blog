import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppPage } from 'widgets/AppPage/AppPage';

interface ForbiddenPageProps {
    className?: string;
}

export const ForbiddenPage = memo((props: ForbiddenPageProps) => {
    const {
        className,
    } = props;

    return (
        <AppPage className={classNames('', {}, [className])}>
            У вас нет доступа к этой странице
        </AppPage>
    );
});

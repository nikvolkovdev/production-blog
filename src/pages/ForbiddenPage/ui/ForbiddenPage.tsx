import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppPage } from '@/widgets/AppPage';

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

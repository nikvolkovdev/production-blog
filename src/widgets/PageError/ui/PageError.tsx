import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppButton, ButtonVariant } from '@/shared/ui/AppButton';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError = memo((props: PageErrorProps) => {
    const {
        className,
    } = props;

    const onReload = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.PageError, {}, [className])}>
            <p>Произошла чудовищная ошибка</p>
            <AppButton buttonType="button" variant={ButtonVariant.OUTLINE} onClick={onReload}>
                Обновить страницу
            </AppButton>
        </div>
    );
});

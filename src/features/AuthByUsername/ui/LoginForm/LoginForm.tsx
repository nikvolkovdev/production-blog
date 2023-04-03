import { classNames } from 'shared/lib/classNames/classNames';

import { memo } from 'react';
import { AppButton } from 'shared/ui/AppButton/AppButton';
import { AppInput } from 'shared/ui/AppInput/AppInput';
import cls from './LoginForm.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo((props: LoginFormProps) => {
    const {
        className,
    } = props;

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <AppInput autofocus type="text" className={cls.input} placeholder="Введите username" />
            <AppInput type="text" className={cls.input} placeholder="Введите пароль" />
            <AppButton className={cls.loginBtn}>Войти</AppButton>
        </div>
    );
});

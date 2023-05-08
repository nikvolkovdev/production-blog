import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import { AppButton, ButtonVariant } from '@/shared/ui/AppButton';
import { AppInput } from '@/shared/ui/AppInput';
import { AppText, AppTextVariant } from '@/shared/ui/AppText';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDisptach';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};

const LoginForm = memo((props: LoginFormProps) => {
    const { className, onSuccess } = props;

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const dispatch = useAppDispatch();

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value));
        },
        [dispatch],
    );

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, onSuccess, password, username]);

    const onEnter = useCallback(
        async (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                const result = await onLoginClick();
            }
        },
        [onLoginClick],
    );

    useEffect(() => {
        window.addEventListener('keydown', onEnter);

        return () => {
            window.removeEventListener('keydown', onEnter);
        };
    }, [onEnter]);

    return (
        <DynamicModuleLoader reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                {error && (
                    <AppText
                        title={error}
                        variant={AppTextVariant.ERROR}
                    />
                )}
                <AppInput
                    autofocus
                    type="text"
                    className={cls.input}
                    placeholder="Введите username"
                    onChange={onChangeUsername}
                    value={username}
                    spaceBetween
                />
                <AppInput
                    type="text"
                    className={cls.input}
                    placeholder="Введите пароль"
                    onChange={onChangePassword}
                    value={password}
                    spaceBetween
                />
                <AppButton
                    className={cls.loginBtn}
                    variant={ButtonVariant.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    Войти
                </AppButton>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;

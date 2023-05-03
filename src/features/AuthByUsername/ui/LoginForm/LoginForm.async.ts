import { FC, lazy } from 'react';
import { LoginFormProps } from '../LoginForm/LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
    () => import('./LoginForm'),
);

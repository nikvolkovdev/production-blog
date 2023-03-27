import {classNames} from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
import {ButtonHTMLAttributes, memo, ReactNode} from 'react';

export enum ButtonVariant {
    CLEAR = 'clear',
    OUTLINE = 'outline'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    children: ReactNode;
}

export const Button = memo((props: ButtonProps) => {

    const {
        className,
        children,
        variant = ButtonVariant.CLEAR,
        ...otherProps
    } = props;

    return (
        <button className={classNames(cls.Button, {}, [className, cls[variant]])} {...otherProps}>
            {children}
        </button>
    );
});
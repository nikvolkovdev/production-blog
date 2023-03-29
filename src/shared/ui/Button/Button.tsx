import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Button.module.scss';

export enum ButtonVariant {
    CLEAR = 'clear',
    OUTLINE = 'outline'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    children: ReactNode;
    buttonType: 'button' | 'submit' | 'reset';
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = ButtonVariant.CLEAR,
        buttonType = 'button',
        ...otherProps
    } = props;

    return (
        // eslint-disable-next-line react/button-has-type
        <button className={classNames(cls.Button, {}, [className, cls[variant]])} type={buttonType} {...otherProps}>
            {children}
        </button>
    );
});

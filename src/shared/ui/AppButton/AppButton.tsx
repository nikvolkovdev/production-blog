import { classNames } from 'shared/lib/classNames/classNames';
import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cls from './AppButton.module.scss';

export enum ButtonVariant {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    children?: ReactNode;
    buttonType?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

export const AppButton = memo((props: ButtonProps) => {
    const {
        className,
        children,
        variant = ButtonVariant.OUTLINE,
        square,
        size = ButtonSize.M,
        buttonType = 'button',
        disabled = false,
        ...otherProps
    } = props;

    return (
        <button
            className={classNames(
                cls.AppButton,
                { [cls.square]: square, [cls.disabled]: disabled },
                [className, cls[variant], cls[size]],
            )}
            // eslint-disable-next-line react/button-has-type
            type={buttonType}
            {...otherProps}
            disabled={disabled}
        >
            {children}
        </button>
    );
});

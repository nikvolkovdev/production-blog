import React, {
    ButtonHTMLAttributes, ForwardedRef, memo, ReactNode,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
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
    fullWidth?: boolean;
}

export const AppButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = ButtonVariant.OUTLINE,
            square,
            size = ButtonSize.M,
            buttonType = 'button',
            fullWidth,
            disabled = false,
            ...otherProps
        } = props;

        return (
            <button
                className={classNames(
                    cls.AppButton,
                    { [cls.square]: square, [cls.disabled]: disabled, [cls.fullWidth]: fullWidth },
                    [className, cls[variant], cls[size]],
                )}
                // eslint-disable-next-line react/button-has-type
                type={buttonType}
                {...otherProps}
                disabled={disabled}
                ref={ref}
            >
                {children}
            </button>
        );
    },
);

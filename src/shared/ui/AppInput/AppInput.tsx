import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './AppInput.module.scss';

export enum InputVariant {
    TRANSPARENT = 'transparent',
    NORMAL = 'normal'
}

// Таким образом исключаем стандартные свойства инпута. Стандартный инпут принимает ивент,
// а мы хотим наверх отдавать сразу value.
type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface AppInputProps extends HTMLInputProps{
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    variant?: InputVariant;
    autofocus?: boolean;
    spaceBetween?: boolean;
    readOnly?: boolean;
}

// сделать onBlur и onFocus

export const AppInput = memo((props: AppInputProps) => {
    const {
        className,
        value,
        onChange,
        variant = InputVariant.NORMAL,
        type = 'text',
        placeholder,
        autofocus,
        spaceBetween = false,
        readOnly,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const mods: Mods = { [cls.spaceBetween]: spaceBetween, [cls.readOnly]: readOnly };

    return (
        <div className={classNames(cls.AppInputWrapper, mods, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {placeholder}
                </div>
            )}
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={classNames(cls.input, {}, [cls[variant]])}
                readOnly={readOnly}
                {...otherProps}
                /* eslint-disable-next-line jsx-a11y/no-autofocus */
                autoFocus={isFocused}
            />
        </div>
    );
});

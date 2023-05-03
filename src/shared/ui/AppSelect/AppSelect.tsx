import { ChangeEvent, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './AppSelect.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface AppSelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChangeValue?: (value: T) => void;
    readOnly?: boolean;
}

export const AppSelect = <T extends string>(props: AppSelectProps<T>) => {
    const { className, label, options, value, onChangeValue, readOnly } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeValue?.(e.target.value as T);
    };

    const optionsList = useMemo(
        () =>
            options?.map((opt: SelectOption<T>) => (
                <option
                    className={cls.option}
                    value={opt.value}
                    key={opt.value}
                >
                    {opt.content}
                </option>
            )),
        [options],
    );

    const mods: Mods = {};

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{label}</span>}
            <select
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                disabled={readOnly}
            >
                {optionsList}
            </select>
        </div>
    );
};

import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useMemo } from 'react';
import cls from './AppSelect.module.scss';

export interface SelectOption {
    value: string;
    content: string;
}

interface AppSelectProps {
    className?: string;
    label?: string
    options?: SelectOption[];
    value?: string;
    onChangeValue?: (value: string) => void;
    readOnly?: boolean;
}

export const AppSelect = memo((props: AppSelectProps) => {
    const {
        className,
        label,
        options,
        value,
        onChangeValue,
        readOnly,
    } = props;

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChangeValue?.(e.target.value);
    };

    const optionsList = useMemo(() => options?.map((opt: SelectOption) => (
        <option
            className={cls.option}
            value={opt.value}
            key={opt.value}
        >
            {opt.content}
        </option>
    )), [options]);

    const mods: Mods = {

    };

    return (
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{label}</span>}
            <select className={cls.select} value={value} onChange={onChangeHandler} disabled={readOnly}>
                {optionsList}
            </select>
        </div>
    );
});

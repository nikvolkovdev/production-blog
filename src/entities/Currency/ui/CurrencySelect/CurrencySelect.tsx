import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChangeCurrency?: (value: Currency) => void;
    readOnly?: boolean;
}

const options = [
    { value: Currency.KZT, content: Currency.KZT },
    { value: Currency.EUR, content: Currency.EUR },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.RUB, content: Currency.RUB },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        value,
        onChangeCurrency,
        readOnly,
    } = props;

    const onChangeHandler = useCallback((value: string) => {
        onChangeCurrency?.(value as Currency);
    }, [onChangeCurrency]);

    return (
        <ListBox
            onChange={onChangeHandler}
            value={value}
            items={options}
            defaultValue="Укажите валюту"
            className={className}
            readonly={readOnly}
            label="Укажите валюту"
        />
    );

    // return (
    //     <AppSelect
    //         className={classNames(cls.CurrencySelect, {}, [className])}
    //         label="Укажите валюту"
    //         options={options}
    //         value={value}
    //         onChangeValue={onChangeHandler}
    //         readOnly={readOnly}
    //     />
    // );
});

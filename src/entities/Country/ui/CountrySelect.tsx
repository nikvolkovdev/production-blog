import { memo, useCallback } from 'react';
import { ListBox } from '@/shared/ui/Popups';
import { Country } from '../model/types/country';

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChangeCountry?: (value: Country) => void;
    readOnly?: boolean;
}

const options = [
    { value: Country.KAZAKHSTAN, content: Country.KAZAKHSTAN },
    { value: Country.RUSSIA, content: Country.RUSSIA },
    { value: Country.BELARUS, content: Country.BELARUS },
    { value: Country.UKRAINE, content: Country.UKRAINE },
    { value: Country.ARMENIA, content: Country.ARMENIA },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className,
        value,
        onChangeCountry,
        readOnly,
    } = props;

    const onChangeHandler = useCallback((value: string) => {
        onChangeCountry?.(value as Country);
    }, [onChangeCountry]);

    return (
        <ListBox
            onChange={onChangeHandler}
            value={value}
            defaultValue="Укажите страну"
            className={className}
            items={options}
            readonly={readOnly}
            direction="top right"
            label="Укажите страну"
        />
    );

    // return (
    //     <AppSelect
    //         className={classNames(cls.CountrySelect, {}, [className])}
    //         label="Укажите страну"
    //         options={options}
    //         value={value}
    //         onChangeValue={onChangeHandler}
    //         readOnly={readOnly}
    //     />
    // );
});

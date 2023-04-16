import { useState, Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from '../Stack/HStack/HStack';
import cls from './ListBox.module.scss';
import { AppButton } from '../AppButton/AppButton';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

type DropDownDirection = 'top' | 'bottom';

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange?: <T extends string>(value: string) => void;
    readonly?: boolean;
    direction?: DropDownDirection;
    label?: string;
}

export function ListBox(props: ListBoxProps) {
    const {
        items, className, value, defaultValue, onChange, readonly, direction = 'bottom', label,
    } = props;
    const [selectedPerson, setSelectedPerson] = useState();

    const mapDirectionClass: Record<DropDownDirection, string> = {
        bottom: cls.optionBottom,
        top: cls.optionsTop,
    };

    return (
        <HStack gap="4" align="center">
            {label && <span className={classNames('', { [cls.label]: readonly }, [])}>{label}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                value={selectedPerson}
                onChange={onChange}
                className={classNames(cls.ListBox, {}, [className])}
            >
                <HListBox.Button
                    className={cls.trigger}
                >
                    <AppButton disabled={readonly}>
                        {value ?? defaultValue}
                    </AppButton>
                </HListBox.Button>
                <HListBox.Options className={classNames(cls.options, {}, [mapDirectionClass[direction]])}>
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li className={classNames(cls.item, {
                                    [cls.active]: active,
                                    [cls.disabled]: item.disabled,
                                }, [])}
                                >
                                    {item.content}
                                </li>
                            )}

                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
}

/* {({ active, selected }) => ( */
/*    <li */
/*        className={`${ */
/*            active ? 'bg-blue-500 text-white' : 'bg-white text-black' */
/*        }`} */
/*    > */
/*        {selected && <CheckIcon />} */
/*        {person.name} */
/*    </li> */
/* )} */

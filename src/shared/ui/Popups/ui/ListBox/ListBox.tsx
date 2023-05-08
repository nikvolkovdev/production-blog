import { useState, Fragment, ReactNode } from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropDownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/consts';
import { HStack } from '../../../Stack/HStack/HStack';
import cls from './ListBox.module.scss';
import { AppButton } from '../../../AppButton/AppButton';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

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
    const { items, className, value, defaultValue, onChange, readonly, direction = 'bottom right', label } = props;
    const [selectedPerson, setSelectedPerson] = useState();

    return (
        <HStack
            gap="4"
            align="center"
        >
            {label && <span className={classNames('', { [cls.label]: readonly }, [className])}>{label}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                value={selectedPerson}
                onChange={onChange}
                className={classNames(cls.ListBox, {}, [className, popupCls.popup])}
            >
                <HListBox.Button
                    as="div"
                    className={popupCls.trigger}
                >
                    <AppButton disabled={readonly}>{value ?? defaultValue}</AppButton>
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
                                <li
                                    className={classNames(
                                        cls.item,
                                        {
                                            [popupCls.active]: active,
                                            [popupCls.disabled]: item.disabled,
                                        },
                                        [],
                                    )}
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

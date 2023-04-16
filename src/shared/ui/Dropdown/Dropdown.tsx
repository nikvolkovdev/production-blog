import { Menu } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropDownDirection } from 'shared/types/ui';
import { AppLink } from '../../ui/AppLink/AppLink';
import cls from './Dropdown.module.scss';
import { AppButton } from '../AppButton/AppButton';

export interface DropDownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropDownItem[];
    trigger: ReactNode;
    direction?: DropDownDirection;
}

const mapDirectionClass: Record<DropDownDirection, string> = {
    'bottom left': cls.optionBottomLeft,
    'bottom right': cls.optionBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
};

export function Dropdown(props: DropdownProps) {
    const {
        className, items, trigger, direction = 'bottom right',
    } = props;

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, [mapDirectionClass[direction]])}>
                {items.map((item) => {
                    const content = (({ active }: {active: boolean}) => (
                        <AppButton
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className={classNames(cls.item, { [cls.active]: active }, [])}
                        >
                            {item.content}
                        </AppButton>
                    )
                    );

                    if (item.href) {
                        return (
                            <Menu.Item disabled={item.disabled} as={AppLink} to={item.href}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item disabled={item.disabled} as={Fragment}>
                            {content}
                        </Menu.Item>
                    );
                })}

            </Menu.Items>
        </Menu>
    );
}

import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useMemo, useState } from 'react';
import { ThemeSwitcher } from 'features/ThemeSwitcher/ui/ThemeSwitcher';
import { AppButton, ButtonSize, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { SidebarItemsList } from 'widgets/Sidebar/model/items';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const {
        className,
    } = props;

    const [collapsed, setCollapsed] = useState(false);

    const onToggle = () => {
        setCollapsed((prevState) => !prevState);
    };

    return (
        <div
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <div className={cls.items}>
                { SidebarItemsList.map((item) => (
                    <SidebarItem
                        item={item}
                        key={item.path}
                        collapsed={collapsed}
                    />
                ))}
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <AppButton
                    data-testid="toggle-sidebar"
                    buttonType="button"
                    onClick={onToggle}
                    variant={ButtonVariant.BACKGROUND}
                    square
                    size={ButtonSize.L}
                    className={classNames(cls.collapsedBtn, {}, [])}
                >
                    {collapsed ? '>' : '<'}
                </AppButton>
            </div>
        </div>
    );
});

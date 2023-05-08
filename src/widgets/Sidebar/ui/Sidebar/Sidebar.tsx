import { useSelector } from 'react-redux';
import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppButton, ButtonSize, ButtonVariant } from '@/shared/ui/AppButton';
import { VStack } from '@/shared/ui/Stack';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './Sidebar.module.scss';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo((props: SidebarProps) => {
    const { className } = props;

    const [collapsed, setCollapsed] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prevState) => !prevState);
    };

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <VStack
                role="navigation"
                gap="8"
                className={cls.items}
            >
                {sidebarItemsList.map((item) => (
                    <SidebarItem
                        item={item}
                        key={item.path}
                        collapsed={collapsed}
                    />
                ))}
            </VStack>
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
        </aside>
    );
});

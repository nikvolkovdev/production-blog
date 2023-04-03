import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useState } from 'react';
import { ThemeSwitcher } from 'features/ThemeSwitcher/ui/ThemeSwitcher';
import { AppButton, ButtonSize, ButtonVariant } from 'shared/ui/AppButton/AppButton';
import { AppLink, AppLinkVariant } from 'shared/ui/AppLink/AppLink';
import { AppRoutes, ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import cls from './Sidebar.module.scss';
import MainIcon from '../../../../shared/assets/main.svg';
import AboutIcon from '../../../../shared/assets/about.svg';

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
                <div className={cls.item}>
                    <AppLink to={ROUTE_PATH[AppRoutes.MAIN]} className={cls.item} variant={AppLinkVariant.INVERTED}>
                        <MainIcon className={cls.icon} />
                        <span className={cls.link}>{!collapsed && 'Главная'}</span>
                    </AppLink>
                </div>
                <div className={cls.item}>
                    <AppLink to={ROUTE_PATH[AppRoutes.ABOUT]} className={cls.item} variant={AppLinkVariant.INVERTED}>
                        <AboutIcon className={cls.icon} />
                        <span className={cls.link}>{!collapsed && 'О сайте'}</span>
                    </AppLink>
                </div>
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

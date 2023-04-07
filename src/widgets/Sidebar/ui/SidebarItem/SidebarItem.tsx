import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { AppLink, AppLinkVariant } from 'shared/ui/AppLink/AppLink';
import { AppRoutes, ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import MainIcon from 'shared/assets/main.svg';
import { SidebarItemType } from '../../model/items';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const {
        item,
        collapsed,
    } = props;

    return (
        <AppLink to={item.path} className={cls.item} variant={AppLinkVariant.INVERTED}>
            <item.Icon className={cls.icon} />
            <span className={classNames(cls.link, { [cls.collapsed]: collapsed })}>{!collapsed && item.text}</span>
        </AppLink>
    );
});

import React from 'react';
import { AppRoutes, ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';
import MainIcon from '../../../shared/assets/main.svg';
import AboutIcon from '../../../shared/assets/about.svg';
import ProfileIcon from '../../../shared/assets/profile.svg';

export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: ROUTE_PATH.main,
        text: 'Главная',
        Icon: MainIcon,
    },
    {
        path: ROUTE_PATH.about,
        text: 'О сайте',
        Icon: AboutIcon,
    },
    {
        path: ROUTE_PATH.profile,
        text: 'Профиль',
        Icon: ProfileIcon,
        authOnly: true,
    },
];

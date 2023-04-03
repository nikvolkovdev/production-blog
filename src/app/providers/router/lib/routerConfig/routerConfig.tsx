import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'notFound',
}

export const ROUTE_PATH: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.NOT_FOUND]: '*',
};

export const ROUTER_CONFIG: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: ROUTE_PATH.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: ROUTE_PATH.about,
        element: <AboutPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: ROUTE_PATH.notFound,
        element: <NotFoundPage />,
    },
};

import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';

type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND = 'notFound',
    PROFILE = 'profile',
}

export const ROUTE_PATH: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    // last one
    [AppRoutes.NOT_FOUND]: '*',
};

export const ROUTER_CONFIG: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: ROUTE_PATH.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: ROUTE_PATH.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: ROUTE_PATH.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.NOT_FOUND]: {
        path: ROUTE_PATH.notFound,
        element: <NotFoundPage />,
    },
};

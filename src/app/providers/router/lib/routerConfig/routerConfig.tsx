import { MainPage } from '@/pages/MainPage';
import { AboutPage } from '@/pages/AboutPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ArticlesPage } from '@/pages/ArticlesPage';
import { ArticleDetailsPage } from '@/pages/ArticleDetailsPage';
import { ArticleEditPage } from '@/pages/ArticleEditPage';
import { AdminPanelPage } from '@/pages/AdminPanelPage';
import { UserRole } from '@/entities/User';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { AppRoutes, ROUTE_PATH } from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';

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
        path: `${ROUTE_PATH.profile}:id`,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLES]: {
        path: ROUTE_PATH.articles,
        element: <ArticlesPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_DETAILS]: {
        path: `${ROUTE_PATH.article_details}:id`,
        element: <ArticleDetailsPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_CREATE]: {
        path: `${ROUTE_PATH.article_create}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ARTICLE_EDIT]: {
        path: `${ROUTE_PATH.article_edit}`,
        element: <ArticleEditPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: ROUTE_PATH.admin_panel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER],
    },
    [AppRoutes.FORBIDDEN]: {
        path: ROUTE_PATH.forbidden,
        element: <ForbiddenPage />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: ROUTE_PATH.notFound,
        element: <NotFoundPage />,
    },
};

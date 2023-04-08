import React, { Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTER_CONFIG } from 'app/providers/router/lib/routerConfig/routerConfig';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

export const AppRouter = () => {
    const isAuth = useSelector(getUserAuthData);

    const routes = useMemo(() => Object.values(ROUTER_CONFIG).filter((route) => {
        if (route.authOnly && !isAuth) {
            return false;
        }
        return true;
    }), [isAuth]);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routes).map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={(<div className="page-wrapper">{route.element}</div>)}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

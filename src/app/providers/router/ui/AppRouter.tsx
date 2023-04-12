import React, { Suspense, useCallback, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes, AppRoutesProps, ROUTER_CONFIG } from 'app/providers/router/lib/routerConfig/routerConfig';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { RequireAuth } from 'app/providers/router/ui/RequireAuth';

export const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <div>{route.element}</div>
        );

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(ROUTER_CONFIG).map(renderWithWrapper)}
                {/* {Object.values(ROUTER_CONFIG.).map((route) => ( */}

                {/* ))} */}
            </Routes>
        </Suspense>
    );
};

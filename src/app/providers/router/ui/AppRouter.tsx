import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTER_CONFIG } from 'app/providers/router/lib/routerConfig/routerConfig';

export const AppRouter = () => (
    <Suspense fallback="Loading...">
        <Routes>
            {Object.values(ROUTER_CONFIG).map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={(<div className="page-wrapper">{route.element}</div>)}
                />
            ))}
        </Routes>
    </Suspense>
);

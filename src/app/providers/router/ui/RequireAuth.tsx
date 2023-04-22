import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
import { ROUTE_PATH } from '@/app/providers/router/lib/routerConfig/routerConfig';

interface RequireAuthProps {
    children: JSX.Element,
    roles?: UserRole[],
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();
    const userRoles = useSelector(getUserRoles);

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }
        return roles.some((requiredRoles) => {
            const hasRole = userRoles?.includes(requiredRoles);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={ROUTE_PATH.main} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={ROUTE_PATH.forbidden} state={{ from: location }} replace />;
    }

    return children;
}

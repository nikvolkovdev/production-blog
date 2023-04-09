import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { ROUTE_PATH } from 'app/providers/router/lib/routerConfig/routerConfig';

export function RequireAuth({ children }: {children: JSX.Element }) {
    const auth = useSelector(getUserAuthData);
    const location = useLocation();

    if (!auth) {
        return <Navigate to={ROUTE_PATH.main} state={{ from: location }} replace />;
    }

    return children;
}

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from '../app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, userActions } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {})}>
            <Navbar />
            <div className="content-page">
                <Sidebar />
                {inited && <AppRouter />}
            </div>
        </div>
    );
};

export default App;

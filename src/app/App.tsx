import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from '../app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInited, initAuthData } from '@/entities/User';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDisptach';
import { PageLoader } from '@/widgets/PageLoader';

const App = () => {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    // const themeFromSettings = useJsonSettingsByKey('theme');
    // const isFirstVisit = useJsonSettingsByKey('isFirstVisit');

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

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

import {Link} from "react-router-dom";
import {useTheme} from "app/providers/ThemeProvider";
import {classNames} from "shared/lib/classNames/classNames";
import {AppRouter} from "app/providers/router";

const App = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className = {classNames('app', {}, [theme])}>
            <Link to={'/'}>Main Page</Link>
            <Link to={'/about'}>About Page</Link>
            <button onClick={toggleTheme}>change theme</button>
            <AppRouter />
        </div>
    );
};

export default App;
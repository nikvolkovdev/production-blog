import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { LOCAL_STORAGE_THEME_KEY } from '../../const/localstorage';
import { Theme } from '../../const/theme';

export interface UseThemeResult {
    toggleTheme: () => void;
    theme?: string;
}

export const useTheme = (): UseThemeResult => {
    const { theme, setTheme } = useContext(ThemeContext);

    document.body.className = theme as string;

    const toggleTheme = () => {
        let newTheme: Theme;
        switch (theme) {
        case Theme.DARK:
            newTheme = Theme.LIGHT;
            break;
        case Theme.LIGHT:
            newTheme = Theme.ORANGE;
            break;
        case Theme.ORANGE:
            newTheme = Theme.DARK;
            break;
        default:
            newTheme = Theme.LIGHT;
        }

        if (setTheme) {
            setTheme(newTheme);
        }
        document.body.className = newTheme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return {
        theme,
        toggleTheme,
    };
};

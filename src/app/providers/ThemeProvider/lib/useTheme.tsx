import {Theme, ThemeContext} from "../ui/ThemeContext";
import {useContext} from "react";

export interface UseThemeResult {
    toggleTheme: () => void;
    theme?: string;
}

export const useTheme = (): UseThemeResult => {
    const {theme, setTheme} = useContext(ThemeContext);

    const toggleTheme = () => {
        const newTheme = theme == Theme.DARK ? Theme.LIGHT : Theme.DARK;
        if (setTheme) {
            setTheme(newTheme);
        }
    }

    return {
        theme,
        toggleTheme
    }
}
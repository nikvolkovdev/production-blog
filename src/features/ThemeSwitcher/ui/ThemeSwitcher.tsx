import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button } from 'shared/ui/Button/Button';
import DarkIcon from 'shared/assets/dark.svg';
import LightIcon from 'shared/assets/light.svg';
import { Theme } from 'app/providers/ThemeProvider/ui/ThemeContext';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const {
        className,
    } = props;

    const { theme, toggleTheme } = useTheme();

    return (
        <Button buttonType="button" onClick={toggleTheme} className={classNames(cls.ThemeSwitcher, {}, [className])}>
            {theme === Theme.DARK ? <LightIcon /> : <DarkIcon />}
        </Button>
    );
});

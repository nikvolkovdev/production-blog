import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppButton, ButtonVariant } from '@/shared/ui/AppButton/AppButton';
import DarkIcon from '@/shared/assets/icons/dark.svg';
import LightIcon from '@/shared/assets/icons/light.svg';
import { Theme } from '@/app/providers/ThemeProvider/ui/ThemeContext';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo((props: ThemeSwitcherProps) => {
    const {
        className,
    } = props;

    const { theme, toggleTheme } = useTheme();

    return (
        <AppButton
            buttonType="button"
            onClick={toggleTheme}
            variant={ButtonVariant.CLEAR}
            className={classNames('', {}, [className])}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </AppButton>
    );
});

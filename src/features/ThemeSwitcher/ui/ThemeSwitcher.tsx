import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppButton, ButtonVariant } from '@/shared/ui/AppButton/AppButton';
import DarkIcon from '@/shared/assets/icons/dark.svg';
import LightIcon from '@/shared/assets/icons/light.svg';
import { Theme } from '@/shared/const/theme';
import { useTheme } from '@/shared/lib/hooks/useTheme';

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

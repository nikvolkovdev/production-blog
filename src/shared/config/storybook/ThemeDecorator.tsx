import { Story } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider/ui/ThemeContext';
import { ThemeProvider } from '@/app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
    document.body.className = theme;
    return (
        <ThemeProvider initialTheme={theme}>
            <StoryComponent />
        </ThemeProvider>
    );
};

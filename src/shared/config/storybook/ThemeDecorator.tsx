import { Theme } from 'app/providers/ThemeProvider/ui/ThemeContext';
import { Story } from '@storybook/react';
import { ThemeProvider } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => (
    <ThemeProvider initialTheme={theme}>
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    </ThemeProvider>
);

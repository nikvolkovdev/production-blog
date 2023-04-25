import { Story } from '@storybook/react';
// eslint-disable-next-line my-import-paths-check/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) => {
    document.body.className = theme;
    return (
        <ThemeProvider initialTheme={theme}>
            <StoryComponent />
        </ThemeProvider>
    );
};

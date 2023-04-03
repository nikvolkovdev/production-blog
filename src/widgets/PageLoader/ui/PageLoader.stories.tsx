import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { PageLoader } from './PageLoader';
import { ThemeDecorator } from '../../../shared/config/storybook/ThemeDecorator';
import { Theme } from '../../../app/providers/ThemeProvider/ui/ThemeContext';

export default {
    title: 'widgets/PageLoader',
    component: PageLoader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof PageLoader>;

const Template: ComponentStory<typeof PageLoader> = (args) => <PageLoader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

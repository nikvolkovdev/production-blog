import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider/ui/ThemeContext';
import { AppText, AppTextVariant } from './AppText';

export default {
    title: 'shared/AppText',
    component: AppText,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppText>;

const Template: ComponentStory<typeof AppText> = (args) => <AppText {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    title: 'Title',
    description: 'Description',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
    title: 'Title',
};

export const OnlyDescription = Template.bind({});
OnlyDescription.args = {
    description: 'Description',
};

export const ErrorTitle = Template.bind({});
ErrorTitle.args = {
    title: 'Title',
    variant: AppTextVariant.ERROR,
};

export const ErrorDescription = Template.bind({});
ErrorDescription.args = {
    description: 'Title',
    variant: AppTextVariant.ERROR,
};

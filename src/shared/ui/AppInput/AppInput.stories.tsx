import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { AppInput } from './AppInput';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/AppInput',
    component: AppInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppInput>;

const Template: ComponentStory<typeof AppInput> = (args) => (
    <AppInput {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    value: 'Text',
};

export const Dark = Template.bind({});
Dark.args = {
    value: 'Text',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Placeholder = Template.bind({});
Placeholder.args = {
    value: 'Text',
    placeholder: 'Login',
};

export const PlaceholderDark = Template.bind({});
PlaceholderDark.args = {
    value: 'Text',
    placeholder: 'Login',
};
PlaceholderDark.decorators = [ThemeDecorator(Theme.DARK)];

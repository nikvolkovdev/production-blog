import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { AppButton, ButtonVariant } from './AppButton';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/AppButton',
    component: AppButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppButton>;

const Template: ComponentStory<typeof AppButton> = (args) => (
    <AppButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'text',
    variant: ButtonVariant.CLEAR,
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'text',
    variant: ButtonVariant.OUTLINE,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
    children: 'text',
    variant: ButtonVariant.CLEAR_INVERTED,
};

export const Disabled = Template.bind({});
Disabled.args = {
    children: 'text',
    disabled: true,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'text',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ClearDark = Template.bind({});
ClearDark.args = {
    children: 'text',
    variant: ButtonVariant.CLEAR,
};
ClearDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OutlineDark = Template.bind({});
OutlineDark.args = {
    children: 'text',
    variant: ButtonVariant.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];

export const ClearInvertedDark = Template.bind({});
ClearInvertedDark.args = {
    children: 'text',
    variant: ButtonVariant.CLEAR_INVERTED,
};
ClearInvertedDark.decorators = [ThemeDecorator(Theme.DARK)];

export const DisabledDark = Template.bind({});
DisabledDark.args = {
    children: 'text',
    disabled: true,
};
DisabledDark.decorators = [ThemeDecorator(Theme.DARK)];

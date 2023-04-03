import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppInput } from './AppInput';

export default {
    title: 'shared/AppInput',
    component: AppInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppInput>;

const Template: ComponentStory<typeof AppInput> = (args) => <AppInput {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

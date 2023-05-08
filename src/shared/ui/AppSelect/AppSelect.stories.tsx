import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppSelect } from './AppSelect';

export default {
    title: 'shared/AppSelect',
    component: AppSelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppSelect>;

const Template: ComponentStory<typeof AppSelect> = (args) => <AppSelect {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    label: 'Укажите значение',
    options: [
        { value: 'hello', content: 'first option' },
        { value: 'goodbye', content: 'second option' },
    ],
};

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CountrySelect } from './CountrySelect';

export default {
    title: 'shared/CountrySelect',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => (
    <CountrySelect {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};

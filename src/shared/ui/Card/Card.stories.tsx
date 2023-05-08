import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from './Card';
import { AppText } from '../AppText/AppText';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    children: (
        <AppText
            title="title"
            description="description"
        />
    ),
};

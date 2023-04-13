import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppPage } from './AppPage';

export default {
    title: 'shared/AppPage',
    component: AppPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppPage>;

const Template: ComponentStory<typeof AppPage> = (args) => <AppPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import addNewCommentForm from './AddNewCommentForm';

export default {
    title: 'features/AddNewCommentForm',
    component: addNewCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof addNewCommentForm>;

// @ts-ignore
const Template: ComponentStory<typeof addNewCommentForm> = (args) => <addNewCommentForm {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    onSendComment: action('onSendComment'),
};
Normal.decorators = [StoreDecorator({})];

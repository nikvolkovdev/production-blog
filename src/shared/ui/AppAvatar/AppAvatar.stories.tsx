import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AppAvatar } from './AppAvatar';
import AvatarImg from './avatar.jpg';

export default {
    title: 'shared/AppAvatar',
    component: AppAvatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AppAvatar>;

const Template: ComponentStory<typeof AppAvatar> = (args) => <AppAvatar {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    size: 150,
    src: AvatarImg,
};

export const Small = Template.bind({});
Small.args = {
    size: 50,
    src: AvatarImg,
};

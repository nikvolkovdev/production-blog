import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import withMock from 'storybook-addon-mock';
import { NotificationList } from './NotificationList';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
    <NotificationList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
    mockData: [
        {
            url: `${__API__}/notifications`,
            params: {
                _limit: 4,
            },
            method: 'GET',
            status: 200,
            response: [
                {
                    id: '1',
                    title: 'Вам письмо',
                    description: 'Купи молока',
                    userId: '1',
                },
                {
                    id: '2',
                    title: 'Вам письмо',
                    description: 'Купи молока',
                    userId: '1',
                },
            ],
        },
    ],
};

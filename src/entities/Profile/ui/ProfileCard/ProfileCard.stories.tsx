import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import avatar from '@/shared/assets/tests/avatar.jpg';
// eslint-disable-next-line my-import-paths-check/layer-imports
import { ValidateProfileError } from '@/features/EditableProfileCard';
import { ProfileCard } from './ProfileCard';

export default {
    title: 'entities/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    data: {
        username: 'admin',
        age: 22,
        country: Country.KAZAKHSTAN,
        firstname: 'Nikita',
        lastname: 'Volkov',
        city: 'Almaty',
        currency: Currency.KZT,
        avatar,
    },
};

export const isLoading = Template.bind({});
isLoading.args = {
    isLoading: true,
};

export const Error = Template.bind({});
Error.args = {
    error: ValidateProfileError.INCORRECT_USER_DATA,
};

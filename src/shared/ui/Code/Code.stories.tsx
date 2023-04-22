import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Theme } from '@/app/providers/ThemeProvider/ui/ThemeContext';
import { Code } from './Code';

export default {
    title: 'shared/Code',
    component: Code,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Normal = Template.bind({});
Normal.args = {
    codeText: 'export default {\n'
        + "    title: 'shared/Code',\n"
        + '    component: Code,\n'
        + '    argTypes: {\n'
        + "        backgroundColor: { control: 'color' },\n"
        + '    },\n'
        + '} as ComponentMeta<typeof Code>;',
};

export const Dark = Template.bind({});
Dark.args = {
    codeText: 'export default {\n'
        + "    title: 'shared/Code',\n"
        + '    component: Code,\n'
        + '    argTypes: {\n'
        + "        backgroundColor: { control: 'color' },\n"
        + '    },\n'
        + '} as ComponentMeta<typeof Code>;',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Orange = Template.bind({});
Orange.args = {
    codeText: 'export default {\n'
        + "    title: 'shared/Code',\n"
        + '    component: Code,\n'
        + '    argTypes: {\n'
        + "        backgroundColor: { control: 'color' },\n"
        + '    },\n'
        + '} as ComponentMeta<typeof Code>;',
};
Orange.decorators = [ThemeDecorator(Theme.ORANGE)];

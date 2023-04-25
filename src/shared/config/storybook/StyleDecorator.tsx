// eslint-disable-next-line my-import-paths-check/layer-imports
import '@/app/styles/index.scss';
import { Story } from '@storybook/react';

export const StyleDecorator = (story: () => Story) => story();

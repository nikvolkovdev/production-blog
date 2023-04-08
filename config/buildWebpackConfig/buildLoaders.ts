import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './lib/buildCssLoader';
import { buildBabelLoader } from './lib/buildBabelLoader';

const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
        {
            loader: 'file-loader',
        },
    ],
};

const svgLoader = {
    test: /\.svg$/,
    use: [
        {
            loader: '@svgr/webpack',
        },
    ],
};

const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
};

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => [
    buildBabelLoader(options),
    fileLoader,
    svgLoader,
    tsLoader,
    buildCssLoader(options.isDev),
];

import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './lib/buildCssLoader';

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
    fileLoader,
    svgLoader,
    tsLoader,
    buildCssLoader(options.isDev),
];

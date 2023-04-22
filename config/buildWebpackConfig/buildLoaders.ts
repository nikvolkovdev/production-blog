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

// const tsLoader = {
//     test: /\.tsx?$/,
//     use: 'ts-loader',
//     exclude: /node_modules/,
// };

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
    const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
    const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

    return [
        fileLoader,
        svgLoader,
        codeBabelLoader,
        tsxCodeBabelLoader,
        // tsLoader,
        buildCssLoader(options.isDev),
    ];
};

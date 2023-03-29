import webpack from 'webpack';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';
import { buildDevServer } from './buildDevServer';

export const buildWebpackConfig = (options: BuildOptions): webpack.Configuration => ({
    mode: 'development',
    entry: options.paths.entry,
    output: {
        filename: '[name].[conenthash].js',
        path: options.paths.output,
        clean: true,
    },
    plugins: buildPlugins(options),
    module: {
        rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: options.isDev ? 'inline-source-map' : undefined,
    devServer: options.isDev ? buildDevServer(options) : undefined,
});

import webpack from 'webpack';
import { BuildOptions } from './types/config';

export const buildResolvers = (
    options: BuildOptions,
): webpack.ResolveOptions => ({
    extensions: ['.tsx', '.ts', '.js'],
    modules: [options.paths.src, 'node_modules'],
    preferAbsolute: true,
    mainFiles: ['index'],
    alias: {
        '@': options.paths.src,
    },
});

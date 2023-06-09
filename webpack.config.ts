import webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/buildWebpackConfig/buildWebpackConfig';
import { BuildEnv, BuildOptions, BuildPaths } from './config/buildWebpackConfig/types/config';

const config = (env: BuildEnv): webpack.Configuration => {
    const mode = env?.mode || 'development';
    const PORT = env?.port || 3000;
    const apiUrl = env?.apiUrl || 'http://localhost:8000';
    const isDev = mode === 'development';

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const options: BuildOptions = {
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    };

    return buildWebpackConfig(options);
};

export default config;

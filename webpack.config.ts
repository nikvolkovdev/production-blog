import webpack from "webpack";
import {buildWebpackConfig} from "./config/buildWebpackConfig/buildWebpackConfig";
import {BuildEnv, BuildOptions, BuildPaths} from "./config/buildWebpackConfig/types/config";
import path from "path";

const config = (env: BuildEnv): webpack.Configuration => {
    const mode = env.mode || "development";
    const isDev = mode == "development"
    const PORT = env.port || 3000;

    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }

    const options: BuildOptions = {
        mode,
        paths,
        isDev,
        port: PORT
    }

    return buildWebpackConfig(options);
}



export default config;
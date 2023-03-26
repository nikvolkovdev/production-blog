import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

const tsNode = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
};

const buildCssLoader = (options: BuildOptions) => {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => resPath.indexOf('.module.') != -1,
                        localIdentName: options.isDev
                            ? '[path][name]__[local]--[hash:base64:6]'
                            : '[hash:base64:8]',
                    },
                },
            },
            'sass-loader',
        ],
    };
}

export const buildLoaders = (options: BuildOptions): webpack.RuleSetRule[] => {
    return [
        tsNode,
        buildCssLoader(options)
    ]
}
import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../buildWebpackConfig/types/config';
import { buildCssLoader } from '../buildWebpackConfig/lib/buildCssLoader';

export default ({ config }: {config: webpack.Configuration}) => {
    const paths: BuildPaths = {
        output: '',
        entry: '',
        html: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    if (config.resolve.modules) {
        config!.resolve!.modules = [
            path.resolve(paths.src),
            'node_modules',
        ];
    }

    config.resolve.extensions.push('.ts', '.tsx');

    config.module.rules.push(buildCssLoader(true));
    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }

        return rule;
    });

    config.module.rules.push({
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
            },
        ],
    });

    config.plugins.push(new DefinePlugin({
        __IS_DEV__: true,
    }));

    return config;
};

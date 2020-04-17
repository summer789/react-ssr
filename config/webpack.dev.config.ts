import { Configuration, DefinePlugin } from 'webpack';
import merge from 'webpack-merge';
import { paths } from './paths';
import { commonConfig } from './webpack.common';

process.env.BABEL_ENV = 'development';

export const webpackDevConfig: Configuration = merge(commonConfig, {
    mode: 'development',
    entry: paths.appIndex,
    output: {
        filename: 'bundle.js',
        path: paths.appOutputPath,
    },
    externals: {
        ssrVar: 'ssrVar',
    },
    plugins: [
        new DefinePlugin({
            __SERVER__: false,
        }),
    ],
});

import { Configuration, DefinePlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';
import { paths } from './paths';
import { commonConfig } from './webpack.common';

process.env.BABEL_ENV = 'node';

export const webpackServerConfig: Configuration = merge(commonConfig, {
    mode: 'development',
    entry: paths.serverApp,
    output: {
        filename: 'server.js',
        path: paths.serverOutPutPath,
    },
    externals: [nodeExternals(), 'ssrVar'],
    plugins: [
        new DefinePlugin({
            __SERVER__: true,
        }),
    ],
});

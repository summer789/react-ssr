import { Configuration, DefinePlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import merge from 'webpack-merge';
import { paths } from './paths';
import { commonConfig } from './webpack.common';
import { ENV_PROD } from '../utils/constant';

process.env.BABEL_ENV = 'node';

export const webpackServerConfig: Configuration = merge(commonConfig, {
    target: 'node',
    mode: process.env.NODE_ENV as any,
    entry: paths.serverApp,
    output: {
        filename: 'server.js',
        path: paths.serverOutPutPath,
    },
    externals: [nodeExternals()],
    plugins: [
        new DefinePlugin({
            __SERVER__: true,
            __PROD__: process.env.NODE_ENV === ENV_PROD,
        }),
    ],
});

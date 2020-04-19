import { Configuration, DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';
import { paths } from './paths';
import { commonConfig } from './webpack.common';
import { ENV_DEV } from '../utils/constant';

process.env.BABEL_ENV = ENV_DEV;

export const webpackDevConfig: Configuration = merge(commonConfig, {
    mode: ENV_DEV,
    entry: paths.appIndex,
    output: {
        filename: 'js/main.js',
        path: paths.appOutputPath,
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    // { loader: 'style-loader' },
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'less-loader' },
                ],
            },
            {
                test: /\.css$/,
                use: [{ loader: 'css-loader' }, { loader: 'postcss-loader' }],
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:16].[ext]',
                },
            },
        ],
    },
    plugins: [
        new DefinePlugin({
            __SERVER__: false,
            'process.env': { NODE_ENV: `"${ENV_DEV}"` },
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
});

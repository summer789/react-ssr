import { Configuration, DefinePlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import merge from 'webpack-merge';
import { paths } from './paths';
import { commonConfig } from './webpack.common';

process.env.BABEL_ENV = 'development';

export const webpackDevConfig: Configuration = merge(commonConfig, {
    mode: 'development',
    entry: paths.appIndex,
    output: {
        filename: 'js/bundle.js',
        path: paths.appOutputPath,
    },
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
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ],
});

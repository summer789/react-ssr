import { Configuration, DefinePlugin } from 'webpack';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import merge from 'webpack-merge';
import { paths } from './paths';
import { commonConfig } from './webpack.common';
import { ENV_PROD } from '../utils/constant';

process.env.BABEL_ENV = ENV_PROD;

export const webpackProdConfig: Configuration = merge(commonConfig, {
    mode: ENV_PROD,
    entry: paths.appIndex,
    output: {
        publicPath: paths.publicPath,
        filename: 'js/[name].[chunkhash:16].js',
        chunkFilename: 'js/[name].[chunkhash:16].chunk.js',
        path: paths.appOutputPath,
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
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
    optimization: {
        minimize: true,
        minimizer: [
            new WebpackBar({
                name: 'client-build',
                color: '#61dafb',
            }),
            new TerserPlugin({
                extractComments: false,
            }),
            new OptimizeCSSAssetsPlugin(),
        ],
        splitChunks: {
            chunks: 'all',
            name: 'common',
        },
    },
    plugins: [
        new DefinePlugin({
            __SERVER__: false,
            'process.env': { NODE_ENV: `"${ENV_PROD}"` },
        }),
        new ManifestPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:16].css',
            chunkFilename: 'css/[name].[contenthash:16].chunk.css',
        }),
    ],
});

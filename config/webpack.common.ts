import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

export const commonConfig: Configuration = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    performance: false,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [new CleanWebpackPlugin()],
};

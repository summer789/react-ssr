import { Configuration } from 'webpack';

export const commonConfig: Configuration = {
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
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
};

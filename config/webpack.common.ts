/* eslint-disable import/no-extraneous-dependencies */
import { Configuration } from 'webpack';

const commonConfig: Configuration = {
    resolve: {
        extensions: ['.ts', 'tsx'],
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

export default commonConfig;

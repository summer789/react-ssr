/* eslint-disable global-require, import/no-extraneous-dependencies, @typescript-eslint/no-var-requires */

module.exports = {
    plugins: [
        require('postcss-flexbugs-fixes'),
        require('postcss-preset-env')({
            autoprefixer: {
                flexbox: 'no-2009',
            },
            stage: 3,
        }),
        require('postcss-normalize'),
    ],
};

module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            [
                '@babel/plugin-transform-runtime',
                {
                    corejs: 3,
                },
            ],
        ],
        env: {
            node: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                node: 'current',
                            },
                        },
                    ],
                ],
                plugins: ['./config/babel/plugins/no-require-less'],
            },
            development: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                browsers: ['>1%', 'last 2 versions', 'not ie <= 8'],
                            },
                        },
                    ],
                ],
            },
            production: {
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                browsers: ['>1%', 'last 2 versions', 'not ie <= 8'],
                            },
                        },
                    ],
                ],
            },
        },
    };
};

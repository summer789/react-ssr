module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'airbnb/hooks',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.json'],
                typescript: {
                    directory: [require.resolve('./tsconfig.json')],
                },
            },
        },
    },
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
        'react/state-in-constructor': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'no-unused-vars': 'off',
        'react/prop-types': 0,
        'import/prefer-default-export': 0,
        'react/jsx-props-no-spreading': 0,
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                js: 'never',
                mjs: 'never',
                jsx: 'never',
            },
        ],
    },
};

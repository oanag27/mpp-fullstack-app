module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'prettier',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'prettier'],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        //'no-unused-vars': 'off',
        'react/jsx-uses-react': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
    },

    parserOptions: {
        ecmaVersion: 7,
        ecmaFeatures: {
            modules: true,
            jsx: true,
        },
    },
};

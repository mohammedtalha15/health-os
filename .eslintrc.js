module.exports = {
    extends: ['next/core-web-vitals'],
    rules: {
        // React
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 'off',

        // Next.js
        '@next/next/no-img-element': 'off',
        // General
        'no-console': 'off',
        'prefer-const': 'warn',
    },
};

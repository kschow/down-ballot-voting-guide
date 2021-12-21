module.exports = {
    presets: [
        [
            '@babel/react', {
                'runtime': 'automatic'
            }
        ],
        '@babel/preset-env',
        '@babel/preset-typescript'
    ],
    plugins: [
        '@babel/transform-runtime',
        [
            'module-resolver', {
                alias: {
                    '^@dbvg/(.+)': '../../packages/\\1/src'
                }
            }
        ]
    ]
};

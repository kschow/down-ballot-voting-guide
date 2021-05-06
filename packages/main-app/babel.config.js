module.exports = {
    presets: [
        '@babel/react',
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

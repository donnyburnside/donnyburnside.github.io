module.exports = (api) => {
    api.cache(true);

    return {
        plugins: [],
        presets: [
            [
                '@babel/preset-env',
                {
                    useBuiltIns: 'entry',
                    corejs: 3
                }
            ]
        ]
    }
}
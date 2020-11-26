const path = require('path'),
      CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      TerserPlugin = require('terser-webpack-plugin');


// Settings
const PRODUCTION = process.env.NODE_ENV === 'production';
const OUTPUT_DIR = path.resolve(__dirname, 'dist');


// Config
const config = {
    entry: {
        app: ['./src/js/app.js', './src/scss/app.scss']
    },
    output: {
        filename: 'static/[name].js',
        path: OUTPUT_DIR
    },
    mode: (PRODUCTION ? 'production' : 'development'),
    cache: false,
    devtool: false,
    optimization: {
        minimize: PRODUCTION,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true
                    },
                    format: {
                        comments: false,
                    }
                }
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/[name].css',
        })
    ],
};


// Export the config
module.exports = config;
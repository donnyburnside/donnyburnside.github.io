const path = require('path'),
      CssMinimizerPlugin = require('css-minimizer-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      TerserPlugin = require('terser-webpack-plugin');

// Settings
const PRODUCTION = process.env.NODE_ENV === 'production';
const OUTPUT_DIR = path.resolve(__dirname, 'dist', 'static');

// Create  the config
const config = {
  entry: {
    app: [
      './src/scripts/app.js',
      './src/styles/app.scss'
    ]
  },
  output: {
    filename: '[name].js',
    path: OUTPUT_DIR
  },
  mode: (PRODUCTION ? 'production' : 'development'),
  devtool: false,
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]'
        }
      }
    ],
  },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  ],
};

// Export the config
module.exports = config;
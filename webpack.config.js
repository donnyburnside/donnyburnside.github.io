const path = require('path'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin'),
      TerserPlugin = require('terser-webpack-plugin');

// Environment
const PRODUCTION = process.env.NODE_ENV === 'production';

// Create the config
const config = {
  entry: {
    app: path.resolve(__dirname, 'src', 'js', 'app')
  },
  output: {
    filename: 'static/[name].js',
    path: path.resolve(__dirname, 'build')
  },
  mode: (PRODUCTION ? 'production' : 'development'),
  cache: false,
  optimization: {
    minimize: PRODUCTION,
    minimizer: [
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/[name].css'
    }),
    new SVGSpritemapPlugin('src/icons/**/*.svg', {
      output: {
        filename: '../views/partials/icon-spritesheet.liquid',
      },
      sprite: {
        generate: {
          title: false
        }
      }
    }),
  ]
}

// Update the config for different types of builds
PRODUCTION ? [
  // Update the config for production builds
  config.plugins.push(new OptimizeCssAssetsPlugin({
    cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
    },
  }))

] : [
  // Update the config for development builds
];

// Export the config
module.exports = config;
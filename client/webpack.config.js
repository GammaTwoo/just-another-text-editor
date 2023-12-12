const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates html
      new HtmlWebpackPlugin({
        template: './src/index.html',
        title: 'JATE',
      }),
      // injects service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest:'src-sw.js',
      }),
      // Create manifest.json
      new WebpackPwaManifest ({
        fingerprints: false,
        inject: true,
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'JATE',
        background_color: '#235ca4',
        theme_color: '#235ca4',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve(__dirname,'src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ]
      })
    ],
    // Css loaders
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ]
            },
          }
        }
      ],
    },
  };
};

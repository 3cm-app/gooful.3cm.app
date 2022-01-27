const { resolve, posix } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { indexPath, dataDirPath, gen } = require('./md-loader.js')

const assetsPath = function (_path) {
  return posix.join(_path)
}

module.exports = {
  context: resolve(__dirname, '../src'),
  entry: {
    main: './index.js'
  },
  output: {
    path: resolve(__dirname, '../dist'),
    filename: assetsPath('js/[name].[hash].js'),
  },
  resolve: {
    extensions: ['.js', '.mjs'],
    alias: {
      '@@': resolve(__dirname, '..'),
      '@': resolve(__dirname, '..', 'src'),
    },
    fallback: { "url": false }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.m?js$/,
        include: resolve(__dirname, '..', 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                "pragma": "m",
                "pragmaFrag": "'['"
              }]
            ]
          }
        }]
      },
      // {
      //   type: 'javascript/auto',
      //   test: /\.json$/,
      //   exclude: /node_modules/,
      //   loader: 'file-loader',
      //   options: {
      //     limit: 10000,
      //     name: assetsPath('data/[name].[hash:7].[ext]')
      //   }
      // },
      {
        test: /\.md$/,
        use: [
          {
            loader: resolve('./md-loader.js'),
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('img/[name].[hash:7].[ext]'),
          esModule: false,
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: assetsPath('media/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   AUTO_GENERATED_INDEX_PATH: webpack.DefinePlugin.runtimeValue(() => {
    //     gen()
    //     JSON.stringify(indexPath)
    //   }, {
    //     // fileDependencies: [indexPath],
    //     contextDependencies: [dataDirPath]
    //   }),
    // }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '..', 'src', 'index.html')
    }),
    new webpack.ProvidePlugin({
      m: 'mithril'
    })
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}

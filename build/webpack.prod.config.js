const path = require('path')
const { merge } = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common.config.js')
const packageName = require('../package').name
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = merge(commonWebpackConfig, {
  mode: 'production',
  entry: './src/components/index.ts',
  output: {
    path: resolve('lib'),
    filename: `${packageName}.min.js`,
    library: packageName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${packageName}.css`
    })
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false
            }
          },
          'less-loader'
        ]
      }
    ]
  }
})

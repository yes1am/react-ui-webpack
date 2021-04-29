const path = require('path')
const { merge } = require('webpack-merge')
const commonWebpackConfig = require('./webpack.common.config.js')
const packageName = require('../package').name
const entries = require('./utils/getComponents.js')('./src/components')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = merge(commonWebpackConfig, {
  mode: 'production',
  // 多入口
  entry: entries,
  output: {
    path: resolve('lib'),
    // [name] 是 entry 的 key
    filename: '[name]/index.js',
    library: `${packageName}.[name]`,
    // 似乎无法配置成 ESM 的形式，externals 会有问题
    libraryTarget: 'umd'
  },
  externals: {
    // 由于无法配置 ESM 方式，因此这里也不是浏览器环境下的 React 和 ReactDOM
    react: 'react',
    'react-dom': 'react-dom'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/index.css'
    })
  ],
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

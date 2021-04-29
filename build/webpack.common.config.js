const DEV = process.env.NODE_ENV !== 'production'
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.less', '.json']
  },
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: false
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(woff2?|woff|png|eot|ttf|otf)(\?.*)?$/,
        use: 'url-loader'
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: DEV
            }
          },
          'less-loader'
        ]
      }
    ]
  }
}

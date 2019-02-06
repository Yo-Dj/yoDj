const path = require('path')
const {URL} = require('url')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const paths = {
  root: path.resolve(__dirname),
  build: path.resolve(__dirname, 'build'),
  src: path.resolve(__dirname, 'src'),
  public: path.resolve(__dirname, 'public')
}

let entry = {index: './src/index.js'}
const htmlWebpackPlugins = entry => (
  Object.keys(entry).map(chunk => (
    new HtmlWebPackPlugin({
      inject: false,
      chunks: [chunk, `${chunk}.runtime`, 'vendor', 'common'],
      chunksSortMode: 'dependency',
      template: './public/index.html',
      filename: `public/index.html`,
      title: 'YoDJ'
    })
  ))
)

let plugins = [
  new webpack.DefinePlugin(entry),
  new CleanWebpackPlugin(['build'], {root: paths.root}),
  new CopyWebpackPlugin([paths.public], {ignore: ['index.html']}),
  ...htmlWebpackPlugins(entry),
  new webpack.HotModuleReplacementPlugin()
]

module.exports = {
    mode: 'development',
    entry: paths.src + '/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
        },
        resolve: {
              alias: {
                src: paths.src
              }
            },
    module: {
        rules: [
            {
              test: /\.html$/, include: paths.public, use:'handlebars-loader'
            },
            {
              loader: 'babel-loader',
              test: /\.js$/,
              exclude: /node_modules/
            },
            {
              test: /\.(less|css)$/,
              loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
              test: /\.(svg|png|jpg|gif)$/i,
              use: 'url-loader?limit=10000&name=assets/images/[name].[ext]'
            },
            {
              test: /\.worker\.js$/, include: [paths.src], use: 'worker-loader'
            }
        ]
    },
    plugins: [...plugins],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        compress: true,
        port: 3000
    }
}

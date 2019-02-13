const path = require('path')
const webpack = require('webpack')

const paths = {
  root: path.resolve(__dirname),
  build: path.resolve(__dirname, 'build'),
  src: path.resolve(__dirname, 'src'),
  public: path.resolve(__dirname, 'public')
}

module.exports = {
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
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader'
        }],
      }, {
        test: /\.(less|css)$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ],
  }
}

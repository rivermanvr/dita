const path = require( 'path' );

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-module-source-map',
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['env', 'react', 'stage-2']
        }
      }
    ]
  },
  node: {
    dns: 'empty',
    net: 'empty'
  }
};

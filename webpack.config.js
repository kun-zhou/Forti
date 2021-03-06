const path = require( 'path' )

module.exports = {
  target: 'electron-renderer',
  entry: {
    app: path.join( __dirname, 'browser', 'index.js' )
  },
  output: {
    path: path.join( __dirname, 'app', 'renderer' ),
    filename: 'bundle.js'
  },
  module: {
    rules: [ {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.join( __dirname, 'browser' )
      },
      // Load Global CSS Modules
      {
        test: /\.cssm$/,
        use: [ {
            loader: 'style-loader',
            options: { insertInto: 'body' }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true, // default is false
              localIdentName: '[local]-[hash:base64:5]',
            }
          },
        ]
      },
      // Load Global CSS
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader'
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-react-loader',
        include: path.join( __dirname, 'browser' ),
      },
      // Load fonts
      {
        test: /\.woff2$|\.ttf$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]',
          publicPath: 'renderer/', // fix css lookup of fonts
        }
      }
    ],
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ],
    alias: {
      actions: path.resolve( __dirname, 'browser/actions' ),
      reducers: path.resolve( __dirname, 'browser/reducers' ),
      public: path.resolve( __dirname, 'browser/public' )
    }
  }
}

var webpack = require('webpack');

module.exports = function makeWebpackConfig(env) {
	return {
	  entry: '../src/main.js',
	  output: {
	    path: './dist/',
	    filename: 'bundle.js'
	  },
	  // module: {
	  //   rules: [{
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     use: 'babel-loader',
	  //   }]
	  // },
	  plugins: [
			new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        sequences: true,
	        dead_code: true,
	        conditionals: true,
	        booleans: true,
	        unused: true,
	        if_return: true,
	        join_vars: true,
	        drop_console: true,
					drop_debugger: true,
					loops: true,
					properties: true
	      },
	      output: {
	        comments: false
	      }
	    })
	  ]
	};
}

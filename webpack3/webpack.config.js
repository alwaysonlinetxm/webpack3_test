var path = require('path');
var webpack = require('webpack');
var isProd = process.env.NODE_ENV === 'production';

module.exports = function makeWebpackConfig(env) {
	var config = {
	  entry: './src/main.js',
	  output: {
	    path: path.join(__dirname, '../dist'),
	    filename: 'bundle.w3.js'
	  }
	};

	if (isProd) {
		config.plugins = [
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
	  ];
	}
	return config;
}

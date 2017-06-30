import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';

const isProd = process.env.NODE_ENV === 'production';
const config = {
  entry: './src/main.js',
  dest: 'dist/bundle.r.js',
  format: 'iife',
  plugins: [
    filesize()
  ]
};

if (isProd) {
  config.plugins.push(uglify({
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
  }));
}

export default config;

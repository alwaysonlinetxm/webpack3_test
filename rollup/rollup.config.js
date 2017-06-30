import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';

export default {
  entry: './src/main.js',
  dest: 'dist/bundle.r.js',
  format: 'iife',
  plugins: [
    filesize(),
    uglify({
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

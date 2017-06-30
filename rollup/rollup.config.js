import filesize from 'rollup-plugin-filesize';

export default {
  entry: './src/main.js',
  dest: 'dist/bundle.r.js',
  format: 'iife',
  plugins: [
    filesize()
  ]
};

import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import filesize from 'rollup-plugin-filesize';
import uglify from 'rollup-plugin-uglify';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import image from 'rollup-plugin-img';
import html from 'rollup-plugin-fill-html';
import postcss from 'rollup-plugin-postcss';
import sass from 'node-sass';
import cssnano from 'cssnano';
import postcssModules from 'postcss-modules';
import px2rem from 'postcss-px2rem';

const isProd = process.env.NODE_ENV === 'production';
const distPath = isProd ? 'dist' : 'static';
const cssExportMap = {};
const plugins =  [
  resolve(), // for support external module in node_modules
  commonjs({ // for support not es2015 module
    namedExports: {
      'node_modules/react/react.js': [ 'PureComponent' ]
    }
  }),
  filesize(), // show the filesize in cli
  progress(), // show the progress of build
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') // for react
  }),
  postcss({
    plugins: [
      postcssModules({
        getJSON(id, exportTokens) {
          cssExportMap[id] = exportTokens;
        }
      }),
      px2rem({ remPrecision: 8 }), // must after postcssModules
      cssnano() // Minimize css
    ],
    getExport (id) {
      return cssExportMap[id];
    },
    // sourceMap: true, // default false, only make sense when extract to file
    // extract: `${distPath}/r-bundle.css`, // default false
    preprocessor: (content, id) => ({ code: sass.renderSync({ data: content }).css.toString() }),
    extensions: ['.css', '.scss']  // default value
    // parser: sugarss
  }), // must before babel
  image({
    output: `${distPath}/images`,
    exclude: 'node_modules/**'
  }),
  babel({
    include: ['*.js', '*/**.js'],
    exclude: 'node_modules/**'
  }),
  html({
    template: 'src/index.html',
    filename: 'index.html'
  })
];

if (isProd) {
  plugins.push(uglify({
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
			warnings: false,
			loops: true,
			properties: true
    },
    mangle: {
      except: [ 'exports', 'require' ]
    },
    output: {
      comments: false
    }
  }));
} else {
  plugins.push(serve({
    // Launch in browser (default: false)
    open: true,
    // Show server address in console (default: true)
    verbose: false,
    // Folder to serve files from
    contentBase: distPath,
    // Set to true to return index.html instead of 404
    historyApiFallback: false,
    port: 8080
  }));
}

export default {
  entry: 'src/main.js',
  moduleName: 'test', // just for UMD/IIFE
  sourceMap: !isProd,
  format: 'iife',
  dest: `${distPath}/r-bundle-[hash].js`, // it make no sense when use hash plugin
  plugins
};

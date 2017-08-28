import pkg from './package.json'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify-es'

const commonjsOptions = {
  include: ['node_modules/**'],
  exclude: ['node_modules/process-es6/**'],
  namedExports: {},
}

export default [
  // browser-friendly UMD build
  {
    entry: './src/index.js',
    dest: pkg.browser,
    format: 'umd',
    moduleName: 'soFetch',
    sourceMap: true,
    plugins: [
      resolve(),
      commonjs(Object.assign({}, commonjsOptions)),
      babel(),
      uglify(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    entry: './src/index.js',
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' },
    ],
    plugins: [resolve(), commonjs(Object.assign({}, commonjsOptions)), babel()],
  },
]

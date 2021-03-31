import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'

const path = require('path')
const resolve = (p) => path.resolve(__dirname, '..', p)
const { name, version } = require('../package.json')

const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} Huang Junjia\n` +
  ' * Released under the MIT License.\n' +
  ' */'

export default {
  input: resolve('src/index.js'),
  output: [
    {
      file: resolve('dist/bundle.esm.js'),
      format: 'esm',
      exports: 'auto',
      banner
    },
    {
      file: resolve('dist/bundle.cjs.js'),
      format: 'cjs',
      exports: 'auto',
      banner
    },
    {
      name: 'ToyVue',
      file: resolve('dist/bundle.umd.js'),
      format: 'umd',
      exports: 'auto',
      banner
    }
  ],
  plugins: [
    alias({
      entries: [
        {
          find: 'utils',
          replacement: resolve('src/utils')
        }
      ]
    }),
    nodeResolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    }),
    terser({
      compress: {
        drop_console: true
      }
    })
  ]
}

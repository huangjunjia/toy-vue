import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import alias from '@rollup/plugin-alias'

const path = require('path')
const resolve = (p) => path.resolve(__dirname, '..', p)

export default {
  input: resolve('src/index.js'),
  output: [
    {
      file: resolve('dist/bundle.esm.js'),
      format: 'esm',
      exports: 'auto'
    },
    {
      file: resolve('dist/bundle.cjs.js'),
      format: 'cjs',
      exports: 'auto'
    },
    {
      name: 'ToyVue',
      file: resolve('dist/bundle.umd.js'),
      format: 'umd',
      exports: 'auto'
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

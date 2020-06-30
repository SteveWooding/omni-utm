import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'omni.js',
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      babelrc: false,
      plugins: ['@babel/plugin-proposal-class-properties'],
      presets: [
        ['@babel/preset-env', {
          loose: true,
          modules: false
        }]
      ]
    }),
    terser()
  ],
  output: {
    file: 'dist/omni-bundle.js',
    format: 'iife'
  }
};

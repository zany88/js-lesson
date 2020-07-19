/**
 * rollup 一般用于开发js库
 *
 * npx rollup entry  模式
 *
 *
 *
 * --rollup.config.js
 * import json from 'rollup-plugin-json' //rollup插件
 * export default {
 *  input: 'src/index.js',
 *  output: {
 *  file: 'dist/bundle.js',
 *  format: 'iife'
 *   },
 *  plugins: [
 *   json()
 *  ]
 *  }
 *
 *  import resolve from 'rollup-plugin-node-resolve' 使用npm模块的plugin
 *  默认 使用esmodule
 *
 *  import commonjs from 'rollup-plugin-commonjs'
 *  使用 commonjs
 *
 *
 * 多入口
 *
 * 打包成 commonjs 需要 requireJS这个库
 *         export default {
 *         // input: ['src/index.js', 'src/album.js'],
 *        input: {
 *          foo: 'src/index.js',
 *          bar: 'src/album.js'
 *        },
 *        output: {
 *          dir: 'dist',
 *          format: 'amd'
 *        }
 *     }
 *
 *  开发 app用 webpack
 *  开发npm模块 rollup
 *
 *
 * */

/**
 * parcel
 *
 * "parcel-bundler": "^1.12.4"
 * 0配置
 * 自动安装模块
 * npx parcel ./src/index.html
 * */
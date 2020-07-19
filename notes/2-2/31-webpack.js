/**
 * webpack-使用
 * */
/**
 * webpack4支持0配置直接打包
 * webpack
 * webpack-cli
 *
 *  这个属性有三种取值，分别是 production、development 和 none。
 * 1. 生产模式下，Webpack 会自动优化打包结果；
 * 2. 开发模式下，Webpack 会自动优化打包速度，添加一些调试过程中的辅助；
 * 3. None 模式下，Webpack 就是运行最原始的打包，不做任何额外处理；
 *
 * */

/**
 * webpack 打包结果分析
 * iife(modules) --> 传入的数组 --> 数组对应的都是参数项目的函数 -->
 * 每一个函数都是对应的我自己写的每一个模块（实现私用作用域）
 *
 * iife：定义一个对象缓存已加载过的模块，require函数加载模块，require上加载了一些数据和工具函数
 * iife最后调用了require函数传入参数0 加载模块，下面参数数组中的下标0加载入口模块
 * */


/**
 * 加载css 使用css-loader
 * import 默认支持 es module
 * 加载图片 使用file-loader
 * 加载图片，小文件 使用url-loader 转换为base64（使用dataURL 减少请求次数）
 * 加载html里面的 attrs: ['img:src', 'a:href'] 使用html-loader
 * */



/**
 * loader
 *
 * 开发一个loader
 * 最后 return 是一个字符串
 * module.exports = source => {
 *    // console.log(source)
 *    const html = marked(source)
 *    // return html
 *    // 返回 html 字符串交给下一个 loader 处理
 *    return html
 *  }
 * */



/**
 * plugins
 * clean-webpack-plugin // 清除
 * html-webpack-plugin  // 生成html
 * copy-webpack-plugin  // 复制文件
 *
 * 钩子机制 在挂载每一个插件即可
 * 官网查看每一个钩子函数
 *
 *     class MyPlugin {
 *        apply (compiler) { // 必须要有这个函数 参数就是这个文件
 *          console.log('MyPlugin 111')
 *          compiler.hooks.emit.tap('MyPlugin', compilation => { //emit即将往文件夹输出的时候
 *            // compilation => 可以理解为此次打包的上下文
 *            for (const name in compilation.assets) { // 每一个文件
 *              // console.log(name)
 *              // console.log(compilation.assets[name].source())
 *              if (name.endsWith('.js')) {
 *                const contents = compilation.assets[name].source()  // 文件的内容
 *                const withoutComments = contents.replace(/\/\*\*+\*\//g, '')
 *                compilation.assets[name] = {
 *                  source: () => withoutComments,     // 保留source方法 返回新的内容
 *                  size: () => withoutComments.length // webpack内部要求必须的方法
 *                }
 *              }
 *            }
 *          })
 *        }
 *      }
 * */



/**
 * webpack watch模式： script 加 --watch
 * webpack-dev-server 文件暂存在内存中 --open 打开浏览器
 * devServer: {
 *   contentBase: './public', // 监视静态文件
 *  }
 *
 * sourceMap ：version，sources：可能多个文件 names：压缩变量的源名字，mapping：转换之后和之前的名字的映射关系
 * webpack - sourceMap
 * devtool: 'eval', //配置sourceMap
 * eval：只能定位源代码名称不能定位行内信息 （构建在eval 函数里面 速度快）
 * eval-source-map：只能定位源代码名称能 定位 行 列信息
 * cheap-eval-source-map：只能定位源代码名称能 定位行信息
 * cheap-module-eval-source-map：只能定位源代码名称能 定位 行信息 没有进行babel-loader加工真正的源代码
 * inline-source-map：sourceMap文件是以dataUrl方式存在的 嵌入源代码
 * hidden-source-map：不会嵌入 sourceMap 开发第三包常使用
 * nosource-source-map：没有源代码 能看见报错
 *
 *
 * 开发模式：cheap-module-eval-source-map
 * 生成：none or nosource-source-map
 *
 *
 * HMR：模块热替换
 *  webpack-dev-server --hot
 *  devServer: {
 *   contentBase: './public', // 监视静态文件
 *   hot: true
 *  }
 *  js无法通用
 *  框架下面是有规律的 都有了对应的HMR方案
 *
 *  js的api
 *  module.hot.accept(xx模块,()=>{})
 *
 *  webpack-merge:
 *  不同环境使用不同的配置 用这个进行合并
 *
 *
 *
 *
 *  webpack.DefinePlugin({}) //注入通用的全局对象
 *  new webpack.DefinePlugin({
      // 值要求的是一个代码片段
      API_BASE_URL: JSON.stringify('https://api.example.com')
    })
 *  默认注入 process.env.NODE_ENV
 *
 *
 *
 *
 *  webpack.treeShaking // 去掉没有引用的代码
 *
 *  optimization: {
 *  // 模块只导出被使用的成员
 *  usedExports: true, // 标记
 *  // 尽可能合并每一个模块到一个函数中
 *  concatenateModules: true,
 *  // 压缩输出结果
 *  // minimize: true //删除
 *  sideEffects: true ,//标记代码是否有副作用 ，一般用于开发一个npm模块
 * }
 *
 * --package. //标识 哪些代码
 * "sideEffects": [
 *   "./src/extend.js",
 *   "*.css"
 *  ]
 *
 * 如果 Babel 加载模块时已经转换了 ESM，则会导致 Tree Shaking 失效
 * ['@babel/preset-env', { modules: 'commonjs' }]
 * ['@babel/preset-env', { modules: false }]
 * 也可以使用默认配置，也就是 auto，这样 babel-loader 会自动关闭 ESM 转换
 *
 * 多入口
 *
 * 代码分割
 * optimization: {
    splitChunks: {
      // 自动提取所有公共模块到单独 bundle
      chunks: 'all'
    }
  },
 *
 *
 * 动态导入
 * import(/* webpackChunkName: 'components' //'./posts/posts').then(({ default: posts }) => {
 *  mainElement.appendChild(posts())
 * })
 *
 * 单独提取css MiniCssExtractPlugin()  超过150kb考虑使用
 * {
 *      test: /\.css$/,
 *      use: [
 *        // 'style-loader', // 将样式通过 style 标签注入
 *        MiniCssExtractPlugin.loader,
 *        'css-loader'
 *      ]
 *    }
 *
 *
 *
 * 压缩 css  OptimizeCssAssetsWebpackPlugin
 * 压缩 js TerserWebpackPlugin
 * 放入
 * optimization: {
 *  minimizer: [
 *    new TerserWebpackPlugin(),
 *    new OptimizeCssAssetsWebpackPlugin()
 *  ]
 * },
 *
 *
 * 文件hash值
 * [name]-[hash:8].bundle.css      每一个打包都会更改
 * [name]-[chunkhash:8].bundle.css 同一个chunk会更改
 * [name]-[contenthash:8].bundle.css 输出文件的内容进行更改的 建议使用
 *
 *
 * 多线程插件 happyPack()
 **/
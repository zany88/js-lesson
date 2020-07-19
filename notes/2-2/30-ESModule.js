/**
 * 模块化的演变过程
 * */

/**
 * stage-1
 * 单纯靠约定单个的js文件
 * 这种方式的缺点
 * -污染全局作用域
 * -命名冲突问题
 * -无法管理模块依赖关系
 *
 * stage-2
 * 每个模块只暴露一个全局对象，所有的模块成员都载到这个对象中
 * -减少了命名冲突的可能
 * 其他问题尚未解决
 *
 * stage-3
 * 立即执行函数 为模块提供了私有空间
 * -减少了命名冲突的可能
 * -模块的私有成员无法访问
 * -自执行函数作为依赖声明传入到自执行函数中
 * -模块需要依赖某个库就能很明了的看到
 * */


/**
 * commonJS是以同步模式加载规范
 * AMD 异步加载模块规范的库 requireJS
 * 大多数的库都支持 amd规范 模块多的情况下js文件请求频繁
 *
 * */

/**
 * node中 commonJS
 * 浏览器 ES-module
 *
 * ES-module
 * <script src="module-b.js" type="module" ></script>
 * -ES-module 自动采用严格模式
 * -每一个esm都是运行在单独的私有作用域
 * -esm是通过CROS的方式请求外部的js模块
 * -esm的script会延迟执行
 * */
/**
 * export  导出
 * import 导入
 * as 重命名
 * as default
 * as default的其他写法
 * import abc,{name,age} from './xxx.js' abc 为默认成员
 * * as xx  模块上所有的成员都在xx下面
 * export default 可以随意取名字 并且需要重命名
 *
 * export default {xx,xx} 导出是一个对象
 * export{xx,xx} 固定用法
 * import{xx,xx}固定用法
 *
 * export导出的是一个引用
 * 导入的成员是一个只读的成员
 * */

/**
 * 完整的文件名称
 * 相对路径中的./不能省略
 * 可以使用绝对路径或者url
 * import 'xx' 直接执行这个模块
 * 动态导入模块
 * import('xx').then((modules)=>{//你的逻辑})
 *
 * export{xx} from './xx.js' 直接导出成员
 *
 * */

/**
 * 不支持esm的浏览器支持 esm
 * 用babel转换
 * <script nomodule src="https://www.unpkg.com/promise-polyfill@8.1.3/dist/polyfill.min.js"></script>
 * <script nomodule src="https://www.unpkg.com/browse/browser-es-module-loader@0.4.1/dist/babel-browser-build.js"></script>
 * <script nomodule src="https://www.unpkg.com/browse/browser-es-module-loader@0.4.1/distbrowser-es-module-loader.js"></script>
 *
 * */

/**
 * 在node环境支持esm
 * 修改为 .mjs
 * 并且在 node执行的时候 加上参数 experimental-modules xxx.mjs
 * 可以给package.json添加 type:'module' 就会支持 esm不用改拓展名
 * 改了之后还要使用commonJS 对应的文件改成.cjs
 * 就能直接支持import
 * 一部分第三方库不支持单独某个函数 只能支持default的导出全部成员 默认方式
 * 内置模块支持
 *
 *
 * esm 可以导入CommonJS模块
 * CommonJS只会导出一个默认成员  所以esm里面只能导出全局的成员
 * CommonJS 不可以导入 esm
 * */


/**
 * import.meta.url
 * import{ fileURLToPath } from 'url'
 * import{ dirname } from 'path'
 * const __filename = fileURLToPath(import.meta.url)
 * const __dirname = dirname(__filename)
 *
 * */

/**
 * babel使用在node低版本兼容 esm
 * babelrc { "presets":['@babel/perset-env']}
 * */



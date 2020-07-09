// const { series, parallel } = require('gulp')
//
// // exports.foo = done=>{
// //     console.log('gulp task')
// //     done() // 完成标识
// // }
// // exports.default = done=>{
// //     console.log('gulp default task')
// //     done() // 完成标识
// // }
// // const gulp  = require('gulp') // 老的api 暂时保留 推荐使用新的
// // gulp.task('bar',function (done) {
// //     console.log('bar task')
// //     done()
// // })
//
//
//
//
// // const task1 = done =>{
// //     setTimeout(()=>{
// //         console.log('t1 working')
// //         done()
// //     },1000)
// // }
// // const task2 = done =>{
// //     setTimeout(()=>{
// //         console.log('t2 working')
// //         done()
// //     },1000)
// // }
// // exports.foo = series(task1,task2) // 串行执行
// // exports.bar = parallel(task1,task2) // 并行执行
//
// exports.callback = done=>{
//     console.log('callback')
//     done()
// }
// exports.callback_err = done=>{
//     console.log('callback')
//     done(new Error('failed!'))
// }
// exports.promise = ()=>{
//     return new Promise.resolve()
// }
// exports.promise_err = ()=>{
//     return Promise.reject(new Error('failed!'))
// }
// const timeout = (time)=>{
//     return new Promise(resolve => {
//         setTimeout(resolve,time)
//     })
// }
// exports.async = async()=>{
//     await timeout(1000)
//     console.log('async,task')
// }
// exports.stream = ()=>{
//     const readStream = fs.createReadStream('package.json')
//     const writeStream = fs.createWriteStream('tmp.txt')
//     readStream.pipe(writeStream)
//     return readStream
// }
//
// exports.stream1 = (done)=>{
//     const readStream = fs.createReadStream('package.json')
//     const writeStream = fs.createWriteStream('tmp.txt')
//     readStream.pipe(writeStream)
//     readStream.on('end',()=>{
//         done()
//     })
// }
//



// const fs = require('fs')
// const { Transform } = require('stream')
//
// exports.default = ()=>{
//     const read = fs.createReadStream('example.css')
//     const write = fs.createWriteStream()
//     const transform = new Transform({
//         transform:(chunk,encoding,callback)=>{
//             const input = chunk.toString()
//             const output = input.replace(/\s+/g,'').replace(/\/\*.+?\*\//g,'')
//             callback(null,output)
//         }
//     })
//
//     read.pipe(transform).pipe(write)
//     return read
// }

// const { src, dest, parallel,series,watch } = require('gulp')
// const del = require('del')
//
// const loadPlugins = require('gulp-load-plugins')
// const plugins = loadPlugins()
//
// const browserSync = require('browser-sync')
// const CleanCss = require('gulp-clean-css')
// const rename = require('gulp-rename')
//
// // exports.default = ()=>{
// //     return src('src/*.css')
// //         .pipe(CleanCss())
// //         .pipe(rename({extname:'.min.css'}))
// //         .pipe(dest('dist'))
// // }
//
// const bs = browserSync.create()
// // 优化最终结果 dist 用temp替换
// const  clean = ()=>{
//     return del(['dist','temp'])
// }
// const style =()=>{
//     return src('src/assets/styles/*.scss',{base:'src'})
//         .pipe(plugins.sass({outputStyle:'expanded'}))
//         .pipe(dest('temp'))
//         .pipe(bs.reload({stream:true}))
// }
// const script =()=>{
//     return src('src/assets/styles/*.js',{base:'src'})
//         .pipe(plugins.babel({presets:['@plugins.babel/preset-env']}))
//         .pipe(dest('temp'))
//         .pipe(bs.reload({stream:true}))
//
// }
// const page = ()=>{
//     return src('src/*.html',{base:'src'})
//         .pipe(plugins.swig())
//         .pipe(dest('temp'))
//         .pipe(bs.reload({stream:true}))
//
// }
// const image = ()=>{
//     return src('src/assets/image/**',{base:'src'})
//         .pipe(plugins.imagemin())
//         .pipe(dest('dist'))
// }
// const font = ()=>{
//     return src('src/assets/font/**',{base:'src'})
//         .pipe(plugins.imagemin())
//         .pipe(dest('dist'))
// }
// const extra = ()=>{
//     return src('public/**',{base:'public'})
//         .pipe(dest('dist'))
// }
// // <!-- build:css assets/styles/vendor.css -->
// // <!-- endbuild -->
// const useref = ()=>{ // 处理引用node_modules 里面的引用的库文件 需要特殊的注释 如上
//     return src('temp/*.html',{base:'temp'})
//         .pipe(plugins.useref({searchPath:['temp','.']}))
//         .pipe(plugins.if(/\.js$/,plugins.uglify()))
//         .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
//         .pipe(plugins.if(/\.html/,plugins.htmlmin({
//             collapseWhitespace:true,
//             minifyCSS:true,
//             minifyJS:true
//         })))
//         // html css js
//         // .pipe(dest('dist')) // 会产生同时读同时写的问题 会出现问题所以需要指定到其他目录
//         // .pipe(dest('release')) //
//         .pipe(dest('dist')) // 优化之后 加入temp目录
// }
//
// const serve = ()=>{
//     watch('src/assets/styles/*.scss',style)
//     watch('src/assets/styles/*.js',script)
//     watch('src/*.html',page)
//     // watch('src/assets/font/**',font)
//     // watch('src/assets/image/**',image)
//     // watch('public/**',extra)
//     watch([
//         'src/assets/font/**',
//         'src/assets/image/**',
//         'public/**'
//     ],bs.reload) //监视更新 但是不编译
//
//     bs.init({
//         notify: false,
//         port: 2080,
//         // files:'dist/**',
//         server:{
//             // baseDir:'dist',
//             baseDir:['temp','src','public'], //解决图片 字体不用参加编译的问题 按数组顺序去找文件
//             routes:{
//                 '/node_modules':'node_modules'
//             }
//         }
//     })
//
// }
// const compile =parallel( style, script, page)
// const build = series(clean,parallel(series(compile,useref),image,font,extra))
//
// const dev = series(compile,serve)
// module.exports ={
//     clean,
//     build,
//     dev
// }



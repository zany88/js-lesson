// 实现这个项目的构建任务
const { src, dest, parallel,series,watch } = require('gulp')
const del = require('del')
const loadPlugins = require('gulp-load-plugins')
const imagemin1 = require('gulp-imagemin');
const browserSync = require('browser-sync')

const bs = browserSync.create()
const plugins = loadPlugins()

const  clean = ()=>{
  return del(['dist','temp'])
}
const style =()=>{
  return src('src/assets/styles/*.scss',{base:'src'})
    .pipe(plugins.sass({outputStyle:'expanded'}))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream:true}))
}
const script =()=>{
  return src('src/assets/scripts/*.js',{base:'src'})
    .pipe(plugins.babel({presets:['@babel/preset-env']}))
    .pipe(dest('temp'))
    .pipe(bs.reload({stream:true}))

}
const page = ()=>{
  return src('src/*.html',{base:'src'})
    .pipe(plugins.swig())
    .pipe(dest('temp'))
    .pipe(bs.reload({stream:true}))

}
const image = ()=>{
  return src('src/assets/images/**',{base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
const font = ()=>{
  return src('src/assets/fonts/**',{base:'src'})
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}
const extra = ()=>{
  return src('public/**',{base:'public'})
    .pipe(dest('dist'))
}

const useref = ()=>{
  return src('temp/*.html',{base:'temp'})
    .pipe(plugins.useref({searchPath:['temp','.']}))
    .pipe(plugins.if(/\.js$/,plugins.uglify()))
    .pipe(plugins.if(/\.css$/,plugins.cleanCss()))
    .pipe(plugins.if(/\.html/,plugins.htmlmin({
      collapseWhitespace:true,
      minifyCSS:true,
      minifyJS:true
    })))
    .pipe(dest('dist'))
}
const imagetest=()=>{
  return src('src/assets/images/**',{base:'src'})
    .pipe(imagemin1())
    .pipe(dest('dist'))
}

const serve = ()=>{
  watch('src/assets/styles/*.scss',style)
  watch('src/assets/scripts/*.js',script)
  watch('src/*.html',page)
  // watch('src/assets/font/**',font)
  // watch('src/assets/image/**',image)
  // watch('public/**',extra)
  watch([
    'src/assets/fonts/**',
    'src/assets/images/**',
    'public/**'
  ],bs.reload) //监视更新 但是不编译

  bs.init({
    notify: false,
    port: 2080,
    // files:'dist/**',
    server:{
      // baseDir:'dist',
      baseDir:['temp','src','public'], //解决图片 字体不用参加编译的问题 按数组顺序去找文件
      routes:{
        '/node_modules':'node_modules'
      }
    }
  })

}
const compile =parallel( style, script, page)
const build = series(clean,parallel(series(compile,useref),image,font,extra))
const dev = series(compile,serve)
module.exports ={
  clean,
  build,
  dev,
}

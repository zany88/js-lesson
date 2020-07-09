/**
 * grunt 的入口文件
 * 用于定义 grunt 的自执行任务
 * 导出一个函数
 * 此函数接收一个 grunt的形参 用于导出 grunt的api
 */

module.exports = grunt=> {
    grunt.initConfig({
        foo:'11111',
        build:{  // 多个目标
            options:{},
            css:'1',
            js:'1'
        },
        clean:{
            temp:'temp/*'
        }
    }) //可以通过 grunt.config.foo


    // grunt.registerTask('default','任务描述',()=>{
    //     console.log(grunt)
    // })
    grunt.registerTask('foo','任务描述',()=>{
        console.log(grunt)
        return false  // 标记失败
    })
    grunt.registerTask('bar','任务描述',()=>{
        console.log(grunt)
    })
    grunt.registerTask(' default',['foo','bar'])  // 会默认执行每个任务
    grunt.registerTask('async-task',function () {  // done 实现异步任务
        const done = this.async()
        setTimeout(()=>{
            console.log('async-task')
            done()
            // done(false)  //标记任务失败
        },1000)
    })
    grunt.registerMultiTask('build',function () {  // 多任务
        console.log(this.options())
        console.log(`target ${this.target} data:${this.data}`)

    })

    // 使用 grunt 插件 先安装对应的npm包
    grunt.loadNpmTasks('grunt-contrib-clean') //配置对应的 initConfig
}

const sass = require('sass')
const loadGruntTasks = require('load-grunt-tasks')
module.exports = grunt=> {
    grunt.initConfig({
        sass:{
            options:{
                sourceMap: true,
                implementation:sass
            },
            main:{
                files:{
                    'dist/css/main.css':'src/css/main.scss',
                    // '要输出的文件':'需要编译的文件'
                }
            }
        },
        babel:{
            options:{
                sourceMap: true,
                presets:['@babel/preset-env']
            },
            main:{
                files:{
                    'dist/src/*.js':'dist/src/app.js'
                }
            }
        },
        watch:{
            js:{
                files:['src/js/*.js'],
                task:['babel']
            },
            css:{
                files:['src/css/*.scss'],
                task:['sass']
            }
        }


    })
    // grunt.loadNpmTasks('grunt-sass')
    loadGruntTasks(grunt)
    grunt.registerTask('default',['sass','babel','watch'])
}
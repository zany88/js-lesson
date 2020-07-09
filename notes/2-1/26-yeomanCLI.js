/**
 * 脚手架的本质
 * -创建项目的基础结构，提供项目的规范和约定
 * 相同的组织结构
 * 相同的开发范式
 * 相同的模块依赖
 * 相同的工具配置
 * 相同的基础代码
 * */

/**
 * Yeoman
 * Plop
 *
 * 全局安装
 * npm i yo -g
 * npm i generator-node -g
 * yo node
 * 会依次询问一些项目信息
 *
 * */

/**
 * generator-node 的子集的命令单独生成一些单独的文件
 * yo node:cli
 *
 * npm link //把本地的模块链接到本地全局 自己能调用测试
 *
 * 不一定是每一个 generator 都提供子集的生成器
 * 在使用别的 generator 的时候去查询是否有对应的子集生成器
 * 例如：generator-node提供的子集
 *  yo node:boilerplate
 *  yo node:cli
 *  yo node:editorconfig
 *  yo node:eslint
 *  yo node:git
 *  yo node:readme
 * */

/**
 * 明确你的需求
 * 找到合适的generator
 * 全局范围安装找到 Generator
 * 通过Yo运行对应 Generator
 * 通过命令行交互填写选项
 * 生成所需的项目结构
 *
 * https://yeoman.io/generators/ //yeoman官网查询generators
 *
 * */

/**
 * generators-xxx 本质就是一个npm包
 * yeomen 的yo 命令只能生成 generators-<name> 这种格式
 *
 * 需要安装一个yeoman-generator 一个基类 继承一些常用的方法 函数
 * npm publish
 * */
const Generator = require('yeoman-generator')

module.exports = class extends Generator {

    prompting(){  // yeoman 自动生成文件阶段调用此方法

        return this.prompt([
            {
                type:'input',
                name:'name',
                message:'your project name',
                default: this.appname,
            }
        ]).then(answers=>{
            this.answers = answers
        })

    }
    writing () { // yeoman 自动生成文件阶段调用此方法



        // this.fs.write(
        //     this.destinationPath('temp.txt'),
        //     Math.random().toString()
        // )
//      -------------------
        // const tmpl = this.templatePath('bar.html')
        // const output = this.destinationPath('bar.html')
        // const context = this.answers
        // this.fs.copyTpl(tmpl, output, context)

//      -------------------
        // const templates = [];
        // templates.forEach(item=>{
        //     this.fs.copyTpl(
        //         this.templatePath(item),
        //         this.destinationPath(item),
        //         this.answers
        //     )
        // })
    }

}

/**
 * plop 生成单独的文件
 * 不用 每次手动的生成
 *
 *
 * 将plop模块作为项目开发依赖安装
 * 在项目目录下创建一个plopfile.js 文件
 * 在plopfile.js文件中定义脚手架任务
 * 编写用于生成特定类型文件的模版
 * 通过plop体统的cli运行脚手架任务
 * */
// plopfiles.js
module.exports = plop =>{
    plop.setGenerator('component',{
        description : 'create a component',
        prompts:[{
            type:'input',
            name:'name',
            message:'component name',
            default:'Mycomponent',
        }],
        actions:[
            {
                type:'add',
                path:'src/components/{{name}}/{{name}}.js',
                templateFile:'',  //模版文件的路径
            }
        ], // 每一个任务
        actions:[
            {
                type:'add',
                path:'src/components/{{name}}/{{name}}.js',
                templateFile:'plop-templates/component.hbs',  //模版文件的路径
            }
        ]
    })
}
// components.hbs
// import React from 'react';
// export default ()=>{
//     <div className = "{{name}}">
//         <h1>{{name}} Component</h1>
//         </div>
// }

// 使用npm plop component


/**
 * node cli 应用入口 必须要有文件头
 * 如果是linux 或者macOS系统需要给此文件读写权限改为 755
 * chmod 755 xxx.js
 *
 * */
// #!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const inquirer = require('inquirer')

inquirer.prompt([
    {
        type:'input',
        name:'name',
        message:'Project name',
    }
]).then(answers=>{
    const tmpDir = path.join(__dirname,'templates') // 模版路径
    const destDir =process.cwd()  //获取当前路径
    fs.readdir(tmpDir,(err,files)=>{ //根据路径读取 文件
        if(err) throw err
        files.forEach(file=>{ // 循环写入文件
            ejs.renderFile(path.join(tmpDir,file,answers,(err,result)=>{
                if(err) throw err
                fs.writeFileSync(path.join(destDir,file),result)
            }))
        })
    })

})
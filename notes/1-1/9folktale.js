/**
 * 异步任务实现过于复杂，我们使用folktale的Task
 * folktale是一个标准的函数式编程库
 *      和lodash，ramda不同的式他没有提供很多的功能函数
 *      只提供了一些函数式的处理操作，比如：compose，curry
 *      还要一些函子：Task、Either，MayBe
 * */

const { compose, curry } = require('folktale/core/lambda')
const { toUpper, first } =require('lodash/fp')

// let f = curry(2,(x,y)=>{
//     return x+y
// })
// console.log(f(1)(2))

let f = compose(toUpper,first)
// console.log(f(['aaaa','bbb']))
/**
 * task函子
 * */
const { task } = require('folktale/concurrency/task')
const { split, find } =require('lodash/fp')
const fs = require('fs')

function readFile(filename) {
    return task(resolver=>{
        fs.readFile(filename,'utf-8',(err,data)=>{
            if(err)resolver.reject(err)

            resolver.resolve(data)
        })
    })
}
readFile('package.json').map(split('\n')).map(find(x=>x.includes('version'))).run()
    .listen({
        onRejected:err=>{
            console.log(err)
        },
        onResolved:val=>{
            console.log(val)
        }
    })
/**
 * Pointed函子
 * Pointed函子是实现了of静态方法的函子
 * of方法是避免使用new来创建对象，更深层的含义是of方法用来把值放到上下文Context（把值放到容器中使用map来处理值）
 * */

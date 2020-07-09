/**
 * 同步模式和异步模式
 * 事件循环和消息队列
 * 异步编程的几种方式
 * Promise异步方案，宏任务/微任务
 * Generator异步方案 Async/await语法糖
 * */

/**
 * 同步模式（synchronous）
 * */
console.log('global begin')

function bar() {
    console.log('bar task')
}
function foo() {
    console.log('foo task')
    bar()
}
foo()
console.log('global end')
/**
 * global begin
 * foo task
 * bar task
 * global end
 * */

/**
 * 异步模式（Asynchronous）
 * 同步或者异步是指的是运行环境提供的API是以同步或者异步模式的方式工作
 * */
console.log('global begin')

setTimeout(function t1() {
    console.log('t1 invoke')
},1800)
setTimeout(function t2() {
    console.log('t2 invoke')
    setTimeout(function inner() {
        console.log('inner invoke')
    },1000)

},1000)
console.log('global end')

/**
 * global begin
 * global end
 * t2 invoke
 * t1 invoke
 * inner invoke
 * */

/**
 * 回调函数
 * 异步编程的基础
 *
 * */



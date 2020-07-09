/**
 * 纯函数：相同输入永远得到相同的输出而且没有任何副作用
 * slice:  是纯函数 得到相同的结果
 * splice: 不是纯函数 得到不同的结果
 *
 * 在函数式编程中不会保留计算的中间结果
 * */

const _ = require('lodash')
/**
 * lodash=>/first / last / toUpper / reverse / each / includes / find / findIndex
 * */
// console.log(_)

/**
 * 纯函数的优点
 * 可缓存值
 * 可测试：纯函数让测试更方便
 * 并行处理 ：多线程并行操作共享内存数据可能出错 纯韩素不需要访问内存数据 在并行任意进行纯函数
 * **/
function getArea(r) {
    console.log(r)
    return Math.PI*r*r
}
// let getAreaMemory = _.memoize(getArea)
// console.log(getAreaMemory(4))
// console.log(getAreaMemory(4))
// console.log(getAreaMemory(4))

/**
 * 实现memoize
 * */
function memoize(f) {
    let cache = {}
    return function () {
        let key  = JSON.stringify(arguments)
        cache[key] = cache[key] || f.apply(f,arguments)
        return  cache[key]
    }
}
let getAreaMemory = memoize(getArea)
console.log(getAreaMemory(4))
console.log(getAreaMemory(4))
console.log(getAreaMemory(4))

/**
 * 纯函数：相同的输入对应相同的输出不会有任何副作用
 * 如果函数依赖外部状态就无法保证输出相同就会带来副作用
 * 副作用来源：配置文件，用户输出，数据库，全局变量
 * 副作用不可能完全禁止但是要控制在可控制的范围内发生
 * */
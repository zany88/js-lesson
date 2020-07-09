const _ = require('lodash')
/**
 * 柯里化演示
 * 柯里化
 * 当一个函数有多个参数的时候
 * 先传递一部分参数（这部分参数以后永远不会变）
 * 然后返回一个新的函数接受剩余的参数，返回结果
 * */

// function checkAge(min,age) {
//     return age >= min
// }

/**
 * 柯里化
 */
// function checkAge(min) {
//     return function(age) {
//         return age >= min
//     }
// }

/**
 * es6写法
 */
// let checkAge = min =>( age => age>=min )
//
// let checkAge18 =checkAge(18)
// console.log(checkAge18(10))

/**
 * lodash中的柯里化函数
 * 参数：需要柯里化的函数
 * 返回值：柯里化后的函数
 * 柯里化能让多元函数转换为1元函数
 */
function getSum(a,b,c){
    return a+b+c
}
const c = _.curry(getSum)
// c(1,2,3)
// console.log(c(1)(2))
// console.log(c(1,2)(3))
// console.log(c(1)(2,3))
/**
 * 柯里化示例函数
 */

''.match(/\s+/g) //匹配空白字符
''.match(/\d+/g) //匹配数字
function match(reg, str) {
    return str.match(reg)
}
const m1 = _.curry(function (reg, str) {
    return str.match(reg)
})

const haveSpace = m1(/\s+/g)
const haveNum = m1(/\d+/g)

// console.log(haveSpace('12e  cecfec'))
// console.log(haveNum('12e'))

const filter = _.curry(function (fn,arr) {
    return arr.filter(fn)
})
// console.log(filter(haveSpace,['john cooo', 'json_done']))

const findSpace = filter(haveSpace)
// console.log(findSpace(['john cooo', 'json_done']))

/**
 * 实现柯里化的函数
 * 总结 柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定值参数的新函数
 * 这是一种对函数参数的'缓存'
 * 让函数变的更灵活，让函数的粒度更小
 * 可以把多元函数转换为1元函数，可以组合使用函数产生强大的功能
 * **/

function curry(fn) {
    return function curried (...args) {
        // 判断实参和形参的个数
        　if(args.length<fn.length){
            return function () {
                return curried(...args.concat(Array.from(arguments)))
            }
         }
         return fn(...args)
    }
}

// const b = curry(getSum)
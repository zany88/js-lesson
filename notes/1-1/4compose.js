/**
 * 函数组合demo
 * 函数组合的每一个函数都必须是纯函数
 *
 * */
// function compose(f,g) {
//     return function (val) {
//         return f(g(val))
//     }
// }
// function reverse(arr) {
//     return arr.reverse()
// }
// function first(arr) {
//     return arr[0]
// }
// const last = compose(first,reverse)
// console.log(last([1,23,4,5,6,5]))

/**
 * lodash中的组合函数
 * 1，flow 2，flowRight
 * */
const _ = require('lodash')
//
const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()
// const f = _.flowRight(toUpper, first, reverse)
// console.log(f(['aaa','bbb','ccc']))

/**
 * 实现lodash中的组合函数
 * flowRight
 * */
function compose(...args) {
    return function (val) {
        return args.reverse().reduce(function (total,fn) {
            return fn(total)
        },val)
    }
}
let a = compose(reverse,first)
// console.log(a(['11','22']))

const compose1 = (...args) => val => args.reverse().reduce((total,fn) => fn(total),val)

/**
 * 函数的组合要满足结合律
 * 3种方法是结合之后是一样的
 * */
const f = _.flowRight(_.toUpper,_.first,_.reverse)
const f1 = _.flowRight(_.flowRight(_.toUpper,_.first) ,_.reverse) // 先组合前2个
const f2 = _.flowRight(_.toUpper,_.flowRight(_.first ,_.reverse)) // 先组合后2个


/**
 * 函数组合 调试
 * 查看单个组合函数之间的中间值
 * **/
const log = v =>{
    console.log(v)
    return v
}
const trace  = _.curry((tag,v)=>{
    console.log(tag,v)
    return v
})
const  split = _.curry((sep,str)=>_.split(str,sep))
const  join = _.curry((sep,arr)=>_.join(arr,sep))
const  map = _.curry((fn,arr)=>_.map(arr,fn))

const lowerWord  = _.flowRight(join('-'),trace('map之后'),map(_.toLower),split(' '))

console.log(lowerWord('IM ABC'))

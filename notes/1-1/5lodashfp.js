const _ = require('lodash')
/**
 * lodash/fp模块提供了对函数式编程友好的方法
 * 提供了不可变的'auto-curried iteratee-first-data-last'
 * 自动柯里化 函数优先 数据在后
 * */
/**
 * lodash模块
 * **/
_.map(['b','f','g'],_.toUpper)
/**
 * lodashfp模块
 * **/
const fp = require('lodash/fp')
fp.map(fp.toUpper,['b','f','g'])

const f = fp.flowRight(fp.join('-'),fp.map(fp.toUpper),fp.split(' '))

// console.log(f('im andjnfjknajf'))

/**
 * lodashfp模块 和lodash模块中 map的区别
 * 和lodash模块中的map会index的值传入(key,index,array)=>{}
 * 和lodashfp模块中的map不会传index (key)=>{}
 * */
console.log(_.map(['23','8','1'],(item,a,b)=>{console.log(item,a,b)}))

console.log(fp.map((item,a,b)=>{console.log(item,a,b)},['23','8','1']))
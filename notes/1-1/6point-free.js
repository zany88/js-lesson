/**
 * point free
 * 不需要指明处理的数据
 * 只需要合成运算过程
 * 需要定义一些辅助的基本运算函数
 *
 * point free 模式 就是函数的组合
 * */
const fp = require('lodash/fp')
const f = fp.flowRight(fp.replace(/\s+/g,'_'),fp.toLower)

// console.log(f('ABDHSYW   OPDJD')
/**
 *  point free 示例
 * */
const firtLetterToUpper =
    fp.flowRight(fp.join('. '),fp.map(fp.flowRight(fp.first,fp.toUpper)),fp.split(' '))

console.log(firtLetterToUpper('aefaf bbbfbdfbfd cccc'))
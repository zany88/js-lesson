/** 函数作为参数 **/
//
// function filter(arr, fn) {
//     let results = []
//     for (let i = 0; i <arr.length ; i++) {
//         if(fn(arr[i])){
//             results.push(arr[i])
//         }
//     }
//     return results
// }
// let aa = [1,4,990,7,23,35,34,324]
// let r = filter(aa,function (item) {
//     return item % 2 === 0
// })
// console.log(r)
//
/** 函数作为返回值 **/
//
// function make() {
//     let msg = 'this is function'
//     return function () {
//         console.log(msg)
//     }
// }
// const fn = make()
// fn()
// make()()

/** 函数作为返回值 的示例 **/
//
// function once(fn) {
//     let done =false
//     return function () {
//         if(!done) {
//             done = true
//             return fn.apply(this,arguments)
//         }
//     }
// }
//
// let pay =once(function (m) {
//     console.log(`支付${m}元`)
// })
// pay(10)
// pay(10)
// pay(10)
// pay(10)
// pay(10)

/**总结
 * 高阶函数的意义
 * 1、抽象屏蔽细节
 * 2、函数变得灵活
 * */

/**
 * 常用高阶函数
 * forEach
 * map
 * filter
 * every
 * some
 * find/findIndex
 * reduce
 * sort
 * ...
 * */
// const map = (arr,fn)=>{
//     let res = []
//     for(let val of arr){
//         res.push(fn(val))
//     }
//     return res
// }
// let aa = [2,4,990,7,23,35,34,324]
// aa = map(aa,v=>v*v)
// console.log(aa)
// const every = (arr,fn) => {
//     let res = true;
//     for(let val of arr){
//         res = fn(val)
//         if(!res) break
//     }
//     return res
// }
// let a  = every(aa,v=>v>10)
// let a  = aa.every(val=>{
//     return val >1
// })

// const some =(arr,fn)=>{
//     let res = false;
//     for(let val of arr){
//         res = fn(val)
//         if(res) break
//     }
//     return res
// }
// let a  = some(aa,v=>v>10)
// console.log(a)

/**
 * 闭包的本质
 * 函数在执行的时候会放到一个执行栈上 当函数执行完毕之后会从执行栈上移除，
 * 但是堆上的作用域成员因为被外部引用不能被释放，因此内部函数依然可以访问外部函数的成员
 * */


/**
 * 闭包的示例
 * 并且在控制台
 * call stack 代表函数的调用栈
 * scope 作用域
 * scope 里能看见当前的作用域
 * 和闭包发生在哪一步
 *
 * */
// function makePower(p) {
//     return (n)=> {
//         return Math.pow(n,p)
//     }
// }
// let power2 =makePower(2)
// console.log(power2(2))

// function makeSalary(base) {
//     return (p)=>{
//         return base + p
//     }
// }





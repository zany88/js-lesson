/**
 * js 和 ecmascript的关系
 * js 包含了 ecmascript 和 webAPI 比如 dom bom 等等
 * node 包含了 ecmascript 和node 自带的库 nodeAPI fs .net 等等
 * */

/**
 * 4点
 * 1，解决有语法的一些问题或者不足： let const 提供的块级作用域
 * 2，对原有语法的增强：解构，展开 参数默认值 模版字符串
 * 3，全新的对象，全新的方法，全新的功能  promise proxy assign
 * 4，全新的数据类似或者数据结构 ， set map symbol
 * */

// for (var i = 0; i <3 ; i++) {
//     for (var i = 0; i <3 ; i++) {
//         console.log(i)
//     }
//}//内层的变量 覆盖外层的 i是全局的变量  内层执行完了 i= 3外层再次拿到的时候就为 3 就不会继续循环了

// for (var i = 0; i <3 ; i++) {
//     for (let i = 0; i <3 ; i++) {
//         console.log(i)
//     }
// }
var e = [{},{},{}]

for (var i = 0; i <e.length ; i++) {
    e[i].onclick =function () {
        console.log(i)
    }
}
// e[2].onclick()
/**
 * 闭包的方式
 * */
for (var i = 0; i <e.length ; i++) {
    e[i].onclick =(function (i) {
        return function () {
            console.log(i)
        }
    }(i))
}
// e[2].onclick()
/**
 * es6 let的方式
 * */
for (let i = 0; i <e.length ; i++) {
    e[i].onclick =function () {
        console.log(i)
    }
}
// e[2].onclick()

// let 块级作用域 不会变量提升
// var 变量提升
// const 内部的值可以修改 但是不能重新赋予外部值 或者说更改指针
// console.log(foo) // undefined
// var foo = 'aaa'

const arr = [100,200,300]

/**
 *  数组的解构
 * */

// const [a,b] = arr
// const [,,c] = arr
// const [a,...b] = arr
// const [a,b,c,d=false] = arr 没有默认值的话就是 undefined
// console.log(c)


// function fibs(c) {
//     let [a,b] = [0,1];
//     let sum,
//         res = [] ;
//     for (let i = 0; i <c ; i++) {
//         sum = a + b
//         a =b
//         b = sum
//         res.push(sum)
//     }
//     return res
// }
// console.log(fibs(10))
/**
 * 解构赋值求斐波拉切数列
 * */
// function fibs(c) {
//     let [a,b] = [0,1];
//     let res = [];
//     for (let i = 0; i <c ; i++) {
//         [a, b] = [b, a + b];
//         res.push(b)
//     }
//     return res
// }
// console.log(fibs(10))

/**
 * 对象的解构
 * */
// const obj = {name:'aaa',age:'18'}
//
// const {name:objname} = obj // 重复变量名的情况下:冒号后面更新的变量名
// console.log(objname)

/**
 * 模版字符串
 * ${}表达式里面是标准的js语句 能直接写函数的返回值
 * 高级用法
 * */
const name = 'zhou'
const gen = 'man'
function tagF(string,name,gen) {
    // console.log(string)
    return string[0]+name+string[1]+gen  // 返回原来的字符串
}
const res = tagF`hey my${name} is a ${gen}`

/**
 * 可以实现多语言，判断不合法的字符串，小型的模版引擎
 * */

/**
 * 字符串的拓展方法
 * startsWith() 开头
 * endsWith() 结尾
 * includes() 包含
 * */

/**
 * 参数默认值
 * function f(a,b=true) {}
 * function f(a,...b) {}
 * 需要在最后一个
 * 参数的 ...只能在最后一位 只能使用一次
 * es5 console.log.apple(console,arr)
 * es6 console.log(...arr)
 *
 * =>函数
 * =>函数不会出现this 的问题
 * */

/**
 * 对象增强
 * */
const obj = {
    name:'aaa',
    [name+2]: 'bbb' //对象增强 可以使用表达式
}
const obj1 = {
    name:'xxx',
    d:'17'
}
// const tObj = Object.assign(obj1,obj) // 后面对象的属性 覆盖第一个
// console.log(tObj)
Object.assign({},obj)// 复制到一个新的对象上 防止修改全局的对象 只在函数内部
Object.is() // 判断严格相等

// Object.defineProperty() //es5的属性
// proxy() //es6的属性
const person = {
    name:'aaa',
    age: 20 //对象增强 可以使用表达式
}

const personProxy = new Proxy(person,{
    get(target,property){
        return property in target?target[property]:'default'
        // console.log(target,property)
        // return 999
    },
    set(target,property,value){
        if(property==='age'){
            if(!Number.isInteger(value)){
                throw new Error(`${value} is not an int`)
            }
        }
        target[property] = value
    }
})

personProxy.age = 11 //修改
console.log(personProxy.name) //访问

/**
 * Object.defineProperty 和 proxy 的区别
 * proxy 是非侵入的方式监视
 * 可以监视 数组
 * */


/**
 * Reflect '统一' 的提供了一套用于操作对象的api
 * */



/**
 * IO函子的问题
 * */
const fp = require('lodash/fp')
const fs = require('fs')

class IO {
    static of(val){
        return new IO(function () {
            return val
        })
    }
    constructor(fn){
        this._value = fn
    }
    map(fn){
        return new IO(fp.flowRight(fn,this._value))
    }
    join(){
        return this._value()
    }
    flatMap(fn){
        return this.map(fn).join()
    }
}

let readFile = function (filename) {
    return new IO(function () {
        return fs.readFileSync(filename,'utf-8')
    })
}
let  print = function (x) {
    return new IO(function () {
        console.log(x)
        return x
    })
}
// let cat = fp.flowRight(print,readFile)
// let r = cat('package.json') ._value()._value()// IO(IO(x))
// console.log(r)
/**
 * Monad函子是可以变扁的Pointed函子，IO(IO(x))
 * 什么时候使用monad 当一个函数返回一个函子的时候就使用monad
 * 能帮我们解决函子嵌套的问题
 * 当我们想要合并一个函数 并且这个的函返回一个值 使用map方法
 * 当我们想要合并一个函数 并且这个的函返回一个函子 使用flatMap方法
 * */
let r = readFile('package.json').map(fp.toUpper).flatMap(print).join()
console.log(r)
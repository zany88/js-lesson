/**
 * 常规的函子
 *
    class Container {
        static of(){
            return new Container(value)
        }
        constructor(value){
            this._value = value
        }
        map(fn){
            return Container.of(fn(this._value))
        }
    }
    let r = Container.of(5).map(x=>x+1).map(x=>x*x)
 */
/**
 * MayBe函子
 * 在编程的过程可能会遇到很多的错误，需要对这些错误做出相应的处理
 * MayBe函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围内）
 * */

class Maybe {
    static of(value){
        return new Maybe(value)
    }
    constructor(value){
        this._value  = value
    }
    map(fn){
        return this.isN()? Maybe.of(null): Maybe.of(fn(this._value))
        // return Maybe.of(fn(this._value))
    }
    isN(){
        return this._value === null||this._value === undefined
    }
}
let a = Maybe.of(null).map(x=>x.toUpperCase())

// console.log(a)

/**
 * Either函子
 * 类似于if-else
 * 异常会让函数变的不纯 Either函子可以用来做异常处理
 * */
class Left {
    static of(val){
        return new Left(val)
    }
    constructor(val){
        this._value = val
    }
    map(fn){
        return this
    }
}
class Right {
    static of(val){
        return new Right(val)
    }
    constructor(val){
        this._value = val
    }
    map(fn){
        return Right.of(fn(this._value))
    }
}
function parseJSJON(str) {
    try {
        return Right.of(JSON.parse(str))
    }catch (e) {
        return Left.of({err:e.message})
    }
}
let r  = parseJSJON('{"name": "plmm"}')
// console.log(r)
/**
 * IO函子
 * IO函子中的_value是一个函数，这里是把函数作为值来处理
 * IO函子可以把不纯动作存储到_value中，延迟执行这个不纯的操作
 * 把这个不纯的操作交给调用者来处理
 * 总结：
 * */
const fp =require('lodash/fp')
class IO {
    static of(value){
        return new IO(function () {
            return value
        })
    }
    constructor(fn){
        this._value = fn
    }
    map(fn){
        // 把当前的value和传入的fn组合成一个新的函数
        return new IO(fp.flowRight(fn,this._value))
    }
}
let r1 = IO.of(process).map(p=>p.execPath)// IO始终都是一个纯的操作
// r1._value
console.log(r1._value())
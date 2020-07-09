/**
 * 函子 Functor
 * 容器：包含值和值的变形关系（这个变形关系就是函数）
 * 函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，
 * map方法可以允许一个函数对值进行处理（变形关系）
 * */

class Container {
    constructor(value){
        this._value = value
    }
    map(fn){
        return new Container(fn(this._value))
    }
}
// let r = new Container(5).map(x=>x+1).map(x=>x*x)
// console.log(r)

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

// console.log(r) // r并不是值 只是一个函子对象 值在函子对象里面
// 永远不去取这个值 而是在map传递的函数里面取操作或者获取

/**
 * 总结
 * 函数式编程的运算不直接操作值，而是由函子完成
 * 函子就是一个实现了map 的契约对象
 * 我们可以把函子想象成一个盒子，这个盒子里封装了一个值
 * 想要处理盒子中的值，我们需要给盒子的map方法传递一个处理值的函数（纯函数），由这个函数来对值进行处理
 * 最终map方法返回一个包含新值的盒子（函子）可以实现链式调用
 * **/

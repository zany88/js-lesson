/**
 * 实现一遍Promise
 *
 * 1，Promise 就是一个类 在执行这个类的时候 需要传递一个执行器进去
 * 执行器会立即执行
 * 2，Promise 有3中状态 fulfilled成功， rejected失败，pending等待
 * pending->fulfilled
 * pending->rejected
 * 状态一旦确定无法更改
 * 3，resolve 和reject函数是用来更改状态的 分别对应成功和失败
 * 4，then方法内部做的事情就是判断状态如果是成功
 *    调用成功回调函数 如果是失败调用失败回调函数
 *    then是被定义到原型对象上的方法
 * 5,成功回调有一个参数，表示成功之后的值 then失败之后有参数表示失败的原因
 * */


const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
    constructor(executor){
        try { // 所有的 try catch  是为了保证 如果再代码里面 抛出错误的话 能捕获到
            executor(this.resolve ,this.reject)
        }catch (e) {
            this.reject(e)
        }
    }
    status = PENDING;    // 状态
    value = undefined;   //成功的值
    err = undefined;     //失败的值
    successCallback = [];
    failCallback = [];
    resolve = (val) => {
        if(this.status!==PENDING)return
        this.status = FULFILLED
        this.value =val
        // this.successCallback && this.successCallback(val)
        while (this.successCallback.length) {
            this.successCallback.shift()()
        }
    }

    reject = (err) => {
        if(this.status!==PENDING)return
        this.status = REJECTED
        this.err = err
        // this.failCallback && this.failCallback(err)
        while (this.failCallback.length) { // 让能够多次的调用 p.then() p.then()
            this.failCallback.shift()()
        }
    }
    then(successCallback,failCallback){
        successCallback = successCallback ? successCallback : value => value; // 将 then方法的参数变成可选的参数 一直将值往后传递
        failCallback = failCallback ? failCallback : err => {throw err}; // 将 then方法的参数变成可选的参数
        let p2 = new MyPromise((resolve,reject)=>{
            if(this.status ===FULFILLED){
                setTimeout(()=>{ // 设置异步 保证p2能被创建
                    try {
                        let x = successCallback(this.value)
                        /**
                         * 需要判断x的值是普通值还是promise对象
                         * 普通值直接 resolve
                         * promise查看第二个promise返回结果
                         * 再调用对应的 resolve和reject
                         * */
                        resolvePromise(p2,x,resolve,reject)
                    }catch (e) {
                        reject(e)
                    }

                },0)
            }else if(this.status ===REJECTED){
                setTimeout(()=>{
                    try {
                        let x =  failCallback(this.err)
                        resolvePromise(p2,x,resolve,reject)
                    }catch (e) {
                        reject(e)
                    }

                },0)
            }else {
                this.successCallback.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = successCallback(this.value)
                            resolvePromise(p2,x,resolve,reject)
                        }catch (e) {
                            reject(e)
                        }

                    },0)
                })
                this.failCallback.push(()=>{
                    setTimeout(()=>{ // 设置异步 保证p2能被创建
                        try {
                            let x =  failCallback(this.err)
                            resolvePromise(p2,x,resolve,reject)
                        }catch (e) {
                            reject(e)
                        }

                    },0)
                })
            }
        });

        return p2
    }
    finally(callback){
        return this.then((val)=>{
            return MyPromise.resolve(callback()).then(()=>val)  //保证promise内异步任务正常执行
        },(err)=>{
            return MyPromise.resolve(callback()).then(()=>{ throw err})  //保证promise内异步任务正常执行
        })
    }
    catch(failCallback){
        return this.then(undefined,failCallback)
    }
    static all(array){
        let result = []
        let index = 0
        return new MyPromise((resolve,reject)=>{
            function addData(key,val) {
                result[key] = val;
                index++
                index=== array.length?resolve(result):''
            }
            for (let i = 0; i <array.length ; i++) {  // all 的空值的情况是因为 循环并没有等待异步的方法
                let current = array[i]
                current instanceof MyPromise?
                    current.then(val=>addData(i,val),err=>reject(err)):
                    addData(i,array[i])

            }
        })
    }
    static resolve(val){
        if(val instanceof MyPromise)return val
        return new MyPromise(resolve => resolve(val))
    }
}

function resolvePromise(p2,x,resolve,reject){
    if(x===p2){
        return reject(new TypeError('Chanining cycle detected for promise #<Promise>'))

    }
    if(x instanceof MyPromise){
        // x.then((val)=>{resolve(val)},(err)=>{reject(err)})
        x.then(resolve,reject)
    } else {
        resolve(x)
    }
}

module.exports = MyPromise
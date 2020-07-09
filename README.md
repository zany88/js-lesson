##1-1作业
#####1，谈谈你是如何理解js异步编程的 EventLoop，消息队列都是做什么的，什么是宏任务，什么是微任务

---

#####：实际的js是单线程的 他会从上到下一直执行，但是在js中有一部分的webAPI上异步的，比如setTimeout。EventLoop会在执行完全局的调用之后，把消息队列里面对应的每一个异步执行的api再次放入到 调用栈里面继续向下执行
#####宏任务：就是每一个都会直接到调用栈里面按照顺序派对执行，微任务会优先执行并不会到调用栈里面去重新排队

#####2,优化以下异步代码
``` javascript
 setTimeout(()=>{
     var a = 'a'
     setTimeout(()=>{
         var b = 'b'
         setTimeout(()=>{
             var c = 'c'
             console.log(a + b + c)

         },10)
     },10)
 },10)
```
```javascript
     let p1 = new Promise((resolve,reject) => {
         var a = 'a'
         resolve(a)
     })
     let res = p1.then(val=>{
         return val
     }).then(val=>{
         var b = 'b'
         return val+b
     }).then(val=>{
         var c = 'c'
         console.log(val+c)
     })
```
#####3,根据下面代码
``` javascript
  const cars =[
      {name:'ff',horsepower:660,dollar_value:100,instock:true},
      {name:'sp c12',horsepower:650,dollar_value:200,instock:true},
      {name:'abc_XKR-S',horsepower:550,dollar_value:300,instock:false},
      {name:'R8',horsepower:525,dollar_value:400,instock:false},
      {name:'One 77',horsepower:750,dollar_value:500,instock:true},
      {name:'huay_ra',horsepower:700,dollar_value:600,instock:false},
  ]
   let isLastInstock = function (cars) {
       let last_car = fp.last(cars)
       return fp.prop('instock',last_car)
   }
   console.log(isLastInstock(cars))10)

```
```javascript
     /**
       * 1
       * */
     const last = array =>{
         return array[array.length-1]
     }
      function getVal (obj) {
         return function (k) {
             return obj[k]
         }
      }
     
      let a = fp.flowRight(getVal,last)
      console.log(a(cars)('instock'))
      /**
       * 2
       * */
      let b = fp.flowRight(fp.prop('name'),fp.first)
      console.log(b(cars))
     /**
      * 3
      *  */
     let _average =function (xs) {
         return fp.reduce(fp.add,0,xs)/xs.length
     } // <-   无须改动
     
      let averageDollarValue = function () {
          let dollar_value = fp.map(function (car) {
              return car.dollar_value
          },cars)
          return _average(dollar_value)
      }
      let averageDollarValue1 = fp.flowRight(_average,fp.map(i=>i.dollar_value))
      /**
       * 4
       * */
      let _underscore = fp.replace(/\W+/g,'_')
      let sanitizeNames = fp.flowRight(fp.map(_underscore),fp.map(i=>fp.toLower(i.name)))
     console.log(sanitizeNames(cars))
```

#####4 
```javascript
class Container {
     static of(value){
         return new Container(value)
     }
     constructor(value) {
         this._value = value
     }
    map(fn){
         return Container.of(fn(this._value))
    }
 }
class Maybe {
    static of(value){
        return new Maybe(value)
    }
    isN(){
        return this._value === null||this._value === undefined
    }
    constructor(value){
        this._value  = value
    }
    map(fn){
        return this.isN()? Maybe.of(null): Maybe.of(fn(this._value))
    }
}
```
```javascript
let ex1 =(arr)=>{
     return fp.map(x=>fp.add(x,1),arr)
}
let maybe = Maybe.of([5,6,1]).map(x=>ex1(x))
//
// console.log(maybe)


let ex2 =(arr)=>{
    return fp.first(arr)
}
let xs1 = Container.of(['do','re','mi','fa','so','la','xi']).map(ex2)

// console.log(xs1)

let safeProp= fp.curry(function (x,o) {
    return Maybe.of(o[x])
})
let user = {id:2,name:'albert'}


let ex3 =()=>{
    return safeProp('name',user).map(x=>fp.first(x))
}
// console.log(ex3())

let ex4 = function(n){
     if(n){
         return parseInt(n)
     }
     return n? parseInt(n):''
}
```
#####5 实现promise

```javascript
/**
 * myPromise
 * */

const PENDING = 'pending'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

class MyPromise {
    constructor (executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e);
        }
    }
    // promsie 状态 
    status = PENDING;
    // 成功
    value = undefined;
    // 失败
    error = undefined;
    // 成功回调函数
    successCallback = [];
    // 失败回调函数
    failCallback = [];

    resolve = value => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为成功
        this.status = FULFILLED;
        // 保存成功之后的值
        this.value = value;
        // 判断成功回调是否存在 如果存在 调用
        // this.successCallback && this.successCallback(this.value);
        while(this.successCallback.length) this.successCallback.shift()()
    }
    reject = error => {
        // 如果状态不是等待 阻止程序向下执行
        if (this.status !== PENDING) return;
        // 将状态更改为失败
        this.status = REJECTED;
        // 保存失败后的原因
        this.error = error;
        // 判断失败回调是否存在 如果存在 调用
        // this.failCallback && this.failCallback(this.error);
        while(this.failCallback.length) this.failCallback.shift()()
    }
    then (successCallback, failCallback) {
        // 参数可选
        successCallback = successCallback ? successCallback : value => value;
        // 参数可选
        failCallback = failCallback ? failCallback: error => { throw error };
        let promsie2 = new MyPromise((resolve, reject) => {
            // 成功失败或者等待状态
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCallback(this.value);
                        // 判断 x 的值是普通值还是promise对象
                        // 如果是普通值 直接调用resolve 
                        // 如果是promise对象 查看promsie对象返回的结果 
                        // 再根据promise对象返回的结果 决定调用resolve 还是调用reject
                        resolvePromise(promsie2, x, resolve, reject)
                    }catch (e) {
                        reject(e);
                    }
                }, 0)
            }else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCallback(this.error);
                        resolvePromise(promsie2, x, resolve, reject)
                    }catch (e) {
                        reject(e);
                    }
                }, 0)
            } else {
                // 等待状态
                // 将成功回调和失败回调存储起来
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value);
                            resolvePromise(promsie2, x, resolve, reject)
                        }catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.error);
                            resolvePromise(promsie2, x, resolve, reject)
                        }catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
            }
        });
        return promsie2;
    }
    finally (callback) {
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => value);
        }, error => {
            return MyPromise.resolve(callback()).then(() => { throw error })
        })
    }
    catch (failCallback) {
        return this.then(undefined, failCallback)
    }
    static all (array) {
        let result = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            function addData (key, value) {
                result[key] = value;
                index++;
                if (index === array.length) {
                    resolve(result);
                }
            }
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                if (current instanceof MyPromise) {
                    // promise 对象
                    current.then(value => addData(i, value), error => reject(error))
                }else {
                    // 普通值
                    addData(i, array[i]);
                }
            }
        })
    }
    static resolve (value) {
        if (value instanceof MyPromise) return value;
        return new MyPromise(resolve => resolve(value));
    }
}

function resolvePromise (promsie2, x, resolve, reject) {
    if (promsie2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }
    if (x instanceof MyPromise) {
        // promise 对象
        // x.then(value => resolve(value), error => reject(error));
        x.then(resolve, reject);
    } else {
        // 普通值
        resolve(x);
    }
}
```

##1-2作业

#####1,请说出下列最终的执行结果，并解释为什么
``` javascript
 var a = []
 for (var i = 0; i <10 ; i++) {
     a[i]=function () {
         console.log(i)
     }
 }
 a[6]()

/**
* 打印10  var的变量是相当于是全局的 会执行到最后一次 i++ 然后 打印当前的i 所以是10
* */
```

#####2,请说出下列最终的执行结果，并解释为什么
``` javascript
 var tmp =123
 if(true){
     console.log(tmp) 
     let tmp
 }
/**
* 会报错 因为有let  let固定了 这个块里面的作用域 但是打印在前 所以会报错
* */
```

#####3,结合es6的新语法，用最简单的方式找出最小值
``` javascript
 var arr =[12,34,32,89,4]
 let minNum =Math.min(...arr);
 console.log(minNum)
 
```
#####4,请详细说明var，let，const三种声明变量的方式之间的区别
``` javascript
 /**
 * var:其作用域为该语句所在的函数内，且存在变量提升现象；
 * let:其作用域为该语句所在的代码块内，不存在变量提升；
 * const:在后面出现的代码中不能再修改该常量的值。
 * */
```
#####5,请说出下列最终的执行结果，并解释为什么
``` javascript
 var a = 10
 var obj = {
     a:20,
     fn(){
         setTimeout(()=>{
             console.log(this.a)
         })
     }
 }
 obj.fn()
 // 打印10 因为 箭头函数的里面是没有this的 所以obj.fn() 是全局对象调用的
 // 所以会打印全局里面的10
```
#####6,简述Symbol类型的用途
``` javascript
 可以用symbol 来定义常量或者私有属性/方法
 生成唯一值 防止属性被覆盖
 
```
#####7,说说什么是浅拷贝，什么是深拷贝
``` javascript
 浅拷贝就是 只拷贝这个值 引用他的值
 如果你引用了他的值 被引用的值改变的时候 对应你这个值也会改变
 而如果是深拷贝的话 
 是重新在内存中开辟了一块空间把你拷贝的值放到新的内存空间里面去 值不会互相影响
```
#####8,简述TS与JS之间的关系
``` javascript
   TS是JS 的一个超集
   ts包含js 在js的基础之上扩展了类型检查和一些新的关键字语法等等
   所有的ts 都能编译成js
```
#####9,简述TS优点和缺点
``` javascript
   优点：就是有了更多的语法的检查 能在你书写的时候就能检查出你是否写错了
   包括值类型 语法错误之类的 这样就避免了很多线上的错误
   缺点：前期你在开发的时候就需要编写大量的类型检查 值类型减缓开发速度
```
#####10,描述引用计数的工作原理和优缺点
``` javascript
   工作原理：设置一个引用计数器  判断引用数是否为 0
           当一个对象的引用关系发生改变的的时候就会修改引用数字
   优点：发现垃圾的时候立即回收， 最大限度的减少程序暂停
   缺点：无法回收循环引用的对象，时间开销大
```
#####11,描述标记整理算法的工作流程
``` javascript
    工作原理：遍历所有的对象  找到标记活动对象 
    在清除之前会把活动对象进行整理
    遍历所有对象 对没有标记的对象进行清除
```
#####12,描述V8中新生代存储区垃圾回收的原理
``` javascript
    工作原理：v8 中有两个 新老两种
    32m/16m
    回收过程是用复制算法+标记整理
    新生代内存分成等大的两块
    使用空间为from 空闲空间为to
    活动对象存储于from空间中
    标记整理后将活动对象拷贝至to中
    然后释放from就可以
```
#####13,描述增量标记算法在何时使用及工作原理
``` javascript
    增量标记算法主要是在回收老年代对象的时候去使用
    工作原理：将当前一整段垃圾回收操作拆成各个小部分 分段的去执行 
    组合的去完全当前的垃圾回收操作
```


##2-1作业

###简答题
#####1,谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值
```javascript
/**
* 工程化就是能对我们一些重复的工作，进行一次封装
* 让我们不用再手动 的去做这些重复性的工作
* 并且使用一些语言的新特性 
* 主要解决了以下的问题：
* 传统语言或者语法的弊端
* 无法使用模块化/组件化
* 重复机械式的工作
* 代码风格的统一，质量保证
* 依赖后端服务接口支持
* 整体依赖后端项目
* 
* 1，之前的需要给vue项目创建通用的工程模版
* 在pc端或者移动端 基本上使用相同的开发套路
* 这个问题就可以用过工程化来解决 不过当时我写的是node脚本
* 
* 2，还有就是打包静态页面 
* 其实也是可以用类似的方法解决，但是当时是后端需要没有那么做
* 3，还有就是检查项目目录结构 可以通过node脚本实现
* */
```

#####2,你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
```javascript   
/**
* 可以规范项目的目录机构 统一开发的流程 在大多数重复的项目的时候
* 由于在web2.0时代，应用变复杂后，
* 出现了很多可以让前端开发效率提升的框架和标准及工具等等，
* 可能这些新的代码方式远行环境还不支持，
* 也许我们需要一个本地测试环境和运行环境及调试环境等，
* 所以需要一套完整的工具帮我们处理问题及项目构建。
*/
```
###编程题
#####1,概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具
```javascript
/**
* 实现脚手架就是通过
* yeoman-generator里面的prompting 获取用户输入的值
* 让其能够添加到 项目中需要变化的项目name 里面
* 然后通过writing方法去进行文件的写入操作
* 在我之前的没有使用yeoman的时候，使用的是自己写的递归的方法
* 来写入文件的
* 代码详见26-yeomanCLI.js
* */
```

#####2,尝试使用 Gulp 完成项目的自动化构建
```javascript
/**
* 对应的实现
* 在2-1 pagesboilerplate gulpfile里面
* 思路链接在下面链接里面
* https://www.processon.com/view/link/5f05c98ae0b34d4dba748cff
* */
```

#####,尝试使用 Grunt 完成项目的自动化构建
```javascript
/**
* 对应的实现
* 在2-1 pagesboilerplate gruntfile里面
* 思路在下面
* 
* 编译sass' --->'编译es6babel' --->'编译模版swigtemplates' --->
* '合并引用的js，cssuseref concat','uglify','cssmin' --->
* '复制图片和字体文件copy
* 
* grunt 的都是线性，所以就没有画图了也有可能使用的不是很熟练，
* 觉得这样写会有一种割裂感多个都是单独的任务
* */
```
       





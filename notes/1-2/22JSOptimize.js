/**
 * 内存管理
 * 垃圾回收和常见额gc算法
 * v8引擎的垃圾回收
 * performance工具
 * 代码优化实例
 * */



/**
 * 内存管理
 *
 *
 * js中的垃圾
 *
 * -对象不再被引用
 * -对象不能从根上访问到
 * 可达对象
 *
 * -能通过引用 作用域链
 * -可达能否从根上出发是否能被找到
 * -根就为全局上下文的全局地方
 * */
function objGroup(obj1,obj2) {
    obj1.next = obj2
    obj2.prev = obj1
    return{
        o1: obj1,
        o2: obj2
    }
}
let obj = objGroup({name:'obj1'},{name:'obj2'})
console.log(obj)

/**
 * gc算法
 *
 * 引用计数
 * 标记清除
 * 标记整理
 * 分代回收
 *
 *
 * 1，--引用计数算法的优点
 * 发现垃圾立即回收
 * 最大限度减少暂停
 *
 * --引用计数算法的缺点
 *
 * 无法回收循环引用的对象
 * 时间开销大
 *
 *
 * 2，标记清除算法的实现原理
 *
 * -分标记和清除两个阶段完成
 * 遍历所有的对象找标记活动对象
 * 遍历所有的对象清除有没有标记对象
 * 回收对应的空间
 *
 * 标记清除算法优点
 * 可以解决循环引用的对象的回收
 * 缺点
 * 空间碎片化
 *
 * 3，标记整理算法
 * 会对空间进行整理
 *
 * */

/**
 * 1，慎用全局变量 全局变量定义在全局的执行上下文，
 * 是所有作用域的顶端 如果在局部的作用域中找不到就会向上一层继续寻找 直到全局 这样性能必定很慢
 * 2，全局执行上下文一直存在于全局上下文执行栈，直到程序退出。
 * 对于gc机制发现这样一个变量一直处于活动状态也不会回收
 * 3，如果某个局部作用域出现了同名的变量会污染全局
 * 无法避免的要使用全局变量 缓存到局部变量中
 *
 * // function f() {
//     let aa  = document.getElementById('id')
//     let bb  = document.getElementById('id')
//     let cc  = document.getElementById('id')
//     let dd  = document.getElementById('id')
// }
 ----
 // function f1() {
//     let aa = document
//     let bb  = aa.getElementById('id')
//     let cc  = aa.getElementById('id')
//     let dd  = aa.getElementById('id')
//     let ee  = aa.getElementById('id')
// } // 更快
 * 4，在原型对象上新增实例对象需要的方法
 *var fn1 = function () {
    this.foo = function () {
        console.log(1111)
    }
}
 ------
 var fn2 = function () {
    fn2.prototype.foo =function () {
        console.log(1111)
    }
} // 更快
 let f1 =new fn1()
 * 5,避开闭包陷阱 给使用完毕之后设置 null
 *function foo() {
    // let a = 'name'
    // function fn() {
    //     console.log(a)
    // }
    // return fn
    var el =document.getElementById('xxx')
    el.onclick =function () {
        console.log(el.id)
    }
    el = null
}
 foo()
 // let ab = foo()
 // ab()
 * 6，避免属性访问方法
 *
 function foo() {
    this.name ='icon'
    this.age='1m'
    this.getAge =function () {
        return this.age
    }
}
 const f1 = new foo()


 f1.getAge()
 ----
 f1.age() // 更快
 *
 * 7，for循环优化
 * for(var i= 0;i<arr.length;i++)
 * ----
 * for(var i= 0,len=arr.length;i<len;i++)  // 更快
 *
 * 8，选择最优的循环方法
 *
 * var arr = [1,2,3,4,5]
 * arr.forEach(item=>{}) //最快
 * ----
 * for(var i= <arr.length;i;i--) //次之
 * ----
 * for (var i in arr) //最慢
 *
 * 9，文档碎片优化节点添加
 * 节点添加必定会有回流和重绘
 *
 * for (var i = 0; i <10 ; i++) {
    var op =document.createElement('p')
    op.innerHTML = i
    document.body.appendChild(op)
}
------
 const fEle = document.createDocumentFragment()
 for (var i = 0; i <10 ; i++) {
    var op =document.createElement('p')
    op.innerHTML = i
    fEle.appendChild(op)
}
 document.body.appendChild(fEle) // 更快
 *
 * 10，克隆优化节点的操作  先找到已有的 然后克隆他到dom上 就会优化
 *
 * for (var i = 0; i <3 ; i++) {
    var op =document.createElement('p')
    op.innerHTML = i
    document.body.appendChild(op)
}
 *-------
 var oldp  =document.getElementById('xx')
 for (var i = 0; i <3 ; i++) {
    var newp = oldp.cloneNode(false)
    newp.innerHTML = i
    op.innerHTML = i
    document.body.appendChild(newp) // 更快
}
 *
 * 11，直接量替换new Object
 * var a1 = new Array(2)
     a1[0] =1
     a1[2] =2
 ------
     var a = [1,2]  //更快
 *
 *
 * */




var obj2 ={
    foo:function(){
        function bar(){
            console.log(this)
        }
        bar()
    }
}
obj2.foo() // window
var obj3 ={
    foo:function(){
        const bar = ()=>{
            console.log(this)
        }
        bar()
    }
}
obj3.foo()  // foo  箭头函数里面的this会到他的父级

/**
 * this的总结
 *
 * 1，沿着作用域向上找最近的function 看这function 最终是怎样执行的
 * 2，this的指向取决于所属的function的调用方式，而不是定义
 * 3，function调用分下面几种
 *  -作为函数调用 foo()                    -->指向全局对象，注意严格模式
 *  -作为方法调用 foo.bar()/foo.bar.baz()  -->指向最终调用这个方法的对象
 *  -作为构造函数调用 new Foo()             -->指向这个新对象
 *  -特殊的 call apply bind                -->给的参数的成员
 */





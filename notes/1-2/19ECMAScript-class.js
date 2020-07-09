/**
 * 类的定义
 * */
// function Person(name) {
//     this.name = name
// }
// Person.prototype.say = function () {
//     console.log(this.name)
// }

// class Person {
//     constructor(name){
//         this.name = name
//     }
//     say (){
//         console.log(this.name)
//     }
// }
// let p = new Person()
// p.say()

/**
 * 实例方法和静态方法
 * */

class Person {
    constructor(name){
        this.name = name
    }
    say (){
        console.log(this.name)
    }
    static createPerson(name){
        // 这里的this 不会指向实例对象而是当前的类型
        return new Person(name)
    }

}
let xxx = Person.createPerson('xxx')
// xxx.say()

/**
 * 继承
 * */
class Student extends Person{
    constructor(name, number){
        super(name)
        this.number = number
    }
    hello(){
        super.say()
        console.log(this.name, this.number)
    }
}
/**
 * Set
 **/
const  s = new Set()
// s.add(1).add(2)
// s.siza
// s.has()
// s.delete()
// s.clera()

/**
 * map
 * es5 会把结果tostring之后作为key
 * map 能使用任意类型的值作为key
 * s.siza
 * s.has()
 * s.delete()
 **/


/**
 * Symbol
 * 避免对象属性名重复的问题
 *
 **/
Symbol('foo') === Symbol('foo') // false
const s1 = Symbol.for('foo')
const s2 = Symbol.for('foo')
// console.log(s1 === s2) // true 全局的

const  obj = {
    [Symbol.toStringTag]:'XObject',
    foo:'normal value'
}
// console.log(obj.toString()) // [object,XObject]
/***
 * for in  Object.keys JSON.stringify
 * 都是无法获取 Symbol.toStringTag
 * 的这样创建是传入的对象
 * 可以作为私有的值
 */



/**
 * for of 循环
 * 为了解决以前所有的循环的局限性
 * Iterator
 * */

// const set1 = new Set('foo','bar','baz') // for of 原理
// const iterator = set1[Symbol.iterator]()
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

/**
 * 迭代器模式：
 * 对外提供统一遍历的接口
 * 让外部不用在关注内部的数据结构是怎么样的
 * 如果是 each方法只适用于当前的数据结构
 * es6 可以使用适用任何数据结构
 * */
const todos ={
    life : ['aaa','bbb','ccc'],
    learn : ['ddd','eee','fff'],
    work : ['zzz'],
    each :function (callback) {
        const all = [].concat(this.life,this.learn,this.work)
        for(const i of all){
            callback(i)
        }
    },
    [Symbol.iterator]:function () {
        const all = [...this.life,...this.learn,...this.work]
        let index = 0
        return{
            next:function () {
                return {
                    value:all[index],
                    done:index++ >= all.length
                }
            }
        }
    },
    //生成器模式实现
    [Symbol.iterator]:function *() {
        const all = [...this.life,...this.learn,...this.work]
        for (const item of all) {
            yield item
        }
    }
}
// todos.each(item=>{
//     console.log(item)
// })
// for(const i of todos){
//     console.log(i)
// }
/**
 * 生成器函数
 * 惰性执行
 * */
function* foo() {
    console.log('111')
    yield 100
    console.log('222')
    yield 200
    console.log('333')
    yield 300
}
// const r = foo()
// console.log(r.next())
// console.log(r.next())
// console.log(r.next())

function* createMaker() {
    let id = 1
    while (true){
        yield id++
    }
}
const idMaker = createMaker()

// console.log(idMaker.next().value) // 发号器

/**
 * es7
 * arr.includes()返回 true 或 false
 * 2**10 指数运算符
 *
 * es8
 * Object.values()                  // 获取对象的value 和Object.keys 对应
 * Object.entries(obj)
 * for of Object.entries(obj)       // 转换对象 用于 for of
 * Object.getOwnPropertyDescriptors // 用于给能复制 get对象 方法 或者set对象 方法
 * String.padEnd,String.padStart, // 用给定字符串去填充字符串的开始或者结束的位置填充到给定的长度
 * Async/Await
 * 能在参数或者数组末尾加入逗号
 *
 * */
const  p1 = {
    firstName:'aaa',
    lastName:'bbb',
    get fullName(){
        return this.firstName + '' +this.lastName
    }
}
// const p2 = Object.assign({},p1)
// p2.firstName = 'zzz'
// console.log(p2) // fullName 当作为普通属性去复制了

// const desc = Object.getOwnPropertyDescriptors(p1) // es8
// const p2 = Object.defineProperties({},desc)
// p2.firstName = 'zzz'
// console.log(p2)

const  books = {
    html:5,
    js:10,
    css:8
}
// for (const [name,count] of Object.entries(books)) {
//     console.log(`${name.padEnd(16,'-')}|${count.toString().padStart(1,'0')}`)
// }







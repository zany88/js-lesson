/**
 * js的超集
 * 项目初期会增加成本
 * 渐进式的语言
 *
 * 原始数据类型
 *
 * string
 * number
 * boolean
 * void
 * null
 * undefined
 * symbol
 *
 * tsc --locale zh-CN  使用中文提示错误
 *
 *
 *
 */

const h:symbol = Symbol();
const foo:object = function () {} // [] {} object 是除了原始类型以外的所有类型

const arr1:Array<number> = [1,2,3]
const arr2:number[] = [1,2,3]
function sum(...args:number[]) {}
sum(222)

//元组 Tuple
const t :[number,string] = [111,'222']
/**
 *
 * 枚举 Enum
 * 一组数值中有更好理解的名字 ， 一个枚举中只会有几个固定的值 不会超出这个值
 * 枚举的 不赋值的话 会默认 0开始 累加
 * 第一个有赋值 就可以从第一个开始累加
 * 如果枚举的字符串的话 就必须每个赋值
 * 枚举 会入侵到编译之后的代码 会被编译成
 * 双向的键值对 对象 键可以获取值 值可以获取键
 * 常量枚举 不会编译
 *
 */


enum status {
    a=1, b, c,
}
const enum status {  //常量枚举
    a=1, b, c,
}
const post = {
    title:status.b
}


/**
 * 函数
 * */

function fun1(a:number,b:number=100,...rest:number[]):string {
    return 'string1'
}
fun1(100)
function f2() {}
const fun2:(a:number,b:number)=>string = function (a:number,b:number):string {
    return 'string2'
}
/**
 * any类型
 * */
function stringfly(val:any) {
    return JSON.stringify(val)
}

/**
 * 隐式类型推断
 * */

let age = 18
age = '11'
let fpp
fpp='111'
fpp=222

/**
 * 类型断言
 * */

const nums = [1,2,3,4]
const res = nums.find(i=>i>0)
const sq = res *res;
const num1  = res as number
const num2  = <number>res // jsx下不能使用

/**
 * 接口 interfaces
 * 必须要遵循这个接口的所有的规定
 * 接口约束对象的
 * */
interface Post {
    title:string
    content:string
    subtitle?:string, // 可选成员
    readonly summary:string //只读成员不能修改
}
function f(post:Post) {
    console.log(post.title) // 隐式的表达了 post这个参数必须要有这个两个变量 可以用接口去要求他有这两个变量
    console.log(post.content)
}
f({
    title:'111',
    content:'222',
    summary:'1999'
})


// 动态类型
interface Cache {
    [prop:string]:string
}
const cache:Cache = { }  // 可以任意添加都是 string的成员
cache.foo='fff'

/**
 * 类
 * */

class Person {
    name:string
    age:number // private 私用成员不允许外部访问,protected允许在子类访问 但是不能在外部访问
                // readonly 只读 生成之后不能在修改
                // super 父类的方法
    constructor(name:string,age:number){
        this.name = name  // 需要先声明 类的对象
    }
    say(msg:string):void{

    }
}

/**
 * 类和接口
 * 用类去约束方法 不包含具体实现
 * 推荐单个类约束单个的方法
 * */
interface Eat {
    eat(food:string):void
}
interface Run {
    run(distance:number):void
}
class Person1 implements Eat,Run{
    eat(food:string):void{
        console.log(111)
    }
    run(distance:number):void{

    }
}

/**
 * 抽象类
 * abstract关键字实现抽象类 只能去继承 不能new
 * */
 abstract class Animal implements Eat,Run { // abstract 只能去继承 不能new
     eat(food: string): void {
         console.log(111)
     }

     abstract run(distance: number): void  //abstract 不需要方法体
 }
 class Dog extends Animal{
     run(distance: number): void {
     }
 }
/**
 * 泛型
 * */
function creatArray<T>(len:number,val:T):T[] {  // 就是将函数的要生成的类型当作参数去传递 要使用的时候进行传递
    const arr = Array<T>(len).fill(val)
    return arr
}
const res = creatArray<string>(3,'200')

/**
 * 第三方模块 没有类型约束 就自己使用 declare语句自己声明
 * */
declare function f1(input:string):string;










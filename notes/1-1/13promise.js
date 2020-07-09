/**
 * promise 使用
 * */

// const p = new Promise(function (resolve,reject) {
//     // resolve(100)
//     reject(new Error('promise rejected'))
// })
// p.then(function (val) {
//     console.log('resolve',val)
// },function(err){
//     console.log('reject',err)
// })
// console.log('end')

/**
 * promise 方式 ajax
 * */
function ajax(url) {
    return new Promise(function (resolve,reject) {
        var xhr = new XMLHttpRequest()
        xhr.open('get',url)
        xhr.responseType = 'json'
        xhr.onload = function () {
            if(this.status ===200){
                resolve(this.response)
            }else {
                reject(new Error(this.statusText))
            }
        }
        xhr.send()
    })
}
/**
 * promise对象的then方法会返回一个全新的promise对象
 * 后面的then方法就是在上一个then返回的pormise注册回调
 * 前面的then方法中回调函数的返回值会作为后面的then方法回调参数
 * 如果回调中返回的是promise，那后面的then方法的回调会等待他的结束
 * */

ajax('/api.user.json').then(res=>{
    console.log(res)
},err=> {
    console.log(err)
}) //这种只会捕获第一个promise链上的异常
// 如果返回了一个promise则不不会捕获到

ajax('/api.user.json').then(res=>{
    console.log(res)
}).catch(err=>{
    console.log(err)
})
//这种只会捕获所有的promise链上的异常
// 推荐这种

/**
 * 全局捕获
 *
 window.addEventListener('unhandlerejection',event=>{
    const {reason,promise}=event
    console.log(reason,promise )
    event.preventDefault()
},false)  // 不常用 也不推荐用
 node环境
 process.on('unhandlerejection',(reason,promise)=>{
 console.log(reason,promise)
 })
 * */
Promise.resolve('foo').then((res)=>{
    console.log(res)
})
var p1 = ajax('/api.user.json')
var p2 = Promise.resolve(p1)
// p1 === p2 p1和p2完全相等
/**
 * Promise.all 所有的结束 或者有一个错误就会结束
 * Promise.race   第一个结束了之后就会结束
 * */
var p3 = Promise.all([
    ajax('/api.user.json'),
    ajax('/api.user.json')
])
p3.then(res=>{}).catch(err=>{})






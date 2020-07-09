console.log('global start')
setTimeout(()=>{
    console.log('setTimeout')
},100)
// 基本所有的宏任务会进入到回调队列的末尾

Promise.resolve().then(a=>{
    console.log('p1')
}).then(()=>{
    console.log('p2')
})
// Promise的回调作为微任务执行 在本轮调用结束的末尾直接执行

// 同样的微任务还是mutationObserver，proces.nextTick
console.log('global end')
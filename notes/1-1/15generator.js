/**
 * 生成器函数
 * */
function * foo() {
    console.log('start')
    try {
        const b = yield 'aaa'
        console.log(b)
    }catch (e) {
        console.log(e)
    }

}

const generator =  foo()

const res = generator.next()
console.log(res) // aaa

// generator.next('bbb')
generator.throw(new Error('generator error'))

function *m1() {
    try {
        const res1 = yield ajax('/user.json')
        console.log(res1)
        const res2 = yield ajax('/user.json')
        console.log(res2)
    }catch (e) {
        console.log(e)
    }
}
const g = m1()
/**
 * 普通的执行方式
 * */
// const result =g.next()
// result.value.then(data=>{
//     const r2 = g.next(data)
//     if(r2.done)return
//     r2.value.then(data=>{
//         const r3 = g.next(data)
//         if(r3.done)return
//         r3.value.then(data=>{
//             g.next(data)
//         })
//     })
// })
/**
 * 递归的方式
 * */
function handleResult(res) {
    if(res.done)return
    res.value.then(data=>{
        handleResult(g.next(data))
    },err=>{
        g.throw(err)
    })
}
handleResult(g.next())
/**
 * 通用的生成器函数
 * */
function co(generator) {
    const g = generator
    function handleResult(res) {
        if(res.done)return
        res.value.then(data=>{
            handleResult(g.next(data))
        },err=>{
            g.throw(err)
        })
    }
    handleResult(g.next())
}
co(m1)
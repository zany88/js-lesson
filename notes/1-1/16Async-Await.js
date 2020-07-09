async function main() {
    try {
        const r1 = await ajax('/user.json')
        console.log(r1)

        const r2 = await ajax('/user.json')
        console.log(r2)

        const r3 = await ajax('/user.json')
        console.log(r3)
    }catch (e) {

    }
}
const promise = main()
promise.then(()=>{
    console.log('completed')
})
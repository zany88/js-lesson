class Dep {
    constructor(){
        this.subs = [] // 存储观察者
    }
    addSub(sub){ //添加观察者
        if(sub&&sub.update){
            this.subs.push(sub)
        }
    }
    notify(){ //发送通知
        this.subs.forEach(sub=>{
            sub.update()
        })
    }
}
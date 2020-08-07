class Observer {
    constructor(data){
        this.walk(data)
    }
    walk(data){
        if(!data||typeof data!=='object'){
            return
        }
        // 遍历data对象的所有属性
        Object.keys(data).forEach(key=>{
            this.defineReactive(data,key,data[key])
        })
    }

    defineReactive(obj,key,val){   //这个defineProperty 是吧 data里面的数据 设置为有getter和setter
        let self = this
        let dep = new Dep()  // 收集依赖 发送通知
        this.walk(val)  // 如果val 是对象 会把对象也转换成响应式
        Object.defineProperty(obj,key,{
            enumerable: true,
            configurable:true,
            get(){
                Dep.target && dep.addSub(Dep.target)
                return val
                // return obj[key] // 会导致栈溢出 必须传val
            },
            set(newValue){
                if(newValue === val){
                 return
                }
                val = newValue
                self.walk(newValue) // 把重新赋值的对象 会把对象也转换成响应式
                // 发送通知
                dep.notify()
            }
        })
    }
}
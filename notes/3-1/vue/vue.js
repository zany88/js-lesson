class Vue {
    constructor(options){
        // 1通过属性保存选项的数据
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el ==='string'?document.querySelector(options.el): options.el
        // 2把data中的成员转换为 getter和setter 注入到 vue实例
        this._proxyData(this.$data)
        // 3调用observer对象，监听数据变化
        new Observer(this.$data)
        // 4调用compiler对象，解析指令和差值表达式
        new Compiler(this)
    }

    _proxyData(data){ //这个defineProperty 是吧传入 vue实例的设置为有getter和setter
        Object.keys(data).forEach(key=>{
            Object.defineProperty(this,key,{
                enumerable: true,
                configurable:true,
                get(){
                    return data[key]
                },
                set(newValue){
                    if(newValue===data[key]){
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
}

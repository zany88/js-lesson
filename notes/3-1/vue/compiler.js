class Compiler {
    constructor(vm){
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    // 编译模版，处理文本节点和元素节点
    compile(el){
        let childNodes = el.childNodes
        Array.from(childNodes).forEach(node=>{
            if(this.isTextNode(node)){ // 文本节点
                this.compileText(node)
            }else if(this.isElementNode(node)){  // 元素节点
                this.compileElement(node)
            }

            //判断node节点 是否有子节点 有就递归调用
            if(node.childNodes && node.childNodes.length){
                this.compile(node)
            }
        })
    }
    //编译元素节点，处理指令
    compileElement(node){
        // node.attributes
        // 遍历属性节点
        // 判断是否为指令

        Array.from(node.attributes).forEach(attr=>{
            let attrName = attr.name
            if(this.isDirective(attrName) ){
                // v-text --> text
                attrName = attrName.substr(2)
                if(attrName.indexOf(':')!==-1){
                    let fn =attrName.split(':')[0] // on
                    let fnKey =attrName.split(':')[1] // click
                    let key = attr.value  // clickHandler(111,222,$event)
                    this.onUpdater(node,key,fn,fnKey)
                }else {
                    let key = attr.value
                    this.update(node,key,attrName)
                }
            }else if(attrName.startsWith('@')||attrName.startsWith(':')) {
                if(attrName.indexOf('@')!==-1){ // @click 的情况
                    let fn =attrName.startsWith('@')?'on':'bind'
                    let fnKey =attrName.substr(1)
                    let key = attr.value
                    this.onUpdater(node,key,fn,fnKey)
                }
            }
        })
    }

    update(node,key,attrName,fnKey){
        let updateFn = this[attrName+'Updater']
        // console.log(this.vm)
        updateFn&&updateFn.call(this,node,key,this.vm[key])
    }
    // 处理 v-text
    textUpdater(node,key,value){
        node.textContent = value
        new Watcher(this.vm,key,(newValue)=>{
            node.textContent = newValue
        }) //
    }
    // 处理 v-html
    htmlUpdater(node,key,value){
        node.innerHTML = value
        new Watcher(this.vm,key,(newValue)=>{
            node.innerHTML = newValue
        })
    }
    // 处理 v-model
    modelUpdater(node,key,value){
        node.value = value
        new Watcher(this.vm,key,(newValue)=>{
            node.value = newValue
        })

        // 双向绑定
        node.addEventListener('input',()=>{
            this.vm[key] = node.value
        })
    }
    // 处理 v-on
    onUpdater(node,key,value,fnKey){
        console.log(fnKey)  // click
        let args = key.split('(')[1].substring(0,key.split('(')[1].length-1).split(',')
        if(fnKey==='click'){
            this.click(node,args,key,[])
        }else if(fnKey.indexOf('.') !== -1){
            let tmp = fnKey.split('.')
            tmp.shift()
            this.click(node,args,key,tmp)
        }
    }
    click(node,args,key,eArr){
        node.onclick = (e)=>{
            if(eArr.length>0){
                eArr.forEach(item=>{
                    if (item==='stop'){
                        e.stopPropagation()
                    }else if(item==='prevent'){
                        e.preventDefault()
                    }
                })
            }
            let tmpE =false
            args.forEach(i=>{
                if(i==='$event'){
                    tmpE = true
                    args.pop()
                }
            })
            if(tmpE){
                this.vm.$options.methods[key.split('(')[0]](...args,e)
            }else {
                this.vm.$options.methods[key.split('(')[0]](...args)
            }
        }
    }

    //编译文本节点，处理差值表达式
    compileText(node){
        let reg = /\{\{(.+?)\}\}/
        let value =node.textContent
        if(reg.test(value)){
            let key =RegExp.$1.trim()
            // let htmlreg = /<[^>]+>/g;
            // if(htmlreg.test(this.vm[key])){
            //     let tmp = value.replace(reg,this.vm[key])
            //     console.log(node)
            //
            //     node = tmp
            //
            //     // new Watcher(this.vm,key,(newValue)=>{ // 创建Watcher 当数据更改的时候更新视图
            //     //     node.innerHTML = newValue
            //     // })
            // } else {
                node.textContent =value.replace(reg,this.vm[key])
                new Watcher(this.vm,key,(newValue)=>{ // 创建Watcher 当数据更改的时候更新视图
                    node.textContent = newValue
                })
            // }

        }
    }

    //判断元素属性是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }

    //判断节点是否为文本节点
    isTextNode(node){
        return node.nodeType === 3
    }

    //判断节点是否是元素节点
    isElementNode(node){
        return node.nodeType === 1
    }
}

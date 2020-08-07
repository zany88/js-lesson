##3-1作业
#####1,当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。

---

#####
    不是响应式数据。
    Vue 不允许在已经创建的实例上动态添加新的根级响应式属性
    可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：
    还可以使用 vm.$set 实例方法，这是全局 Vue.set 方法的别名
    this.$set(this.dog,'name','Trump')
    原理就是内部调用了
    defineReactive(ob.value, key, val)
    ob.dep.notify()
    这两个方法
#####

#####2、请简述 Diff 算法的执行过程

---

#####
    diff算法主要都是在ptach函数里面执行
    patch 函数作为总的逻辑入口，主要处理以下两种情形：
    当 oldVnode 和 vnode 节点相同，即包含相同的 sel, key 属性时，
    使用 patchVnode 函数更新节点及其子孙节点。
    执行过程 ：
    对比两颗树的差异可以取第一个树的每一个节点一次和第二个树的节点进行比较
    这样的时间复杂度是O(n^3)，dom操作的时候很少会把父节点移动到子节点所以diff只会比较同级
    因此只比较同级别的子节点依次比较，这样的这样的时间复杂度是O(n)。
    在进行同级别的节点比较的时候，首先会对新老节点数组的开始和结尾节点设置标记索引，
    遍历的过程中移动索引。
    4种情况 （旧开始/新开始），（旧结束/新结束），（旧开始/新结束），（旧结束/新开始）
    一 旧开始/新开始），（旧结束/新结束）差不多一样
    
    1（旧开始/新开始），（旧结束/新结束）比较第一个 
    2 调用sameVnode 如果相同 调用patchVnode比较差异更新到dom
    3 移动索引 调用sameVnode 如果第二个不一样 
    3 会移动索引比较第三个 如果一样 patchVnode 更新dom 
    4 再回到第二个进行 patchVnode
    
    二（旧开始/新结束）
    1 比较旧开始 新结束 移动旧开始到旧结束位置 旧idx++ 新idx--
    三 （旧结束/新开始）
    1 比较旧开始 新开始 移动旧结束到旧开始位置 旧idx-- 新idx++
    
    如果以上都不是
    循环新节点，使用 新开始 在旧节点数组中找相同的节点
    如果没有找到，说明 新开始是新节点 创建插入到dom中
    如果找到了，判断新老的sel选择器。
    是否相同？不相同说明被修改 创建新的 相同把旧节点数组中的对应节点易到左边
    
    四 收尾工作
    旧开始>旧结束 循环结束：这个先结束说明新节点有剩余 剩余批量插入到右边
    新开始>新结束 循环结束：老节点有剩余，把剩余节点批量删除
#####
#####二-1,模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化

```js
 // 大体都一样主要就是监听hashchange事件 部分关键代码
/**
 if (options.mode === 'hash' || options.mode === undefined) {
      this.mode = 'hash'
      this.data = _Vue.observable({
        current: '/#/'
      })
    } else {
      this.data = _Vue.observable({
        current: '/'
      })
    }

render (h) {
            return h('a', {
              attrs: {
                href: '#' + this.to
                // #/   #/about
              },
              on: {
                click: this.clickHandler
              }
            }, [this.$slots.default])
          }
*/


     window.addEventListener('hashchange', () => {
          this.data.current = '/' + window.location.hash
        })
```
---
####二-2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。
```js
/**
//关键部分代码 实现了 v-html v-on:click  @click  @click.stop.prevent
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
htmlUpdater(node,key,value){
        node.innerHTML = value
        new Watcher(this.vm,key,(newValue)=>{
            node.innerHTML = newValue
        })
    }
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

*/
```
#####二-3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果
```
    代码在snabbdom对应文件夹下

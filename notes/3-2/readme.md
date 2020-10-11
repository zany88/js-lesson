##3-2作业

#####1,请简述 Vue 首次渲染的过程

---

#####
    Vue初始化，实例成员，静态成员
    new Vue()
    this._init定义了vm.$mount()方法
    (entry-runtime-with-compiler.js)
    ->
    $mount方法把模版编译成render函数
    complieToFunctions生成render函数
    
    运行时版本通过 runtime.js里面的vm.$mount()重新获取el
    到下一个mountComponent(this,el)
    ->
    判断是否有render选项，如果没有但是传入了模版并且时开发环境会发送警告
    (src/core/instance/lifecycle.js)
    ->
    触发beforeMount生命周期
    ->
    定义updateComponent 在这个函数中调用了 vm._render()  vm._update()
    _render方法生成虚拟dom，_update方法时将虚拟dom转换为真实dom并挂载页面上
    ->
    创建Watcher实例 传递updateComponent方法并且调用他 还调用get方法
    ->
    创建完Watcher实例之后 触发mounted 返回 vue实例
    ->
    Watcher.get 调用   updateComponent() 
    调用vm._render() _render 调用实例化vue传入的render或者编译的
    template生成的render() 返回vnode
    vm._update() _update调用_patch_($el,vnode)挂载真实dom到$el上
   
#####

#####2、请简述 Vue 响应式原理

---

#####
    数据发生变化后，会重新对页面渲染，这就是Vue响应式，响应式原理如下
    
    想完成这个过程，我们需要：
    
    侦测数据的变化
    收集视图依赖了哪些数据
    数据变化时，自动“通知”需要更新的视图部分，并进行更新
    对应专业术语分别是：
    
    数据劫持 / 数据代理
    依赖收集
    发布订阅模式
    如何侦测数据的变化
    首先有个问题，在Javascript中，如何侦测一个对象的变化？
    
    其实有两种办法可以侦测到变化：使用Object.defineProperty和ES6的Proxy，这就是进行数据劫持或数据代理。
    
    Object.defineProperty实现
    Vue通过设定对象属性的 setter/getter 方法来监听数据的变化，通过getter进行依赖收集，而每个setter方法就是一个观察者，在数据变更的时候通知订阅者更新视图。
#####
#####3、请简述虚拟 DOM 中 Key 的作用和好处。
#####
    在v-for的过程中，为给每一个节点设置key属性的作用：
           以便它能够跟踪每个节点的身份，在进行比较的时候，会基于 key 的变化重新排列元素顺序。从而重用和重新排序现有元素，并且会移除 key 不存在的元素。方便让 vnode 在 diff 的过程中找到对应的节点，然后成功复用。
   
    设置key的好处：
           可以减少 dom 的操作，减少 diff 和渲染所需要的时间，提升了性能。
#####

---
####4、请简述 Vue 中模板编译的过程。
#####
    1缓存公共的 mount 函数，并重写浏览器平台的 mount
    2判断是否传入了 render 函数，没有的话，是否传入了 template ，没有的话，则获取 el 节点的 outerHTML 作为 template
    3调用 baseCompile 函数
    4解析器(parse) 将模板字符串的模板编译转换成 AST 抽象语法树
    5优化器(optimize) - 对 AST 进行静态节点标记，主要用来做虚拟DOM的渲染优化
    6通过 generate 将 AST 抽象语法树转换为 render 函数的 js 字符串
    7将 render 函数 通过 createFunction 函数 转换为 一个可以执行的函数
    8将 最后的 render 函数 挂载到 option 中
    9执行 公共的 mount 函数
#####

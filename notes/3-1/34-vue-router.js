/**
 *
 * router{
 * path:goods:id
 * prop:true
 * }
 * 组件里设置prop['id']
 *
 * push 会有后退按钮
 * replace 不会
 * */


/**
 * Hash模式是基于锚点，和 onhashchange 事件
 * History模式是基于 H5中的 History API
 * history.pushState() ie10之后支持
 * history.replaceState()
 * */


/**
 * History需要服务器支持
 *
 * spa中,服务端不存在 xxx.com/login 这个地址
 * 服务端 应该除里静态资源外都返回spa中的index.html
 *
 *
 * const history = require('connect-history-api-fallback')
 * node服务器 app.use(history())
 *
 *
 * nginx
 * location /{
 *   * root html
 *   * index index.html index.htm
 *   * try_filers $uri  $uri/  $uri/index.html
 * }
 * */

/**
 * 实现 vue-router
 * hash模式
 *
 * url中#后面的内容作为路径地址
 * 监听hashchange事件
 * 根据道歉路由地址找到对应的组件重新渲染
 *
 *
 * history模式
 *
 * 通过history.pushState()改变地址栏
 * 监听popstate事件
 * 根据当前的路由地址找到对应的组件重新渲染
 *
 *
 * vue构建版本
 * 运行时版本：不支持template模版，需要打包时提前编译
 * 完整版：包含运行时和编译器，体积比运行时版大10k左右
 * 程序运行的时候把模版转换成render函数
 * */
let _Vue = null
export default class VueRouter {
    static install(Vue){
        // 判断是否安装
        if(VueRouter.install.installed){
            return
        }
        VueRouter.install.installed = true
        // 把vue构造函数记录全局变量
        _Vue = Vue

        // 把创建的vue实例传入router对象注入到vue实例
        // _Vue.prototype.$router = this.$options.router
        _Vue.mixin({
            beforeCreate(){
                if(this.$options.router){
                    _Vue.prototype.$router = this.$options.router
                    this.$options.router.init()
                }
            }
        })
    }

    constructor(options){
        this.options = options
        this.routeMap = {}
        this.data = _Vue.observable({
            current:'/'
        })
    }

    createRouteMap(){
        // 遍历所有的路由规则 解析成键值对醒醒存储到routeMap
        this.options.routes.forEach(route=>{
            this.routeMap[route.path] = route.component
        })
    }

    init (){
        this.createRouteMap()
        this.initComponent(_Vue)
        this.initEvent()
    }

    initComponent(Vue){
        Vue.component('router-link',{
            prop:{
                to:String
            },
            render(h){
                return h('a',{
                    attrs:{
                        href:this.to
                    },
                    on:{
                        click:this.clickHandler
                    }
                },[this.$slots.default])
            },
            methods:{
                clickHandler(e){
                    history.pushState({},'',this.to)
                    this.$router.data.current = this.to
                    e.preventDefault()
                }
            }
            // template:'<a> :href="to"><slot></slot> </a>'
        })
        const self = this
        Vue.component('router-view',{
            prop:{
                to:String
            },
            render(h){
                const component = self.routeMap[self.data.current]
                return h(component)
            }
        })
    }

    initEvent(){
        window.addEventListener('popstate',()=>{
            this.data.current = window.location.pathname
        })
    }

}






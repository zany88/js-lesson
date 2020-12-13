const cookieParser = process.server ? require('cookieparser') : undefined

// 服务端渲染期间都是同一个实例 所以需要 return
export const state = () =>{
    return {
        user: null
    }
}
export const mutations ={
    setUser(state,data){
        state.user = data

    }
}
export const actions = {
    nuxtServerInit({commit},{req}){  // nuxt 特有方法 服务端渲染自动调用 初始化数据传递给客户端
        console.log(1111)
        let user = null
        if (req.headers.cookie) {
            const parsed = cookieParser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setUser', user)
    }
}

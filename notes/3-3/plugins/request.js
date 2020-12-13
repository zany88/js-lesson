import axios from 'axios'
export const request = axios.create({
    baseURL:'https://conduit.productionready.io'
})

// 插件机制获取到上下文对象（query，params，req，res，store， 等）
export default ({store})=>{
    request.interceptors.request.use(config=>{
        const {user} = store.state
        if(user&&user.token){
            config.headers.Authorization = `Token ${user.token}`
        }
        return config
    },(error)=>{
        return Promise.reject(error);
    })
    request.interceptors.response.use(config=>{

            return config
        },
        (err)=>Promise.reject(err)
    )
}

// export default request

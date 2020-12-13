import axios from 'axios'
import { getToken,setToken,removeToken } from './cookie'
const request = axios.create({
    baseURL:'https://conduit.productionready.io'
})
export default request

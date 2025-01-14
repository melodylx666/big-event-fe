//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
import {useTokenStore} from "@/stores/token.ts";
//这里因为模块加载顺序的问题，需要从router包下中引入router
import router from '@/router'
//这里处理跨域问题，
// const baseURL = 'http://localhost:8080';
const baseURL = '/api'; //则默认是http://localhost:5173/api
const instance = axios.create({baseURL})

//请求拦截器
instance.interceptors.request.use(
    (config)=> {
        //请求前回调
        const tokenStore = useTokenStore();
        if(tokenStore.token){
            //如果有token，则在这里就添加到请求头中
            config.headers.Authorization = tokenStore.token;
        }
        return config;
    },
    (err) => {
        //请求失败回调
    }
)


//响应拦截器
instance.interceptors.response.use(
    result=>{
        if(result.data.code === 0){
            return result.data;
        }
        ElMessage.error('服务异常');
        // 异步的状态转化成失败的状态
        return Promise.reject(result.data);
    },
    err=>{
        if(err.response.status === 401){
            router
                .push('/login')
                .then(() => {
                ElMessage.error('请先登录')
            })
        }else{
            ElMessage.error('服务异常')
            return Promise.reject(err);//异步的状态转化成失败的状态
        }
    }
)

export default instance;
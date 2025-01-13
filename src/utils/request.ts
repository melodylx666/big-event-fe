//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
//这里处理跨域问题，
// const baseURL = 'http://localhost:8080';
const baseURL = '/api'; //则默认是http://localhost:5173/api
const instance = axios.create({baseURL})


//添加响应拦截器
instance.interceptors.response.use(
    result=>{
        return result.data;
    },
    err=>{
        alert('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;
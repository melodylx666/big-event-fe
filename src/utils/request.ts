//定制请求的实例

//导入axios  npm install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'

//这里处理跨域问题，
// const baseURL = 'http://localhost:8080';
const baseURL = '/api'; //则默认是http://localhost:5173/api
const instance = axios.create({baseURL})


//添加响应拦截器,并将公用的逻辑放入其中
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
        alert('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

export default instance;
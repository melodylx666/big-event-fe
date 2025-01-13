//导入request工具类
import request   from "@/utils/request.ts";
import type {registerService} from '@/hooks/types.ts'
export const userRegisterService:registerService = (registerData:any) => {
    //借助UrlSearchParams对象将请求参数对象序列化成url参数
    const params = new URLSearchParams();
    for(let key in registerData){
        params.append(key, registerData[key]);
    }
    return request.post('/user/register', params);
}
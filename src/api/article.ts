//文章分类列表查询
import request from "@/utils/request.ts";
import type {
    articleCategoryListService,
    categoryModel,
    articleCategoryAddService,
    articleCategoryUpdateService,
    articleCategoryDeleteService,
    articleQueryParams
} from "@/hooks/types.ts";
import { useTokenStore } from '@/stores/token.ts'
//同样参照接口文档进行开发

//文章分类查询
export function articleCategoryListService(): articleCategoryListService {
    return request.get('/category');
}

//添加文章分类
export function articleCategoryAddService(categoryModel:categoryModel):articleCategoryAddService{
    return request.post('/category',categoryModel);
}

//修改文章分类
export function articleCategoryUpdateService(categoryModel:categoryModel):articleCategoryUpdateService{
    return request.put('/category',categoryModel);
}

//删除文章分类
export function articleCategoryDeleteService(id:number):articleCategoryDeleteService{
    return request.delete('/category?id='+id)
}

//文章列表查询
export function articleListService(params:any):articleCategoryListService{
    return request.get('/article',{params:params});
}

//添加文章
export function articleAddService(articleModel:any):articleCategoryAddService{
    return request.post('/article',articleModel);
}
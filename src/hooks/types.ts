//全部参考接口文档
export type registerData = {
    username: string,
    password: string,
    rePassword: string
}

export type ApiResponse = {
    code: number,
    message?: string,
    data?: any
}
export type categoryModel = {
    categoryName: string,
    categoryAlias:string
    id?:number
}

export type articleQueryParams = {
    pageNum:number,
    pageSize:number,
    categoryId?:number,
    state?:string
}
export type registerService = (registerData:registerData) => Promise<ApiResponse>;
export type loginService = (loginData:any) => Promise<ApiResponse>;
export type articleCategoryListService = Promise<ApiResponse>;
export type articleCategoryAddService = Promise<ApiResponse>;
export type articleCategoryUpdateService = Promise<ApiResponse>;
export type articleCategoryDeleteService = Promise<ApiResponse>;
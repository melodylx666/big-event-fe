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

export type registerService = (registerData:registerData) => Promise<ApiResponse>;
export type loginService = (loginData:any) => Promise<ApiResponse>;
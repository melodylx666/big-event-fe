import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useTokenStore = defineStore('token', () => {
    //状态
    const token = ref('')
    //操作
    const setToken = (newToken: string) => {
        token.value = newToken
    }
    const removeToken = () => {
        token.value = ''
    }
    return {
        token,
        setToken,
        removeToken
    }
},{
    persist: true,
})
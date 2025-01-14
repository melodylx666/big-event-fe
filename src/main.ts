import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router  from "@/router";
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import locale from 'element-plus/dist/locale/zh-cn.js' //中文化

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate) //此处在这里给pinia加上插件
app.use(ElementPlus,{locale})
app.use(router)
app.use(pinia)
app.mount('#app')


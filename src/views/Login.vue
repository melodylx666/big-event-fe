<script setup lang="ts">
import {User, Lock} from '@element-plus/icons-vue'
import {type Ref, ref} from 'vue'
import {type registerData} from '@/hooks/types.ts'
//通过该变量控制注册与登录表单的显示， 默认显示注册
//点击注册按钮，isRegister为true，显示注册表单
//点击登录按钮，isRegister为false，显示登录表单
const isRegister = ref(false)

//数据，这里登录和注册的表单数据模型是同一个
const registerData:Ref<registerData> = ref({
  username: '',
  password: '',
  rePassword: ''
})
const checkRePassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  }
  if (value !== registerData.value.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}
//表单校验规则,和接口文档的要求一致,此处登录和注册的表单校验规则是同一个
const rules = ref({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: 'blur'}
  ],
  rePassword: [
    {validator: checkRePassword, trigger: 'blur'}
  ]
})

//方法
import {userRegisterService,userLoginService} from '@/api/user.ts'
import {ElMessage} from "element-plus";
import {useRouter} from 'vue-router'

const router = useRouter()
  //1.注册
async function register(): Promise<void> {
  await userRegisterService(registerData.value)
      .then(response => {
        ElMessage.success(response.message? response.message:'登录成功!')
      })
}
  //2.登录
async function login(){
  //调用登录接口，完成登录
  await userLoginService(registerData.value)
      .then(response => {
        ElMessage.success('登录成功!')
        router
            .push('/')
            .then(() => {
              ElMessage.success('当前进入主页面')
            })
      })
}
  //3.清空数据模型的数据,比如在切换到注册的时候，表单应该保证为空
  function clearRegisterData() {
    registerData.value = {
      username: '',
      password: '',
      rePassword: ''
    }
  }
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                    v-model="registerData.rePassword"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false;clearRegisterData();">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item pros="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item >
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true;clearRegisterData();">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
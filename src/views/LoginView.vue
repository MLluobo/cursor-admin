<template>
  <div class="min-h-screen">
    <el-row class="h-screen">
      <!-- 左侧区域 -->
      <el-col 
        :span="17" 
        class="bg-purple-500 flex items-center justify-center" 
      >
        <div class="intro h-full w-full flex flex-col justify-center item-center">
          <h1 class="text-[35px] font-bold text-white mb-4 text-center animate-fade-in">你好！欢迎回到后台管理系统</h1>
          <p class="text-[16px] text-white opacity-90 text-center animate-fade-in animation-delay-200">这是一个某电商的后台管理系统。</p>
        </div>
      </el-col>

      <!-- 右侧登录表单 -->
      <el-col 
        :span="7" 
        class="bg-white flex items-center justify-center"
      >
        <div class="w-full h-full flex items-center justify-center">
          <div class="w-3/4 form">
            <h2 class="text-2xl font-bold mb-4 text-gray-800 text-center">用户登录</h2>
            <p class="text-gray-400 mt-2 mb-4 flex items-center justify-center">
              <span class="h-[1px] w-16 bg-gray-300 mr-3"></span>
              账号登录
              <span class="h-[1px] w-16 bg-gray-300 ml-3"></span>
            </p>
            <el-form 
              :model="loginForm" 
              :rules="rules"
              ref="loginFormRef"
              class="w-11/12 mx-auto"
            >
              <el-form-item prop="username">
                <el-input 
                  v-model="loginForm.username"
                  placeholder="用户名"
                  :prefix-icon="User"
                />
              </el-form-item>
              
              <el-form-item prop="password">
                <el-input 
                  v-model="loginForm.password"
                  type="password"
                  placeholder="密码"
                  :prefix-icon="Lock"
                  show-password
                />
              </el-form-item>

              <el-form-item>
                <el-button 
                  type="primary" 
                  class="w-full"
                  @click="handleLogin"
                  :loading="loading"
                >
                  {{ loading ? '登录中...' : '登录' }}
                </el-button>
              </el-form-item>

              <div class="text-center text-gray-600 space-y-2">
                <div>
                  <el-link type="primary" class="text-sm">忘记密码？</el-link>
                </div>
                <div>
                  <span class="text-sm text-gray-400">没有账号？</span>
                  <el-link type="primary" class="text-sm ml-1">去注册</el-link>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-in-out forwards;
  opacity: 0;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})

const router = useRouter()

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    const valid = await loginFormRef.value.validate()
    if (valid) {
      loading.value = true
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 2000))
      ElMessage({
        type: 'success',
        message: '登录成功',
        duration: 2000
      })
      // 登录成功后跳转到首页
      router.push('/')
    }
  } catch (error) {
    ElMessage({
      type: 'error',
      message: '登录失败，请检查用户名和密码',
      duration: 2000
    })
  } finally {
    loading.value = false
  }
}
</script> 
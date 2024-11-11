<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { House, Goods, User, Setting, ArrowDown, FullScreen, Aim } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import CommonDrawer from '@/components/CommonDrawer.vue'

const isFullscreen = ref(false)
const router = useRouter()
const route = useRoute()
const passwordDrawerVisible = ref(false)
const passwordFormRef = ref<FormInstance>()

// 当前激活的菜单
const activeMenu = ref(route.path)

// 密码表单数据
const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码表单校验规则
const passwordRules = reactive<FormRules>({
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }
}

const handleCommand = (command: string) => {
  switch (command) {
    case 'logout':
      ElMessageBox.confirm(
        '确定要退出登录吗？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        // 这里处理退出登录逻辑
        router.push('/login')
      }).catch(() => {
        // 取消退出
      })
      break
    case 'info':
      // 处理个人信息
      break
    case 'password':
      passwordDrawerVisible.value = true
      break
  }
}

// 处理密码修改取消
const handlePasswordCancel = () => {
  passwordFormRef.value?.resetFields()
}

// 处理密码修改确认
const handlePasswordConfirm = async () => {
  if (!passwordFormRef.value) return
  
  await passwordFormRef.value.validate((valid, fields) => {
    if (valid) {
      // 这里添加修改密码的接口调用
      ElMessage.success('密码修改成功')
      passwordDrawerVisible.value = false
      passwordFormRef.value?.resetFields()
    }
  })
}

// 处理菜单选择
const handleMenuSelect = (index: string) => {
  router.push(index)
}
</script>

<template>
  <el-container class="h-screen">
    <el-header class="!bg-purple-500 border-b border-purple-600">
      <div class="flex justify-between items-center h-full">
        <div class="text-xl font-bold text-white">后台管理系统</div>
        <div class="flex items-center">
          <!-- 全屏按钮 -->
          <el-tooltip
            effect="dark"
            :content="isFullscreen ? '退出全屏' : '全屏'"
            placement="bottom"
          >
            <el-icon 
              class="text-white text-xl mr-4 cursor-pointer hover:opacity-80"
              style="color: white;"
              @click="toggleFullScreen"
            >
              <FullScreen v-if="!isFullscreen" />
              <Aim v-else />
            </el-icon>
          </el-tooltip>

          <!-- 用户下拉菜单 -->
          <el-dropdown trigger="click" @command="handleCommand">
            <span class="flex items-center cursor-pointer text-white hover:bg-transparent">
              <el-avatar 
                :size="32" 
                class="mr-2"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              />
              <span>管理员</span>
              <el-icon class="ml-1"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="info">个人信息</el-dropdown-item>
                <el-dropdown-item command="password">修改密码</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px" class="!bg-gray-50 border-r border-gray-200">
        <el-menu
          :default-active="activeMenu"
          class="h-full"
          @select="handleMenuSelect"
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Goods /></el-icon>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/goods">商品列表</el-menu-item>
            <el-menu-item index="/goods/add">添加商品</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/users">
            <el-icon><User /></el-icon>
            <span>用户管理</span>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Setting /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="!bg-gray-100">
        <div class="bg-white p-4 rounded-lg min-h-full">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>

    <!-- 修改密码抽屉 -->
    <CommonDrawer
      v-model="passwordDrawerVisible"
      title="修改密码"
      @cancel="handlePasswordCancel"
      @confirm="handlePasswordConfirm"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="100px"
      >
        <el-form-item label="原密码" prop="oldPassword">
          <el-input
            v-model="passwordForm.oldPassword"
            type="password"
            placeholder="请输入原密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            show-password
          />
        </el-form-item>
      </el-form>
    </CommonDrawer>
  </el-container>
</template>

<style scoped>
.el-header {
  --el-header-height: 60px;
  --el-header-padding: 0 20px;
}

.el-aside {
  --el-aside-width: 200px;
}

:deep(.el-dropdown) {
  outline: none !important;
  border: none !important;
}

:deep(.el-dropdown:focus) {
  outline: none !important;
  border: none !important;
}

:deep(.el-dropdown:hover) {
  background-color: transparent !important;
}

.el-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.el-icon svg) {
  fill: white;
}
</style>

<template>
  <div class="h-full">
    <h2 class="text-2xl font-bold mb-4">用户管理</h2>
    
    <el-card shadow="hover" class="h-[calc(100%-48px)]">
      <el-table 
        :data="userList" 
        style="width: 100%"
        :height="'100%'"
      >
        <!-- 头像列 -->
        <el-table-column label="头像" width="100" align="center">
          <template #default="{ row }">
            <el-avatar :size="40" :src="row.avatar" />
          </template>
        </el-table-column>

        <!-- 姓名列 -->
        <el-table-column prop="name" label="姓名" width="180" align="center" />

        <!-- 角色列 -->
        <el-table-column prop="role" label="角色" width="180" align="center">
          <template #default="{ row }">
            <el-tag :type="row.role === 'admin' ? 'success' : 'info'">
              {{ row.role === 'admin' ? '管理员' : '普通用户' }}
            </el-tag>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <el-switch
              v-model="row.isAdmin"
              :loading="row.loading"
              @change="handleRoleChange(row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

interface UserInfo {
  id: number
  name: string
  avatar: string
  role: 'admin' | 'user'
  isAdmin: boolean
  loading?: boolean
}

// 模拟用户数据
const userList = ref<UserInfo[]>([
  {
    id: 1,
    name: '张三',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    role: 'admin',
    isAdmin: true
  },
  {
    id: 2,
    name: '李四',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    role: 'user',
    isAdmin: false
  },
  {
    id: 3,
    name: '王五',
    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
    role: 'user',
    isAdmin: false
  }
])

// 处理角色切换
const handleRoleChange = async (user: UserInfo) => {
  user.loading = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    user.role = user.isAdmin ? 'admin' : 'user'
    ElMessage.success(`已${user.isAdmin ? '设为' : '取消'}管理员权限`)
  } catch (error) {
    user.isAdmin = !user.isAdmin // 恢复状态
    ElMessage.error('操作失败')
  } finally {
    user.loading = false
  }
}
</script>

<style scoped>
:deep(.el-switch) {
  --el-switch-on-color: var(--el-color-success);
}

:deep(.el-table) {
  --el-table-header-bg-color: var(--el-fill-color-light);
  height: 100%;
}

:deep(.el-table th) {
  font-weight: bold;
}

:deep(.el-card__body) {
  height: 100%;
  padding: 0;
}

:deep(.el-table__inner-wrapper) {
  height: 100%;
}
</style> 
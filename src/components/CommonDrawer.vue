<template>
  <el-drawer
    v-model="visible"
    :title="title"
    :size="size"
    :destroy-on-close="true"
    @close="handleClose"
  >
    <!-- 内容区域插槽 -->
    <div class="drawer-content">
      <slot></slot>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <div class="flex justify-end">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm" class="ml-2">
          确定
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  title: string
  modelValue: boolean
  size?: number | string
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: '30%'
})

const emit = defineEmits<Emits>()

const visible = ref(props.modelValue)

// 监听 modelValue 的变化
watch(() => props.modelValue, (newVal) => {
  visible.value = newVal
})

// 监听 visible 的变化
watch(() => visible.value, (newVal) => {
  emit('update:modelValue', newVal)
})

// 处理取消
const handleCancel = () => {
  visible.value = false
  emit('cancel')
}

// 处理确认
const handleConfirm = () => {
  emit('confirm')
}

// 处理关闭
const handleClose = () => {
  visible.value = false
  emit('cancel')
}
</script>

<style scoped>
.drawer-content {
  padding: 20px;
  height: calc(100% - 100px);
  overflow-y: auto;
}
</style>

<script lang="ts">
export default {
  name: 'CommonDrawer'
}
</script> 
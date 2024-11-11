<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">仪表盘</h2>
    
    <!-- 图表区域 -->
    <div class="mb-6">
      <el-card shadow="hover">
        <template #header>
          <div class="flex items-center">
            <el-icon class="mr-2"><TrendCharts /></el-icon>
            <span>近五天数据统计</span>
          </div>
        </template>
        <div class="flex justify-between gap-4">
          <div class="w-1/2">
            <h3 class="text-base font-medium mb-4">访问量统计</h3>
            <BarChart :series="visitData" />
          </div>
          <div class="w-1/2">
            <h3 class="text-base font-medium mb-4">销售额统计</h3>
            <BarChart :series="salesData" />
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TrendCharts } from '@element-plus/icons-vue'
import BarChart from '@/components/BarChart.vue'

interface ChartData {
  name: string
  data: number[]
}

// 访问量数据
const visitData = ref<ChartData[]>([
  {
    name: '访问量',
    data: [45, 62, 38, 78, 95]
  }
])

// 销售额数据
const salesData = ref<ChartData[]>([
  {
    name: '销售额',
    data: [55, 72, 48, 88, 65]
  }
])
</script>

<style scoped>
.el-card :deep(.el-card__header) {
  padding: 12px 20px;
}
</style>
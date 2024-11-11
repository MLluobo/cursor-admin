<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'
import dayjs from 'dayjs'

interface Props {
  width?: string
  height?: string
  series?: {
    name: string
    data: number[]
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '300px',
  series: () => [{
    name: '数据',
    data: Array(5).fill(0).map(() => Math.floor(Math.random() * 100))
  }]
})

const chartRef = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

// 获取最近5天的日期
const getRecentDates = () => {
  return Array.from({ length: 5 }, (_, i) => {
    return dayjs().subtract(4 - i, 'day').format('MM-DD')
  })
}

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  
  chart = echarts.init(chartRef.value)
  
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: props.series.map(item => item.name)
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: getRecentDates(),
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      max: 100
    },
    series: props.series.map(item => ({
      name: item.name,
      type: 'bar',
      barWidth: '40%',
      data: item.data,
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      },
      emphasis: {
        itemStyle: {
          opacity: 0.8
        }
      }
    }))
  }

  chart.setOption(option)
}

// 监听窗口大小变化
const handleResize = () => {
  chart?.resize()
}

// 监听数据变化
watch(() => props.series, () => {
  chart?.setOption({
    series: props.series.map(item => ({
      name: item.name,
      data: item.data
    }))
  })
}, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  chart?.dispose()
  window.removeEventListener('resize', handleResize)
})
</script>

<script lang="ts">
export default {
  name: 'BarChart'
}
</script> 
import { watchEffect } from 'vue'

// 自定义组合函数：用于添加和移除事件监听器
export function useEventListener(eventName: string, handler: (event: Event) => void) {
  watchEffect((onInvalidate) => {
    // 添加事件监听器
    document.addEventListener(eventName, handler)

    // 在组件卸载时移除事件监听器
    onInvalidate(() => {
      document.removeEventListener(eventName, handler)
    })
  })
}

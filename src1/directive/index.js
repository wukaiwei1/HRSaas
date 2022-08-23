// 定义自定义指令
import store from '@/store'
export const imgError = {
  inserted(el, binding) {
    // 图片加载失败事件
    if (el.src.length === 0) {
      el.src = binding.value
    } else {
      el.onerror = () => {
        el.src = binding.value
      }
    }
  },
  update(el, binding) {
    // 图片加载失败事件
    if (el.src.length === 0) {
      el.src = binding.value
    } else {
      el.onerror = () => {
        el.src = binding.value
      }
    }
  }
}

export const isHas = {
  inserted(el, binding) {
    const flag = store.state.permission.points.includes(binding.value)
    console.log(flag)
    if (!flag) {
      el.remove()
    }
  }
}

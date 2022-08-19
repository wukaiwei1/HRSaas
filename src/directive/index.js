// 定义自定义指令

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

export const test = {
  inserted() {}
}

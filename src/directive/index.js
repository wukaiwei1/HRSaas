// 定义自定义指令

export const imgError = {
  inserted(el, binding) {
    // 图片加载失败事件
    el.onerror = () => {
      el.src = binding.value
    }
  }
}

export const test = {
  inserted() {}
}

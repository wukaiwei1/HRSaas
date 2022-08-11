import pageTools from './pageTools/index.vue'

// 注册全局组件
const components = [pageTools]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}

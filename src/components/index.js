import pageTools from './pageTools/index.vue'
import updateExcal from './updateExcel'
import upLoadImg from './upLoadImg'
// 注册全局组件
const components = [pageTools, updateExcal, upLoadImg]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}

import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
// 导入所有的自定义指令
import * as directive from '@/directive'
// console.log(directive);   自定义指令的集合（对象）

// 注册全局组件
import pageTools from './components'

// 打印功能包
import print from 'vue-print-nb'

Vue.use(print)
Vue.use(pageTools)

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.config.productionTip = false

// 自定义指令
for (let key in directive) {
  Vue.directive(key, directive[key])
}
import * as filter from './filters'
// 过滤器
for (let key in filter) {
  Vue.filter(key, filter[key])
}

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})

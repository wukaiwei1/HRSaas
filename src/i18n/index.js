import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './messages/en'
import zh from './messages/zh'
import Cookies from 'js-cookie'
Vue.use(VueI18n)

export const messages = {
  en,
  zh
}

export const i18n = new VueI18n({
  locale: Cookies.get('lang') || 'zh',
  messages
})

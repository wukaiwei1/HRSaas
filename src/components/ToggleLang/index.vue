<template>
  <el-dropdown @command="command">
    <span class="el-dropdown-link">
      <svg-icon style="color: #fff; font-size: 20px" icon-class="language" />
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :command="key"
        v-for="(item, key) in messages"
        :key="key"
        :disabled="key === $i18n.locale"
        >{{ item.name }}</el-dropdown-item
      >
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { messages } from '@/i18n'
import Cookies from 'js-cookie'
export default {
  name: 'ToggleLang',
  data() {
    return {
      messages
    }
  },

  created() {},

  methods: {
    command(val) {
      this.$i18n.locale = val
      // 刷新页面
      this.$router.go(0)
      Cookies.set('lang', val)
    }
  }
}
</script>

<style scoped lang="less"></style>

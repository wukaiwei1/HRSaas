<template>
  <div class="mian">
    <svg-icon
      iconClass="fullscreen"
      className="fullscreen"
      @click="screenfullFn"
    />
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    screenfullFn() {
      if (screenfull.isEnabled) {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.mian {
  margin: 0 20px;
  .fullscreen {
    color: #fff;
    font-size: 18spx;
  }
}
</style>

<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <!-- 弹层 -->
    <el-dialog :visible.sync="isShowDialog" width="40%">
      <img :src="imgUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID98q7C2dy3tUr0tXv3vYv3wZx5xZw5yaw',
  SecretKey: '6vTklW0DBuNaYIm13pLbbMs88tOdcNtA'
})

export default {
  name: 'upLoadImg',
  data() {
    return {
      fileList: [],
      isShowDialog: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'wxw-1313341627' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败，请重试')
          }
          this.loading = false
          this.$emit('onsuccess', { url: 'https://' + data.Location })
        }
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList

    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {

      this.imgUrl = file.url
      this.isShowDialog = true
    },
    beforeUpload(file) {
      // 限制图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请选择' + types.join('或') + '图片')

        return false
      }
      // 限制图片大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过2MB')
        return false
      }
    }
  }
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>

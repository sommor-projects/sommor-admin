<template>
  <a-modal
    title="查看二维码"
    :width="340"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <img :src="imageBase64" />
  </a-modal>
</template>

<script>
import { axios } from '@/utils/request'

export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      imageBase64: null
    }
  },
  methods: {
    show (code) {
      this.confirmLoading = true
      axios({
        url: '/qrcode/image',
        method: 'get',
        params: {
          code: code,
          width: 300,
          height: 300
        }
      }).then(res => {
        if (res.success) {
          this.imageBase64 = res.result
          this.visible = true
        } else {
          this.imageBase64 = null
        }
        this.confirmLoading = false
      })
    },
    handleSubmit () {
      this.visible = false
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

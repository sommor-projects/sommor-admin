<template>
  <a-modal :width="640" :visible="visible" title="微信账号绑定" @ok="handleSubmit" @cancel="visible = false">
    <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
      <subject-select :field="formFields.userId"></subject-select>
    </a-form>
  </a-modal>
</template>

<script>
import form from '@/mixins/form'
import { SField, SFieldset } from '@/components/Field'

export default {
  name: 'WechatUserAccountBindingForm',
  components: { SField, SFieldset },
  mixins: [form],
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
      record: {}
    }
  },
  methods: {
    binding (record) {
      this.visible = true
      this.apiBasePath = '/wechat/binding'
      this.formRenderParam.openid = record.openid
      this.record = record
      this.renderForm()
    },
    formSavedSuccessDescription (res) {
      return '绑定成功'
    },
    onFormSavedSuccess (res, submitFormRedirect) {
      console.log('binding result', res)
      this.record.userId = res.result.userId
      this.visible = false
    }
  }
}
</script>

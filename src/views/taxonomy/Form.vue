<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form">
      <a-form-item
        label="英文名称"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入英文名称' }]}
          ]"
          name="name"
          placeholder="请输入英文名称" />
      </a-form-item>
      <a-form-item
        label="中文标题"
        :labelCol="{lg: {span: 7}, sm: {span: 7}}"
        :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
        <a-input
          v-decorator="[
            'title',
            {rules: [{ required: true, message: '请输入中文标题' }]}
          ]"
          name="title"
          placeholder="请输入中文标题" />
      </a-form-item>

      <a-form-item
        :wrapperCol="{ span: 24 }"
        style="text-align: center"
      >
        <a-button htmlType="submit" type="primary">提交</a-button>
        <a-button style="margin-left: 8px">保存</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
import { getTaxonomyForm } from '@/api/taxonomy'

export default {
  name: 'Form',
  data () {
    return {
      description: '添加',
      value: 1,

      // form
      form: this.$form.createForm(this),
      formFields: {

      }
    }
  },
  created () {
    this.formFields = this.getFormFields()
  },
  methods: {
    async getFormFields () {
      const response = await getTaxonomyForm('wine-region', {
        parentId: this.$route.query.parentId || 0
      })
      return response.result.fields
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

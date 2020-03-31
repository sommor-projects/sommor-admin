<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
      <s-field :field="formFields.userName"></s-field>
      <s-field v-if="formAction === 'add'" :field="formFields.password" name="password"></s-field>
      <s-field :field="formFields.nickName"></s-field>
      <s-field :field="formFields.mobilePhone"></s-field>
      <s-field :field="formFields.email"></s-field>
      <s-field :field="formFields.gender"></s-field>
      <s-field :field="formFields.avatar"></s-field>
      <div>
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="handleSubmitAndContinue">保存并继续{{formActionTitle}}</a-button>
      </div>
    </a-form>
  </a-card>
</template>

<script>
import { PageView } from '@/layouts'
import { SField, SFieldset } from '@/components/Field'
import form from '@/mixins/form'

import FileUploader from '@/components/FileUploader'

import ATreeSelect from 'ant-design-vue/es/tree-select'
import 'ant-design-vue/es/tree-select/style/index'

export default {
  name: 'UserForm',
  components: { ATreeSelect, PageView, FileUploader, SField, SFieldset },
  mixins: [form],
  data () {
    return {
    }
  },
  created () {
    return {
    }
  },
  computed: {
    subject () {
      return 'user'
    },
    pageTitle () {
      return this.formActionTitle + '用户'
    }
  },
  methods: {
    formSavedSuccessDescription (res) {
      const title = res.result.userName
      return `用户 ${title} 保存成功`
    }
  }
}
</script>

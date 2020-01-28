<template>
  <a-card :bordered="false">
    <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
      <s-field name="title"></s-field>
      <s-fieldset :fields="formFields.taxonomy"></s-fieldset>
      <subject-select name="userId"></subject-select>
      <s-field name="logo"></s-field>
      <div>
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="handleSubmitAndContinue">保存并继续{{formActionTitle}}</a-button>
      </div>
    </a-form>
  </a-card>
</template>

<script>
import { PageView } from '@/layouts'
import form from '@/mixins/form'
import { SField, SFieldset } from '@/components/Field'
import type from '@/pages/taxonomy/type'

export default {
  name: 'ShopForm',
  components: { PageView, SField, SFieldset },
  mixins: [form, type],
  data () {
    return {
    }
  },
  created () {
    this.formRenderParam.type = this.type
  },
  computed: {
    subject () {
      return 'shop'
    }
  },
  methods: {
    formSavedSuccessDescription (res) {
      const title = res.result.title
      return `${title} 保存成功`
    },
    formSubmitRedirectRoute () {
      if (this.type) {
        return {
          name: this.subject + '-' + this.type + '-list'
        }
      }
      return {
        name: this.subject + '-list'
      }
    }
  }
}
</script>

<template>
  <a-card :bordered="false">
    <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
      <subject-select name="shopId"></subject-select>
      <s-field name="title"></s-field>
      <s-field name="subTitle"></s-field>
      <s-fieldset :fields="formFields.taxonomy"></s-fieldset>
      <s-field name="pictures"></s-field>
      <s-field name="description"></s-field>
      <div>
        <a-button htmlType="submit" type="primary">保存</a-button>
        <a-button style="margin-left: 8px" @click="handleSubmitAndContinue">保存并继续{{formActionTitle}}</a-button>
      </div>
    </a-form>
  </a-card>
</template>s

<script>
import { PageView } from '@/layouts'
import form from '@/mixins/form'
import { SField, SFieldset } from '@/components/Field'
import type from '@/pages/taxonomy/type'

export default {
  name: 'SpuForm',
  components: { PageView, SField, SFieldset },
  mixins: [form, type],
  data () {
    return {
    }
  },
  created () {
    this.formRenderParam.type = this.type
    if (this.$route.query) {
      this.formRenderParam.shopId = this.$route.query.shopId
    }
  },
  computed: {
    subject () {
      return 'spu'
    }
  },
  methods: {
    formSavedSuccessDescription (res) {
      const title = res.result.title
      return `${title} 保存成功`
    },
    formSubmitRedirectRoute (res) {
      const query = {
        shopId: res.result.shopId
      }
      if (this.type) {
        return {
          name: this.subject + '-' + this.type + '-list',
          query
        }
      }
      return {
        name: this.subject + '-list',
        query
      }
    }
  }
}
</script>

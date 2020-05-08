<template>
  <a-card :bordered="false">
    <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
      <subject-select :field="formFields.product.shopId"></subject-select>
      <s-field :field="formFields.product.title"></s-field>
      <s-field :field="formFields.sku.price"></s-field>
      <s-field :field="formFields.sku.costPrice"></s-field>
      <s-field :field="formFields.sku.inventory"></s-field>
      <s-fieldset :fields="formFields.product.taxonomy"></s-fieldset>
      <s-fieldset :fields="formFields.sku.taxonomy"></s-fieldset>
      <s-field :field="formFields.product.pictures"></s-field>
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
import taxonomy from '@/pages/taxonomy/taxonomy'
import { SField, SFieldset } from '@/components/Field'

export default {
  name: 'ProductSkuForm',
  components: { PageView, SField, SFieldset },
  mixins: [form, taxonomy],
  data () {
    return {
    }
  },
  created () {
    if (this.$route.query) {
      if (this.$route.query.shopId) {
        this.formRenderParam.shopId = this.$route.query.shopId
      }
      if (this.$route.query.productId) {
        this.formRenderParam.productId = this.$route.query.productId
      }

      console.log('apiBasePath', this.apiBasePath)
      this.apiBasePath = '/product-sku'
    }
  },
  methods: {
    onFormRender (form) {
    },
    formSavedSuccessDescription (res) {
      const title = res.result.title
      return `${title} 保存成功`
    },
    formSubmitRedirectRoute (res) {
      const query = {
        shopId: res.result.shopId
      }
      return {
        name: this.getRouteNamePrefix() + '-list',
        query
      }
    }
  }
}
</script>

<template>
  <a-card :bordered="false">
    <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
      <subject-select :field="formFields.buyerId"></subject-select>
      <subject-select :field="formFields.productId"></subject-select>
      <s-field :field="formFields.buyQuantity"></s-field>
      <s-field :field="formFields.paid"></s-field>
      <div>
        <a-button htmlType="submit" type="primary">创建订单</a-button>
      </div>
    </a-form>
  </a-card>
</template>s

<script>
import { PageView } from '@/layouts'
import form from '@/mixins/form'
import { SField, SFieldset } from '@/components/Field'

export default {
  name: 'OrderForm',
  components: { PageView, SField, SFieldset },
  mixins: [form],
  data () {
    return {
    }
  },
  created () {
    this.apiBasePath = '/admin/order'
    if (this.$route.query) {
      if (this.$route.query.productId) {
        this.formRenderParam.productId = this.$route.query.productId
      }
      if (this.$route.query.skuId) {
        this.formRenderParam.skuId = this.$route.query.skuId
      }
    }
  },
  methods: {
    formSavedSuccessDescription (res) {
      const title = res.result.title
      return `${title} 保存成功`
    }
  }
}
</script>

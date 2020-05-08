<template>
  <a-card :bordered="false">
    <template v-if="false">
      <a-form @submit="handleSubjectTaxonomyFormSubmit" :form="form" v-if="formInitialized">
        <s-field :field="formFields.productId"></s-field>
        <div>
          <a-button htmlType="submit" type="primary">下一步</a-button>
        </div>
      </a-form>
    </template>
    <template v-else>
      <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
        <subject-select :field="formFields.shopId"></subject-select>
        <subject-select :field="formFields.productId"></subject-select>
        <s-field :field="formFields.price"></s-field>
        <s-field :field="formFields.costPrice"></s-field>
        <s-field :field="formFields.inventory"></s-field>
        <s-field :field="formFields.title"></s-field>
        <s-fieldset :fields="formFields.taxonomy"></s-fieldset>
        <s-field :field="formFields.pictures"></s-field>
        <div>
          <a-button htmlType="submit" type="primary">保存</a-button>
          <a-button style="margin-left: 8px" @click="handleSubmitAndContinue">保存并继续{{formActionTitle}}</a-button>
        </div>
      </a-form>
    </template>
  </a-card>
</template>s

<script>
import { PageView } from '@/layouts'
import form from '@/mixins/form'
import { SField, SFieldset } from '@/components/Field'

export default {
  name: 'SkuForm',
  components: { PageView, SField, SFieldset },
  mixins: [form],
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
    }
  },
  methods: {
    onFormRender (form) {
    },
    formSavedSuccessDescription (res) {
      const title = res.result.title
      return `${title} 保存成功`
    },
    formSubmitRedirectRouteQuery (res) {
      return {
        shopId: res.result.shopId
      }
    }
  }
}
</script>

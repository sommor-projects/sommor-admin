<template>
  <a-card :bordered="false">
    <template v-if="taxonomyNotSpecified">
      <a-form @submit="handleSubjectTaxonomyFormSubmit" :form="form" v-if="formInitialized">
        <s-field :field="formFields.taxonomy"></s-field>
        <div>
          <a-button htmlType="submit" type="primary">下一步</a-button>
        </div>
      </a-form>
    </template>
    <template v-else>
      <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
        <subject-select :field="formFields.shopId"></subject-select>
        <s-field :field="formFields.title"></s-field>
        <s-field :field="formFields.subTitle"></s-field>
        <s-fieldset :fields="formFields.taxonomy"></s-fieldset>
        <s-field :field="formFields.pictures"></s-field>
        <s-field :field="formFields.description"></s-field>
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
import taxonomy from '@/pages/taxonomy/taxonomy'

export default {
  name: 'ProductForm',
  components: { PageView, SField, SFieldset },
  mixins: [form, taxonomy],
  data () {
    return {
      specifySubjectTaxonomy: true
    }
  },
  created () {
    if (this.$route.query) {
      this.formRenderParam.shopId = this.$route.query.shopId
    }
  },
  computed: {
    subject () {
      return 'product'
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
      if (this.taxonomy && this.subject !== this.taxonomy) {
        return {
          name: this.subject + '-' + this.taxonomy + '-list',
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

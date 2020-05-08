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
        <s-field :field="formFields.title"></s-field>
        <s-field :field="formFields.subTitle"></s-field>
        <s-fieldset :fields="formFields.taxonomy"></s-fieldset>
        <subject-select :field="formFields.userId"></subject-select>
        <s-field :field="formFields.logo"></s-field>
        <div>
          <a-button htmlType="submit" type="primary">保存</a-button>
          <a-button style="margin-left: 8px" @click="handleSubmitAndContinue">保存并继续{{formActionTitle}}</a-button>
        </div>
      </a-form>
    </template>
  </a-card>
</template>

<script>
import { PageView } from '@/layouts'
import form from '@/mixins/form'
import { SField, SFieldset } from '@/components/Field'
import taxonomy from '@/pages/taxonomy/taxonomy'

export default {
  name: 'ShopForm',
  components: { PageView, SField, SFieldset },
  mixins: [form, taxonomy],
  methods: {
    formSavedSuccessDescription (res) {
      const title = res.result.title
      return `${title} 保存成功`
    }
  }
}
</script>

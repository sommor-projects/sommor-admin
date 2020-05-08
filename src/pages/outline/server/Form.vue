<template>
  <a-card :bordered="false">
    <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
      <s-field :field="formFields.name"></s-field>
      <s-field :field="formFields.apiUrl"></s-field>
      <s-fieldset :fields="formFields.taxonomy"></s-fieldset>
      <s-field :field="formFields.startEndTime"></s-field>
      <subject-select :field="formFields.agencyUserId"></subject-select>
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
import taxonomy from '@/pages/taxonomy/taxonomy'

export default {
  name: 'OutlineServerForm',
  components: { PageView, SField, SFieldset },
  mixins: [form, taxonomy],
  data () {
    return {
    }
  },
  methods: {
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

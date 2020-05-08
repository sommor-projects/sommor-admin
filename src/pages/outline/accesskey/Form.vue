<template>
  <a-card :bordered="false">
    <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
      <s-field :field="formFields.name"></s-field>
      <div>
        <a-button htmlType="submit" type="primary">保存</a-button>
      </div>
    </a-form>
  </a-card>
</template>s

<script>
import { PageView } from '@/layouts'
import form from '@/mixins/form'
import { SField, SFieldset } from '@/components/Field'
import { axios } from '@/utils/request'

export default {
  name: 'OutlineServerForm',
  components: { PageView, SField, SFieldset },
  mixins: [form],
  inject: ['addPageRenderListener', 'renderPageView', 'setPageSubjectTitle', 'setPageSubjectTaxonomyTitle'],
  data () {
    return {
      outlineServerId: undefined
    }
  },
  created () {
    if (this.$route.query && this.$route.query.outlineServerId) {
      this.formData.outlineServerId = this.$route.query.outlineServerId
      this.outlineServerId = this.$route.query.outlineServerId
    }
  },
  async mounted () {
    this.setPageSubjectTaxonomyTitle('accessKey')
    if (this.outlineServerId) {
      const res = await axios({
        url: '/outline-server/detail',
        method: 'get',
        params: {
          id: this.outlineServerId
        }
      })
      if (res.success) {
        this.setPageSubjectTitle(res.result.name)
      }
    }
  },
  methods: {
    formSavedSuccessDescription (res) {
      const title = res.result.name
      return `${title} 保存成功`
    },
    formSubmitRedirectRouteQuery (res) {
      return {
        outlineServerId: res.result.outlineServerId
      }
    }
  }
}
</script>

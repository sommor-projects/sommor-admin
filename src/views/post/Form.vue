<template>
  <page-view :title="pageTitle" @pageRender="onPageRender" :pageRenderApi="pageRenderApi">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="父分类"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-tree-select
            placeholder="选择一个父分类"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            name="parentId"
            style="width: 100%"
            :treeData="parentIdOptionTrees"
            v-decorator="[
            'parentId',
            {rules: [{ required: true, message: '选择一个父分类' }]}
          ]"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item
          label="Slug"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
            'slug',
            {rules: []}
          ]"
            name="slug"
            placeholder="请输入Slug" />
        </a-form-item>
        <a-form-item
          label="英文名称"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入英文名称' }]}
          ]"
            name="name"
            placeholder="请输入英文名称" />
        </a-form-item>
        <a-form-item
          label="中文标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
            'title',
            {rules: [{ required: true, message: '请输入中文标题' }]}
          ]"
            name="title"
            placeholder="请输入中文标题" />
        </a-form-item>
        <a-form-item
          :wrapperCol="{ span: 24 }"
          style="text-align: center"
        >
          <a-button htmlType="submit" type="primary">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </page-view>
</template>

<script>
import { renderTaxonomyForm, saveTaxonomy } from '@/api/taxonomy'
import { PageView } from '@/layouts'

import ATreeSelect from 'ant-design-vue/es/tree-select'
import 'ant-design-vue/es/tree-select/style/index'

export default {
  name: 'Form',
  components: { ATreeSelect, PageView },
  data () {
    return {
      description: '添加',
      value: 1,
      form: this.$form.createForm(this),
      parentIdOptions: [],
      parentIdOptionTrees: [],
      formFieldValues: {},
      queryParams: {
        id: 0,
        parentId: 0
      },
      rootTaxonomy: {}
    }
  },
  props: {
    rootSlug: {
      type: String,
      required: false
    }
  },
  created () {
    console.log('created', this.$route.query)
    if (this.$route.query) {
      this.queryParams = Object.assign(this.queryParams, {
        id: this.$route.query.id || 0,
        parentId: this.$route.query.parentId || 0
      })
    }
    this.renderForm(this.queryParams)
  },
  computed: {
    pageTitle () {
      return (this.queryParams.id > 0 ? '编辑' : '添加') + ((this.rootTaxonomy && this.rootTaxonomy.title) || '')
    }
  },
  methods: {
    pageRenderApi () {
      const id = this.$route.query && (this.$route.query.parentId || this.$route.query.id)
      if ((id && id > 0) || this.rootSlug) {
        return {
          url: '/taxonomy/view',
          method: 'get',
          params: {
            id: id || 0,
            rootSlug: this.rootSlug || null
          }
        }
      }
      return false
    },
    onPageRender (pageView) {
      this.rootTaxonomy = pageView.content.rootTaxonomy
    },
    renderForm (params) {
      renderTaxonomyForm(params).then(response => {
        const form = response.result
        console.log('renderForm', form)

        const formFieldValues = form.fieldValues
        this.formFieldValues = formFieldValues
        // this.parentIdOptions = form.fields.parentId.options
        this.parentIdOptionTrees = form.fields.parentId.optionTrees
        const values = {}
        for (const k in this.form.getFieldsValue()) {
          values[k] = formFieldValues[k]
        }
        console.log('setFieldValue', values)
        this.form.setFieldsValue(values)
      })
    },
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const confirmValues = Object.assign(this.formFieldValues, values)
          console.log('Received values of form: ', confirmValues)
          saveTaxonomy(confirmValues).then(res => {
            console.log(res)
            if (res.success) {
              const name = this.rootSlug ? ('taxonomy-' + this.rootSlug + '-list') : 'taxonomy-list'
              this.$router.push({
                name,
                query: {
                  parentId: res.result.parentId
                }
              })
            }
          })
        }
      })
    }
  }
}
</script>

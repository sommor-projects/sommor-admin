<template>
  <page-view :title="pageTitle" @pageRender="onPageRender" :pageRenderApi="pageRenderApi">
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
      <a-form @submit="handleSubmit" :form="form">
        <a-form-item
          label="标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
            'title',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
            name="title"
            placeholder="请输入标题" />
        </a-form-item>
        <a-form-item
          label="副标题"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-input
            v-decorator="[
            'subTitle',
            {rules: []}
          ]"
            name="subTitle"
            placeholder="请输入副标题" />
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
          label="描述"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-textarea
            v-decorator="[
            'description',
            {rules: [max = 500, message='最大长度为500个字符']}
          ]"
            name="description"
            placeholder="请输入描述" />
        </a-form-item>

        <div>
          <a-upload
            name="file"
            action="/api/media/upload"
            listType="picture-card"
            :fileList="pictures"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="pictures.length <1">
              <a-icon type="plus" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>

        <a-form-item
          label="产区"
          :labelCol="{lg: {span: 7}, sm: {span: 7}}"
          :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
          <a-tree-select
            placeholder="选择产区"
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            name="relatedTaxonomies.wine-region"
            style="width: 100%"
            :treeData="relatedTaxonomyOptions['relatedTaxonomies.wine-region']"
            v-decorator="[
            'relatedTaxonomies.wine-region',
            {rules: [{ required: true, message: '选择产区' }]}
          ]"
          >
          </a-tree-select>
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
import { renderPostForm, savePost } from '@/api/post'
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
      relatedTaxonomyOptions: {},
      formValues: {},
      queryParams: {
        id: 0,
        typeId: 0
      },
      rootTaxonomy: {},
      pictures: [],
      previewVisible: false,
      previewImage: ''
    }
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  created () {
    this.queryParams = Object.assign(this.queryParams, {
      id: this.$route.query.id || null,
      type: this.type
    })
    this.renderForm(this.queryParams)
  },
  computed: {
    pageTitle () {
      return (this.queryParams.id > 0 ? '编辑' : '添加') + ((this.rootTaxonomy && this.rootTaxonomy.title) || '')
    }
  },
  methods: {
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange (info) {
      console.log(info)
      this.pictures = info.fileList
    },
    pageRenderApi () {
      return {
        url: '/taxonomy/info',
        method: 'get',
        params: {
          type: this.type,
          subject: 'post'
        }
      }
    },
    onPageRender (pageView) {
      this.rootTaxonomy = pageView.content.rootTaxonomy
    },
    renderForm (params) {
      renderPostForm(params).then(response => {
        const form = response.result
        console.log('renderForm', form)

        const formValues = form.values
        this.formValues = formValues

        if (formValues.coverUrl) {
          this.pictures.push({
            uid: '-1',
            name: formValues.coverUrl,
            status: 'done',
            url: formValues.coverUrl
          })
        }

        // this.relatedTaxonomyOptions['relatedTaxonomies.wine-region'] = form.fields['relatedTaxonomies.wine-region'].optionTrees
        const values = {}
        for (const k in this.form.getFieldsValue()) {
          values[k] = formValues[k]
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
          const confirmValues = Object.assign(this.formValues, values)
          console.log('Received values of form: ', confirmValues)
          savePost(confirmValues).then(res => {
            console.log('savePost response:', res)
            if (res.success) {
              this.$router.push({
                name: 'post-' + this.type + '-list',
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

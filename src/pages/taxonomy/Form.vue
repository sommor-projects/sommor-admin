<template>
  <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
    <a-row :gutter="24">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false" title="分类基础信息">
          <s-field :field="formFields.parent"></s-field>
          <s-field :field="formFields.title"></s-field>
          <s-field :field="formFields.subTitle"></s-field>
          <s-field :field="formFields.name"></s-field>
          <s-field :field="formFields.fieldStyle"></s-field>
          <a-form-item>
            <a-button htmlType="submit" type="primary">保存</a-button>
            <a-button style="margin-left: 8px" @click="handleSubmitAndContinue">保存并继续{{formActionTitle}}</a-button>
          </a-form-item>
        </a-card>
      </a-col>
      <a-col
        style="padding: 0 12px"
        :xl="8"
        :lg="24"
        :md="24"
        :sm="24"
        :xs="24">
        <a-row
          v-for="(attributeSettings, index) in formData.attributeSettings"
          :key="'attributeSettings-' + index">
          <a-card :body-style="{ margin: '0px 0px 12px 0px'}" :bordered="false" title="关联的分类信息">
            <span slot="extra">
              <a @click="handleDeleteAttributeSettings(index)">删除</a>
            </span>
            <s-field :name="'attributeSettings.'+ index + '.subject'" :field="formFields.attributeSettings.subject" :value="attributeSettings.subject"></s-field>
            <s-field :name="'attributeSettings.'+ index + '.type'" :field="formFields.attributeSettings.type" :value="attributeSettings.type"></s-field>
            <a-row type="flex">
              <a-col :span="4">
                <s-field :name="'attributeSettings.'+ index + '.required'" :field="formFields.attributeSettings.required" :value="attributeSettings.required"></s-field>
              </a-col>
              <a-col :span="4">
                <s-field :name="'attributeSettings.'+ index + '.multiple'" :field="formFields.attributeSettings.multiple" :value="attributeSettings.multiple"></s-field>
              </a-col>
            </a-row>
          </a-card>
        </a-row>
        <a-row type="flex" justify="center">
          <a-col :span="24">
            <a-button style="width: 100%" @click="addTaxonomyAttributeSettingAction">
              <a-icon type="plus" /> 添加关联分类
            </a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import form from '@/mixins/form'
import taxonomy from '@/pages/taxonomy/taxonomy'

import ATreeSelect from 'ant-design-vue/es/tree-select'
import 'ant-design-vue/es/tree-select/style/index'

import { SField } from '@/components/Field'

export default {
  name: 'Form',
  components: { ATreeSelect, SField },
  mixins: [form, taxonomy],
  data () {
    return {
      taxonomyOptions: [],
      formRenderParam: {},
      formData: {
        attributeSettings: []
      }
    }
  },
  created () {
    if (this.$route.query) {
      const taxonomy = this.$route.query.parent || this.$route.query.taxonomy || null
      if (taxonomy) {
        this.pageRenderParams.taxonomy = taxonomy
      }
      if (this.$route.query.id) {
        this.pageRenderParams.id = this.$route.query.id
      } else if (taxonomy) {
        this.formRenderParam.parent = taxonomy
      }
    }
  },
  methods: {
    addTaxonomyAttributeSettingAction () {
      const o = {
        type: null,
        multiple: false,
        required: false
      }
      if (this.formData.attributeSettings) {
        this.formData.attributeSettings.push(o)
      } else {
        this.formData.attributeSettings = [ o ]
      }
      console.log('addRelatedTaxonomyConfigAction', this.formData.attributeSettings)
    },
    formSubmitRedirectRoute (res) {
      return {
        name: this.taxonomy ? ('taxonomy-' + this.taxonomy + '-list') : 'taxonomy-list',
        query: {
          parent: res.result.root ? null : res.result.parentKey
        }
      }
    },
    formSavedSuccessDescription (res) {
      const title = res.result.root ? res.result.title : `${this.typeTitle} ${res.result.title}`
      return `${title} ${this.formActionTitle}成功`
    },
    handleDeleteAttributeSettings (index) {
      this.formData.attributeSettings.splice(index, 1)
    }
  }
}
</script>

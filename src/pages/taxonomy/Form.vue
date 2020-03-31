<template>
  <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
    <a-row :gutter="24">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card :bordered="false" title="分类基础信息">
          <s-field :field="formFields.parentId"></s-field>
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
          v-for="(config, index) in formData.relationConfigs"
          :key="'relationConfigs-' + index">
          <a-card :body-style="{ margin: '0px 0px 12px 0px'}" :bordered="false" title="关联的分类信息">
            <span slot="extra">
              <a @click="handleDeleteRelationConfig(index)">删除</a>
            </span>
            <s-field :name="'relationConfigs.'+ index + '.subject'" :field="formFields.relationConfigs.subject"></s-field>
            <s-field :name="'relationConfigs.'+ index + '.typeId'" :field="formFields.relationConfigs.typeId"></s-field>
            <a-row type="flex">
              <a-col :span="4">
                <s-field :name="'relationConfigs.'+ index + '.required'" :field="formFields.relationConfigs.required"></s-field>
              </a-col>
              <a-col :span="4">
                <s-field :name="'relationConfigs.'+ index + '.multiple'" :field="formFields.relationConfigs.multiple"></s-field>
              </a-col>
            </a-row>
          </a-card>
        </a-row>
        <a-row type="flex" justify="center">
          <a-col :span="24">
            <a-button style="width: 100%" @click="addRelatedTaxonomyConfigAction">
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
      formRenderParam: {
        id: 0,
        parentId: 0
      },
      formData: {
        relationConfigs: []
      }
    }
  },
  created () {
    if (this.$route.query) {
      this.formRenderParam.parentId = this.$route.query.parentId || 0

      const id = this.$route.query && (this.$route.query.parentId || this.$route.query.id)
      this.pageRenderParams.id = id || 0
    }
  },
  computed: {
    subject () {
      return 'taxonomy'
    }
  },
  methods: {
    addRelatedTaxonomyConfigAction () {
      const o = {
        taxonomyId: null,
        multiple: false,
        required: false
      }
      if (this.formData.relationConfigs) {
        this.formData.relationConfigs.push(o)
      } else {
        this.formData.relationConfigs = [ o ]
      }
      console.log('addRelatedTaxonomyConfigAction', this.formData.relationConfigs)
    },
    formSubmitRedirectRoute (res) {
      return {
        name: this.taxonomy ? ('taxonomy-' + this.taxonomy + '-list') : 'taxonomy-list',
        query: {
          parentId: res.result.parentId
        }
      }
    },
    formSavedSuccessDescription (res) {
      const title = res.result.parentId === 0 ? res.result.title : `${this.typeTitle} ${res.result.title}`
      return `${title} ${this.formActionTitle}成功`
    },
    handleDeleteRelationConfig (index) {
      this.formData.relationConfigs.splice(index, 1)
    }
  }
}
</script>

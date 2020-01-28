<template>
  <div>
    <template v-if="formField">
      <a-form-item :label="formField.title">
        <template v-if="fieldType==='text'">
          <template v-if="formField.style==='textarea'">
            <a-textarea
              v-decorator="[
            `${fieldName}`,
            {rules: [{ required: formField.constraints.required, message: '请输入' + formField.title }]}
          ]"
              :name="fieldSubmitName"
              :placeholder="'请输入' + formField.title" />
          </template>
          <template v-else>
            <a-input
              v-decorator="[
            `${fieldName}`,
            {rules: [{ required: formField.constraints.required, message: '请输入' + formField.title }]}
          ]"
              :name="fieldSubmitName"
              :disabled="formField.constraints.disabled"
              :placeholder="'请输入' + formField.title" />
          </template>
        </template>
        <template v-else-if="fieldType==='files'">
          <file-uploader :name="fieldName">
          </file-uploader>
        </template>
        <template v-else-if="fieldType==='select'">
          <template v-if="formField.style==='cascader'">
            <a-cascader
              :placeholder="'请选择' + formField.title"
              :name="fieldSubmitName"
              :options="formField.options"
              v-decorator="[
            `${fieldName}`,
            {rules: [{ required: formField.constraints.required, message: '请选择' + formField.title }]}
              ]"
            >
            </a-cascader>
          </template>
          <template v-else-if="formField.tree">
            <a-tree-select
              :placeholder="'请选择' + formField.title"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :name="fieldSubmitName"
              style="width: 100%"
              :treeData="formField.options"
              :multiple="formField.multiple"
              v-decorator="[
            `${fieldName}`,
            {rules: [{ required: formField.constraints.required, message: '请选择' + formField.title }]}
              ]"
            >
            </a-tree-select>
          </template>
          <template v-else>
            <a-select
              allowClear
              :placeholder="'请选择' + formField.title"
              :name="fieldSubmitName"
              :options="formField.options"
              :multiple="formField.multiple"
              v-decorator="[
            `${fieldName}`,
            {rules: [{ required: formField.constraints.required, message: '请选择' + formField.title }]}
              ]"
            >
            </a-select>
          </template>
          <template>
          </template>
        </template>
        <template v-else-if="fieldType==='switch'">
          <a-switch
            v-decorator="[
              `${fieldName}`,
              { valuePropName: 'checked' }
            ]"
            :name="fieldSubmitName" />
        </template>
        <template v-else-if="fieldType==='subject-select'">
          <subject-select :field="formField" :name="fieldName" :submitName="fieldSubmitName"></subject-select>
        </template>
      </a-form-item>
    </template>
  </div>
</template>
<script>

import ATreeSelect from 'ant-design-vue/es/tree-select'
import 'ant-design-vue/es/tree-select/style/index'

import ACascader from 'ant-design-vue/es/cascader'
import 'ant-design-vue/es/cascader/style/index'

import field from '@/mixins/field'

export default {
  name: 'SField',
  components: { ATreeSelect, ACascader },
  mixins: [field],
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

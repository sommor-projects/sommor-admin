<template>
  <div>
    <template v-if="formField">
      <a-form-item :label="formField.title">
        <template v-if="fieldType==='input'">
          <template v-if="formField.style==='textarea'">
            <a-textarea
              v-decorator="[
            `${fieldName}`,
            {rules: [{ required: formField.constraint.required, message: '请输入' + formField.title }], initialValue: formField.value}
          ]"
              :name="fieldSubmitName"
              :placeholder="'请输入' + formField.title" />
          </template>
          <template v-else>
            <a-input
              v-decorator="[
            `${fieldName}`,
            {rules: [{ required: formField.constraint.required, message: '请输入' + formField.title }], initialValue: formField.value}
          ]"
              :name="fieldSubmitName"
              :disabled="formField.constraint.disabled"
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
            {rules: [{ required: formField.constraint.required, message: '请选择' + formField.title }], initialValue: fieldValue}
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
            {rules: [{ required: formField.constraint.required, message: '请选择' + formField.title }], initialValue: fieldValue}
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
            {rules: [{ required: formField.constraint.required, message: '请选择' + formField.title }], initialValue: fieldValue}
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
              { valuePropName: 'checked', initialValue: fieldValue}
            ]"
            :name="fieldSubmitName" />
        </template>
        <template v-else-if="fieldType==='subject-select'">
          <subject-select :field="formField" :name="fieldName" :submitName="fieldSubmitName"></subject-select>
        </template>
        <template v-else-if="fieldType==='date-time-range'">
          <a-range-picker
            :name="fieldSubmitName"
            style="width: 100%"
            :format="formField.format"
            v-decorator="[
           `${fieldName}`,
            {rules: [{ required: formField.constraint.required, message: '请选择' + formField.title }], initialValue: this.field.value}
          ]" />
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

import moment from 'moment'
import 'moment/locale/zh-cn'
import field from '@/mixins/field'

moment.locale('zh-cn')

export default {
  name: 'SField',
  components: { ATreeSelect, ACascader },
  mixins: [field],
  inject: [],
  data () {
    return {
    }
  },
  created () {
    if (this.field.tag === 'date-time-range') {
      const fieldValue = this.field.value
      const format = this.field.format
      this.field.value = [moment(fieldValue[0], format), moment(fieldValue[1], format)]
    }
  },
  methods: {
    moment
  }
}
</script>

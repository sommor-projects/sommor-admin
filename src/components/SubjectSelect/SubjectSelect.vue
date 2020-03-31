<template>
  <a-form-item :label="formField.title">
    <a-select
      showSearch
      :multiple="formField.multiple"
      :placeholder="'请选择' + formField.title"
      :filterOption="false"
      @search="handleSearch"
      @change="handleChange"
      :notFoundContent="fetching ? undefined : null"
      :name="formField.fullName"
      v-decorator="[`${formField.fullName}`, {rules: [{ required: formField.constraint.required, message: '请选择' + formField.title }], initialValue: formField.value}]"
    >
      <a-spin v-if="fetching" slot="notFoundContent" size="small" />
      <a-select-option v-for="d in data" :key="d.value">{{d.label}}</a-select-option>
    </a-select>
  </a-form-item>
</template>
<script>

import debounce from 'lodash/debounce'
import { axios } from '@/utils/request'
import field from '@/mixins/field'

export default {
  name: 'subject-select',
  mixins: [field],
  inject: ['setFormData'],
  data () {
    this.lastFetchId = 0
    this.handleSearch = debounce(this.handleSearch, 800)
    return {
      data: [],
      fetching: false,
      options: []
    }
  },
  created () {
    console.log('entityName-select', this.formField, this.fieldSubmitName, this.fieldName)
    this.data = this.formField.options
  },
  methods: {
    async handleSearch (value) {
      console.log('entityName select search: ', value, this.lastFetchId)

      this.lastFetchId += 1
      const fetchId = this.lastFetchId
      let data = []
      if (value) {
        this.data = []
        this.fetching = true

        const params = {}
        Object.assign(params, this.formField.entityConditions || {}, {
          keywords: value,
          pageNo: 1,
          pageSize: 10
        })
        const res = await axios({
          url: '/' + this.formField.entityName + '/select/options',
          method: 'get',
          params
        })

        if (res.success) {
          data = res.result
          console.log('entityName select: ', data)
        }
      }

      if (fetchId === this.lastFetchId) {
        this.data = data
        this.fetching = false
      }
    },
    handleChange (value) {
      this.fetching = false
      this.data = this.data.filter(e => e.value === value)
      this.setFormData(this.fieldName, value)
      console.log('entityName select change: ', value, this.data)
    }
  }
}
</script>

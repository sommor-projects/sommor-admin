<template>
  <div>
    <a-upload
      name="file"
      :action="action"
      listType="picture-card"
      :fileList="files"
      :headers="headers"
      @preview="handlePreview"
      @change="handleChange"
      :remove="handlePictureRemove"
    >
      <div v-if="files.length < fileMaxCount">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传</div>
      </div>
    </a-upload>

    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>
<script>

import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  name: 'FileUploader',
  inject: ['getFormData', 'getFormField'],
  props: {
    name: {
      type: String,
      default: 'pictures',
      required: false
    }
  },
  data () {
    return {
      previewVisible: false,
      previewImage: '',
      files: [],
      fileMaxCount: 1,
      action: '',
      headers: {}
    }
  },
  created () {
    const formField = this.getFormField(this.name)
    this.fileMaxCount = formField.maxCount
    this.action = formField.uploadUrl
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (token) {
      this.headers['X-Authentication'] = token
    }
    const value = this.getFormData(this.name)
    console.log('fileUploader name: ', this.name, value)
    if (value) {
      for (const file of value) {
        this.addUploadedFile(file)
      }
    }
  },
  methods: {
    addUploadedFile (item) {
      this.files.push({
        mediaFileId: item.id,
        uid: item.uri,
        name: item.title || (this.name + '-' + item.id),
        status: 'done',
        url: item.url
      })
    },
    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange (info) {
      console.log('handle file change: ', info)
      if (info.file.status === 'done') {
        this.getFormData(this.name).push(info.file.response.result)
      }
      this.files = info.fileList
      console.log('files: ', this.files)
    },
    handlePictureRemove (file) {
      console.log('handlePictureRemove', file)
      return false
    }
  }
}
</script>

<template>
  <div>
    <a-upload
      name="file"
      action="/api/media/upload"
      listType="picture-card"
      :fileList="files"
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
      fileMaxCount: 1
    }
  },
  created () {
    console.log('fileUploader name: ', this.name)
    this.fileMaxCount = this.getFormField(this.name).maxCount
    const value = this.getFormData(this.name)
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
        mediaSubjectRelationId: item.mediaSubjectRelationId,
        uid: item.uri,
        name: item.title,
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
        info.file.mediaFileId = info.file.response.result.id
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

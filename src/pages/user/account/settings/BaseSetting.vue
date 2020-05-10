<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form @submit="handleSubmit" :form="form" v-if="formInitialized">
          <s-field :field="formFields.userName"></s-field>
          <s-field v-if="formAction === 'add'" :field="formFields.password" name="password"></s-field>
          <s-field :field="formFields.nickName"></s-field>
          <s-field :field="formFields.mobilePhone"></s-field>
          <s-field :field="formFields.email"></s-field>
          <s-field :field="formFields.gender"></s-field>
          <div>
            <a-button type="primary" @click="handleSubmitAndContinue">保存</a-button>
          </div>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }" v-if="formInitialized && formAction === 'edit'">
        <div class="ant-upload-preview" @click="$refs.modal.edit(formData.id, formData.avatar)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setAvatar"/>

  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import form from '@/mixins/form'
import { SField } from '@/components/Field'

export default {
  components: {
    AvatarModal, SField
  },
  mixins: [form],
  data () {
    return {
      // cropper
      preview: {},
      option: {
        img: '/avatar-default-0.png',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  methods: {
    setAvatar (url) {
      this.option.img = url
    },
    formSavedSuccessDescription (res) {
      const title = res.result.userName
      return `用户账号 ${title} 基本设置保存成功`
    },
    onFormRender (form) {
      if (form.data.avatar) {
        this.option.img = form.data.avatar
      }
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>

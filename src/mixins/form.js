import { axios } from '@/utils/request'
import moment from 'moment'

export default {
  props: {
    apiBasePath: {
      type: String,
      required: false
    }
  },
  inject: ['reload', 'setPageSubjectAction'],
  provide () {
    return {
      getFormData: this.getFormData,
      getFormField: this.getFormField,
      setFormData: this.setFormData,
      addFormSubmitDataFormatters: this.addFormSubmitDataFormatters
    }
  },
  data () {
    return {
      formRenderParam: {},
      form: this.$form.createForm(this),
      formFields: {},
      formData: {},
      formAction: undefined,
      formActionTitle: '',
      formInitialized: false,
      formRenderPath: '',
      formSubmitDataFormatters: []
    }
  },
  created () {
    if (this.$route.query && this.$route.query.id) {
      this.formRenderParam.id = this.$route.query.id
    }
    this.addFormSubmitDataFormatters(this.formatSubmitData)
  },
  async mounted () {
    this.$loading.show()
    if (this.formRenderPath === '') {
      this.formRenderPath = this.apiBasePath + '/form'
    }
    const res = await this.formRender()
    this.initForm(res)
    this.$loading.hide()
  },
  methods: {
    initForm (response) {
      if (response && response.success) {
        const form = response.result
        console.log('renderFormResult', form)
        this.formFields = form.fields
        this.formData = Object.assign(this.formData, form.data)
        this.formAction = form.action
        this.formActionTitle = form.actionTitle
        this.setPageSubjectAction(this.formActionTitle)
        this.onFormRender(form)
        // this.setFormFieldsValue(this.formData)
        this.formInitialized = true
      }
    },
    getFormData (name) {
      return this.getObjectValue(this.formData, name)
    },
    getFormField (name) {
      return this.getObjectValue(this.formFields, name)
    },
    getObjectValue (object, name) {
      if (name.indexOf('.') !== -1) {
        const a = name.split('.')
        let v = object[a[0]]
        for (let i = 1; i < a.length; i++) {
          v = v[a[i]]
        }
        return v
      } else {
        return object[name]
      }
    },
    onFormRender (form) {
    },
    formRender () {
      console.log('formRenderParam： ', this.formRenderParam)
      return axios({
        url: this.formRenderPath,
        params: this.formRenderParam,
        method: 'get'
      })
    },
    formSave (formData) {
      const url = this.apiBasePath + '/' + this.formAction
      return axios.post(url, formData)
    },
    setFormData (k, v) {
      const data = {}
      data[k] = v
      this.setFormFieldsValue(data)
    },
    setFormFieldsValue (data) {
      setTimeout(() => {
        console.log('this.form.getFieldsValue:', this.form.getFieldsValue())
        console.log('this.form.data:', data)
        const formData = this.getFormFieldData(this.form.getFieldsValue(), data)
        console.log('formData:', formData)
        const formattedFormData = this.formatFormData(formData)
        console.log('setFieldValue', formattedFormData)
        this.form.setFieldsValue(formattedFormData)
      }, 0)
    },
    addFormSubmitDataFormatters (formatter) {
      this.formSubmitDataFormatters.push(formatter)
    },
    formatFormData (data) {
      const formattedData = {}
      for (const k in data) {
        const v = this.formatFormValue(data[k])
        if (v !== undefined) {
          formattedData[k] = v
        }
      }
      return formattedData
    },
    formatFormValue (value) {
      if (value instanceof Array) {
        const formatted = []
        for (let i = 0; i < value.length; i++) {
          formatted.push(this.formatFormValue(value[i]))
        }
        return formatted
      } else if (value instanceof Object) {
        return this.formatFormData(value)
      } else if (value === true || value === false) {
        return value
      } else if (value !== undefined && value !== null) {
        return value.toString()
      }
      return undefined
    },
    submitForm (submitFormRedirect) {
      this.form.validateFields((err, data) => {
        console.log('Received data of form: ', data)
        if (!err) {
          const submitData = {}
          Object.assign(submitData, this.formData)
          this.mergeFormSubmitData(submitData, data)
          console.log('submitFormData: ', submitData)
          this.formSave(submitData).then(res => {
            console.log('submitForm response: ', res)
            if (res.success) {
              this.onFormSavedSuccess(res)
              if (submitFormRedirect === true) {
                this.reload()
              } else {
                const to = submitFormRedirect || this.formSubmitRedirectRoute(res)
                console.log('formSubmitRedirectRoute: ', to)
                this.$router.push(to)
              }
            }
          })
        }
      })
    },
    getFormFieldData (formFieldsValue, data) {
      const formFieldData = {}
      for (const k in formFieldsValue) {
        if (data[k] instanceof Object && formFieldsValue[k] instanceof Object) {
          formFieldData[k] = this.getFormFieldData(formFieldsValue[k], data[k])
        } else {
          formFieldData[k] = data[k]
        }
      }
      return formFieldData
    },
    mergeFormSubmitData (target, source) {
      for (const k in source) {
        const v1 = target[k]
        const v2 = source[k]
        if (v1 instanceof Object && v2 instanceof Object) {
          this.mergeFormSubmitData(v1, v2)
        } else {
          var v = source[k]
          this.formSubmitDataFormatters.forEach(callback => {
            v = callback(v)
          })
          target[k] = v
        }
      }
    },
    onFormSavedSuccess (res) {
      this.notify({
        type: 'success',
        message: this.formActionTitle + '成功',
        description: this.formSavedSuccessDescription(res)
      })
    },
    formSavedSuccessDescription (res) {
      return this.formActionTitle + '成功'
    },
    formSubmitRedirectRoute (res) {
      return {
        name: this.getRouteNamePrefix() + '-list',
        query: this.formSubmitRedirectRouteQuery()
      }
    },
    formSubmitRedirectRouteQuery (res) {
      return {}
    },
    handleSubmit (e) {
      e.preventDefault()
      this.submitForm()
    },
    handleSubmitAndContinue (e) {
      this.submitForm(true)
    },
    formatSubmitData (value) {
      if (value instanceof moment) {
        return value.format('YYYY-MM-DD HH:mm:ss')
      }

      return value
    }
  }
}

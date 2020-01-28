export default {
  inject: ['getFormData', 'getFormField'],
  props: {
    name: {
      type: String,
      default: undefined,
      required: false
    },
    field: {
      type: Object,
      default: null,
      required: false
    },
    type: {
      type: Object,
      default: null,
      required: false
    }
  },
  data () {
    return {
      formField: {}
    }
  },
  computed: {
    fieldName () {
      return this.name || this.formField.fullName
    },
    fieldType () {
      return this.type || this.formField.type
    },
    fieldSubmitName () {
      const name = this.formField.fullName
      if (name.indexOf('.') !== -1) {
        const a = name.split('.')
        let fieldSubmitName = a[0]
        for (let i = 1; i < a.length; i++) {
          fieldSubmitName += '[' + a[i] + ']'
          return fieldSubmitName
        }
      }
      return name
    }
  },
  created () {
    if (this.field) {
      this.formField = this.field
    } else if (this.name) {
      this.formField = this.getFormField(this.name)
    }
    console.log('field: ', this.fieldName, this.fieldType, this.fieldSubmitName)
  }
}

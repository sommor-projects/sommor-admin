export default {
  props: {
    field: {
      type: Object,
      required: true
    },
    model: {
      type: Object,
      default: null,
      required: false
    },
    type: {
      type: Object,
      default: null,
      required: false
    },
    name: {
      type: String,
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
      return this.formField.tag
    },
    fieldSubmitName () {
      const name = this.formField.fullName
      console.log('formField', name, this.formField)
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
    this.formField = this.field
    console.log('field: ', this.fieldName, this.fieldType, this.fieldSubmitName)
  }
}

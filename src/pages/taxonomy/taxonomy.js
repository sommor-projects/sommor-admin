export default {
  props: {
    taxonomy: {
      type: String,
      required: false
    },
    showSubjectTaxonomySearchField: {
      type: Boolean,
      default: true,
      required: false
    },
    specifySubjectTaxonomy: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  data () {
    return {
      typeInfo: {},
      taxonomyDetail: {},
      pageRenderParams: {}
    }
  },
  computed: {
    typeTitle () {
      return (this.typeInfo && this.typeInfo.title) || ''
    },
    taxonomyNotSpecified () {
      if (this.specifySubjectTaxonomy) {
        const id = (this.$route.query && this.$route.query.id || '0')
        const taxonomy = this.subjectTaxonomy
        return id === '0' && taxonomy && taxonomy.indexOf(':') < 0
      }
      return false
    },
    subjectTaxonomy () {
      return (this.$route.query && this.$route.query.taxonomy) || this.taxonomy
    }
  },
  inject: ['addPageRenderListener', 'renderPageView', 'setPageSubjectTaxonomyTitle', 'addPageBreadcrumb'],
  created () {
    this.addPageRenderListener(this.onPageRender)
    const taxonomy = this.subjectTaxonomy
    console.log('taxonomy', taxonomy)
    if (taxonomy && !(this.specifySubjectTaxonomy && taxonomy.indexOf(':') < 0)) {
      this.pageRenderParams.taxonomy = taxonomy
      if (this.formRenderParam) {
        this.formRenderParam.taxonomy = taxonomy
      }
      if (this.queryParams) {
        this.queryParams.taxonomy = taxonomy
      }
      if (this.addFormQueryParams) {
        this.addFormQueryParams.taxonomy = taxonomy
      }
    }
  },
  beforeMount () {
    if (this.taxonomyNotSpecified) {
      this.formRenderPath = '/taxonomy/form/subject'
    }
  },
  mounted () {
    const renderApi = this.pageRenderApi()
    if (renderApi) {
      this.renderPageView(renderApi)
    } else {
      this.setPageSubjectTaxonomyTitle('分类')
    }
  },
  methods: {
    pageRenderApi () {
      const params = this.pageRenderParams
      let hasParams = false
      for (const k in params) {
        const v = params[k]
        if (v && v !== 0 && v !== '0') {
          hasParams = true
        }
      }
      if (hasParams) {
        return {
          url: '/taxonomy/detail',
          method: 'get',
          params
        }
      }
      return false
    },
    onPageRender (view) {
      console.log('onPageRender', view)
      this.typeInfo = view.type
      this.taxonomyDetail = view
      if (this.taxonomyDetail.path) {
        const breadcrumbs = []
        for (let i = 0; i < this.taxonomyDetail.path.length; i++) {
          const t = this.taxonomyDetail.path[i]
          const params = {
            taxonomy: t.key
          }
          const breadcrumb = {
            name: this.getRouteNamePrefix(),
            title: t.title,
            params
          }
          console.log('breadcrumb', breadcrumb)
          breadcrumbs.push(breadcrumb)
        }
        this.addPageBreadcrumb(breadcrumbs)
      }
      this.setPageSubjectTaxonomyTitle(this.taxonomyDetail.title)
    },
    handleSubjectTaxonomyFormSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, data) => {
        console.log('Received data of subject taxonomy select form: ', data)
        if (!err) {
          const query = Object.assign({}, data, this.$route.query || {})
          const to = {
            name: this.getRouteNamePrefix() + '-save',
            query
          }
          console.log('handleSubjectTaxonomyFormSubmit', to)
          this.$router.push(to)
        }
      })
    }
  }
}

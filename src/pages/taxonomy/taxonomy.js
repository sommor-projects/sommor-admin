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
      default: true,
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
        return id === '0' && taxonomy === this.taxonomy
      }
      return false
    },
    subjectTaxonomy () {
      return (this.$route.query && (this.$route.query.taxonomy || this.$route.query.taxonomyId)) || this.taxonomy
    }
  },
  inject: ['addPageRenderListener', 'renderPageView', 'setPageSubjectTaxonomyTitle', 'addPageBreadcrumb'],
  created () {
    this.addPageRenderListener(this.onPageRender)
    const taxonomy = this.subjectTaxonomy
    if (taxonomy) {
      this.pageRenderParams.taxonomy = taxonomy
      this.pageRenderParams.subject = this.subject || null
      if (this.formRenderParam) {
        this.formRenderParam.taxonomy = taxonomy
      }
      if (this.queryParams) {
        this.queryParams.taxonomy = taxonomy
      }
      if (this.specifySubjectTaxonomy && taxonomy !== this.taxonomy) {
        if (this.addFormQuery) {
          this.addFormQuery.taxonomy = taxonomy
        }
      }
    }
  },
  beforeMount () {
    if (this.specifySubjectTaxonomy && this.subject !== 'taxonomy') {
      if (this.formRenderPath && this.taxonomyNotSpecified) {
        this.formRenderPath = '/taxonomy/form/subject'
      }
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
    resolveActionRouteName (action) {
      if (this.taxonomy && this.taxonomy !== this.subject) {
        return this.subject + '-' + this.taxonomy + '-' + action
      }
      return this.subject + '-' + action
    },
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
      this.typeInfo = view.type
      this.taxonomyDetail = view
      // if (this.queryParams && this.queryParams.taxonomy !== undefined) {
      //   delete this.queryParams['taxonomy']
      //   this.queryParams.taxonomyId = this.typeInfo.id.toString()
      //   console.log('queryParams', this.queryParams)
      // }
      if (this.taxonomyDetail.path) {
        const breadcrumbs = []
        const subject = this.subject || 'taxonomy'
        const taxonomy = this.taxonomy
        for (let i = 0; i < this.taxonomyDetail.path.length; i++) {
          const t = this.taxonomyDetail.path[i]
          const params = {}
          if (subject === 'taxonomy') {
            params['parentId'] = t.id
          } else {
            params['taxonomyId'] = t.id
          }
          const breadcrumb = {
            name: (subject === taxonomy ? subject : (subject + (taxonomy ? ('-' + taxonomy) : ''))) + '-list',
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
            name: this.resolveActionRouteName('save'),
            query
          }
          console.log('handleSubjectTaxonomyFormSubmit', to)
          this.$router.push(to)
        }
      })
    }
  }
}

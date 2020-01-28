export default {
  props: {
    type: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      typeTaxonomy: {},
      taxonomy: {},
      pageRenderParams: {}
    }
  },
  computed: {
    typeTitle () {
      return (this.typeTaxonomy && this.typeTaxonomy.title) || ''
    }
  },
  inject: ['addPageRenderListener', 'renderPageView', 'setPageSubjectTaxonomyTitle', 'addPageBreadcrumb'],
  created () {
    this.addPageRenderListener(this.onPageRender)

    if (this.type) {
      this.pageRenderParams.type = this.type || null
      this.pageRenderParams.subject = this.subject || null

      if (this.queryParams) {
        this.queryParams.type = this.type
      }
    }
  },
  mounted () {
    const renderApi = this.pageRenderApi()
    if (renderApi) {
      this.renderPageView(renderApi)
    } else {
      this.setPageSubjectTitle('分类')
    }
  },
  methods: {
    resolveActionRouteName (action) {
      if (this.type) {
        return this.subject + '-' + this.type + '-' + action
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
      this.typeTaxonomy = view.data.type
      this.taxonomy = view.data
      if (this.taxonomy.path) {
        const breadcrumbs = []
        const subject = this.subject || 'taxonomy'
        const type = this.type
        for (let i = 0; i < this.taxonomy.path.length; i++) {
          const t = this.taxonomy.path[i]
          const params = {}
          if (subject === 'taxonomy') {
            params['parentId'] = t.id
          }
          breadcrumbs.push({
            name: subject + (type ? ('-' + type) : '') + '-list',
            title: t.title,
            params
          })
        }
        this.addPageBreadcrumb(breadcrumbs)
      }
      console.log('onPageRender view', view)
      this.setPageSubjectTaxonomyTitle(this.typeTaxonomy.title)
    }
  }
}

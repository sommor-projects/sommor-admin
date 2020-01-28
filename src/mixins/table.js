import { axios } from '@/utils/request'

export default {
  data () {
    return {
      tableProps: {
        ref: 'table',
        size: 'default',
        rowKey: 'id',
        showPagination: 'auto',
        alert: false,
        data: parameter => {
          const params = Object.assign(this.queryParams || {}, parameter)
          console.log('table loadData queryParams: ', params)
          const url = '/' + this.subject + '/list'

          const options = {
            url,
            method: 'get',
            params
          }

          return axios(options).then(res => {
            console.log('curdTable load data: ', res)
            return res.result.data
          })
        }
      },
      selectedRowKeys: [],
      selectedRows: [],
      queryParams: {}
    }
  },
  computed: {
    subject () {
      throw new Error('computed [subject] must be override')
    },
    rowSelection () {
      console.log('rowSelection')
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: false
      }
    }
  },
  methods: {
    resolveActionRouteName (action) {
      return this.subject + '-' + action
    },
    refreshTable () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    handleAddAction () {
      this.handleEditAction()
    },
    handleEditAction (record) {
      const routeName = this.resolveActionRouteName('save')
      const query = {}
      if (record) {
        query['id'] = record.id
      }
      const meta = this.$store.getters.routeMetas[routeName]
      if (meta && meta.queryParamNames) {
        const routeQuery = this.$route.query
        if (routeQuery) {
          meta.queryParamNames.forEach(function (name) {
            if (routeQuery[name]) {
              query[name] = routeQuery[name]
            }
          })
        }
      }
      this.$router.push({
        name: routeName,
        query
      })
    },
    handleDeleteAction (record) {
      this.$confirm({
        title: '提示',
        content: '真的要删除吗?',
        onOk: () => {
          this.$loading.show()
          axios.post('/' + this.subject + '/delete', { id: record.id }).then(res => {
            this.$loading.hide()
            if (res.success) {
              this.$notification.success({
                message: '删除成功',
                description: `${res.result.title} 已删除`
              })
              this.refreshTable()
            }
          })
        },
        onCancel () {
        }
      })
    },
    handleDeleteBatchAction () {
      this.$confirm({
        title: '提示',
        content: '真的要删除吗?',
        onOk: () => {
          this.$loading.show()
          axios.post('/' + this.subject + '/delete-batch', { ids: this.selectedRowKeys }).then(res => {
            this.$loading.hide()
            if (res.success) {
              this.$notification.success({
                message: '删除成功',
                description: `已删除 ${res.result.length} 条数据`
              })
              this.refreshTable()
            }
          })
        },
        onCancel () {
        }
      })
    }
  }
}

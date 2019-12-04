<template>
  <page-view @pageRender="onPageRender" :pageRenderApi="pageRenderApi">
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="handleAddAction">新建</a-button>
        <a-dropdown v-action:edit v-if="selectedRowKeys.length > 0">
          <a-menu slot="overlay">
            <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
            <!-- lock | unlock -->
            <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
          </a-menu>
          <a-button style="margin-left: 8px">
            批量操作 <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="key"
        :columns="columns"
        :data="loadData"
        :alert="options.alert"
        :rowSelection="options.rowSelection"
        showPagination="auto"
      >
        <span slot="title-link" slot-scope="text, record">
          {{ record.title }} / {{ record.name }}
          <span v-if="record.subTaxonomyCount>0">
            (<a @click="handleSubListAction(record)"> {{ record.subTaxonomyCount }} </a>)
          </span>
        </span>

        <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEditAction(record)">编辑</a>
            <a-divider type="vertical" />
          <a @click="handleAddSubAction(record)">添加子分类</a>
          <template v-if="isNotHighestPriority(record)">
            <a-divider type="vertical" />
            <a @click="handleForwardAction(record)">上移</a>
          </template>
          <template v-if="isNotLowestPriority(record)">
            <a-divider type="vertical" />
            <a @click="handleBackwardAction(record)">下移</a>
          </template>
          <a-divider type="vertical" />
          <a @click="handleDeleteAction(record)">删除</a>
        </template>
      </span>
      </s-table>
    </a-card>
  </page-view>
</template>

<script>
import { STable } from '@/components'
import { getTaxonomyList, forwardTaxonomy, backwardTaxonomy, deleteTaxonomy } from '@/api/taxonomy'
import { PageView } from '@/layouts'

export default {
  name: 'TableList',
  components: {
    PageView,
    STable
  },
  props: {
    rootSlug: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      pageTitle: '分类',
      rootTaxonomy: {},
      taxonomy: {},
      queryParams: {
        parentId: null
      },
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '标题',
          dataIndex: 'title',
          scopedSlots: { customRender: 'title-link' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        const queryParams = Object.assign(this.queryParams, parameter)
        if (!(queryParams.parentId && queryParams.parentId > 0)) {
          if (this.rootSlug) {
            queryParams.slug = this.rootSlug
          } else {
            queryParams.parentId = 0
          }
        }
        console.log('loadData.queryParams', queryParams)
        return getTaxonomyList(queryParams)
          .then(res => {
            console.log(res)
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: [],

      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  created () {
    console.log('created queyr', this.$route.query)
    if (this.$route.query) {
      this.queryParams.parentId = this.$route.query.parentId || null
    }
    this.tableOption()
  },
  methods: {
    pageRenderApi () {
      const id = this.$route.query && this.$route.query.parentId
      if (id || this.rootSlug) {
        return {
          url: '/taxonomy/view',
          method: 'get',
          params: {
            id: id || null,
            rootSlug: this.rootSlug || null
          }
        }
      }
      return false
    },
    onPageRender (pageView) {
      this.rootTaxonomy = pageView.content.rootTaxonomy
      this.taxonomy = pageView.content.taxonomy
    },
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {
          alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
          rowSelection: {
            selectedRowKeys: this.selectedRowKeys,
            onChange: this.onSelectChange,
            getCheckboxProps: record => ({
              props: {
                disabled: record.no === 'No 2', // Column configuration not to be checked
                name: record.no
              }
            })
          }
        }
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    refreshTable () {
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    getRouteName (suffix) {
      if (this.rootSlug) {
        return 'taxonomy-' + this.rootSlug + '-' + suffix
      }
      return 'taxonomy-' + suffix
    },
    handleSubListAction (record) {
      const to = {
        name: this.getRouteName('list'),
        query: { parentId: record.id }
      }
      console.log('handleSubListAction', to)
      this.$router.push(to)
    },
    handleAddSubAction (record) {
      this.$router.push({
        name: this.getRouteName('save'),
        query: { parentId: record.id }
      })
    },
    handleAddAction () {
      this.$router.push({
        name: this.getRouteName('save'),
        query: { parentId: this.taxonomy.id || 0 }
      })
    },
    handleEditAction (record) {
      this.$router.push({
        name: this.getRouteName('save'),
        query: { id: record.id }
      })
    },
    handleForwardAction (record) {
      forwardTaxonomy(record).then(res => {
        console.log(res)
        if (res.success) {
          this.refreshTable()
        }
      })
    },
    handleBackwardAction (record) {
      backwardTaxonomy(record).then(res => {
        if (res.success) {
          this.refreshTable()
        }
      })
    },
    isNotHighestPriority (record) {
      return record.highestPriority !== true
    },
    isNotLowestPriority (record) {
      return record.lowestPriority !== true
    },
    handleDeleteAction (record) {
      deleteTaxonomy(record).then(res => {
        if (res.success) {
          this.$notification.success({
            message: '删除成功',
            description: `${res.result.title} 已删除`
          })
          this.refreshTable()
        }
      })
    }
  }
}
</script>

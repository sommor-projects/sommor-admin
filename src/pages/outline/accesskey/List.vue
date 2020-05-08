<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAddAction">新建</a-button>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="handleDeleteBatchAction"><a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      v-bind="tableProps"
      :columns="columns"
      :rowSelection="rowSelection"
    >
      <span slot="title_slot" slot-scope="text, record">
          {{ record.name }}
      </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEditAction(record)">编辑</a>
            <a-divider type="vertical" />
            <a @click="handleDeleteAction(record)">删除</a>
          </template>
        </span>
    </s-table>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { PageView } from '@/layouts'
import table from '@/mixins/table'
import { axios } from '@/utils/request'

export default {
  name: 'OutlineAccessKeyTable',
  components: {
    PageView,
    STable
  },
  mixins: [table],
  data () {
    return {
      columns: [
        {
          title: 'ID',
          dataIndex: 'accessId'
        },
        {
          title: '名称',
          scopedSlots: { customRender: 'title_slot' }
        },
        {
          title: 'accessUrl',
          dataIndex: 'accessUrl'
        },
        {
          title: '使用量',
          dataIndex: 'usage'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  inject: ['addPageRenderListener', 'renderPageView', 'setPageSubjectTitle', 'setPageSubjectTaxonomyTitle', 'addPageBreadcrumb'],
  created () {
    const outlineServerId = (this.$route.query && this.$route.query.outlineServerId) || null
    if (outlineServerId) {
      this.queryParams.outlineServerId = outlineServerId
      this.formQueryParams.outlineServerId = outlineServerId
    }
  },
  async mounted () {
    this.setPageSubjectTaxonomyTitle('accessKey列表')
    if (this.queryParams.outlineServerId) {
      const res = await axios({
        url: '/outline-server/detail',
        method: 'get',
        params: {
          id: this.queryParams.outlineServerId
        }
      })
      if (res.success) {
        this.setPageSubjectTitle(res.result.name)
      }
    }
  },
  methods: {
  }
}
</script>

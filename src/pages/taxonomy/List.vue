<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="handleAddAction">新建</a-button>
      <a-dropdown v-action v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      v-bind="tableProps"
      :rowSelection="rowSelection"
      :columns="columns"
    >
        <span slot="title-link" slot-scope="text, record">
          {{ record.title }} / {{ record.subTitle }}
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
</template>

<script>
import { STable } from '@/components'
import { forwardTaxonomy, backwardTaxonomy } from './api'
import { PageView } from '@/layouts'
import table from '@/mixins/table'
import taxonomy from '@/pages/taxonomy/taxonomy'

export default {
  name: 'TaxonomyList',
  components: {
    PageView,
    STable
  },
  props: {
    taxonomy: {
      type: String,
      required: false
    }
  },
  mixins: [table, taxonomy],
  data () {
    return {
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
      ]
    }
  },
  computed: {
    subject () {
      return 'taxonomy'
    }
  },
  created () {
    const parent = this.$route.query && this.$route.query.parent
    if (parent) {
      this.pageRenderParams.taxonomy = parent
      this.queryParams.parent = parent
    } else {
      if (this.taxonomy) {
        this.queryParams.parent = this.taxonomy
      }
    }
  },
  methods: {
    resolveActionRouteName (action) {
      if (this.taxonomy) {
        return 'taxonomy-' + this.taxonomy + '-' + action
      }
      return 'taxonomy-' + action
    },
    handleSubListAction (record) {
      const to = {
        name: this.resolveActionRouteName('list'),
        query: { parent: record.key }
      }
      console.log('handleSubListAction', to)
      this.$router.push(to)
    },
    handleAddSubAction (record) {
      this.$router.push({
        name: this.resolveActionRouteName('save'),
        query: { parent: record.key }
      })
    },
    handleAddAction () {
      this.$router.push({
        name: this.resolveActionRouteName('save'),
        query: { parent: this.taxonomyDetail.key || 0 }
      })
    },
    handleForwardAction (record) {
      forwardTaxonomy(record).then(res => {
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
    }
  }
}
</script>

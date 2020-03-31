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

export default {
  name: 'QrCodeTable',
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
          dataIndex: 'id'
        },
        {
          title: '编码',
          dataIndex: 'code'
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
      return 'qrcode'
    }
  },
  async created () {
  },
  methods: {
  }
}
</script>

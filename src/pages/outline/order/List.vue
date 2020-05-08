<template>
  <a-card :bordered="false">
    <div class="table-operator">
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
      <span slot="buyer_slot" slot-scope="text, record">
          {{ record.buyer.nickName }} <br />({{ record.buyer.userId }})
      </span>
      <span slot="order_slot" slot-scope="text, record">
          {{ record.productTitle }}<br />{{ record.orderId }}
      </span>
      <span slot="start_end_time_slot" slot-scope="text, record">
          {{ record.startTime }} <br />{{ record.endTime }}
      </span>
      <span slot="accesskey_slot" slot-scope="text, record">
          <template>
            <a @click="handleAccesskeyListAction(record)">查看</a>
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
  name: 'OutlineOrderTable',
  components: {
    PageView,
    STable
  },
  mixins: [table],
  data () {
    return {
      columns: [
        {
          title: '买家',
          scopedSlots: { customRender: 'buyer_slot' }
        },
        {
          title: '订单',
          scopedSlots: { customRender: 'order_slot' }
        },
        {
          title: '起止时间',
          scopedSlots: { customRender: 'start_end_time_slot' }
        },
        {
          title: 'AccessKey',
          scopedSlots: { customRender: 'accesskey_slot' }
        }
      ]
    }
  },
  inject: ['addPageRenderListener', 'renderPageView', 'setPageSubjectTitle', 'addPageBreadcrumb'],
  created () {
  },
  methods: {
    handleAccesskeyListAction (record) {
      const routeName = 'outline-order-accesskey-list'
      this.$router.push({
        name: routeName,
        query: { orderId: record.id }
      })
    }
  }
}
</script>

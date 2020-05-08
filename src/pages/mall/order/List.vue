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
      <span slot="product_slot" slot-scope="text, record">
          {{ record.productTitle }}
      </span>
      <span slot="buyer_slot" slot-scope="text, record">
          {{ record.buyer.nickName }} ( {{ record.buyer.userId }} )
      </span>
      <span slot="shop_slot" slot-scope="text, record">
         {{ record.shop.title }} ( {{ record.shop.id }} )
      </span>
      <span slot="sku_slot" slot-scope="text, record">
          {{ record.amount }}
      </span>
      <span slot="status_slot" slot-scope="text, record">
          {{ record.payStatus.title }}{{ record.orderStatus.title }}
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

export default {
  name: 'OrderTable',
  components: {
    PageView,
    STable
  },
  mixins: [table],
  data () {
    return {
      columns: [
        {
          title: '订单号',
          dataIndex: 'id'
        },
        {
          title: '商品',
          scopedSlots: { customRender: 'product_slot' }
        },
        {
          title: '买家',
          scopedSlots: { customRender: 'buyer_slot' }
        },
        {
          title: '店铺',
          scopedSlots: { customRender: 'shop_slot' }
        },
        {
          title: 'SKU',
          scopedSlots: { customRender: 'sku_slot' }
        },
        {
          title: '状态',
          scopedSlots: { customRender: 'status_slot' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  inject: ['addPageRenderListener', 'renderPageView', 'setPageSubjectTitle', 'addPageBreadcrumb'],
  created () {
    const shopId = (this.$route.query && this.$route.query.shopId) || null
    if (shopId) {
      this.queryParams.shopId = shopId
    }
  }
}
</script>

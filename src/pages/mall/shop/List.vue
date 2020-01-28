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
      v-if="spuTaxonomy"
    >
      <span slot="spu" slot-scope="text, record">
        <a @click="handleSpuListAction(record)">{{spuTaxonomy.title}}数({{record.spuCount}})</a>
          <a-divider type="vertical" />
          <a @click="handleAddSpuAction(record)">添加</a>
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
import type from '@/pages/taxonomy/type'
import { axios } from '@/utils/request'

export default {
  name: 'ShopTable',
  components: {
    PageView,
    STable
  },
  mixins: [table, type],
  props: {
    spuType: {
      type: String,
      default: undefined,
      required: false
    }
  },
  data () {
    return {
      spuTaxonomy: null,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '名称',
          dataIndex: 'title'
        },
        {
          title: '商品',
          scopedSlots: { customRender: 'spu' }
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
      return 'shop'
    }
  },
  async created () {
    if (this.spuType) {
      const res = await axios({
        url: '/taxonomy/detail',
        method: 'get',
        params: {
          type: this.spuType
        }
      })

      if (res.success) {
        const spuTaxonomy = res.result.data
        this.columns[2].title = spuTaxonomy.title
        this.spuTaxonomy = spuTaxonomy
      }
    }
  },
  methods: {
    handleAddSpuAction (record) {
      const routeName = 'spu-' + this.spuType + '-save'
      this.$router.push({
        name: routeName,
        query: { shopId: record.id }
      })
    },
    handleSpuListAction (record) {
      const routeName = 'spu-' + this.spuType + '-list'
      this.$router.push({
        name: routeName,
        query: { shopId: record.id }
      })
    }
  }
}
</script>

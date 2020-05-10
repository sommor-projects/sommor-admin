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
        <span slot="account_slot" slot-scope="text, record">
          <template>
            <router-link :to="{ name: 'user-account-settings-base', query: {id: record.id} }">{{ record.userName }}</router-link>
          </template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
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
  name: 'TableList',
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
          title: '账号',
          scopedSlots: { customRender: 'account_slot' }
        },
        {
          title: '手机号',
          dataIndex: 'mobilePhone'
        },
        {
          title: '昵称',
          dataIndex: 'nickName'
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    handleAccountSettings (record) {
      this.$router.push({
        name: 'user-account-settings-base',
        query: {
          id: record.id
        }
      })
    }
  }
}
</script>

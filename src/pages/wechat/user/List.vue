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
      <span slot="wx_nick_slot" slot-scope="text, record">
        <a-avatar size="small" :src="record.avatar" />
        <span class="member">{{ record.nickname }}</span>
      </span>
        <span slot="wx_id_slot" slot-scope="text, record">
          <template>
            {{ record.openid }}
            <template v-if="record.unionid">
              <br />
              {{ record.unionid }}
            </template>
          </template>
        </span>
      <span slot="account_slot" slot-scope="text, record">
          <template>
            <template v-if="record.userId > 0">
              {{ record.userId }}
            </template>
            <template v-else>
              <a @click="$refs.wechatUserAccountBindingForm.binding(record)">绑定</a>
            </template>
          </template>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleDeleteAction(record)">删除</a>
          </template>
        </span>
    </s-table>
    <wechat-user-account-binding-form ref="wechatUserAccountBindingForm" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { PageView } from '@/layouts'
import table from '@/mixins/table'
import WechatUserAccountBindingForm from './WechatUserAccountBindingForm'

export default {
  name: 'WechatUserTableList',
  components: {
    PageView,
    STable,
    WechatUserAccountBindingForm
  },
  mixins: [table],
  data () {
    return {
      columns: [
        {
          title: '微信昵称',
          scopedSlots: { customRender: 'wx_nick_slot' }
        },
        {
          title: 'OpenID',
          scopedSlots: { customRender: 'wx_id_slot' }
        },
        {
          title: '用户账号',
          scopedSlots: { customRender: 'account_slot' }
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
  }
}
</script>

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
      <span slot="qrcode" slot-scope="text, record">
        <template>
          <a @click="handleGenerateQrCodeAction(record)" v-if="record.qrCode === null">生成</a>
          <a @click="handleShowQrCodeImageAction(record)" v-if="record.qrCode !== null">查看</a>
        </template>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleEditAction(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="handleDeleteAction(record)">删除</a>
        </template>
      </span>
    </s-table>
    <qr-code-image-modal ref="qrCodeImage" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { PageView } from '@/layouts'
import QrCodeImageModal from '@/pages/qrcode/QrCodeImageModal'
import table from '@/mixins/table'
import taxonomy from '@/pages/taxonomy/taxonomy'
import { axios } from '@/utils/request'

export default {
  name: 'PostTable',
  components: {
    PageView,
    STable,
    QrCodeImageModal
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
          title: '名称',
          dataIndex: 'title'
        },
        {
          title: '二维码',
          dataIndex: 'qrcode',
          scopedSlots: { customRender: 'qrcode' }
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
    handleGenerateQrCodeAction (record) {
      axios.post('/qrcode/add', {
        subject: 'post',
        subjectId: record.id
      }).then(res => {
        if (res.success) {
          console.log(res)
        }
      })
    },
    handleShowQrCodeImageAction (recode) {
      this.$refs.qrCodeImage.show(recode.qrCode)
    }
  }
}
</script>

<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper" v-if="showSubjectTaxonomySearchField && searchForm">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-tree-select
              :placeholder="'请选择' + searchForm.fields.taxonomyId.title"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              :treeDefaultExpandAll="true"
              style="width: 100%"
              :treeData="searchForm.fields.taxonomyId.options"
              v-model="queryParams.taxonomyId"
              @change="handleSearchFormSubmit"
            >
            </a-tree-select>
          </a-col>
          <a-col :md="8" :sm="24">
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
            </a-col>
            <a-col :md="8" :sm="24">
            </a-col>
            <a-col :md="8" :sm="24">
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
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
      v-if="productTaxonomyDetail"
    >
      <span slot="title_slot" slot-scope="text, record">
          {{ record.title }} / {{ record.subTitle }}
      </span>
      <span slot="product_slot" slot-scope="text, record">
        <a @click="handleSpuListAction(record)">{{productTaxonomyDetail.title}}数({{record.productCount}})</a>
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
import taxonomy from '@/pages/taxonomy/taxonomy'
import { axios } from '@/utils/request'
import { SField } from '@/components/Field'

import ATreeSelect from 'ant-design-vue/es/tree-select'
import 'ant-design-vue/es/tree-select/style/index'

export default {
  name: 'ShopTable',
  components: {
    PageView,
    STable,
    SField,
    ATreeSelect
  },
  mixins: [table, taxonomy],
  props: {
    productTaxonomy: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      advanced: false,
      productTaxonomyDetail: null,
      columns: [
        {
          title: 'ID',
          dataIndex: 'id'
        },
        {
          title: '名称',
          scopedSlots: { customRender: 'title_slot' }
        },
        {
          title: '商品',
          scopedSlots: { customRender: 'product_slot' }
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
    if (this.productTaxonomy) {
      const res = await axios({
        url: '/taxonomy/detail',
        method: 'get',
        params: {
          taxonomy: this.productTaxonomy
        }
      })

      if (res.success) {
        const productTaxonomyDetail = res.result
        if (this.productTaxonomy !== 'product') {
          this.columns[2].title = productTaxonomyDetail.title
        }
        this.productTaxonomyDetail = productTaxonomyDetail
      }
    }
  },
  methods: {
    handleAddSpuAction (record) {
      const routeName = this.productTaxonomy === 'product' ? 'product-save' : ('product-' + this.productTaxonomy + '-save')
      this.$router.push({
        name: routeName,
        query: { shopId: record.id }
      })
    },
    handleSpuListAction (record) {
      const routeName = this.productTaxonomy === 'product' ? 'product-list' : 'product-' + this.productTaxonomy + '-list'
      this.$router.push({
        name: routeName,
        query: { shopId: record.id }
      })
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleSearchFormSubmit () {
      const routeName = this.$route.name
      this.$router.push({
        name: routeName,
        query: this.queryParams
      })
    }
  }
}
</script>

<template>
  <a-list size="large" :loading="loading">
    <a-list-item :key="index" v-for="(item, index) in items">
      <a-list-item-meta :description="item.description">
        <a-avatar slot="avatar" size="large" shape="square" :src="item.cover"/>
        <a slot="title">{{ item.title }}</a>
      </a-list-item-meta>
      <div slot="actions">
        <a>解除绑定</a>
      </div>
    </a-list-item>

    <task-form ref="taskForm" />
  </a-list>
</template>

<script>
import { axios } from '@/utils/request'

export default {
  data () {
    return {
      loading: false,
      items: []
    }
  },
  created () {
    const userId = this.$route.query.id
    this.loading = true
    axios({
      url: '/user/account/binding',
      method: 'GET',
      params: {
        userId: userId
      }
    }).then(res => {
      if (res.success) {
        this.items = res.result
      }
      this.loading = false
    })
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
  }

  .list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
      line-height: 20px;
    }
    p {
      margin-top: 4px;
      margin-bottom: 0;
      line-height: 22px;
    }
  }
</style>

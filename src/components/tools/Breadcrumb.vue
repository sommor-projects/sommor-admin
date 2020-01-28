<template>
  <a-breadcrumb class="breadcrumb">
    <a-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.name">
      <router-link
        v-if="item.name != name && index != 1"
        :to="item.to"
      >{{ item.title }}</router-link>
      <span v-else>{{ item.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  props: {
    additional: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      name: '',
      breadList: []
    }
  },
  computed: {
    breadcrumbs: function () {
      let breadcrumbs = this.breadList.concat([])
      if (this.additional && this.additional.length > 0) {
        breadcrumbs = breadcrumbs.concat(this.additional.map(value => {
          const queryParams = value.params || {}
          const meta = this.$store.getters.routeMetas[value.name]
          if (meta && meta.queryParamNames) {
            const routeQuery = this.$route.query
            if (routeQuery) {
              meta.queryParamNames.forEach(function (name) {
                if (routeQuery[name]) {
                  queryParams[name] = routeQuery[name]
                }
              })
            }
          }
          return {
            title: value.title,
            to: { name: value.name, query: queryParams }
          }
        }))
      }
      return breadcrumbs
    }
  },
  created () {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb () {
      this.breadList = []
      // this.breadList.push({name: 'index', path: '/dashboard/', meta: {title: '首页'}})
      this.name = this.$route.name
      const matched = this.$route.matched
      for (let i = 0; i < matched.length; i++) {
        const route = matched[i]
        if (route.meta.hideInBreadcrumb === true) {
          break
        }
        if (route.meta.title) {
          const item = {}
          item.title = route.meta.title
          item.name = route.name
          item.to = {
            path: route.path
          }
          this.breadList.push(item)
        }
      }
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style scoped>
</style>

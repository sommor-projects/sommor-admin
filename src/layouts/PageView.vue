<template>
  <div :style="!$route.meta.hiddenHeaderContent ? 'margin: -24px -24px 0px;' : null">
    <!-- pageHeader , route meta :true on hide -->
    <page-header v-if="!$route.meta.hiddenHeaderContent" :title="pageHeaderTitle" :logo="logo" :avatar="avatar" :additionalBreadcrumbs="additionalBreadcrumbs">
      <slot slot="action" name="action"></slot>
      <slot slot="content" name="headerContent"></slot>
      <div slot="content" v-if="!this.$slots.headerContent && description">
        <p style="font-size: 14px;color: rgba(0,0,0,.65)">{{ description }}</p>
        <div class="link">
          <template v-for="(link, index) in linkList">
            <a :key="index" :href="link.href">
              <a-icon :type="link.icon" />
              <span>{{ link.title }}</span>
            </a>
          </template>
        </div>
      </div>
      <slot slot="extra" name="extra">
        <div class="extra-img">
          <img v-if="typeof extraImage !== 'undefined'" :src="extraImage"/>
        </div>
      </slot>
      <div slot="pageMenu">
        <div class="page-menu-search" v-if="search">
          <a-input-search
            style="width: 80%; max-width: 522px;"
            placeholder="请输入..."
            size="large"
            enterButton="搜索"
          />
        </div>
        <div class="page-menu-tabs" v-if="tabs && tabs.items">
          <!-- @change="callback" :activeKey="activeKey" -->
          <a-tabs :tabBarStyle="{margin: 0}" :activeKey="tabs.active()" @change="tabs.callback">
            <a-tab-pane v-for="item in tabs.items" :tab="item.title" :key="item.key"></a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </page-header>
    <div class="content">
      <div class="page-header-index-wide">
        <slot>
          <!-- keep-alive  -->
<!--          <keep-alive v-if="multiTab">-->
<!--            <router-view :key="routeKey" ref="content" />-->
<!--          </keep-alive>-->
<!--          <router-view :key="routeKey" v-else ref="content" />-->

          <router-view :key="routeKey" v-if="isPageViewRouterAlive" ref="content" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageHeader from '@/components/PageHeader'
import md5 from 'md5'
import { axios } from '@/utils/request'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'

export default {
  name: 'PageView',
  components: {
    PageHeader
  },
  props: {
    avatar: {
      type: String,
      default: null
    },
    title: {
      type: [String, Boolean],
      default: true,
      required: false
    },
    pageRenderApi: {
      type: Function,
      required: false
    },
    logo: {
      type: String,
      default: null
    },
    directTabs: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      isPageViewRouterAlive: true,
      additionalBreadcrumbs: [],
      subjectAction: undefined,
      subjectTitle: undefined,
      subjectTaxonomyTitle: undefined,
      description: null,
      linkList: [],
      extraImage: '',
      search: false,
      tabs: {},
      pageRenderListeners: []
    }
  },
  provide () {
    return {
      reloadPageView: this.reloadPageView,
      renderPageView: this.renderPageView,
      addPageRenderListener: this.addPageRenderListener,
      setPageSubjectTitle: this.setPageSubjectTitle,
      setPageSubjectAction: this.setPageSubjectAction,
      addPageBreadcrumb: this.addPageBreadcrumb,
      setPageSubjectTaxonomyTitle: this.setPageSubjectTaxonomyTitle
    }
  },
  computed: {
    ...mapState({
      multiTab: state => state.app.multiTab
    }),
    routeKey () {
      console.log('pageView routeKey', md5(this.$route.fullPath), this.$route.fullPath)
      return md5(this.$route.fullPath)
    },
    pageTitle () {
      let pageTitle = ''
      if (this.subjectAction) {
        pageTitle += this.subjectAction
      }
      if (this.subjectTitle) {
        pageTitle += this.subjectTitle
      }
      if (this.subjectTaxonomyTitle) {
        if (this.subjectTitle) {
          pageTitle += '的'
        }
        pageTitle += this.subjectTaxonomyTitle
      }
      return pageTitle
    },
    pageHeaderTitle () {
      if (this.title === false) {
        return false
      }
      return this.title !== true ? this.title : (this.pageTitle || this.$route.meta.title)
    }
  },
  created () {
    if (this.pageRenderApi) {
      this.renderPageView(this.pageRenderApi)
    }
    this.notify()
  },
  mounted () {
    this.tabs = this.directTabs
    this.getPageMeta()
  },
  updated () {
    this.getPageMeta()
  },
  watch: {
    pageHeaderTitle (title) {
      if (title) {
        setDocumentTitle(`${title} - ${domTitle}`)
      }
    }
  },
  methods: {
    reloadPageView () {
      this.isPageViewRouterAlive = false
      this.$nextTick(() => {
        this.isPageViewRouterAlive = true
      })
    },
    addPageRenderListener (listener) {
      this.pageRenderListeners.push(listener)
    },
    setPageSubjectTaxonomyTitle (subjectTaxonomyTitle) {
      this.subjectTaxonomyTitle = subjectTaxonomyTitle
    },
    setPageSubjectTitle (subjectTitle) {
      this.subjectTitle = subjectTitle
    },
    setPageSubjectAction (subjectAction) {
      this.subjectAction = subjectAction
    },
    addPageBreadcrumb (breadcrumbs) {
      this.additionalBreadcrumbs = breadcrumbs
    },
    async renderPageView (api) {
      let pageViewUrl = api
      if (typeof api === 'function') {
        pageViewUrl = this.pageRenderApi()
      }
      console.log('pageViewUrl', pageViewUrl)
      if (pageViewUrl !== false) {
        const res = await axios(pageViewUrl)
        if (res.success) {
          const pageView = res.result
          console.log('renderPageView', pageView)
          this.$emit('pageRender', pageView)
          this.pageRenderListeners.forEach(function (listener) {
            listener(pageView)
          })
          return pageView
        }
      }
    },
    getPageMeta () {
      const content = this.$refs.content
      if (content) {
        if (content.pageMeta) {
          Object.assign(this, content.pageMeta)
        } else {
          this.description = content.description
          this.linkList = content.linkList
          this.extraImage = content.extraImage
          this.search = content.search === true
          this.tabs = content.tabs
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    margin: 24px 24px 0;
    .link {
      margin-top: 16px;
      &:not(:empty) {
        margin-bottom: 16px;
      }
      a {
        margin-right: 32px;
        height: 24px;
        line-height: 24px;
        display: inline-block;
        i {
          font-size: 24px;
          margin-right: 8px;
          vertical-align: middle;
        }
        span {
          height: 24px;
          line-height: 24px;
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  .page-menu-search {
    text-align: center;
    margin-bottom: 16px;
  }
  .page-menu-tabs {
    margin-top: 48px;
  }

  .extra-img {
    margin-top: -60px;
    text-align: center;
    width: 195px;

    img {
      width: 100%;
    }
  }

  .mobile {
    .extra-img{
      margin-top: 0;
      text-align: center;
      width: 96px;

      img{
        width: 100%;
      }
    }
  }
</style>

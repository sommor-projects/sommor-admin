// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: RouteView,
        meta: { title: '首页', icon: 'dashboard' },
        redirect: '/taxonomy/wine-region/list'
      },
      {
        path: '/outline',
        name: 'outline',
        component: PageView,
        meta: { title: 'Outline', icon: 'slack' },
        redirect: '/outline/servers/list',
        children: [
          {
            path: '/outline/server',
            name: 'outlines-server',
            component: RouteView,
            meta: { title: '服务器', icon: 'layout' },
            hideChildrenInMenu: true,
            redirect: '/outline/server/list',
            children: [
              {
                path: '/outline/server/list',
                name: 'outline-server-list',
                component: () => import('@/pages/outline/server/List'),
                meta: { title: '列表', hideInBreadcrumb: true }
              },
              {
                path: '/outline/server/save',
                name: 'outline-server-save',
                props: {
                  taxonomy: 'outline-server',
                  specifySubjectTaxonomy: false
                },
                component: () => import('@/pages/outline/server/Form'),
                meta: { title: '保存', hideInBreadcrumb: true }
              },
              {
                path: '/outline/accesskey',
                name: 'outline-accesskey-list',
                component: () => import('@/pages/outline/accesskey/List'),
                meta: { title: 'accessKey列表' }
              },
              {
                path: '/outline/accesskey/save',
                name: 'outline-accesskey-save',
                component: () => import('@/pages/outline/accesskey/Form'),
                meta: { title: '保存', hideInBreadcrumb: true }
              }
            ]
          },
          {
            path: '/outline/product',
            name: 'outlines-product',
            component: RouteView,
            meta: { title: '商品', icon: 'layout', hideInBreadcrumb: true },
            hideChildrenInMenu: true,
            redirect: '/outline/product/list',
            children: [
              {
                path: '/outline/product/list',
                name: 'product-outline-list',
                component: () => import('@/pages/mall/product/ProductSkuList'),
                props: {
                  taxonomy: 'product:outline',
                  specifySubjectTaxonomy: false
                },
                meta: { title: '列表' }
              },
              {
                path: '/outline/product/save',
                name: 'product-outline-save',
                component: () => import('@/pages/mall/product/ProductSkuForm'),
                props: {
                  taxonomy: 'product:outline',
                  specifySubjectTaxonomy: false
                },
                meta: { title: '保存', hideInBreadcrumb: true }
              }
            ]
          }
        ]
      },
      {
        path: '/wines',
        name: 'wines',
        component: PageView,
        meta: { title: '葡萄酒', icon: 'slack' },
        redirect: '/taxonomy/wine-region/list',
        children: [
          {
            path: '/taxonomy/wine-region',
            name: 'taxonomy-wine-region',
            component: RouteView,
            meta: { title: '产区', icon: 'layout', hideInBreadcrumb: true },
            hideChildrenInMenu: true,
            redirect: '/taxonomy/wine-region/list',
            children: [
              {
                path: '/taxonomy/wine-region/list',
                name: 'taxonomy-wine-region-list',
                component: () => import('@/pages/taxonomy/List'),
                props: {
                  taxonomy: 'wine-region',
                  specifySubjectTaxonomy: false
                },
                meta: { title: '列表' }
              },
              {
                path: '/taxonomy/wine-region/save',
                name: 'taxonomy-wine-region-save',
                props: {
                  taxonomy: 'wine-region',
                  specifySubjectTaxonomy: false
                },
                component: () => import('@/pages/taxonomy/Form'),
                meta: { title: '保存' }
              }
            ]
          },
          {
            path: '/shop/winery',
            name: 'shop-winery',
            component: RouteView,
            meta: { title: '酒庄', icon: 'layout' },
            hideChildrenInMenu: true,
            redirect: '/shop/winery/list',
            children: [
              {
                path: '/shop/winery/list',
                name: 'shop-winery-list',
                component: () => import('@/pages/mall/shop/List'),
                props: {
                  taxonomy: 'winery',
                  productTaxonomy: 'wines',
                  showSubjectTaxonomySearchField: false,
                  specifySubjectTaxonomy: false
                },
                meta: { title: '列表', hideInBreadcrumb: true }
              },
              {
                path: '/shop/winery/save',
                name: 'shop-winery-save',
                component: () => import('@/pages/mall/shop/Form'),
                props: {
                  taxonomy: 'winery',
                  specifySubjectTaxonomy: false
                },
                meta: { title: '保存', hideInBreadcrumb: true }
              },
              {
                path: '/product/wines',
                name: 'product-wines',
                component: RouteView,
                meta: { title: '酒款', hideInBreadcrumb: true },
                redirect: '/product/wines/list',
                children: [
                  {
                    path: '/product/wines/list',
                    name: 'product-wines-list',
                    component: () => import('@/pages/mall/product/List'),
                    props: {
                      taxonomy: 'wines',
                      specifySubjectTaxonomy: false
                    },
                    meta: { title: '酒款列表', queryParamNames: ['shopId'] }
                  },
                  {
                    path: '/product/wines/save',
                    name: 'product-wines-save',
                    component: () => import('@/pages/mall/product/Form'),
                    props: {
                      taxonomy: 'wines',
                      specifySubjectTaxonomy: false
                    },
                    meta: { title: '保存酒款', queryParamNames: ['shopId'] }
                  }
                ]
              }
            ]
          },
          {
            path: '/post/wine-news',
            name: 'post-wine-news',
            meta: { title: '资讯', icon: 'slack' },
            component: RouteView,
            hideChildrenInMenu: true,
            redirect: '/post/wine-news/list',
            children: [
              {
                path: '/post/wine-news/list',
                name: 'post-wine-news-list',
                component: () => import('@/pages/post/List'),
                props: {
                  taxonomy: 'wine-news'
                },
                meta: { title: '资讯列表', hideInBreadcrumb: true }
              },
              {
                path: '/post/wine-news/save',
                name: 'post-wine-news-save',
                component: () => import('@/pages/post/Form'),
                props: {
                  taxonomy: 'wine-news'
                },
                meta: { title: '保存资讯', hideInBreadcrumb: true }
              }
            ]
          }
        ]
      },
      {
        path: '/mall',
        name: 'mall',
        meta: { title: '商城', icon: 'slack' },
        redirect: '/mall/shop',
        component: RouteView,
        children: [
          {
            path: '/mall/shop',
            name: 'mall-shop',
            component: PageView,
            meta: { title: '店铺', icon: 'layout' },
            redirect: '/mall/shop/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/mall/shop/list',
                name: 'shop-list',
                component: () => import('@/pages/mall/shop/List'),
                props: {
                  taxonomy: 'shop',
                  productTaxonomy: 'product'
                },
                meta: { title: '店铺列表', hideInBreadcrumb: true }
              },
              {
                path: '/mall/shop/save',
                name: 'shop-save',
                component: () => import('@/pages/mall/shop/Form'),
                props: {
                  taxonomy: 'shop'
                },
                meta: { title: '保存店铺', hideInBreadcrumb: true }
              }
            ]
          },
          {
            path: '/mall/product',
            name: 'mall-product',
            component: PageView,
            meta: { title: '商品', icon: 'layout' },
            redirect: '/mall/product/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/mall/product/list',
                name: 'product-list',
                component: () => import('@/pages/mall/product/List'),
                props: {
                  taxonomy: 'product'
                },
                meta: { title: '商品列表', hideInBreadcrumb: true }
              },
              {
                path: '/mall/product/save',
                name: 'product-save',
                component: () => import('@/pages/mall/product/Form'),
                props: {
                  taxonomy: 'product'
                },
                meta: { title: '商品保存', hideInBreadcrumb: true }
              },
              {
                path: '/mall/sku/list',
                name: 'sku-list',
                component: () => import('@/pages/mall/sku/List'),
                props: {
                  taxonomy: 'product'
                },
                meta: { title: '商品SKU列表', hideInBreadcrumb: true }
              },
              {
                path: '/mall/sku/save',
                name: 'sku-save',
                component: () => import('@/pages/mall/sku/Form'),
                props: {
                  taxonomy: 'product'
                },
                meta: { title: '商品SKU保存', hideInBreadcrumb: true }
              }
            ]
          },
          {
            path: '/mall/order',
            name: 'mall-order',
            component: PageView,
            meta: { title: '订单', icon: 'layout' },
            redirect: '/mall/order/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/mall/order/list',
                name: 'order-list',
                component: () => import('@/pages/mall/shop/List'),
                props: {
                  taxonomy: 'shop'
                },
                meta: { title: '订单列表', hideInBreadcrumb: true }
              },
              {
                path: '/mall/order/create',
                name: 'order-create',
                component: () => import('@/pages/mall/order/Form'),
                meta: { title: '创建订单', hideInBreadcrumb: true }
              }
            ]
          }
        ]
      },
      {
        path: '/system',
        name: 'system',
        meta: { title: '系统', icon: 'slack' },
        redirect: '/taxonomy/list',
        component: RouteView,
        children: [
          {
            path: '/taxonomy',
            name: 'taxonomy',
            component: PageView,
            meta: { title: '分类', icon: 'layout' },
            redirect: '/taxonomy/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/taxonomy/list',
                name: 'taxonomy-list',
                component: () => import('@/pages/taxonomy/List'),
                meta: { title: '分类列表', hideInBreadcrumb: true }
              },
              {
                path: '/taxonomy/save',
                name: 'taxonomy-save',
                component: () => import('@/pages/taxonomy/Form'),
                meta: { title: '保存分类', hideInBreadcrumb: true }
              }
            ]
          },
          {
            path: '/user',
            name: 'user',
            component: PageView,
            meta: { title: '用户', icon: 'layout' },
            redirect: '/user/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/user/list',
                name: 'user-list',
                component: () => import('@/pages/user/List'),
                meta: { title: '用户列表', hideInBreadcrumb: true }
              },
              {
                path: '/user/save',
                name: 'user-save',
                component: () => import('@/pages/user/Form'),
                meta: { title: '用户保存', hideInBreadcrumb: true }
              }
            ]
          },
          {
            path: '/qrcode',
            name: 'qrcode',
            component: PageView,
            meta: { title: '二维码', icon: 'layout' },
            redirect: '/qrcode/list',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/qrcode/list',
                name: 'qrcode-list',
                component: () => import('@/pages/qrcode/List'),
                meta: { title: '二维码列表', hideInBreadcrumb: true }
              },
              {
                path: '/qrcode/save',
                name: 'qrcode-save',
                component: () => import('@/pages/qrcode/Form'),
                meta: { title: '二维码保存', hideInBreadcrumb: true }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]

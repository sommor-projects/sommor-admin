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
                props: {
                  taxonomy: 'outline-server',
                  apiBasePath: '/outline-server'
                },
                component: () => import('@/pages/outline/server/List'),
                meta: { title: 'Outline服务器列表', hideInBreadcrumb: true }
              },
              {
                path: '/outline/server/save',
                name: 'outline-server-save',
                props: {
                  taxonomy: 'outline-server',
                  apiBasePath: '/outline-server'
                },
                component: () => import('@/pages/outline/server/Form'),
                meta: { title: '保存', hideInBreadcrumb: true }
              },
              {
                path: '/outline/accesskey',
                name: 'outline-accesskey-list',
                props: {
                  apiBasePath: '/outline-accesskey'
                },
                component: () => import('@/pages/outline/accesskey/List'),
                meta: { title: 'accessKey列表' }
              },
              {
                path: '/outline/accesskey/save',
                name: 'outline-accesskey-save',
                props: {
                  apiBasePath: '/outline-accesskey'
                },
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
                  apiBasePath: '/product-sku'
                },
                meta: { title: 'Outline商品列表' }
              },
              {
                path: '/outline/product/save',
                name: 'product-outline-save',
                component: () => import('@/pages/mall/product/ProductSkuForm'),
                props: {
                  taxonomy: 'product:outline',
                  apiBasePath: '/product-sku'
                },
                meta: { title: '保存', hideInBreadcrumb: true }
              }
            ]
          },
          {
            path: '/outline/order',
            name: 'outline-order',
            component: RouteView,
            meta: { title: '订单', icon: 'layout' },
            hideChildrenInMenu: true,
            redirect: '/outline/order/list',
            children: [
              {
                path: '/outline/order/list',
                name: 'outline-order-list',
                component: () => import('@/pages/outline/order/List'),
                props: {
                  apiBasePath: '/outline/order',
                  taxonomy: 'product:outline'
                },
                meta: { title: 'Outline订单列表' }
              },
              {
                path: '/outline/order/save',
                name: 'outline-order-save',
                component: () => import('@/pages/mall/product/ProductSkuForm'),
                props: {
                  apiBasePath: '/outline/order'
                },
                meta: { title: '保存', hideInBreadcrumb: true }
              },
              {
                path: '/outline/order/accesskey/list',
                name: 'outline-order-accesskey-list',
                component: () => import('@/pages/outline/order/AccessKeyList'),
                props: {
                  apiBasePath: '/outline/order/accesskey'
                },
                meta: { title: 'AccessKey列表' }
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
                  apiBasePath: '/taxonomy'
                },
                meta: { title: '列表' }
              },
              {
                path: '/taxonomy/wine-region/save',
                name: 'taxonomy-wine-region-save',
                props: {
                  taxonomy: 'wine-region',
                  apiBasePath: '/taxonomy'
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
                  taxonomy: 'shop:winery',
                  productTaxonomy: 'product:wines',
                  showSubjectTaxonomySearchField: false,
                  apiBasePath: '/shop'
                },
                meta: { title: '列表', hideInBreadcrumb: true }
              },
              {
                path: '/shop/winery/save',
                name: 'shop-winery-save',
                component: () => import('@/pages/mall/shop/Form'),
                props: {
                  taxonomy: 'shop:winery',
                  apiBasePath: '/shop'
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
                      taxonomy: 'product:wines',
                      apiBasePath: '/product'
                    },
                    meta: { title: '酒款列表', queryParamNames: ['shopId'] }
                  },
                  {
                    path: '/product/wines/save',
                    name: 'product-wines-save',
                    component: () => import('@/pages/mall/product/Form'),
                    props: {
                      taxonomy: 'product:wines',
                      apiBasePath: '/product'
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
                  taxonomy: 'wine-news',
                  apiBasePath: '/post'
                },
                meta: { title: '资讯列表', hideInBreadcrumb: true }
              },
              {
                path: '/post/wine-news/save',
                name: 'post-wine-news-save',
                component: () => import('@/pages/post/Form'),
                props: {
                  taxonomy: 'wine-news',
                  apiBasePath: '/post'
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
                  productTaxonomy: 'product',
                  apiBasePath: '/shop'
                },
                meta: { title: '店铺列表', hideInBreadcrumb: true }
              },
              {
                path: '/mall/shop/save',
                name: 'shop-save',
                component: () => import('@/pages/mall/shop/Form'),
                props: {
                  taxonomy: 'shop',
                  specifySubjectTaxonomy: true,
                  apiBasePath: '/shop'
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
                  taxonomy: 'product',
                  apiBasePath: '/product'
                },
                meta: { title: '商品列表', hideInBreadcrumb: true }
              },
              {
                path: '/mall/product/save',
                name: 'product-save',
                component: () => import('@/pages/mall/product/Form'),
                props: {
                  taxonomy: 'product',
                  specifySubjectTaxonomy: true,
                  apiBasePath: '/product'
                },
                meta: { title: '商品保存', hideInBreadcrumb: true }
              },
              {
                path: '/mall/sku/list',
                name: 'sku-list',
                component: () => import('@/pages/mall/sku/List'),
                props: {
                  taxonomy: 'product',
                  apiBasePath: '/sku'
                },
                meta: { title: '商品SKU列表', hideInBreadcrumb: true }
              },
              {
                path: '/mall/sku/save',
                name: 'sku-save',
                component: () => import('@/pages/mall/sku/Form'),
                props: {
                  taxonomy: 'product',
                  specifySubjectTaxonomy: true,
                  apiBasePath: '/sku'
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
                props: {
                  apiBasePath: '/order'
                },
                component: () => import('@/pages/mall/order/List'),
                meta: { title: '订单列表', hideInBreadcrumb: true }
              },
              {
                path: '/mall/order/create',
                name: 'order-create',
                props: {
                  apiBasePath: '/admin/order'
                },
                component: () => import('@/pages/mall/order/Form'),
                meta: { title: '创建订单', hideInBreadcrumb: true }
              }
            ]
          }
        ]
      },

      {
        path: '/user',
        name: 'user',
        component: PageView,
        meta: { title: '用户', icon: 'layout' },
        redirect: '/user/list',
        children: [
          {
            path: '/user/list',
            name: 'user-list',
            props: {
              apiBasePath: '/user'
            },
            component: () => import('@/pages/user/List'),
            meta: { title: '所有用户', hideInBreadcrumb: true }
          },
          {
            path: '/wechat/user/list',
            name: 'wechat-user-list',
            props: {
              apiBasePath: '/wechat/user'
            },
            component: () => import('@/pages/wechat/user/List'),
            meta: { title: '微信用户', hideInBreadcrumb: true }
          },
          {
            path: '/user/account',
            name: 'user-account',
            component: RouteView,
            meta: { title: '账号' },
            redirect: '/user/account/settings',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/user/account/settings',
                name: 'user-account-settings',
                component: () => import('@/pages/user/account/settings/Index'),
                meta: { title: '账号设置' },
                redirect: '/user/account/settings/base',
                hideChildrenInMenu: true,
                children: [
                  {
                    path: '/user/account/settings/base',
                    name: 'user-account-settings-base',
                    props: {
                      apiBasePath: '/user/account/base'
                    },
                    component: () => import('@/pages/user/account/settings/BaseSetting'),
                    meta: { title: '基本设置' }
                  },
                  {
                    path: '/user/account/settings/security',
                    name: 'user-account-settings-security',
                    component: () => import('@/pages/user/account/settings/Security'),
                    meta: { title: '安全设置' }
                  },
                  {
                    path: '/user/account/settings/custom',
                    name: 'user-account-settings-custom',
                    component: () => import('@/pages/user/account/settings/Custom'),
                    meta: { title: '个性化设置' }
                  },
                  {
                    path: '/user/account/settings/binding',
                    name: 'user-account-settings-binding',
                    component: () => import('@/pages/user/account/settings/Binding'),
                    meta: { title: '账户绑定' }
                  },
                  {
                    path: '/user/account/settings/notification',
                    name: 'user-account-settings-notification',
                    component: () => import('@/pages/user/account/settings/Notification'),
                    meta: { title: '新消息通知' }
                  }
                ]
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
                props: {
                  apiBasePath: '/taxonomy'
                },
                component: () => import('@/pages/taxonomy/List'),
                meta: { title: '分类列表', hideInBreadcrumb: true }
              },
              {
                path: '/taxonomy/save',
                name: 'taxonomy-save',
                props: {
                  apiBasePath: '/taxonomy'
                },
                component: () => import('@/pages/taxonomy/Form'),
                meta: { title: '保存分类', hideInBreadcrumb: true }
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
                props: {
                  apiBasePath: '/qrcode'
                },
                component: () => import('@/pages/qrcode/List'),
                meta: { title: '二维码列表', hideInBreadcrumb: true }
              },
              {
                path: '/qrcode/save',
                name: 'qrcode-save',
                props: {
                  apiBasePath: '/qrcode'
                },
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
        component: () => import(/* webpackChunkName: "user" */ '@/pages/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/pages/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/pages/user/RegisterResult')
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

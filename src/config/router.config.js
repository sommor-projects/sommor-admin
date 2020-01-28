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
                  type: 'wine-region'
                },
                meta: { title: '列表' }
              },
              {
                path: '/taxonomy/wine-region/save',
                name: 'taxonomy-wine-region-save',
                props: {
                  type: 'wine-region'
                },
                component: () => import('@/pages/taxonomy/Form'),
                meta: { title: '保存' }
              }
            ]
          },
          {
            path: '/shop/wine-producer',
            name: 'shop-wine-producer',
            component: RouteView,
            meta: { title: '酒庄', icon: 'layout' },
            hideChildrenInMenu: true,
            redirect: '/shop/wine-producer/list',
            children: [
              {
                path: '/shop/wine-producer/list',
                name: 'shop-wine-producer-list',
                component: () => import('@/pages/mall/shop/List'),
                props: {
                  type: 'wine-producer',
                  spuType: 'wine-product'
                },
                meta: { title: '列表', hideInBreadcrumb: true }
              },
              {
                path: '/shop/wine-producer/save',
                name: 'shop-wine-producer-save',
                component: () => import('@/pages/mall/shop/Form'),
                props: {
                  type: 'wine-producer'
                },
                meta: { title: '保存', hideInBreadcrumb: true }
              },
              {
                path: '/spu/wine-product',
                name: 'spu-wine-product',
                component: RouteView,
                meta: { title: '酒款', hideInBreadcrumb: true },
                redirect: '/spu/wine-product/list',
                children: [
                  {
                    path: '/spu/wine-product/list',
                    name: 'spu-wine-product-list',
                    component: () => import('@/pages/mall/product/spu/List'),
                    props: {
                      type: 'wine-product'
                    },
                    meta: { title: '酒款列表', queryParamNames: ['shopId'] }
                  },
                  {
                    path: '/spu/wine-product/save',
                    name: 'spu-wine-product-save',
                    component: () => import('@/pages/mall/product/spu/Form'),
                    props: {
                      type: 'wine-product'
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
                  type: 'wine-news'
                },
                meta: { title: '资讯列表', hideInBreadcrumb: true }
              },
              {
                path: '/post/wine-news/save',
                name: 'post-wine-news-save',
                component: () => import('@/pages/post/Form'),
                props: {
                  type: 'wine-news'
                },
                meta: { title: '保存资讯', hideInBreadcrumb: true }
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

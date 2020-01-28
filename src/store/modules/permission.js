import { asyncRouterMap, constantRouterMap } from '@/config/router.config'

// /**
//  * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
//  *
//  * @param permission
//  * @param route
//  * @returns {boolean}
//  */
// function hasPermission (permission, route) {
//   if (route.meta && route.meta.permission) {
//     let flag = false
//     for (let i = 0, len = permission.length; i < len; i++) {
//       flag = route.meta.permission.includes(permission[i])
//       if (flag) {
//         return true
//       }
//     }
//     return false
//   }
//   return true
// }

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (roles && route.meta && route.meta.role) {
    return roles.includes(route.meta.role)
  } else {
    return true
  }
}

function filterAsyncRouter (routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasRole(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function setRouteMeta (routerMap, metas) {
  routerMap.forEach(route => {
    if (route.meta && route.name) {
      metas[route.name] = route.meta
    }
    if (route.children && route.children.length > 0) {
      setRouteMeta(route.children, metas)
    }
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    routeMetas: {}
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      setRouteMeta(routers, state.routeMetas)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        console.log(roles)
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission

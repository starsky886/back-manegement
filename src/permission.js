import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 白名单
const whiteList = ['/login'] // no redirect whitelist

// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasGetUserInfo = store.getters.user
  // determine whether the user has logged in
  // const hasToken = getToken()

  // 以下是vue-template-admin的
  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }

  // 自己写的鉴权
  if (to.meta.auth) {
    // 该页面需要鉴权

    if (hasGetUserInfo) {
      // 有用户信息， 放行
      next()
    } else {
      // 没有用户信息,看一下是否有token
      const hasToken = localStorage.getItem('adminToken')

      if (hasToken) {
        // 有token，需要验证token的有效性
        try {
          await store.dispatch('user/getInfo')
          next()
        } catch (error) {
          // token无效或者过期，说明需要重新登录
          await store.dispatch('user/resetToken')
          Message.error('登录已过期，请重新登录')
          next({ path: `/login?redirect=${to.path}` })
          NProgress.done()
        }
      } else {
        // 没有token，说明需要重新登录
        next({ path: `/login?redirect=${to.path}` })
        NProgress.done()
      }
    }


  } else {
    // 该页面不需要鉴权
    if (to.path === '/login' && hasGetUserInfo) {
      // 去登录页面且有用户信息，直接跳转到首页
      next({ path: '/' })
    } else {
      next()
    }
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

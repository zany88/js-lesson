import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _25390abc = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _277a1b52 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _c758be1e = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _a1d40d9e = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _37e67dd8 = () => interopDefault(import('../pages/setting' /* webpackChunkName: "" */))
const _3cd6be36 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _d43f8704 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))
const _dcc88cd2 = () => interopDefault(import('../pages' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _25390abc,
    children: [{
      path: "",
      component: _277a1b52,
      name: "home"
    }, {
      path: "/login",
      component: _c758be1e,
      name: "login"
    }, {
      path: "/register",
      component: _c758be1e,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _a1d40d9e,
      name: "profile"
    }, {
      path: "/setting",
      component: _37e67dd8,
      name: "setting"
    }, {
      path: "/editor",
      component: _3cd6be36,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _d43f8704,
      name: "article"
    }, {
      path: "/other",
      component: _dcc88cd2,
      name: "other"
    }]
  }],

  fallback: false
}

export function createRouter () {
  const router = new Router(routerOptions)
  const resolve = router.resolve.bind(router)

  // encodeURI(decodeURI()) ~> support both encoded and non-encoded urls
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = encodeURI(decodeURI(to))
    }
    return resolve(to, current, append)
  }

  return router
}

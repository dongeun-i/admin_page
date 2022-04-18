import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2bedb0b4 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _eedd137a = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _517762cf = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages/main" */))
const _9d69876e = () => interopDefault(import('..\\pages\\calc\\list.vue' /* webpackChunkName: "pages/calc/list" */))
const _1989215a = () => interopDefault(import('..\\pages\\coupon\\list.vue' /* webpackChunkName: "pages/coupon/list" */))
const _5be58112 = () => interopDefault(import('..\\pages\\event\\list.vue' /* webpackChunkName: "pages/event/list" */))
const _e44b1e7a = () => interopDefault(import('..\\pages\\exhibition\\list.vue' /* webpackChunkName: "pages/exhibition/list" */))
const _6aebd1e4 = () => interopDefault(import('..\\pages\\faq\\list.vue' /* webpackChunkName: "pages/faq/list" */))
const _12234d1c = () => interopDefault(import('..\\pages\\order\\delivery.vue' /* webpackChunkName: "pages/order/delivery" */))
const _3eb50fcb = () => interopDefault(import('..\\pages\\order\\exchange.vue' /* webpackChunkName: "pages/order/exchange" */))
const _0d157674 = () => interopDefault(import('..\\pages\\order\\list.vue' /* webpackChunkName: "pages/order/list" */))
const _2bc35750 = () => interopDefault(import('..\\pages\\order\\return.vue' /* webpackChunkName: "pages/order/return" */))
const _3faaeca7 = () => interopDefault(import('..\\pages\\product\\list.vue' /* webpackChunkName: "pages/product/list" */))
const _f3e00ef4 = () => interopDefault(import('..\\pages\\rate\\sales.vue' /* webpackChunkName: "pages/rate/sales" */))
const _20f00700 = () => interopDefault(import('..\\pages\\rate\\visitation.vue' /* webpackChunkName: "pages/rate/visitation" */))
const _e48f9bda = () => interopDefault(import('..\\pages\\user\\as.vue' /* webpackChunkName: "pages/user/as" */))
const _0e6d7615 = () => interopDefault(import('..\\pages\\user\\delivery.vue' /* webpackChunkName: "pages/user/delivery" */))
const _d3ea0362 = () => interopDefault(import('..\\pages\\user\\info.vue' /* webpackChunkName: "pages/user/info" */))
const _822c59a8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _2bedb0b4,
    name: "inspire"
  }, {
    path: "/login",
    component: _eedd137a,
    name: "login"
  }, {
    path: "/main",
    component: _517762cf,
    name: "main"
  }, {
    path: "/calc/list",
    component: _9d69876e,
    name: "calc-list"
  }, {
    path: "/coupon/list",
    component: _1989215a,
    name: "coupon-list"
  }, {
    path: "/event/list",
    component: _5be58112,
    name: "event-list"
  }, {
    path: "/exhibition/list",
    component: _e44b1e7a,
    name: "exhibition-list"
  }, {
    path: "/faq/list",
    component: _6aebd1e4,
    name: "faq-list"
  }, {
    path: "/order/delivery",
    component: _12234d1c,
    name: "order-delivery"
  }, {
    path: "/order/exchange",
    component: _3eb50fcb,
    name: "order-exchange"
  }, {
    path: "/order/list",
    component: _0d157674,
    name: "order-list"
  }, {
    path: "/order/return",
    component: _2bc35750,
    name: "order-return"
  }, {
    path: "/product/list",
    component: _3faaeca7,
    name: "product-list"
  }, {
    path: "/rate/sales",
    component: _f3e00ef4,
    name: "rate-sales"
  }, {
    path: "/rate/visitation",
    component: _20f00700,
    name: "rate-visitation"
  }, {
    path: "/user/as",
    component: _e48f9bda,
    name: "user-as"
  }, {
    path: "/user/delivery",
    component: _0e6d7615,
    name: "user-delivery"
  }, {
    path: "/user/info",
    component: _d3ea0362,
    name: "user-info"
  }, {
    path: "/",
    component: _822c59a8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}

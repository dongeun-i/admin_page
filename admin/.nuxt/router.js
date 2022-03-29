import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _5db7d349 = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _763d3a18 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _13ed5f4c = () => interopDefault(import('..\\pages\\main.vue' /* webpackChunkName: "pages/main" */))
const _7a0cd4d8 = () => interopDefault(import('..\\pages\\calc\\list.vue' /* webpackChunkName: "pages/calc/list" */))
const _790653e5 = () => interopDefault(import('..\\pages\\coupon\\list.vue' /* webpackChunkName: "pages/coupon/list" */))
const _fffb5db2 = () => interopDefault(import('..\\pages\\event\\list.vue' /* webpackChunkName: "pages/event/list" */))
const _a1d53464 = () => interopDefault(import('..\\pages\\exhibition\\list.vue' /* webpackChunkName: "pages/exhibition/list" */))
const _9b542f3a = () => interopDefault(import('..\\pages\\faq\\list.vue' /* webpackChunkName: "pages/faq/list" */))
const _3c800ab1 = () => interopDefault(import('..\\pages\\order\\delivery.vue' /* webpackChunkName: "pages/order/delivery" */))
const _6911cd60 = () => interopDefault(import('..\\pages\\order\\exchange.vue' /* webpackChunkName: "pages/order/exchange" */))
const _1d9214db = () => interopDefault(import('..\\pages\\order\\list.vue' /* webpackChunkName: "pages/order/list" */))
const _7a47732d = () => interopDefault(import('..\\pages\\order\\return.vue' /* webpackChunkName: "pages/order/return" */))
const _6057e908 = () => interopDefault(import('..\\pages\\product\\list.vue' /* webpackChunkName: "pages/product/list" */))
const _aba66eca = () => interopDefault(import('..\\pages\\rate\\sales.vue' /* webpackChunkName: "pages/rate/sales" */))
const _10c2f18b = () => interopDefault(import('..\\pages\\rate\\visitation.vue' /* webpackChunkName: "pages/rate/visitation" */))
const _d59b3bc4 = () => interopDefault(import('..\\pages\\user\\as.vue' /* webpackChunkName: "pages/user/as" */))
const _f92f9c40 = () => interopDefault(import('..\\pages\\user\\delivery.vue' /* webpackChunkName: "pages/user/delivery" */))
const _b08d50cc = () => interopDefault(import('..\\pages\\user\\info.vue' /* webpackChunkName: "pages/user/info" */))
const _a6d4d1fe = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _5db7d349,
    name: "inspire"
  }, {
    path: "/login",
    component: _763d3a18,
    name: "login"
  }, {
    path: "/main",
    component: _13ed5f4c,
    name: "main"
  }, {
    path: "/calc/list",
    component: _7a0cd4d8,
    name: "calc-list"
  }, {
    path: "/coupon/list",
    component: _790653e5,
    name: "coupon-list"
  }, {
    path: "/event/list",
    component: _fffb5db2,
    name: "event-list"
  }, {
    path: "/exhibition/list",
    component: _a1d53464,
    name: "exhibition-list"
  }, {
    path: "/faq/list",
    component: _9b542f3a,
    name: "faq-list"
  }, {
    path: "/order/delivery",
    component: _3c800ab1,
    name: "order-delivery"
  }, {
    path: "/order/exchange",
    component: _6911cd60,
    name: "order-exchange"
  }, {
    path: "/order/list",
    component: _1d9214db,
    name: "order-list"
  }, {
    path: "/order/return",
    component: _7a47732d,
    name: "order-return"
  }, {
    path: "/product/list",
    component: _6057e908,
    name: "product-list"
  }, {
    path: "/rate/sales",
    component: _aba66eca,
    name: "rate-sales"
  }, {
    path: "/rate/visitation",
    component: _10c2f18b,
    name: "rate-visitation"
  }, {
    path: "/user/as",
    component: _d59b3bc4,
    name: "user-as"
  }, {
    path: "/user/delivery",
    component: _f92f9c40,
    name: "user-delivery"
  }, {
    path: "/user/info",
    component: _b08d50cc,
    name: "user-info"
  }, {
    path: "/",
    component: _a6d4d1fe,
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

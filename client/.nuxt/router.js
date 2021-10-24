import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _986559b0 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _a3649150 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _1da18e7b = () => interopDefault(import('..\\pages\\checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _0f7c050a = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _75b667ad = () => interopDefault(import('..\\pages\\gallery.vue' /* webpackChunkName: "pages/gallery" */))
const _6721acde = () => interopDefault(import('..\\pages\\account\\login.vue' /* webpackChunkName: "pages/account/login" */))
const _0b318caa = () => interopDefault(import('..\\pages\\account\\register.vue' /* webpackChunkName: "pages/account/register" */))
const _4747a524 = () => interopDefault(import('..\\pages\\admin\\bookings.vue' /* webpackChunkName: "pages/admin/bookings" */))
const _fa9a4af4 = () => interopDefault(import('..\\pages\\admin\\categories.vue' /* webpackChunkName: "pages/admin/categories" */))
const _71bcb860 = () => interopDefault(import('..\\pages\\admin\\edit-profile.vue' /* webpackChunkName: "pages/admin/edit-profile" */))
const _7efb7b50 = () => interopDefault(import('..\\pages\\admin\\gallery.vue' /* webpackChunkName: "pages/admin/gallery" */))
const _c048b304 = () => interopDefault(import('..\\pages\\admin\\rooms.vue' /* webpackChunkName: "pages/admin/rooms" */))
const _58f5a426 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _986559b0,
    name: "about"
  }, {
    path: "/admin",
    component: _a3649150,
    name: "admin"
  }, {
    path: "/checkout",
    component: _1da18e7b,
    name: "checkout"
  }, {
    path: "/contact",
    component: _0f7c050a,
    name: "contact"
  }, {
    path: "/gallery",
    component: _75b667ad,
    name: "gallery"
  }, {
    path: "/account/login",
    component: _6721acde,
    name: "account-login"
  }, {
    path: "/account/register",
    component: _0b318caa,
    name: "account-register"
  }, {
    path: "/admin/bookings",
    component: _4747a524,
    name: "admin-bookings"
  }, {
    path: "/admin/categories",
    component: _fa9a4af4,
    name: "admin-categories"
  }, {
    path: "/admin/edit-profile",
    component: _71bcb860,
    name: "admin-edit-profile"
  }, {
    path: "/admin/gallery",
    component: _7efb7b50,
    name: "admin-gallery"
  }, {
    path: "/admin/rooms",
    component: _c048b304,
    name: "admin-rooms"
  }, {
    path: "/",
    component: _58f5a426,
    name: "index"
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}

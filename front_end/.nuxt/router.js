import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _48fc6ab0 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _5ee86050 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _4affed74 = () => interopDefault(import('..\\pages\\admin-login.vue' /* webpackChunkName: "pages/admin-login" */))
const _c080320a = () => interopDefault(import('..\\pages\\checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _04b694fb = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _fbaa01a6 = () => interopDefault(import('..\\pages\\gallery.vue' /* webpackChunkName: "pages/gallery" */))
const _763d6ef8 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _3a725c50 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _1f6cbca4 = () => interopDefault(import('..\\pages\\admin\\bookings.vue' /* webpackChunkName: "pages/admin/bookings" */))
const _341fdbf4 = () => interopDefault(import('..\\pages\\admin\\categories.vue' /* webpackChunkName: "pages/admin/categories" */))
const _4feefb50 = () => interopDefault(import('..\\pages\\admin\\edit-profile.vue' /* webpackChunkName: "pages/admin/edit-profile" */))
const _4b9c3ad8 = () => interopDefault(import('..\\pages\\admin\\gallery.vue' /* webpackChunkName: "pages/admin/gallery" */))
const _0d681918 = () => interopDefault(import('..\\pages\\admin\\logout.vue' /* webpackChunkName: "pages/admin/logout" */))
const _53616ca2 = () => interopDefault(import('..\\pages\\admin\\profile.vue' /* webpackChunkName: "pages/admin/profile" */))
const _791fcadf = () => interopDefault(import('..\\pages\\admin\\roles\\index.vue' /* webpackChunkName: "pages/admin/roles/index" */))
const _6d7622e5 = () => interopDefault(import('..\\pages\\admin\\staffs\\index.vue' /* webpackChunkName: "pages/admin/staffs/index" */))
const _5168aee4 = () => interopDefault(import('..\\pages\\admin\\roles\\addrole.vue' /* webpackChunkName: "pages/admin/roles/addrole" */))
const _1c67197d = () => interopDefault(import('..\\pages\\admin\\staffs\\newstaff.vue' /* webpackChunkName: "pages/admin/staffs/newstaff" */))
const _276ba165 = () => interopDefault(import('..\\pages\\verify-account\\_email\\_token.vue' /* webpackChunkName: "pages/verify-account/_email/_token" */))
const _098cb526 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _48fc6ab0,
    name: "about"
  }, {
    path: "/admin",
    component: _5ee86050,
    name: "admin"
  }, {
    path: "/admin-login",
    component: _4affed74,
    name: "admin-login"
  }, {
    path: "/checkout",
    component: _c080320a,
    name: "checkout"
  }, {
    path: "/contact",
    component: _04b694fb,
    name: "contact"
  }, {
    path: "/gallery",
    component: _fbaa01a6,
    name: "gallery"
  }, {
    path: "/login",
    component: _763d6ef8,
    name: "login"
  }, {
    path: "/register",
    component: _3a725c50,
    name: "register"
  }, {
    path: "/admin/bookings",
    component: _1f6cbca4,
    name: "admin-bookings"
  }, {
    path: "/admin/categories",
    component: _341fdbf4,
    name: "admin-categories"
  }, {
    path: "/admin/edit-profile",
    component: _4feefb50,
    name: "admin-edit-profile"
  }, {
    path: "/admin/gallery",
    component: _4b9c3ad8,
    name: "admin-gallery"
  }, {
    path: "/admin/logout",
    component: _0d681918,
    name: "admin-logout"
  }, {
    path: "/admin/profile",
    component: _53616ca2,
    name: "admin-profile"
  }, {
    path: "/admin/roles",
    component: _791fcadf,
    name: "admin-roles"
  }, {
    path: "/admin/staffs",
    component: _6d7622e5,
    name: "admin-staffs"
  }, {
    path: "/admin/roles/addrole",
    component: _5168aee4,
    name: "admin-roles-addrole"
  }, {
    path: "/admin/staffs/newstaff",
    component: _1c67197d,
    name: "admin-staffs-newstaff"
  }, {
    path: "/verify-account/:email?/:token?",
    component: _276ba165,
    name: "verify-account-email-token"
  }, {
    path: "/",
    component: _098cb526,
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

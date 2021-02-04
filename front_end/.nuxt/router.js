import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _56a1ac5f = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _e2183b7e = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _6d0785bd = () => interopDefault(import('..\\pages\\admin-login.vue' /* webpackChunkName: "pages/admin-login" */))
const _7a48d438 = () => interopDefault(import('..\\pages\\checkout.vue' /* webpackChunkName: "pages/checkout" */))
const _3764e4f2 = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _964d61b8 = () => interopDefault(import('..\\pages\\gallery.vue' /* webpackChunkName: "pages/gallery" */))
const _40012a3b = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _05e280c1 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _1f39b4ca = () => interopDefault(import('..\\pages\\admin\\bookings.vue' /* webpackChunkName: "pages/admin/bookings" */))
const _52f0193d = () => interopDefault(import('..\\pages\\admin\\categories.vue' /* webpackChunkName: "pages/admin/categories" */))
const _7d0a10c7 = () => interopDefault(import('..\\pages\\admin\\edit-profile.vue' /* webpackChunkName: "pages/admin/edit-profile" */))
const _10495701 = () => interopDefault(import('..\\pages\\admin\\gallery.vue' /* webpackChunkName: "pages/admin/gallery" */))
const _07e62e2b = () => interopDefault(import('..\\pages\\admin\\logout.vue' /* webpackChunkName: "pages/admin/logout" */))
const _ca073450 = () => interopDefault(import('..\\pages\\admin\\profile.vue' /* webpackChunkName: "pages/admin/profile" */))
const _b38a3f54 = () => interopDefault(import('..\\pages\\admin\\roles\\index.vue' /* webpackChunkName: "pages/admin/roles/index" */))
const _38848764 = () => interopDefault(import('..\\pages\\admin\\staffs\\index.vue' /* webpackChunkName: "pages/admin/staffs/index" */))
const _b7d77aca = () => interopDefault(import('..\\pages\\admin\\roles\\addrole.vue' /* webpackChunkName: "pages/admin/roles/addrole" */))
const _727c9b74 = () => interopDefault(import('..\\pages\\admin\\staffs\\newstaff.vue' /* webpackChunkName: "pages/admin/staffs/newstaff" */))
const _71954b8e = () => interopDefault(import('..\\pages\\verify-account\\_email\\_token.vue' /* webpackChunkName: "pages/verify-account/_email/_token" */))
const _76598724 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _56a1ac5f,
    name: "about"
  }, {
    path: "/admin",
    component: _e2183b7e,
    name: "admin"
  }, {
    path: "/admin-login",
    component: _6d0785bd,
    name: "admin-login"
  }, {
    path: "/checkout",
    component: _7a48d438,
    name: "checkout"
  }, {
    path: "/contact",
    component: _3764e4f2,
    name: "contact"
  }, {
    path: "/gallery",
    component: _964d61b8,
    name: "gallery"
  }, {
    path: "/login",
    component: _40012a3b,
    name: "login"
  }, {
    path: "/register",
    component: _05e280c1,
    name: "register"
  }, {
    path: "/admin/bookings",
    component: _1f39b4ca,
    name: "admin-bookings"
  }, {
    path: "/admin/categories",
    component: _52f0193d,
    name: "admin-categories"
  }, {
    path: "/admin/edit-profile",
    component: _7d0a10c7,
    name: "admin-edit-profile"
  }, {
    path: "/admin/gallery",
    component: _10495701,
    name: "admin-gallery"
  }, {
    path: "/admin/logout",
    component: _07e62e2b,
    name: "admin-logout"
  }, {
    path: "/admin/profile",
    component: _ca073450,
    name: "admin-profile"
  }, {
    path: "/admin/roles",
    component: _b38a3f54,
    name: "admin-roles"
  }, {
    path: "/admin/staffs",
    component: _38848764,
    name: "admin-staffs"
  }, {
    path: "/admin/roles/addrole",
    component: _b7d77aca,
    name: "admin-roles-addrole"
  }, {
    path: "/admin/staffs/newstaff",
    component: _727c9b74,
    name: "admin-staffs-newstaff"
  }, {
    path: "/verify-account/:email?/:token?",
    component: _71954b8e,
    name: "verify-account-email-token"
  }, {
    path: "/",
    component: _76598724,
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

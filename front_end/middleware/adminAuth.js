export default function ({ store, redirect, app }) {
  const xsrf = app.$cookies.get('_dmt');
  const userData = app.$cookies.get('_sd');
  const roleData = app.$cookies.get('_rd');

  store.dispatch('setStaffData', {userData})
  store.dispatch('setRoleData', {roleData})

  if (xsrf == undefined) {
    return redirect('/admin-login');
  } 
}
export default function ({ store, redirect, app }) {
  const xsrf = app.$cookies.get('XSRF_TOKEN');
  if (xsrf == undefined) {
    return redirect('/');
  } 
}
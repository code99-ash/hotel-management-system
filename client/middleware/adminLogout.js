export default function ({app, store, redirect }) {
    // If the user is authenticated redirect to home page
    store.state.staffData = {};
    store.state.toleData = {};
    app.$cookies.remove('_sd');
    app.$cookies.remove('_rd');
    app.$cookies.remove('_dmt');
    return redirect('/admin-login')
}
  
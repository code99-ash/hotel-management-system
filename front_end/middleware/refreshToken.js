// import cookies from 'js-cookie';

// export default function ({ store, redirect, app }) {
//   const token = app.$cookies.get('x-access-token')

//   if (!token) {
//     store.dispatch('refreshToken', {token})
//       .catch(errors => {
//         console.dir(errors);
//         store.dispatch('logout');
//         return redirect('/')
//       });
//   }
// }
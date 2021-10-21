import cookies from 'js-cookie';

const authModule = { 
  state: () => ({
    token: null,
    email: null,
    user: null,
}),

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },

    REMOVE_TOKEN(state) {
      state.token = null;
    },
    SET_USER(state, user) {
      state.user = user;
    }
},

  actions: {
    nuxtServerInit({commit}) {
      const token = this.$cookies.get('XSRF_TOKEN');
      const user =  this.$cookies.get('user');
      commit('SET_TOKEN', token);
      commit('SET_USER', user);
    },
    setToken({commit}, token) {
      this.$axios.setToken(token, 'Bearer');
      const expiryTime = new Date(new Date().getTime() + 30 *60);
      cookies.set('x-access-token', token, {expires: expiryTime});
      commit('SET_TOKEN', token);
    },

    // async refreshToken(mytoken) {
    //   console.log("token", mytoken)
    //   const response = await this.$axios.$get(`api/cust-auth.php?refreshToken=true&&token=${mytoken}`);
    //   console.log(response);
    //   var token = response.token;
    //   dispatch('setToken', {token});
    // },

    logout({commit}) {
      this.$axios.setToken(false);
      cookies.remove('x-access-token');
      this.$cookies.remove('XSRF_TOKEN');
      commit('REMOVE_TOKEN');
      this.$router.replace('/');
    }
  }
}

export default authModule;
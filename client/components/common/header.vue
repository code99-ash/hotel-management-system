<template>
    <nav class="bg-light-blue w-100 position-relative d-block px-3" style="padding: 25px 0">
        <nuxt-link to="/" class="btn_outline text-light">+2349038441303</nuxt-link>
        <ul class="site-menu js-clone-nav d-none d-md-inline float-right" v-if="!$auth.$state.isLoggedIn">
            <nuxt-link to="/account/login" class="btn_outline text-light">
                Login
            </nuxt-link>
            <nuxt-link to="/account/register" class="btn_outline text-light">
                Register
            </nuxt-link>
        </ul>
        <button @click="logout" class="btn btn_outline text-light float-right ml-auto mr-0 mb-3" v-else>Logout</button>
    </nav>
</template>

<script>
export default {
    name: 'Header'
}
</script>
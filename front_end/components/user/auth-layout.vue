<template>
    <nav class="bg-light-blue text-right text-md-right w-100 py-3 position-relative d-block" style="padding-top: 70px !important">
        <ul class="site-menu js-clone-nav d-none d-lg-inline mr-5">
            <button class="btn_outline text-light" @click="showLogin = true">
                Login
            </button>
            <button class="btn_outline text-light" @click="showSignup = true">
                Register
            </button>
            </ul>
    </nav>
</template>

<script>
export default {
    name: 'AuthLogin'
}
</script>

<style scoped>
    .btn_outline {
        border: 2px solid #eaeaea !important;
        padding: 7px 20px;
        margin: 0 7px;
    }
    .bg-light-blue {
        background: rgb(19, 9, 0) !important;
    }
</style>
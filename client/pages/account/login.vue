<template>
    <div class="container">
        <div class="row">
            <div class="col-md-7 col-lg-6 mx-auto">
                <UserLogin />
            </div>
        </div>
    </div>
</template>

<script>
    import UserLogin from '@/components/user/login'
    export default {
        layout: 'Guest',
        components: {UserLogin}
    }
</script>
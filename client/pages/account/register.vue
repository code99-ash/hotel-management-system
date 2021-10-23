<template>
    <div class="container">
        <div class="row">
            <div class="col-md-7 col-lg-6 mx-auto">
                <UserSignup />
            </div>
        </div>
    </div>
</template>

<script>
    import UserSignup from '@/components/user/signup'
    export default {
        layout: 'Guest',
        components: {UserSignup}
    }
</script>
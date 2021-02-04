<template>
    <div class="container">
        <div class="row">
            <div class="col-md-7 mx-auto" v-if="email && token">
                <h1 class="text-center">{{res}}</h1>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'Guest',
    computed: {
        email() {
            return this.$route.params.email;
        },
        token() {
            return this.$route.params.token;
        }
    },
    data() {
        return {
            res: null
        }
    },
    created() {
        //call an api to confirm
        let url = `/verify-lego-account.php?email=${this.email}&&token=${this.token}`;
        console.log(url)
        this.$axios.$get(url)
                    .then(response => {
                        if(response.status == 'success') {
                            this.res = 'Congratulations, your account has been verified, you can now login to start booking for rooms at LegoHotel'
                        } else {
                            return this.$router.replace('/');
                        }
                    }).catch(err => {
                        console.log(err);
                    });
    }
}
</script>
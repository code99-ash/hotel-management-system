<template>
    <div>
        <div class="overlay"></div>
            <div class="banner"></div>
            <div class="sub-banner">
                <h3 class="text-center text-light title">Lego Gallery<span class="text-primary">.</span></h3>
            </div>
        <div class="container my-5">
            <div class="row">
                <div class="col-md-3" :key="gal.id" v-for="gal in gallery">
                    <img :title="gal.name" :src="`${$axios.defaults.baseURL}/uploads/gallery/${gal.image}`" :alt="gal.name" class="card-img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'Customer',
    // async asyncData({$axios, $config}) {
    //     const gallery = await $axios.$get(`/api/request.php?getGallery=true`);
    //     // console.log(gallery)
    //     return {gallery}
    // },
}
</script>

<style scoped>
    .card-img {
        height: 250px;
    }
    .overlay {
        width: 100vw;
        height: 40vh;
        background: #000;
        position: absolute
    }
    .banner {
        width: 100vw;
        height: 40vh;
        background: url('/images/home/vip/vip4.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: .4;
    }
    .sub-banner {
        position: absolute;
        top: 50px;
        left: 0;
        padding-top: 70px;
        width: 100vw;
        height: 100%;
    }
    .title {
        font-size: 75px;
        text-shadow: 8px 4px 4px rgb(3, 1, 12);
    }

</style>
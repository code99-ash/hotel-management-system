<template>
    <div>
        <div class="overlay"></div>
            <div class="banner"></div>
            <div class="sub-banner">
                <h3 class="text-center text-light title">Lego Gallery<span class="text-primary">.</span></h3>
            </div>
        <div class="container my-5">
            <lightbox cells="4" :items="images"></lightbox>
        </div>


    </div>
</template>

<script>
export default {
    layout: 'Customer',
    components: {
        'lightbox': () => { if(process.client) { return import('@morioh/v-lightbox') } }
    },
    data() {
        return {
            images: [
                "/images/vip1.jpg",
                "/images/vip2.jpg",
                "/images/vip3.jpg",
                "/images/vip4.jpg",
                "/images/reg1.jpg",
                "/images/reg2.jpg",
                "/images/reg3.jpg",
                "/images/reg4.jpg",
            ]
        }
    }
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
        background: url('/images/vip4.jpg');
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
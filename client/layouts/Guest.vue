<template>
    <div class="bg-main" id="guest">
        <div class="site-wrap">
            <div class="site-navbar position-fixed py-1 bg-dark" style="height: 76px">
                <div class="container-fluid py-0">
                    <div class="row align-items-center">
                        
                        <div class="col-12">
                            
                            <div class="site-wrap">
            <nav class="bg-light-blue w-100 py-3 position-relative d-block px-3">
                <nuxt-link to="/" class="btn_outline text-light">+2349038441303</nuxt-link>
            </nav>
        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="blur"></div>
        <div class="pt-100">
            <nuxt />
        </div>
    </div>
</template>

<script>
export default {
    name: 'Guest',
}
</script>

<style scoped>
    #guest {
        height: 100vh;
    }
    .blur {
        position: fixed;
        background: url('/images/home/first.jpg');
        filter: blur(8px);
        -webkit-filter: blur(8px);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .2;
    }
    .pt-100 {
        padding-top: 100px;
    }
    .nuxt-link-active {
        text-decoration: none !important;
    }
    a {
        text-decoration: none !important;
    }
</style>
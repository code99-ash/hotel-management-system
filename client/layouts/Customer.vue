<template>
    <div class="layout">
        <Header />
        <nuxt />

        <Footer />

    </div>
</template>

<script>
import Footer from '@/components/common/footer'
import Header from '@/components/common/header-nav'

export default {
    head: {
        title: 'Lego Hotel',
    },
    components: {
        Header,
        Footer,
    },
    
}
</script>

<style lang="scss">
    .layout {
        background: $light;
    }
    .bg-light-blue {
        background: $primary !important;
        color: $light !important;
    }
</style>
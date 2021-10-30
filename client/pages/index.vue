<template>
    <div>
        <section class="banner">
            <div class="banner__content">
                <div class="col-md-8 text-center" data-aos="fade-up" data-aos-delay="400">
                    <h1 class="mb-4">Excellent Space With A Lovely View</h1>
                    <p class="mb-5">1105 Madison Plaza Suite 120 Chesapeake, CA, California</p>

                    <RoomChecker />
                </div>
            </div>
        </section>

        <div>
            <div class="container my-5">
                <div class="row">
                    <div class="site-section-heading text-center w-border col-md-6 mx-auto">
                        <h2 class="mb-2">Categories</h2>
                    </div>
                </div>

                <Row :gutter="16">
                    <Col :xs="24" :md="8" v-for="(categ, i) in $store.state.data.categories" :key="i">
                        <Card class="categ-card">
                            <img :src="`/images/vip${i + 1}.jpg`" alt="" />
                            <div class="card-body">{{categ.name}} - NGN{{categ.price}}</div>
                        </Card>
                    </Col>
                </Row>
            </div>

        </div>

    </div>
</template>

<script>
import RoomChecker from '@/components/forms/room-checker.vue';
import { Glide, GlideSlide } from 'vue-glide-js'

export default {
    layout: 'Customer',
    head: {
        title: 'Lego Hotel',
    },
    components: {
        RoomChecker,
        [Glide.name]: Glide,
        [GlideSlide.name]: GlideSlide
    },
    data() {
        return {
            bg: {
                background1: "url(/images/home/first.jpg)",
                paypal: "url(/images/home/payment/paypal.png)",
                paystack: "url(/images/home/payment/paystack.png)",
            },
            buyNow: false,
            showDialog: false,
            stickyNav: {
                transition: '.5s ease-in-out',
                borderBottom: "2px solid rgba(0,0,0,.2)",
            },
            sticked: {
                background: '#030e20 !important',
                position: 'fixed !important',
                top: '0 !important',
                marginTop: '0 !important',
                transition: '.5s ease-in-out'
            },
        }
    },
    created() {
        // this.fetchCategories();
        // this.fetchGallery();
    },
    mounted() {
        // this.handleCategoryImage();
    },
    methods: {
        
        fetchCategories() {
            this.$axios.$get(`/api/request.php?getCategories=true`).then(res => {
                this.categories = res;
            }).catch(e => {
                console.log(e);
            })
        },
        fetchGallery() {
            this.$axios.$get(`/api/request.php?getGallery=true`).then(res => {
                this.gallery = res;
            }).catch(e => {
                console.log(e);
            })
        },
        handleCategoryImage() {
            setTimeout(() => {
                // console.log(this.gallery)
                this.categories.forEach(cat => {
                    let galleryObj = this.gallery.find(g => g.category_id == cat.id);
                    
                    let obj = {name: cat.name,price: cat.price, file: galleryObj.image};
                    this.match.push(obj);
                    
                });
            }, 1000);
        },
    }
       
}
</script>

<style lang="scss">
    .banner {
        font-family: -apple-system, BlinkMacSystemFonHelvetica Neue, Arial, sans-serif;
        height: 80vh;
        @include default-bgImage('/images/home/first.jpg');
        @include parallax-bg;


        #{&}__content {
            padding-top: 20px;
            @include justify-content-row-midXY;
            color: $light;
            background: rgba(0,0,0,.4);
            // position: absolute;
            margin: 0 !important;
            top: 0;
            left: 0;
            width: 100%;
            height: 80vh;
            z-index: 1;

            h1 {
                font-size: 65px;
                text-shadow: 2px 2px 2px #000;
                font-weight: bold;
                line-height: 1.2em;
            }

            p {
                font-size: 20px;
                text-shadow: 1px 1px #000;
                letter-spacing: 1px;
                background: rgba(0,0,0,.2);
            }
        }
    }

    .dropdown-button {
        overflow: hidden !important;

        #{&}__item {
            position: absolute;
            right: 0;
            border-radius: 0 !important;
            padding: 0;
            height: 0;
            overflow: hidden;
            transition: .2s linear;
            transition-property: height;

            &.ivu-card {
                background: transparent !important;
                border: none !important;
            }

            button {
                unset: all;
                &.bg-secondary {
                    background: $secondary !important;
                    color: $light !important;
                    text-shadow: none !important;
                    

                    &:hover {
                        color: $light !important;
                    }
                }
            }
        }  

        &:hover {
            overflow: visible;

            .dropdown-button__item {
                height: max-content;
                background: #fff !important;
            }
        }
    }

    .room-checker {
        z-index: 1000 !important;
    }
    .category-slide {
        width: 100%;
    }
    .categ-card .ivu-card-body {
        padding: 0 !important;
    }

    .categ-card .ivu-card-body img {
        width: 100%;
        height: 200px;
    }
    .categ-card .ivu-card-body .card-body {
        position: absolute;
        bottom: 0;
        background: rgba(0,0,0,.8);
        color: $light;
    }
</style>

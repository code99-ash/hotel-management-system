<template>
    <div>
        
        <div class="site-blocks-cover overlay" 
            :style="{'background-image': bg.background1, 'font-family': '-apple-system, BlinkMacSystemFonHelvetica Neue, Arial, sans-serif'}"
             data-aos="fade" data-stellar-background-ratio="0.5">
            <div class="container">
                <div class="row align-items-center justify-content-center">
                    <div class="col-md-8 text-center" data-aos="fade-up" data-aos-delay="400">
                        <h1 class="mb-4">Excellent Space With A Lovely View</h1>
                        <p class="mb-5">1105 Madison Plaza Suite 120 Chesapeake, CA, California</p>
                        <p><a href="#" class="btn bg-light-blue px-5 py-3 text-light">Book a Room</a></p>
                    </div>
                </div>
            </div>
        </div>

        <div class="container p-3 bg-default is__available shadow">
            <div class="row">
                <div class="col-md-3 mx-auto">
                    <label for="" class="d-block h4">Check In</label>
                    <input type="datetime-local" class="form-control p-3">
                </div>
                <div class="col-md-3 mx-auto">
                    <label for="" class="d-block h4">Per Nights</label>
                    <input type="number" min="1" placeholder="/night" class="form-control">
                </div>
                <div class="col-md-3 mx-auto">
                    <label for="" class="d-block h4">Category</label>
                    <select class="form-control">
                        <option value="">Luxury</option>
                        <option value="">Standard</option>
                        <option value="">Regular</option>
                    </select>
                </div>
                <div class="col-md-3 mx-auto">
                    <label for="" class="d-block h4">Number of rooms</label>
                    <input type="number" min="1" placeholder="/night" class="form-control">
                </div>
                <div class="col-md-3 mx-auto">
                    <button class="btn btn__default" @click="showDialog = true">Check Availability</button>
                </div>
            </div>
        </div>

        <div>
            <div class="container my-5">
                <div class="row">
                    <div class="site-section-heading text-center w-border col-md-6 mx-auto">
                        <h2 class="mb-2">Categories</h2>
                    </div>
                </div>

                <div class="row my-5">
                    <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="100" :key="cat.id" v-for="cat in match">
                        <a href="#" class="unit-9">
                            <div class="image" :style="{'background-image': `url(${$axios.defaults.baseURL}/uploads/gallery/${cat.file})`}"></div>
                        </a>
                        <div class="bg-dark text-light categ-label">{{cat.name}} 
                            <div class="mt-3">#{{cat.price}}</div>
                        </div>
                    </div>
                </div>

                <div class="row mb-5">
                    <div class="col-12">
                        <h4 class="text-muted my-3">Payment Methods</h4>
                    </div>
                    <div class="col-lg-6 payment-card shadow-sm" :style="{backgroundImage: bg.paypal}"></div>
                    <div class="col-lg-6 payment-card shadow-sm" :style="{backgroundImage: bg.paystack}"></div>
                </div>


            </div>

            <!-- <div class="container-fluid bg-white" id="pricing">
                <div class="row">
                    <div class="col-lg-10 mx-auto">
                        <main class="container">
                            <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                                <h1 class="display-4">Pricing</h1>
                                <p class="lead">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
                            </div>

                            <div class="row row-cols-1 row-cols-md-3 text-center">
                                <div class="col">
                                <div class="card mb-4 shadow-sm">
                                <div class="card-header">
                                    <h4 class="my-0 fw-normal">Regular</h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">#2,500 <small class="text-muted">/ night</small></h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                    <li>Non AC Rooms</li>
                                    <li>Ventilated Condition</li>
                                    <li>Email support</li>
                                    <li>Help center access</li>
                                    </ul>
                                    <button type="button" @click="buyNow=true" class="w-100 btn btn-lg bg-light-blue">Book Now</button>
                                </div>
                                </div>
                                </div>
                                <div class="col">
                                <div class="card mb-4 shadow-sm">
                                <div class="card-header">
                                    <h4 class="my-0 fw-normal">Standard</h4>
                                </div>
                                <div class="card-body">
                                    <h1 class="card-title pricing-card-title">$5,000 <small class="text-muted">/ night</small></h1>
                                    <ul class="list-unstyled mt-3 mb-4">
                                    <li>AC Rooms</li>
                                    <li>Nice and unique views</li>
                                    <li>No Desk</li>
                                    </ul>
                                    <button type="button" @click="buyNow=true" class="w-100 btn btn-lg bg-light-blue">Book Now</button>
                                </div>
                                </div>
                                </div>
                                <div class="col">
                                <div class="card mb-4 shadow-sm">
                                <div class="card-header">
                                    <h4 class="my-0 fw-normal">Executive</h4>
                                </div>
                                    <div class="card-body">
                                        <h1 class="card-title pricing-card-title">#6,500 <small class="text-muted">/ night</small></h1>
                                        <ul class="list-unstyled mt-3 mb-4">
                                       <li>AC Rooms</li>
                                        <li>Nice and unique views</li>
                                        <li>With Desk</li>
                                        <li>Help center access</li>
                                        </ul>
                                        <button type="button" @click="buyNow=true" class="w-100 btn btn-lg bg-light-blue">Book Now</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div> -->
        </div>


         <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Preferences</md-dialog-title>

               <div class="px-5 pb-2">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, hic.
                </div> 

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                <md-button class="md-primary" @click="showDialog = false">Save</md-button>
            </md-dialog-actions>
        </md-dialog>

    </div>
</template>

<script>
import "~/assets/css/style.css";

export default {
    layout: 'Customer',
    head: {
        title: 'Lego Hotel',
    },
    computed: {
        cust() {
            return this.$store.state.customer
        },
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },

        isLoggedIn() {
            return this.$store.state.auth.token;
        }
    },
    data() {
        return {
            navDrawer: false,
            theme3: 'light',
            categories: [],
            gallery: [],
            match: [],
            rooms: [
                {
                    id: 1,
                    name: 'Rooms',
                    children: [
                        { id: 2, name: 'Executive' },
                        { id: 3, name: 'Regular' },
                        { id: 4, name: 'Standard' },
                    ],
                },
            ],
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
        this.fetchCategories();
        this.fetchGallery();
    },
    mounted() {
        this.handleScroll();
        this.handleCategoryImage();
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
        handleScroll() {
            window.addEventListener('scroll', () => {
                var scrollHeight = window.scrollY;
                this.stickyNav = (scrollHeight >= 90)? this.sticked : '';
            });
        },
        logout() {
            this.$store.dispatch('logout');
        }
    }
       
}
</script>

<style scoped>
    .categ-label {
        text-align: center;
        padding: 12px 25px;
        opacity: .92;
        position: absolute;
        top: 0;
        font-size: 20px;
    }
    .site-navbar {
        margin-top: -20px !important;
    }
    .btn__default {
        background: whitesmoke;
        color: #ebaa72;
        padding:20px;
        transition: .2s ease-in-out;
    }
    .btn__default:hover {
        color: #ebaa72;
        border: 5px solid #ebaa72;
    }
    .is__available {
        z-index: 1000 !important;
    }
    .md-dialog-fullscreen {
        height: auto !important;
    }
    .md-dialog {
        min-height: 75vh !important;
        max-height: auto !important;
        width: 80% !important;
        margin: auto !important;
        box-sizing: border-box;
    }
    .md-card.md-layout-item {
        width: 500px;
        height: 100% !important;
    }
    @media (max-width: 500px) {
        .md-card.md-layout-item {
            width: 90% !important;
        }
    }
    
    
</style>

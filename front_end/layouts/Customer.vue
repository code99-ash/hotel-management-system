<template>
    <div class="bg-white">
         <div class="site-wrap">
            <nav class="bg-light-blue w-100 position-relative d-block px-3" style="padding: 25px 0">
                <nuxt-link to="/" class="btn_outline text-light">+2349038441303</nuxt-link>
                <ul class="site-menu js-clone-nav d-none d-md-inline float-right" v-if="!isLoggedIn">
                    <nuxt-link to="/login" class="btn_outline text-light">
                        Login
                    </nuxt-link>
                    <nuxt-link to="/register" class="btn_outline text-light">
                        Register
                    </nuxt-link>
                </ul>
                    <button @click="logout" class="btn btn_outline text-light float-right ml-auto mr-0 mb-3" v-if="isLoggedIn">Logout</button>
            </nav>
            <div class="site-navbar" :style="[stickyNav]">
                <div class="container-fluid py-0">
                    <div class="row align-items-center">
                        
                        <div class="col-12">
                            <nav class="site-navigation text-right text-md-right w-100" role="navigation">
                              
                                <a href="#" class="text-white navbar-brand position-absolute" style="left: 45px; top:20px">
                                    <strong>Lego<span class="text-primary">.</span></strong>
                                </a>
                                <div class="d-inline-block d-md-none ml-md-0 mr-auto py-3">
                                    <Icon
                                        :class="[rotateIcon, 'd-lg-none', 'text-light', 'float-right', 'ml-auto', 'mr-0']" 
                                        :style="{margin: '0 20px'}" 
                                        type="md-menu"
                                        size="24"
                                        @click="this.navSm = !this.navSm"
                                    ></Icon>
                                </div>
                                <ul class="site-menu js-clone-nav d-none d-md-inline mr-5">
                                    
                                    <li class="active">
                                        <nuxt-link to="/">Home</nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link to="/gallery">Gallery</nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link to="/about">About</nuxt-link>
                                    </li>
                                    <li>
                                        <nuxt-link to="/contact">Contact Us</nuxt-link>
                                    </li>
                                    <li v-if="isLoggedIn">
                                        <nuxt-link to="/checkout">Checkout</nuxt-link>
                                    </li>
                                   
                                    
                                </ul>
                                <div class="position-fixed w-100 bg-white d-md-none" v-if="navSm">
                                    <nav class="navbar">
                                        <ul class="navbar-nav">
                                            
                                            <li class="active my-3 text-center">
                                                <nuxt-link to="/">Home</nuxt-link>
                                            </li>
                                            <li class="my-3 text-center">
                                                <nuxt-link to="/gallery">Gallery</nuxt-link>
                                            </li>
                                            <li class="my-3 text-center">
                                                <nuxt-link to="/about">About</nuxt-link>
                                            </li>
                                            <li class="my-3 text-center">
                                                <nuxt-link to="/contact">Contact Us</nuxt-link>
                                            </li>
                                            <li class="my-3 text-center" v-if="isLoggedIn">
                                                <nuxt-link to="/checkout">Checkout</nuxt-link>
                                            </li>
                                            
                                            
                                        </ul>
                                    </nav>
                                </div>
                            </nav>
                        </div>

                        
                    </div>
                </div>
            </div>
            
        </div>

            <nuxt />
        <div class="w-100 position-absolute d-block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#030e20" fill-opacity="1" d="M0,0L120,37.3C240,75,480,149,720,192C960,235,1200,245,1320,250.7L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
            </svg>
            <nuxt-link to="/" class="text-white navbar-brand position-absolute logo" style="left: 45px; top:145px; font-size: 80px !important">
                <strong>Lego<span class="text-primary">.</span></strong>
            </nuxt-link>
            <footer class="container-fluid" style="background: #030e20">
                <div class="row">
                    <div class="col-12 col-md">
                        <img class="mb-2" src="/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="24" height="19">
                        <small class="d-block mb-3 text-muted">© 2021-2021</small>
                        <!-- <p class="text-muted">developed by code99-ash</p> -->
                    </div>
                    <div class="col-6 col-md">
                        <h5 class="text-secondary mb-2">Pages</h5>
                        <ul class="list-unstyled text-small">
                        <li class="my-2"><a class="text-secondary" href="#">Home</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">About</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5 class="text-secondary mb-2">Room Categories</h5>
                        <ul class="list-unstyled text-small">
                        <li class="my-2"><a class="text-secondary" href="#">Luxury</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Standard</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Regular</a></li>
                        </ul>
                    </div>
                    <div class="col-6 col-md">
                        <h5 class="text-secondary mb-2">More</h5>
                        <ul class="list-unstyled text-small">
                        <li class="my-2"><a class="text-secondary" href="#">Team</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Locations</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Privacy</a></li>
                        <li class="my-2"><a class="text-secondary" href="#">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>

        <md-dialog :md-active.sync="cookieNote" style="width: 300px; height: 250px; margin: auto">
            <md-dialog-title>This page uses cookie</md-dialog-title>

               <div class="px-5 pb-2">
                    This is to notify you that this page uses cookie for users experience and some other reasons to satisfy you..
                </div> 

            <md-dialog-actions>
                <md-button class="md-primary" @click="cookieNote = false">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
    
    </div>
</template>

<script>
import "~/assets/css/style.css";

export default {
    head: {
        title: 'Lego Hotel',
    },
    data() {
        return {
            cookieNote: false,
            navSm: false,
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
    mounted() {
        this.handleScroll();
        this.openCookieNote();
    },
    methods: {
        openCookieNote() {
            setTimeout(() => {
                this.cookieNote = true;
            }, 2000);
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
    },
    computed: {
        cust() {
            return this.$store.state.customer
        },
        isLoggedIn() {
            return this.$store.state.auth.token;
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
        }
    }
    
    
}
</script>

<style>
    .bg-dark-light {
        background: rgba(0,0,0,.7);
    }
    .bg-default {
        background:#e9c4a3 !important;
        color: rgba(0,0,0,.7) !important;
    }
    .ivu-drawer-header {
        display: none;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .payment-card {
        height: 200px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }
    .navbar-brand{
        font-size: 45px !important;
    }
    a.nuxt-link-active, a {
        font-size: 15px !important;
    }
    /* exact link will show the primary color for only the exact matching link */
    a.nuxt-link-exact-active, .text_primary {
        color: #ebaa72 !important;
        border-bottom: 2px solid#ebaa72 !important; 
    }
    .footer-svg {
        position: relative !important;
    }
    
    .mid {
        margin-top: -50px;
    }
    @media (max-width: 750px) {
        .mid {
            margin-top: 0px !important;
        }
    }
    .btn_outline {
        border: 2px solid #ebaa72 !important;
        padding: 7px 20px;
        margin: 0 7px;
    }
    .bg-light-blue {
        background: #030e20 !important;
        color: #eaeaea !important;
    }
    .nuxt-link-exact-active.logo {
        color: rgba(218, 218, 218, 0.904) !important; 
        text-decoration: none !important; 
        border: 0 !important;
    }
    .nuxt-link-exact-active.no-active {
        color: #eaeaea !important;
        border-bottom: 0 !important;
    }
    a {
        text-decoration: none !important;
    }
</style>
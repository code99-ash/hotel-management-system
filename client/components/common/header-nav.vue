<template>
    <div class="header-nav">
        <span id="logo">
            Lego<span id="dot">.</span>
        </span>
        <nav class="nav-list">
            <nuxt-link to="/"><Icon type="md-home" class="mb-1" /> Home</nuxt-link>
            <Button to="/gallery" icon="ios-image">Gallery</Button>
            <Button to="/reservations" icon="ios-plane">Reservation</Button>
            <!-- <Button to="/about">About</Button> -->
            <Button class="dropdown-button" icon="ios-person">
                Account
                <Card class="dropdown-button__item">
                    <Button class="bg-secondary" small>Sign in</Button>
                </Card>
            </Button>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Header',
    mounted() {
        this.handleScroll();
    },
    methods: {
        handleScroll() {
            window.addEventListener('scroll', () => {
                var scrollHeight = window.scrollY;

                return (scrollHeight >= 90)? this.setActiveNav(true) : this.setActiveNav(false);
            });
        },
        setActiveNav(action) {
            return action?
            document.querySelector('.header-nav').classList.add('active')
            :
            document.querySelector('.header-nav').classList.remove('active')
        },
    }
}
</script>

<style lang="scss">
    .header-nav {
        @include justify-content-row-between;
        padding: 10px;
        color: #fff;
        z-index: 10 !important;
        position: absolute;
        width: 100%;
        transition: .2s ease-in-out;
        transition-property: background;

        &.active {
            background: $primary;
            position: sticky;
            top: 0;
            padding-bottom: 0 !important;
        }

        #logo {
            font-size: 32px;
            font-weight: $bold;
            cursor: pointer;

            #dot {
                color: $secondary;
            }
        }

        .nav-list {

            a, button, .nuxt-link-active{
                display: inline-block;
                text-align: center;
                padding: 0 !important;
                min-width: 80px;
                border: 0;
                padding-top: 10px !important;
                border: 0 !important;
                background: transparent !important;
                color: $light !important;
                font-weight: $light-weight !important;
                font-size: 15px;
                outline: none !important;
                box-shadow: none !important;
                text-shadow: 1px 1px 1px #000;
                transition: .2s linear;

                &::after {
                    margin-top: 10px;
                    display: block;
                    content: ' ';
                    height: 3px;
                    width: 0;
                    background: $secondary;
                    transition: .2s linear;
                }

                &.nuxt-link-exact-active, &:hover {
                    color: $secondary !important;
                    text-shadow: none;

                    &::after {
                        width: 100%;
                    }

                }
            }
        }
    }
</style>
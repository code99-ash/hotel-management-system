<template>
    <div class="d-flex">
        <span id="sidebar-container" :class="[openSidebar? 'active':'']">
            <SideBar :activeName="activeName" :menuItems="menuItems" />
            <div @click="openSideBar(false)" id="clickOutside"></div>
        </span>
        <main class="bg-light">
            <AdminHeader @openSideBar="openSideBar" />
            <nuxt />
        </main>
    </div>
</template>

<script>
import SideBar from '@/components/admin/layouts/sidebar'
import AdminHeader from '@/components/admin/layouts/header'
    export default {
        name: 'Admin',
        data () {
            return {
                openSidebar: false,
                activeName: '1-1',
                'dropdownItem': [
                    {name: 'Profile', route: '/admin/profile'},
                    {name: 'Logout', route: '/admin/logout'},
                ],

                menuItems: [
                    {type: 'md-home', name: 'Dashboard', active: '1', route: '/admin', hasChild:false},
                    {type: 'md-briefcase', name: 'Categories', active: '2', route: '/admin/categories', hasChild:false},
                    {type: 'ios-book', name: 'Bookings', active: '3', route: '/admin/bookings', hasChild:false},
                    {type: 'ios-people', name: 'Staffs', active: '5', hasChild:true, 
                    children: [
                        {type: '', name: 'New Staffs', active: '5-1', route: '/admin/staffs/newstaff'},
                        {type: '', name: 'Manage Staffs', active: '5-2', route: '/admin/staffs'}
                    ]},
                    {type: 'md-image', name: 'Gallery', active: '7', route: '/admin/gallery', hasChild:false},
                    {type: 'ios-settings', name: 'Profile', active: '6', route: '/admin/profile', hasChild:false},
                    {type: 'ios-power', name: 'Logout', active: '8', route: '/admin/logout', hasChild:false},
                ],
            }
        },
        watch: {
            '$route.path' : {
                handler: function() {
                    this.openSidebar = false;
                },
            }
        },
        components: {
            SideBar, AdminHeader
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            openSideBar(cmd) {
                this.openSidebar = cmd;
            }
        }
    }
</script>

<style>
    main {
        width: calc(100% - 220px);
        height: 100vh;
    }
    #sidebar-container {
        width: 220px;
        height: 100vh;
        background: rgba(0,0,0,.9);
    }
    #sidebar {
        width: 220px;
        height: 100vh;
        background: #03112e !important;
        position: fixed !important;
    }

    @media (max-width: 768px) {
        main {
            width: 100%;
            margin-left: 0 !important;
        }
        #sidebar-container {
            width: 100vw;
            position: fixed;
            z-index: 100;
            transition: .2s ease-in-out;
            transform: translateX(-100%);
            opacity: 0;
            display: flex;
        }
        #sidebar {
            position: relative;
        }

        #clickOutside {
            width: 100%;
            height: 100vh;
            background: transparent;
        }

        #sidebar-container.active {
            transform: translateX(0%);
            opacity: 1;
        }
    }
    
    .text_default {
        background: #03112e;
    }
    .ivu-drawer-content {
        background: #03112e !important;
    }
    .ivu-select-dropdown {
        z-index: 1000 !important;
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .nuxt-link, .nuxt-link:hover {
        color: #eaeaea !important;
        text-decoration: none !important;
    }
    .nuxt-link div {
        padding: 0 !important;
    }
    a {
        text-decoration: none !important;
    }
    
</style>


<template>
    <div>
        <Layout>
            <Drawer v-if="allowedRole" title="Basic Drawer" placement="left" :closable="false" v-model="openSidebar" class="d-md-none">
                <SideBar :activeName="activeName" :menuItems="menuItems" />
            </Drawer>

            <Sider v-if="allowedRole" ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed"         class="d-none d-md-block">
                <SideBar :activeName="activeName" :menuItems="menuItems" />
            </Sider>

            <Layout>
                <v-card class="topNav shadow-sm">
                    <v-toolbar flat>
                        <Icon @click="openSidebar=!openSidebar" 
                                :class="[rotateIcon, 'd-md-none']" 
                                :style="{margin: '0 20px'}" 
                                type="md-menu" 
                                size="24"
                        ></Icon>
                        <v-spacer></v-spacer>
                        <DropDown :title="userData.fname" :items="dropdownItem" class="float-right mr-3 ml-auto h6" />
                    </v-toolbar>
                </v-card>

                <Content :style="{minHeight: '260px', padding: '35px', overflow: 'hidden'}" class="mt-5">
                    <nuxt />
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
import DropDown from '../components/common/dropdown'
import SideBar from '../components/admin/sidebar'
    export default {
        name: 'Admin',
        middleware: 'adminAuth',
        data () {
            return {
                isCollapsed: false,
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
                    {type: 'md-people', name: 'Roles', active: '4', hasChild:true, 
                    children: [
                        {type: '', name: 'Manage Roles', active: '4-1', route: '/admin/roles'},
                        {type: '', name: 'New Roles', active: '4-2', route: '/admin/roles/addrole'}
                    ]},
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
        components: {
            DropDown, SideBar
        },
        computed: {
            allowedRole() {
                return (this.roleData.role == 'Admin' || this.roleData.role == 'Manager')? true:false
            },
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            userData() {
                return this.$store.state.staffData.userData;
            },
            roleData() {
                return this.$store.state.roleData.roleData
            },
            
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            check(e) {
                console.log(e)
            }
        }
    }
</script>

<style>
    .text_default {
        background: #03112e;
    }
    .ivu-drawer-content {
        background: #03112e !important;
    }
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        overflow-y: scroll;
        height: 100vh;
    }
    .topNav {
        position: fixed !important;
        top: 0 !important;
        right: 0;
        width: 100%;
        z-index: 100 !important;
    }
    .layout-header-bar{
        background: #fff !important;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        z-index: 10;
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
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .ivu-layout-sider {
        height: 100vh !important;
        overflow-y: scroll;
        min-width: 50px !important;
        max-width: 200px !important;
        width: 200px !important;
        flex: 0 0 200px !important;
        background: #03112e !important;
        position: sticky !important;
        top: 0 !important;
        z-index: 102 !important;
    }
    .ivu-layout-sider.ivu-layout-sider-collapsed {
        min-width: 78px !important;
        max-width: 78px !important;
        width: 78px !important;
        flex: 0 0 78px !important;
    }
    .ivu-layout-sider::-webkit-scrollbar {
        width: 8px;
    }
    .ivu-layout-sider::-webkit-scrollbar-thumb {
        background: #020c20;
    }
    .ivu-layout-sider::-webkit-scrollbar-track {
        background:  #5b627069;
    }
    .ivu-drawer-body {
        padding: 0 !important;
        overflow: hidden !important;
    }
    .ivu-menu-item {
        /* margin: 0 !important; */
        padding: 0 !important;
        height: auto !important;
    }
    .ivu-menu-item .nuxt-link div,
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
        background: #03112e !important;
    }
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu {
        margin: 0 !important;
    }
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu .ivu-menu-item {
        width: 100% !important;
        margin-left: 0 !important;
        font-size: 12px !important;
    }
    .ivu-menu-dark {
        background: transparent !important;
    }
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title,
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title:hover,
    .ivu-menu-item.ivu-menu-item-active.ivu-menu-item-selected .nuxt-link div {
        background: rgba(0, 5, 19, 0.938) !important;
        text-align: left;
    }

    .ivu-menu-item:hover,
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title,
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title:hover,
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu), 
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu):hover,
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu),
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title-active:not(.ivu-menu-submenu):hover {
        background: #1816166e !important;
    }
    .nuxt-link, .nuxt-link:hover {
        color: #eaeaea !important;
        text-decoration: none !important;
    }
    .nuxt-link div {
        padding: 20px 24px !important;
    }
    a {
        text-decoration: none !important;
    }
</style>


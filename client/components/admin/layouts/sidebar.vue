<template>
    <div id="sidebar">
        <div class="logo mb-3">
            <h2 class="text-white text-center pb-3">Lego<span class="dot">.</span></h2>
        </div>
        <Menu :active-name="activeName" theme="dark" width="auto">
            <span   :key="i" v-for="(item, i) in menuItems" 
                    @click="activeName = item.active">
                <MenuItem  :name="item.active" v-if="item.hasChild == false">
                    <nuxt-link :to="item.route" class="bg-light nuxt-link">
                        <div>
                            <Icon :type="item.type" class="mr-3 h5"></Icon>
                            <span>{{item.name}}</span>
                        </div>
                    </nuxt-link>
                </MenuItem>
                <Submenu v-else :name="item.active">
                    <template slot="title">
                        <Icon :type="item.type" class="mr-3 h5"></Icon>
                        <span>{{item.name}}</span>
                    </template>
                    <MenuItem v-for="(subItem, i) in item.children" :key="i" :name="subItem.active">
                        <nuxt-link :to="subItem.route" class="bg-light nuxt-link">
                            <div class="subItem">
                                <Icon :type="subItem.type" class="mr-3 h5"></Icon>
                                <span>{{subItem.name}}</span>
                            </div>
                        </nuxt-link>
                    </MenuItem>
                </Submenu>
                
            </span>
        </Menu>
    </div>
</template>

<script>
export default {
    name: 'SideBar',
    props: ['activeName', 'menuItems'],
    data() {
        return {
            
        }
    }
}
</script>

<style>
   .logo {
       background: #1816166e;
   }
   .dot {
       color: #043fb6 !important;
       font-size: 60px !important;
   }
   .subItem {
       padding-left: 18px !important;
   }
   .ivu-menu, .ivu-menu-submenu {
       background: inherit !important;
   }
   .ivu-menu-item:hover, .ivu-menu-submenu-title:hover, 
   .ivu-menu-opened .ivu-menu-submenu-title,
   .ivu-menu-item-active {
        background: #1816166e !important;
        color: #ebaa72 !important;
    }
    .ivu-menu-opened ul {
        border-bottom: 1px solid #eaeaea;
    }
    .ivu-menu-item:hover a {
        color: #ebaa72 !important;
    }
</style>

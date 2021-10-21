<template>
    <div>
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
   .subItem:hover, .subItem-title:hover {
       background: rgba(1, 7, 27, 0.938) !important;
   }
</style>

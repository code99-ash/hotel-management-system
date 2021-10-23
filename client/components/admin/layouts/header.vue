<template>
    <Card dis-hover class="header">
            <Icon @click="$emit('openSideBar', true)" 
                    :class="[rotateIcon, 'd-md-none']" 
                    :style="{margin: '0 20px'}" 
                    type="md-menu" 
                    size="24"
            ></Icon>
            <DropDown :title="userData.fname" :items="dropdownItem" class="right" />
    </Card>
</template>

<script>
import DropDown from '@/components/common/dropdown'
export default {
    name: 'AdminHeader',
    components: { DropDown },
    computed: {
        userData() {
            return {fname: 'Ikhlas'}
        },
    },
    data() {
        return {
            dropdownItem: [
                {name: 'Profile', route: '/admin/profile'},
                {name: 'Logout', route: '/admin/logout'},
            ],
        }
    }

}
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        position: sticky;
        top: 0;
        margin-bottom: 20px;
        z-index: 10;
    }
    .right {
        margin-left: auto;
        margin-right: 0;
        float: right;
    }
</style>
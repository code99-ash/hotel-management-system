<template>
    <Dropdown>
        <a href="javascript:void(0)" class="text-primary h6">
            {{title}}
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <div :key="i" v-for="(item, i) in items" class="my-1">
                <DropdownItem><nuxt-link :to="item.route">{{item.name}}</nuxt-link></DropdownItem>
            </div>
        </DropdownMenu>
    </Dropdown>
</template>

<script>
export default {
    name: 'DropDown',
    props: ['title', 'items'],
    data() {
        return {

        }
    }
}
</script>

<style scoped>
    a,.nuxt-link-active, .nuxt-link-exact-active{
        color: #333 !important;
        text-decoration: none !important;
    }
</style>
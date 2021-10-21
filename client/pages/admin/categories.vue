<template>
    <div>
        <Collapse v-model="value1">
            <Panel name="1">
                New Room Category <span class="h6">+</span>
                <a href="#" class="btn btn-sm btn-default text-danger ml-2">Delete</a>
                <a href="#" class="btn btn-sm btn-default text-primary ml-2">Edit</a>

                <p slot="content">
                    
                    <add-categ />
                </p>
            </Panel>
        </Collapse>
        <Table border ref="selection" :columns="columns4" :data="categories"></Table>
    </div>  
</template>

<script>
import addCateg from '../../components/admin/add-categ.vue'
export default {
    components: { addCateg },
    layout: 'Admin',
    async asyncData({$axios, $config}) {
        const categories = await $axios.$get(`/api/request.php?getCategories=true`);
        return {categories} 
    },
    data () {
            return {
                value1: '1',
                selection: null,
                columns4: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Price (per Night)',
                        key: 'price'
                    },
                    {
                        title: 'Quantity',
                        key: 'quantity'
                    },
                    {
                        title: 'last updated',
                        key: 'created_at'
                    }
                ],
                data1: [
                    {
                        name: 'Regular',
                        price: `${2500}`,
                        quantity: 50,
                        by: 'Alex Johnson',
                        last: '01/11/2020'
                    },
                ]
            }
    },
    methods: {
        handleSelectAll() {
            console.log(this.$refs.selection)
        }
    }
}
</script>
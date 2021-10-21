<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <Collapse v-model="value1">
                    <Panel name="1">
                        <p slot="content">
                            Edit Form Goes here
                        </p>
                    </Panel>
                </Collapse>
                <Table border ref="selection" :columns="roleColumns" :data="roles"></Table>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        layout: 'Admin',
        async asyncData({$axios, $config}) {
            const roles = await $axios.$get(`/api/request.php?getRoles=true`);
            return {roles} 
        },
        data () {
            return {
                roleColumns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'role'
                    },
                    {
                        title: 'Department',
                        key: 'department'
                    },
                ],
            }
        },
        methods: {
        
        }
    }
</script>

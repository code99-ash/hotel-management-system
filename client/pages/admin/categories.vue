<template>
    <div>
        <Modal v-model="showForm" footer-hide @on-cancel="closeModal">
            <CategoryForm @closeModal="closeModal" :editData="editData" />
        </Modal>
        <Card dis-hover class="header-card">
            <h5 class="text-primary">Categories</h5>
            <Button @click="showForm=true">Add +</Button>
        </Card>
        <div class="p-2 table-div">
            <Table border :columns="columns" :data="$store.state.data.categories" :ellipsis="true">
                <template slot-scope="{ row }" slot="name">
                    <span>{{ row.name }}</span>
                </template>
                <template slot-scope="{ row }" slot="price">
                    <span>{{ row.price }}</span>
                </template>
                <template slot-scope="{ row }" slot="rooms">
                    <span class="h6">{{ row.rooms.length }}</span>
                </template>
                <template slot-scope="{ row }" slot="active">
                    <Icon type="md-checkmark" v-if="row.active" class="text-success table-icon" />
                    <Icon type="md-close" v-else class="text-danger table-icon" />
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Icon type="md-create" class="table-icon text-info" @click="editCategory(row._id)" />
                    <Divider type="vertical" />
                    <Icon type="ios-trash" class="table-icon text-danger" @click="confirmDelete(row._id)" />
                </template>
            </Table>
        </div>

        <Modal v-model="confirmProps.open" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>Delete {{confirmProps.name}}</span>
            </p>
            <div style="text-align:center">
                <p>After this task is deleted, you wont be able to it rollback.</p>
                <p>Are you sure you want to delete it?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="loading" @click="remove(confirmProps.id)">Delete</Button>
            </div>
        </Modal>
    </div>  
</template>

<script>
import CategoryForm from '@/components/admin/categories/category-form'
export default {
    components: {
        CategoryForm,
     },
    layout: 'Admin',
    data () {
            return {
                showForm: false,
                loading: false,
                editData: {editMode: false},
                confirmProps: {open: false, name: 'category', id: 0},
                columns: [
                    {
                        title: 'Name',
                        slot: 'name'
                    },
                    {
                        title: 'Price',
                        key: 'price'
                    },
                    {
                        title: 'Rooms',
                        slot: 'rooms',
                        width: 80
                    },
                    {
                        title: 'Active',
                        slot: 'active',
                        width: 75
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 100,
                        align: 'center'
                    }
                ],
                
            }
    },
    methods: {
        async remove(id) {
            try {
                this.loading = true;
                    const response = await this.$axios.post(`/category/delete`, {id});
                this.loading = false;
                this.successNotice('Successfully deleted Category');
                this.$store.dispatch('data/removeCategory', id);
                this.confirmProps.open = false;
            }catch(err) {
                this.loading = false;
                    this.$Message.error('Something went wrong')
                console.log(err)
            }
        },
        confirmDelete(id) {
            const categ = this.$store.state.data.categories.find(each => each._id === id);
            this.confirmProps = {
                open: true,
                name: categ.name,
                id
            }
        },
        editCategory(id) {
            const cat = this.$store.state.data.categories.find(each => each._id === id);
            this.editData = {editMode: true, ...cat};
            this.showForm = true;
        },
        successNotice(desc) {
            this.$Notice.success({
                title: 'Notification',
                desc
            });
        },
        closeModal() {
            this.editData = {editMode: false}
            this.showForm = false;
        },
        
    }
}
</script>

<style>
    .header-card .ivu-card-body {
        display: flex;
        flex-direction: row !important;
        justify-content: space-between;
        align-items: center;
        padding: 10px !important;
    }
    .text-danger {
        color: red !important;
    }
    .table-icon {
        font-size: 18px;
    }

    @media (max-width: 768px) {
        .table-icon {
            font-size: 15px;
        }
    }
    @media (max-width: 520px) {
        table {
            width: 520px !important;
        }
        .table-div {
            overflow-x: scroll;
        }
        .table-div::-webkit-scrollbar {
            width: 5px;
        }
    }
</style>
<template>
    <div>
        <Modal v-model="showForm" footer-hide @on-cancel="closeModal">
            <RoomForm @closeModal="closeModal" :editData="editData" />
        </Modal>
        <Card dis-hover class="header-card">
            <h5 class="text-primary">Rooms</h5>
            <Button @click="showForm=true">Add +</Button>
        </Card>
        <div class="p-2 table-div">
            <Table border :columns="columns" :data="$store.state.data.rooms" :ellipsis="true">
                <template slot-scope="{ row }" slot="name">
                    <span>{{ row.room_number }}</span>
                </template>
                <template slot-scope="{ row }" slot="category">
                    <span>{{ row.category.name }}</span>
                </template>
                <template slot-scope="{ row }" slot="status">
                    <span :class="[row.status === 'vacant'? 'text-success':'text-warning']">{{ row.status }}</span>
                </template>
                <template slot-scope="{ row }" slot="active">
                    <Icon type="md-checkmark" v-if="row.active" class="text-success table-icon" />
                    <Icon type="md-close" v-else class="text-danger table-icon" />
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Icon 
                        type="md-create" 
                        class="table-icon text-info" 
                        @click="editRoom(row._id)" 
                    />
                    <Divider type="vertical" />
                    <Icon 
                        type="ios-trash" 
                        class="table-icon text-danger" 
                        @click="confirmDelete(row._id)" 
                    />
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
                <Button 
                    type="error" 
                    size="large" long 
                    :loading="loading" 
                    @click="remove(confirmProps.category, confirmProps.id)"
                >Delete</Button>
            </div>
        </Modal>

    </div>
</template>

<script>
import RoomForm from '@/components/admin/forms/room-form'
export default {
    layout: 'Admin',
    components: { RoomForm },
    data() {
        return {
            loading: false,
            showForm: false,
            editData: {editMode: false},
            confirmProps: {open: false, name: 'category', id: 0, category: 0},
            columns: [
                    {
                        title: 'Name',
                        slot: 'name'
                    },
                    {
                        title: 'Category',
                        slot: 'category'
                    },
                    {
                        title: 'Status',
                        slot: 'status',
                        width: 75
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
        confirmDelete(id) {
            const room = this.$store.state.data.rooms.find(each => each._id === id);
            this.confirmProps = {
                open: true,
                name: room.room_number,
                id,
                category: room.category._id
            }
        },
        async remove(category, id) {
            try {
                this.loading = true;
                    const response = await this.$axios.post(`/room/delete`, {id, category});
                this.loading = false;
                    this.successNotice('Successfully deleted Room');
                    this.$store.dispatch('data/removeRoom', id);
                this.confirmProps.open = false;
            }catch(err) {
                this.loading = false;
                    this.$Message.error('Something went wrong')
                console.log(err)
            }
        },
        editRoom(id) {
            const room = this.$store.state.data.rooms.find(each => each._id === id);
            this.editData = {editMode: true, ...room};
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
</style>
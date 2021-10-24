<template>
        <Form ref="roomForm" :model="roomForm" :rules="roomRRules">
            <Row :gutter="16">
                <Col :xs="24">
                    <FormItem prop="room_number" label="Room Number">
                        <Input v-model="roomForm.room_number" :disabled="editData.editMode? true:false" />
                    </FormItem>
                </Col>
                <Col :xs="12" v-if="!editData.editMode">
                    <FormItem label="category" prop="Category">
                        <Select v-model="roomForm.category" filterable>
                            <Option 
                                v-for="categ in $store.state.data.categories" 
                                :value="categ._id" 
                                :key="categ._id"
                            >{{ categ.name }}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="6" v-if="editData.editMode">
                    <FormItem prop="status" label="Status">
                        <Select v-model="roomForm.status" filterable>
                            <Option value="vacant">Vacant</Option>
                            <Option value="booked">booked</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col :xs="editData.editMode? 6:12">
                    <FormItem prop="active" label="Active">
                        <i-switch v-model="roomForm.active" true-color="#f7730e">
                            <Icon type="md-checkmark" slot="open"></Icon>
                            <Icon type="md-close" slot="close"></Icon>
                        </i-switch>
                    </FormItem>
                </Col>
                <Col :xs="24">
                    <Button 
                        :loading="loading" 
                        type="primary" 
                        v-if="!editData.editMode"
                        class="float-right ml-auto mr-0"
                        @click.prevent="submitRoom('roomForm')"
                    >Save</Button>
                    <Button 
                        :loading="loading" 
                        type="success" 
                        v-else
                        class="float-right ml-auto mr-0"
                        @click.prevent="updateRoom('roomForm')"
                    >Update</Button>
                </Col>
            </Row>
        </Form>

</template>
<script>
export default {
    name: 'RoomForm',
    props: ['editData'],
    watch: {
        editData: function(val) {
            if(val.editMode === true) {
                this.roomForm = {...val, category: val.category._id}
            }else {
                this.resetForm();
            }
        },
    },
    data() {
        return {
            loading: false,
            roomForm: {
                room_number: '',
                category: '',
                active: true,
            },
            roomRRules: {
                name: [
                    {required: true, message: 'This field is required', trigger: 'blur'}
                ],
                category: [
                    { required: true, message: 'Select a category', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        successNotice(desc) {
            this.$Notice.success({
                title: 'Notification',
                desc
            });
        },

        resetForm() {
            this.roomForm = {
                room_number: '',
                category: '',
                active: true,
            }
        },

        submitRoom(name) {
            this.$refs[name].validate(async(valid) => {
                if (valid) {
                    try {
                        this.loading = true;
                        const {room_number, category, active} = this.roomForm;
    
                        const response = await this.$axios.post(`/room/create`, {room_number, category, active});
                        this.loading = false;
                        const {error, msg} = response.data;
                        if(error) {
                            this.$Message.error(msg);
                            return;
                        }
                        this.$store.dispatch('data/addRoom', msg);
                        this.successNotice('Successfully created a new room');

                        this.resetForm();
                        this.$emit('closeModal')

                    }catch(err) {
                        this.loading = false;
                        console.log(err)
                    }
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },

        updateRoom(name) {
            this.$refs[name].validate(async(valid) => {
                if(valid) {
                    try {
                        this.loading = true;

                        const {_id, room_number, category, active, status} = this.roomForm;
                        
                        const response= await this.$axios.post(`/room/update`, 
                                            {room_number, category, active, status, id: _id});
                        const {error, msg} = response.data;
                        this.loading = false;
                        if(!error) {
                            this.successNotice('Successfully updated Room');
                            this.$store.dispatch('data/updateRoom', msg);    
                            this.$emit('closeModal')
                        }else {
                            console.log(error)
                        }
                    }catch(err) {
                        console.log(err)
                        this.loading = false;
                        this.$Message.error('An error occured');
                    }
                    


                }else{ 
                    this.$Message.error('failed')
                }
            })
        }
    }
}
</script>

<style scoped>
    #form {
        min-width: 100%;
        height: auto;
        padding: 20px;
    }
</style>
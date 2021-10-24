<template>
        <Form ref="categoryForm" :model="categoryForm" :rules="categoryRules">
            <Row :gutter="16">
                <Col :xs="24">
                    <FormItem prop="name" label="Name">
                        <Input v-model="categoryForm.name" :disabled="editData.editMode? true:false" />
                    </FormItem>
                </Col>
                <Col :xs="12">
                    <FormItem label="Price" prop="price">
                        <InputNumber v-model="categoryForm.price" :min="100"></InputNumber>
                    </FormItem>
                </Col>
                <Col :xs="12">
                    <FormItem prop="active" label="Active">
                        <i-switch v-model="categoryForm.active" true-color="#f7730e">
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
                        @click.prevent="submitCategory('categoryForm')"
                    >Save</Button>
                    <Button 
                        :loading="loading" 
                        type="success" 
                        v-else
                        class="float-right ml-auto mr-0"
                        @click.prevent="updateCategory('categoryForm')"
                    >Update</Button>
                </Col>
            </Row>
        </Form>

</template>
<script>
export default {
    name: 'CategoryForm',
    props: ['editData'],
    watch: {
        editData: function(val) {
            if(val.editMode === true) {
                this.categoryForm = val
            }else {
                this.categoryForm = {
                    name: '',
                    price: 1000,
                    active: true,
                }
            }
        },
        price: function(val) {
            console.log(val)
        }
    },
    data() {
        const validatePrice = (rule, value, callback) => {
            if (!value) {
                callback(new Error('This field is required'));
            }
            else {
                callback();
            }
        };
        return {
            loading: false,
            categoryForm: {
                name: '',
                price: 1000,
                active: true,
            },
            categoryRules: {
                name: [
                    {required: true, message: 'This field is required', trigger: 'blur'}
                ],
                price: [
                    { validator: validatePrice, trigger: 'blur' }
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
            this.categoryForm = {
                name: '',
                price: 1000,
                active: true,
            }
        },

        submitCategory(name) {
            this.$refs[name].validate(async(valid) => {
                if (valid) {
                    try {
                        this.loading = true;
                        const {name, price, active} = this.categoryForm;
    
                        const response = await this.$axios.post(`/category/create`, {name, price, active});
                        this.loading = false;
                        const {error, msg} = response.data;
                        if(error) {
                            this.$Message.error(msg);
                            return;
                        }
                        this.$store.dispatch('data/addCategory', msg);
                        this.successNotice('Successfully created a new category');
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

        updateCategory(name) {
            this.$refs[name].validate(async(valid) => {
                if(valid) {
                    this.loading = true;
                    try {

                        const{_id, name, price, active} = this.categoryForm;
                        const response= await this.$axios.post(`/category/update`, {_id, name, price, active});
                        const {error, msg} = response.data;

                        if(!error) {
                            this.successNotice('Successfully updated Category');
                            this.$store.dispatch('data/updatecategory', msg);    
                            this.$emit('closeModal')
                        }else {
                            console.log(error)
                        }
                    }catch(err) {
                        console.log(err)
                        this.$Message.error('An error occured');
                    }
                    
                    this.loading = false;


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
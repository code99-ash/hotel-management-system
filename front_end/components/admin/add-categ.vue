<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <div class="text-info">{{res}}</div>
        <FormItem prop="name">
            <Input type="text" v-model="formInline.name" placeholder="Name">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="price">
            <label for="">Price</label>
            <InputNumber :min="10" v-model="formInline.price">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </InputNumber>
        </FormItem>
        <FormItem prop="quantity">
            <label for="">Quantity</label>
            <InputNumber :min="1" v-model="formInline.quantity">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </InputNumber>
        </FormItem>
        <FormItem>
            <Button type="primary" class="text-light" @click="handleSubmit('formInline')">Add</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        name: 'AddCateg',
        data () {
            return {
                res: '',
                formInline: {
                    name: '',
                    price: 100,
                    quantity: 1
                },
                ruleInline: {
                    name: [
                        { required: true, message: 'Please fill in the name', trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // this.$Message.success('Success!');
                        let fd = new FormData();
                            fd.append('name', this.formInline.name)
                            fd.append('price', this.formInline.price)
                            fd.append('quantity', this.formInline.quantity)
                            fd.append('newCategory', true)
                        this.$axios.$post(`/api/request.php`, fd)
                                    .then(res => {
                                        this.res = res;
                                    }).catch(e => {
                                        console.log(e)
                                    })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

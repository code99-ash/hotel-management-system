<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <Collapse v-model="value1">
                    <Panel name="1">
                        New Role <span class="h6">+</span>

                        <p slot="content">
                            <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
                            <div class="text-info my-2">{{res}}</div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <FormItem prop="department" style="width: 100%">
                                            <Select v-model="formInline.department">
                                                <Option v-for="item in departments" :value="item" :key="item">{{ item }}</Option>
                                            </Select>
                                        </FormItem>
                                    </div>
                                    <div class="col-md-4">
                                        <FormItem prop="name" style="width: 100%">
                                            <Input type="text" v-model="formInline.name" placeholder="Security">
                                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                            </Input>
                                        </FormItem>
                                    </div>
                                    <div class="col-md-4">
                                        <FormItem>
                                            <Button type="dark" @click="handleSubmit('formInline')">Add Role</Button>
                                        </FormItem>
                                    </div>
                                </div>
                            </Form>
                        </p>
                    </Panel>
                </Collapse>
                
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        layout: 'Admin',
        data () {
            return {
                value1: '1',
                res: '',
                formInline: {
                    department: '',
                    name: '',
                },
                departments: ['Administrative', 'Non Administrative'],
                ruleInline: {
                    department: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            handleSubmit({}, name) {
                this.$refs['formInline'].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        // $axios.$get(`/api/request.php?getRoles=true`);
                        try {
                            let fd = new FormData();
                                fd.append('name', this.formInline.name);
                                fd.append('department', this.formInline.department);
                                fd.append('addRole', true);
                            this.$axios.$post(`/api/request.php`, fd)
                                        .then(res => {
                                            this.res = res
                                        });
                           
                        } catch(err) {
                            console.log(err);
                        }

                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        }
    }
</script>

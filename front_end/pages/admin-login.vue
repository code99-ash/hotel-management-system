<template>
    <div>
        <div class="container h-100">
            <div class="row">
                <div class="col-md-6 col-lg-5 mx-auto mt-5">
                    <div class="card p-3 pt-3 shadow-sm">
                        <div class="card-header h3 mb-3">Admin Login</div>
                        <p class="text-danger">{{apiRes}}</p>
                        <Form ref="formLogin" :model="formLogin" :rules="ruleInline">
                            <FormItem prop="email">
                                <Input type="email" v-model="formLogin.email" placeholder="Email">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="pass">
                                <Input type="password" v-model="formLogin.pass" placeholder="Password">
                                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" class="w-100 text-light" @click="handleSubmit('formLogin')">Signin</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const Cookie = process.client ? require('js-cookie') : undefined
import axios from 'axios';

export default {
    layout: 'Guest',
    data() {
        return {
            apiRes: '',
            formLogin: {
                email: '',
                pass: ''
            },
            ruleInline: {
                user: [
                    {   
                        required: true, 
                        message: 'Please enter a correct email', 
                        trigger: 'blur',
                    }
                ],
                password: [
                    {   
                        required: true, 
                        message: 'Please fill in the password.', 
                        trigger: 'blur' 
                    },
                ]
            }
        }
    },
    
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // this.$Message.success('Success!');
                    try {
                        let fd = new FormData();
                            fd.append('email', this.formLogin.email);
                            fd.append('password', this.formLogin.pass);
                            fd.append('adminlogin', true);
                        
                        axios.post('http://localhost/api/myAppApi/api/admin-auth.php', fd)
                                .then(res => {
                                    let result = res.data;
                                    if(result.status == 'success') {
                                        this.apiRes = '';

                                        let token = result.jwt;
                                        let _sd = result.message.staffData;
                                        let _rd = result.message.roleData;

                                        this.$cookies.set('_dmt', token, {
                                            path: '/',
                                            maxAge: 30 * 60
                                        });
                                        this.$cookies.set('_sd', _sd, {
                                            path: '/',
                                            maxAge: 30 * 60
                                        });
                                        this.$cookies.set('_rd', _rd, {
                                            path: '/',
                                            maxAge: 30 * 60
                                        });
                                        this.$store.state.staffData = _sd; 
                                        this.$store.state.roleData = _rd;

                                        this.$router.replace('/admin')
                                    } else {
                                        this.apiRes = result.message;
                                    }
                                });
                            
                    } catch (err) {
                        console.log(err)
                    }
                } else {
                    this.$Message.error('Incorrect Email/Password');
                }
            })
        },

    }
}
</script>

<style scoped>
    #login {
        height: 100vh;
        
    }
</style>
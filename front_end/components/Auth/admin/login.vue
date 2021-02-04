<template>
    <div class="container h-100">
        <div class="row">
            <div class="col-md-6 col-lg-5 mx-auto mt-5">
                <div class="card p-3 pt-3 shadow-sm">
                    <div class="card-header h3 mb-3">Admin Login</div>
                    {{this.$auth.strategy.token.get()}}
                    <Form ref="formLogin" :model="formLogin" :rules="ruleInline">
                        <FormItem prop="user">
                            <Input type="text" v-model="formLogin.email" placeholder="Email">
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="formLogin.pass" placeholder="Password">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" class="w-100" @click="handleSubmit('formLogin')">Signin</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AdminLogin',
        props: ['formLogin'],
        data () {
            return {
                
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        try {
                            let response = this.$auth.loginWith('local', { data: this.formLogin })
                            console.log(response)
                        } catch (err) {
                            console.log(err)
                        }
                    } else {
                        this.$Message.error('Incorrect Email/Password');
                    }
                })
            }
        }
    }
</script>

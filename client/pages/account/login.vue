<template>
    <div class="container-fluid auth p-0">
        <Row>
            <Col :xs="24" :md="10">
                <Card dis-hover class="bg-white shadow-sm border-0 p-5">
                    <h1 class="header">Login</h1>
                    <Form ref="loginForm" :model="loginForm" :rules="loginRule">
                        <FormItem prop="email" label="Email Address">
                            <Input v-model="loginForm.email" />
                        </FormItem>
                        <FormItem prop="password" label="Password">
                            <Input type="password" v-model="loginForm.password" />
                        </FormItem>
                        <Button :loading="loading" class="bg-success text-light" long @click.prevent="handleSubmit('loginForm')">Login</Button>
                    </Form>
                </Card>
            </Col>
            <Col :xs="0" :md="14" class="bg-dark">
                <Card dis-hover class="auth-bg border-0"></Card>
                <Card class="main-content">
                    <div class="container">
                        <h2></h2>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
    layout: 'Guest',
    data() {
        return {
            loginForm: {
                email: '',
                password: ''
            },
            loginRule: {
                email: [
                    {required: true, message: 'Email is required', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: 'Password is required', trigger: 'blur'}
                ]
            }
        }
    }
}
</script>

<style>
    .auth {
        height: 100vh;
        overflow: hidden;
    }
    .header {
        text-align: left;
        font-weight: bold;
        text-transform: capitalize;
    }
    .auth-bg {
        background: url('/images/vip4.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center top;
        opacity: .5;
    }
    .ivu-card-body {
        height: 100vh;
    }
    .ivu-form-item {
        margin-bottom: 40px !important;
    }
    .ivu-form-item-label {
        color: #333 !important;
    }
    .main-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: transparent;
    }
</style>
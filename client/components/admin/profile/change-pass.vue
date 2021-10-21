<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-6 pr-5">
                <h4 class="mt-1 mb-3">Update Password</h4>
                <p class="mr-5">Ensure your account is using a long, random password to stay secure.</p>
            </div>
            <div class="col-md-6">
                <div class="card shadow-sm p-3">
                    <form action="">
                    <div class="row">
                        <div class="col-10">
                            <div class="my-2">
                                <h6 class="text-success">{{result}}</h6>
                                <h6 class="text-danger">{{err_message}}</h6>
                            </div>
                            <div class="form-group mb-3">
                                <label for="">Current Password</label>
                                <input type="password" class="p-1 form-control my-2" v-model="curr_pass">
                            </div>
                            <div class="form-group mb-3">
                                <label for="">New Password</label>
                                <input type="password" class="p-1 form-control my-2" v-model="new_pass">
                            </div>
                            <div class="form-group mb-3">
                                <label for="">Confirm Password</label>
                                <input type="password" class="p-1 form-control my-2" @keyup="confirmPass" v-model="conf_pass">
                                <div class="text-danger">{{conf_err}}</div>
                            </div>
                        </div>
                    </div>

                        <button class="btn btn-dark text-light float-right m-3 text-uppercase" @click.prevent="changePassword">save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UpdateUser',
    data() {
        return {
            curr_pass: '',
            new_pass: '',
            conf_pass: '',
            conf_err: '',
            result: '',
            err_message: '',
        }
    },
    computed: {
        userData() {
            return this.$store.state.staffData.userData;
        },
    },
    methods: {
        confirmPass() {
            this.conf_err = (this.new_pass !== this.conf_pass)? 'Passwords do not match':'';
        },
        resetForm() {
            this.curr_pass = '';
            this.new_pass = '';
            this.conf_pass = '';
        },
        changePassword() {
            if((this.curr_pass== ''||this.new_pass==''||this.conf_pass=='') && this.conf_err == '') {
                this.err_message = 'All fields are required'
                this.result = '';
            } else {
                this.err_message = '';
                let fd = new FormData();
                    fd.append('curr_pass', this.curr_pass);
                    fd.append('new_pass', this.new_pass);
                    fd.append('changePassword', true);
                    fd.append('email', this.userData.email);

                this.$axios.post(`/api/admin-auth.php`, fd).then(res => {
                   var response = res.data;
                   if(response.status == 'error') {
                       this.result = ''
                       this.err_message = response.message;
                   } else if(response.status == 'success') {
                       this.err_message = '';
                       this.result = response.message;
                       console.log(response)
                   }
                   this.resetForm();

                }).catch(e => {
                    console.log(e)
                })
            }
        }
    }
}
</script>

<style scoped>
    p {
        font-size: 18px;
    }
</style>
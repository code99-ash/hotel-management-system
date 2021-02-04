<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-6 pr-5">
                <h4 class="mt-1 mb-3">Profile Information</h4>
                <p class="mr-5">Update your account's profile information and email address.</p>
            </div>
            <div class="col-md-6">
                <div class="card shadow-sm p-3">
                    <upload-profile-pic />
                    <form action="">
                    <div class="row">
                        <div class="col-10">
                            <div class="form-group mb-3">
                                <label for="">Name</label>
                                <p>{{userData.fname}} {{userData.lname}}</p>
                            </div>
                            <div class="my-2">
                                <h6 class="text-success">{{result}}</h6>
                                <h6 class="text-danger">{{err_message}}</h6>
                            </div>
                            <div class="form-group mb-3">
                                <label for="">Email</label>
                                <input type="text" class="p-1 form-control my-2" v-model="email">
                            </div>
                        </div>
                    </div>
                        <button @click.prevent="changeEmail" class="btn btn-dark text-light float-right m-3 text-uppercase">save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import uploadProfilePic from './upload-profile-pic.vue'
export default {
  components: { uploadProfilePic },
    name: 'ChangeEmail',
    computed: {
        userData() {
            return this.$store.state.staffData.userData;
        },
        roleData() {
            return this.$store.state.roleData.roleData
        },
    },
    mounted() {
        this.email = this.userData.email
    },
    data() {
        return {
            email: '',
            err_message: '',
            result: '',
        }
    },
    methods: {
        changeEmail() {
            if(this.email == '') {
                this.err_message = 'Email field is required';
            } else {
                let fd = new FormData();
                    fd.append('email', this.email);
                    fd.append('id', this.userData.id);
                    fd.append('changeEmail', true);
                
                this.$axios.post(`/api/admin-auth.php`, fd).then(res => {
                   var response = res.data;
                   
                   if(response.status == 'error') {
                       this.result = ''
                       this.err_message = response.message;
                   } else if(response.status == 'success') {
                       this.err_message = '';
                       this.result = response.message;

                        this.$store.state.staffData.userData.email = response.email;
                        this.$cookies.set('_sd', this.userData, {
                                                    path: '/',
                                                    maxAge: 30 * 60
                                                });
                   }

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
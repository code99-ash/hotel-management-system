<template>
    <div class="container">
        <div class="card-header bg-white">
            <nuxt-link to="/admin/edit-profile" class="btn btn-sm btn-default">Edit Profile</nuxt-link>
        </div>
        <div class="row">
            <div class="col-12 mt-5">
                <div class="row">
                    <div class="col-md-3 mx-auto">
                        <img :src="`${$axios.defaults.baseURL}/uploads/profile/${userData.profile_img}`" alt="" class="img-div">
                    </div>
                    <div class="col-md-7 mx-auto bg-white p-3">
                        <div class="row">
                            <div class="col-12">
                                <label for="" class="font-weight-bold mr-3">Name</label>
                                {{userData.title}} {{userData.fname}} {{userData.lname}}
                            </div>
                            <div class="col-12">
                                <label for="" class="font-weight-bold mr-3">Email</label>
                                {{userData.email}}
                            </div>
                            <div class="col-12">
                                <label for="" class="font-weight-bold mr-3">Position</label>
                                {{roleData.role}}
                            </div>
                            <div class="col-12">
                                <label for="" class="font-weight-bold mr-3">Phone Number</label>
                                {{userData.phone_no}}
                            </div>
                            <div class="col-12">
                                <label for="" class="font-weight-bold mr-3">Address</label>
                                {{userData.address}}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    layout: 'Admin',
    components: {
        
    },
    computed: {
        userData() {
            return this.$store.state.staffData.userData;
        },
        roleData() {
            return this.$store.state.roleData.roleData
        },
    }
}
</script>

<style scoped>
    .img-div {
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
</style>
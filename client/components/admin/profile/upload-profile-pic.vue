<template>
    <div class="d-flex">
        <div>
            <div class="text-danger">{{err}}</div>
            <div class="d-flex">
                <img v-if="userData.profile_img" :src="`${$axios.defaults.baseURL}/uploads/profile/${userData.profile_img}`" alt="">
                <Icon type="md-person" size="100" class="m-1" v-else  />
                <form enctype="multipart/form-data">
                    <input type="file" ref="file" id="file" class="d-none" @change="uploadFile">
                    <button class="btn btn-warning text-light rounded-pill" @click.prevent="clickUpload">change image</button>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'uploadProfilePicture',
    computed: {
        userData() {
            return this.$store.state.staffData.userData;
        },
    },
    data() {
        return {
            err: '',
        }
    },
    methods: {
        clickUpload() {
            this.$refs.file.click();
        },
        uploadFile() {
            let file = this.$refs.file.files[0];
            let fileSize = file.size;
            this.err = (fileSize > 100000)? 'File Size should not be more than 100kb':''; 
            if(this.err == '') {
                // console.log("old file", this.userData.profile_img);
                // console.log("new file", file);

                let fd = new FormData();
                    fd.append('oldFile', this.userData.profile_img);
                    fd.append('newFile', file);
                    fd.append('userId', this.userData.id);
                    fd.append('changePicture', true);
                
                this.$axios.post(`/api/admin-auth.php`, fd, {
                    header: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => {
                   var response = res.data;
                   this.$store.state.staffData.userData.profile_img = res.data;
                   this.$cookies.set('_sd', this.userData, {
                                            path: '/',
                                            maxAge: 30 * 60
                                        });
                    console.log(response)
                }).catch(e => {
                    console.log(e)
                })
            }
        }
    }
}
</script>

<style scoped>
    img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 10px 20px;
    }
</style>
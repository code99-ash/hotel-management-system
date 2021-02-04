<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <!-- Form to Add image file to categories -->
                <form enctype="multipart/form-data">
                    <div class="row">
                        <div class="col-6">
                            <label for="" class="h6">Category</label>
                            <select v-model="categoryId" class="form-control bg-white">
                                <option :key="cat.id" v-for="cat in categories" :value="cat.id">{{cat.name}}</option>
                            </select>
                        </div>
                        <div class="col-6 pt-5">
                            <input type="file" ref="file" id="file" class="d-none" @change="newFile">
                            <button class="btn btn-warning__default rounded" @click.prevent="clickAdd">Add new Picture</button>
                            <br><span class="text-danger ml-3">{{fileError}}</span>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="row my-5">
            <div class="card-header h5 col-12" v-if="count !== null">
                <span>{{count}} selected</span>
                <!-- <button class="btn btn-default text-danger ml-5" @click="deleteSelected">Delete</button> -->
            </div>
                <!-- Grid of Galleries -->
            <div :key="gal.id" v-for="gal in gallery" class="col-12 col-md-4 mb-5 gallery-col">
                <div class="card gallery-card">
                    <input type="checkbox" class="checkboxes" @click="multipleSelect($event, gal.image)">
                    <img :src="`${$axios.defaults.baseURL}/uploads/gallery/${gal.image}`" class="card-img">
                    <div class="position-absolute bg-dark text-light gallery-label">{{gal.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'Admin',
    async asyncData({$axios, $config}) {
        const gallery = await $axios.$get(`/api/request.php?getGallery=true`);
        // console.log(gallery)
        return {gallery}
    },
    data() {
        return {
            fileError: '',
            categories: [],
            categoryId: null,
            selected: [],
            count: null,
        }
    },
    created() {
        this.fetchCategories();
    },
    methods: {
        fetchCategories() {
            this.$axios.$get(`/api/request.php?getCategories=true`).then(res => {
                this.categories = res;
            }).catch(e => {
                console.log(e);
            })
        },
        multipleSelect(e, id) {
            var isChecked = e.target.checked;
            if(isChecked) {
                if(!this.selected.includes(id)) {
                    this.selected = [...this.selected, id];
                }
            } else {
                if(this.selected.includes(id)) {
                    this.selected = this.selected.filter(s => s !== id);
                }
            }
            this.count = `${this.selected.length} of ${this.gallery.length}`; 
            console.log("gallery", this.gallery.length)
            console.log("selected", this.selected.length)
        },
        clickAdd() {
            this.$refs.file.click();
        },
        newFile() {
            let file = this.$refs.file.files[0];
            if(file) {
                var fileSize = file['size'];
                var fileType = file['type'];
            }
                let allowed = ['image/png', 'image/jpg', 'image/jpeg'];

            if(fileSize > 250000) {
                this.fileError = 'Image size should not be more than 250KB'
            } else if(!allowed.includes(fileType)) {
                this.fileError = 'Only file type of png, jpg, jpeg is allowed';
            } else if(this.categoryId == null) {
                this.fileError = 'All fields are required';
            }
             else {
                this.fileError = '';
            }

            if(this.fileError == '') {
                let fd = new FormData();
                    fd.append('categoryId', this.categoryId);
                    fd.append('image', file);
                    fd.append('newGalleryFile', true);
                this.$axios.post(`/api/request.php`, fd)
                            .then(res => {
                                // console.log(res.data);
                                let cat_name = this.categories.filter(c => c.id == this.categoryId)['name'];
                                let newData = {image: res.data, name: cat_name};
                                this.gallery = [newData, ...this.gallery];
                            });
            }

        },
        deleteSelected() {
            this.$axios.$get(`/api/request.php?deleteFromGallery=true&&selected=${this.selected}`).then(res => {
                console.log(res)
            }).catch(e => {
                console.log(e)
            })
        }

    }
}
</script>

<style scoped>
    .btn-warning__default {
        background: rgb(243, 113, 7);
    }
    .gallery-card {
        width: 100%;
        height: 200px;
    }
    .gallery-card img {
        height: 100%;
        width: 100%;
    }
    .gallery-label {
        width: 100%;
        padding: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        top: 200px;
    }
    .checkboxes {
        position: absolute;
        top: 0;
        left: 0;
        width: 20px;
        height: 20px;
    }
</style>
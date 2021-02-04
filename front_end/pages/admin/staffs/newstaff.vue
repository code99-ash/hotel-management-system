<template>
    <div class="container">
        <div class="row">
            <div class="col-md-10 mx-auto">
                <div class="card">
                    <div class="card-header h3 bg-light shadow-sm">
                        <div>Add new staff</div> 
                        <v-progress-linear
                            :reverse="$vuetify.rtl"
                            value="15"
                            class="bg-light"
                        ></v-progress-linear>
                    </div>
                    
                    <div class="p-5">
                        <Form ref="formItem" :model="formItem" :rules="ruleValidate">
                            <div class="row">
                                <div class="col-12">
                                    <FormItem prop="file">
                                        <input type="file" ref="file" id="file" class="d-none" @change="checkFile">
                                        <button class="btn btn-dark" @click.prevent="selectFile">Upload Passport</button>
                                        <span>{{filename}}</span>
                                    </FormItem>
                                    <ul class="mt-2">
                                        <li :key="err" v-for="err in fileError" class="ml-3 text-danger">{{err}}</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <FormItem prop="title">
                                        <Input v-model="formItem.title" placeholder="Mr / Mrs / Mrss"/>
                                    </FormItem>
                                </div>
                                <div class="col-md-6">
                                    <FormItem prop="fname">
                                        <Input v-model="formItem.fname" placeholder="First Name"/>
                                    </FormItem>
                                </div>
                                <div class="col-md-6">
                                    <FormItem prop="lname">
                                        <Input v-model="formItem.lname" placeholder="Last Name"/>
                                    </FormItem>
                                </div>
                                <div class="col-md-6">
                                    <FormItem prop="email">
                                        <Input v-model="formItem.email" type="email" placeholder="Email Address"/>
                                    </FormItem>
                                </div>
                                <div class="col-md-6">
                                    <FormItem prop="tel">
                                        <Input v-model="formItem.tel" placeholder="Phone Number"/>
                                    </FormItem>
                                </div>
                                <div class="col-md-6">
                                    <FormItem prop="gender">
                                        <RadioGroup v-model="formItem.gender" type="button" size="large">
                                            <Radio label="male"></Radio>
                                            <Radio label="female"></Radio>
                                        </RadioGroup> <!-- remember to turn to lowercase -->
                                    </FormItem>
                                </div>
                                <div class="col-12">
                                    <FormItem prop="address">
                                        <Input v-model="formItem.address" placeholder="Address"/>
                                    </FormItem>
                                </div>
                                <div class="col-md-6">
                                    <FormItem prop="department">
                                        Department
                                        <Select v-model="formItem.department" @on-change="filterRoles">
                                            <Option v-for="(dept, i) in depts" :value="dept" :key="i">{{ dept }}</Option>
                                        </Select>
                                    </FormItem>
                                </div>
                                <div class="col-md-6">
                                    <FormItem prop="role">
                                        Role
                                        <Select v-model="formItem.role">
                                            <Option v-for="role in roles" :value="role.id" :key="role.id">{{ role.role }}</Option>
                                        </Select>
                                    </FormItem>
                                </div>
                                <div class="col-md-6">
                                   <FormItem prop="account_name">
                                    <Input v-model="formItem.accountName" placeholder="Account Name"/>
                                   </FormItem>
                                </div>
                                <div class="col-md-6">
                                   <FormItem prop="bankname">
                                    <Input v-model="formItem.bankName" placeholder="Bank Name"/>
                                   </FormItem>
                                </div>
                                <div class="col-md-12">
                                   <FormItem prop="account_no">
                                    <Input v-model="formItem.accountNo" placeholder="Account Number"/>
                                   </FormItem>
                                </div>
                                <div class="col-12">
                                    <v-progress-linear
                                        color="light-blue"
                                        height="40"
                                        class="bg-navy text-light"
                                        value="20"
                                        striped
                                        style="cursor: pointer"
                                        @click="handleSubmit('formItem')"
                                    >
                                        <template v-slot:default="{value}">
                                            <strong>Register staff</strong>
                                        </template>
                                    </v-progress-linear>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'Admin',
    async asyncData({$axios, $config}) {
        const allRoles = await $axios.$get(`/api/request.php?getRoles=true`);
        console.log(allRoles);
        return {allRoles};
    },
    data() {
        const emailCheck = (rule, value, callback) => {
            if ((this.formItem.department == 'administrative') && value === '') {
                callback(new Error('email address is required'));
            } else {
                callback();
            }
        };
        const telCheck = (rule, value, callback) => {
            if ((this.formItem.department == 'administrative') && value === '') {
                callback(new Error('phone number is required'));
            } else {
                callback();
            }
        };
        const roleCheck = (rule, value, callback) => {
            if(value === ''){
                 callback(new Error('Role is required'));
            } else {
                callback();
            }
        }
        const passportCheck = (rule, value, callback) => {
            if ((this.$refs.file.files.length == 0)) {
                callback(new Error('passport is required'));
            } else {
                callback();
            }
        };

        return {
            depts: ['Administrative', 'Non Administrative'],
            department: 'Non Administrative',
            role: '',
            roles: [],
            formItem: {
                title: '',
                fname: '',
                lname: '',
                email: '',
                tel: '',
                address: '',
                department: '',
                role: '',
                accountNo: '',
                accountName: '',
                bankName: '',
                gender: 'male',
            },
            filename: '',
            fileError: [],
            allowed: ['image/png', 'image/jpg', 'image/jpeg'],
            ruleValidate: {
                title: [
                    { required: true, message: '* Title is required', trigger: 'blur' }
                ],
                fname: [
                    { required: true, message: '* First name is required', trigger: 'blur' }
                ],
                lname: [
                    { required: true, message: '* Last Name is required', trigger: 'blur' }
                ],
                email: [
                    { validator: emailCheck, trigger: 'blur' }
                ],
                tel: [
                    { validator: telCheck, trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '*  Address field is required', trigger: 'blur' }
                ],
                department: [
                    { required: true, message: '*  Department field is required', trigger: 'blur' }
                ],
                role: [
                    { validator: roleCheck, trigger: 'blur' }
                ],
                file: [
                    { validator: passportCheck, trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        filterRoles() {
            // console.log('Changed')
            // console.log(this.allRoles)
            var filtered = this.allRoles.filter(r => r.department == this.formItem.department);
            this.roles = filtered
        },
        selectFile() {
            this.$refs.file.click();
        },
        checkFile() {
            const file = this.$refs.file.files[0];
            console.log(file)
            this.fileError = [];
            if((file.type !== 'image/png') && (file.type !== 'image/jpg') && (file.type !== 'image/jpeg')) {
                this.fileError = [...this.fileError, "Only jpg, jpeg, png file are allowed"]
            }
            if (file.size > 100000){
                this.fileError = [...this.fileError, "file size should not be more than 100kb"]
            } 
            this.filename = `${file.name} | ${file.size}`;
            console.log(this.$refs.file.files.length);
        },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // this.$Message.success('Success!');
                    let fd = new FormData();
                    fd.append('title', this.formItem.title);
                    fd.append('fname', this.formItem.fname);
                    fd.append('lname', this.formItem.lname);
                    fd.append('email', this.formItem.email);
                    fd.append('file', this.$refs.file.files[0]);
                    fd.append('tel', this.formItem.tel);
                    fd.append('address', this.formItem.address);
                    fd.append('department', this.formItem.department);
                    fd.append('role', this.formItem.role);
                    fd.append('gender', this.formItem.gender);
                    fd.append('accountNo', this.formItem.accountNo);
                    fd.append('accountName', this.formItem.accountName);
                    fd.append('bankName', this.formItem.bankName);
                    fd.append('addstaff', true);

                    this.$axios.post(`/api/request.php`, fd).then(response => {
                        this.$Notice.info({
                            title: 'Notification',
                            desc: response.data
                        });
                    });
                    

                } else {
                    this.$Message.error('All fields are required !');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>

<style>
    .btn, .form-control {
        box-shadow: none !important;
    }
    .card {
        box-shadow: inherit !important;
        border: 0 !important;
    }
    input:focus {
        box-shadow: none !important;
    }
    .ivu-input.ivu-input-default, .ivu-select-selection {
        padding: 10px 15px !important;
        height: 50px !important;
        font-size: 15px !important;
    }
    input::placeholder {
        font-size: 12px !important;
    }
    .theme--light.v-label.v-label--active {
        color: rgba(3, 23, 87, 0.938) !important;
    }
    .bg-navy {
        background:  #121b2ed7;
    }
</style>
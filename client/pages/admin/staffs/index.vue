<template>
    <div class="mb-5">
            <Collapse v-model="value1" class="shadow-sm">
                <Panel name="1">
                    To Edit Post
                    <p slot="content">
                        Edit Form Goes here
                        {{myRole}}
                    </p>
                </Panel>
            </Collapse>

            <Divider :dashed="isdashed" />

            <div class="bg-white">
                <v-card-title>
                    Staff List
                    <v-spacer></v-spacer>

                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>

                <v-data-table
                    :headers="headers"
                    :items="staffs"
                    hide-default-footer
                    :sort-by="['name']"
                    multi-sort
                    class="elevation-1 table-striped py-2"
                    item-key="id"
                    show-select
                    :search="search"
                    v-model="selected"
                    :page.sync="page"
                    :items-per-page="itemsPerPage"
                    @page-count="pageCount = $event"
                >

                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="showData(item.id)"
                        >
                            mdi-eye
                        </v-icon>
                        <button class="btn btn-default">
                            <v-icon small>mdi-file-edit</v-icon>
                        </button>
                    </template>
                    <template v-slot:item.fullname="{ item }">
                        <span>
                            {{ item.fname }} {{item.lname}}
                        </span>
                    </template>
                    <template v-slot:item.roles="{ item }">
                        <span>
                            {{ item.roles}}
                        </span>
                    </template>

                </v-data-table>

                <v-pagination
                    v-if="pageCount > 1"
                    v-model="page"
                    :length="pageCount"
                    class="my-3"
                ></v-pagination>

                <md-dialog :md-active.sync="viewData">
                    <md-dialog-title>{{views.fullname}}'s Profile</md-dialog-title>

                    <div class="px-5 pb-2">
                        <div style="height: 120px; width: 120px;">
                            <img    class="viewProfile"
                                    :src="`${$axios.defaults.baseURL}/uploads/profile/${views.profile}`" alt="">
                        </div>
                        <table class="table table-light">
                            <tr>
                                <th>Full Name</th>
                                <td>{{views.fullname}}</td>
                            </tr>
                            <tr>
                                <th>Department | Role</th>
                                <td>{{views.department}} | {{views.role}}</td>
                            </tr>
                            <tr>
                                <th>Email / Verified</th>
                                <td>{{views.email}} / 
                                    <span v-if="views.verified == 'true'" class="bg-success text-light p-2">
                                        verified
                                    </span>
                                    <span v-else class="bg-danger text-light p-2">
                                       not verified
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>Gender</th>
                                <td>{{views.gender}}</td>
                            </tr>
                            <tr>
                                <th>Phone Number</th>
                                <td>{{views.phoneNo}}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{{views.address}}</td>
                            </tr>
                            <tr v-if="views.bankName">
                                <th>Bank Name</th>
                                <td>{{views.bankName}}</td>
                            </tr>
                            <tr v-if="views.accountName">
                                <th>Account Name</th>
                                <td>{{views.accountName}}</td>
                            </tr>
                            <tr v-if="views.accountNo">
                                <th>Account Number</th>
                                <td>{{views.accountNo}}</td>
                            </tr>
                        </table>
                    </div> 

                    <md-dialog-actions>
                        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                    </md-dialog-actions>
                </md-dialog>
    </div>
    </div>
</template>

<script>
import AddStaff from '@/components/admin/add-staff'
import StaffList from '@/components/admin/staff-list'
export default {
  components: { StaffList, AddStaff },
    layout: 'Admin',

    async asyncData({$axios, $config}) {
        const staffs = await $axios.$get(`/api/request.php?getStaffs=true`);
        console.log(staffs)
        return {staffs} 
    },

    data() {
        return {
        panel: "1",
        viewData: false,
        search: '',
        selected: [],
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        views: {
            id: null,
            fullname: null,
            email: null,
            address: null,
            role: null,
            department: null,
            gender: null,
            phoneNo: null,
            accountNo: null,
            accountName: null,
            bankName: null,
            verified: null,
            profile: null,
            active: null
        },
        headers: [
          {
            text: 'Customer ID',
            align: 'start',
            value: 'id',
          },
          { text: 'Name', value: 'fullname' },
          { text: 'Department', value: 'department' },
          { text: 'Roles', value: 'role' },
          { text: 'Actions', value: 'actions' },
        ],

        }
    },

    methods: {
        showData(id) {
            let data = this.staffs.filter(d => d.id == id)[0];
            this.views.fullname = `${data.fname} ${data.lname}`
            this.views.department = `${data.department}`
            this.views.role = `${data.role}`
            this.views.email = `${data.email}`
            this.views.active = `${data.active}`
            this.views.verified = `${data.is_verified}`
            this.views.gender = `${data.gender}`
            this.views.phoneNo = `${data.phone_no}`
            this.views.address = `${data.address}`
            this.views.bankName = `${data.bank_name}`
            this.views.accountName = `${data.account_name}`
            this.views.accountNo = `${data.account_no}`
            this.views.profile = `${data.profile_img}`
            this.viewData = true;

        }
    }

}
</script>

<style>
    .v-expansion-panels,.v-expansion-panel,
    .v-expansion-panel-header, .v-item-group.v-expansion-panels,
    .v-expansion-panel.v-expansion-panel--active.v-item--active {
        box-shadow: none !important;
        outline:none !important;
        z-index: inherit !important;
        border-radius: 0 !important;
    }
    .v-icon {
        background: #f8b275 !important;
    }
    .viewProfile {
        height: 100%;
        width: 100%;
        border-radius: 50%;
    }
</style>
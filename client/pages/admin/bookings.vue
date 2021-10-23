<template>
    <div class="container-fluid">
        <div class="row p-3">
            <div class="col-12 bg-white">

                <v-card-title>
                    Customer Bookings
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
                    :items="bookings"
                    hide-default-footer
                    :sort-by="['cust_name', 'id']"
                    multi-sort
                    class="elevation-1 table-striped py-2"
                    item-key="id"
                    show-select
                    :single-select="singleSelect"
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
                            @click="moreDialog = !moreDialog"
                        >
                            mdi-eye
                        </v-icon>
                        <button class="btn btn-sm btn-danger text-light">
                          <v-icon>mdi-trash</v-icon>X
                        </button>
                    </template>
                </v-data-table>

                    <v-pagination
                        v-model="page"
                        :length="pageCount"
                        class="my-3"
                        v-if="pageCount > 1"
                    ></v-pagination>

                    <more-info :moreDialog="moreDialog" @closeMoreDialog="moreDialog = false" />
            </div>
        </div>
    </div>
</template>

<script>
import moreInfo from '../../components/admin/bookings/more-info.vue'

  export default {
  components: { moreInfo },
    layout: 'Admin',
    // async asyncData({$axios, $config}) {
    //     const bookings = await $axios.$get(`/api/request.php?allBookings=true`);
    //     console.log("bookings", bookings)
    //     return {bookings} 
    // },
    data () {
      return {
        moreDialog: false,
        search: '',
        singleSelect: false,
        selected: [],
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        uniqueList: [],
        headers: [
          {
            text: 'Customer Name',
            align: 'start',
            value: 'cust_name',
          },
          { text: 'Category', value: 'cat_name' },
          { text: 'Quantity', value: 'quantity' },
          { text: 'Amount', value: 'amount' },
          { text: 'Nights', value: 'night' },
          { text: 'Status', value: 'status' },
          { text: 'Date', value: 'created_at' },
          { text: 'Actions', value: 'actions' },
        ],
        
      }
    },
    computed: {
        
    },
    methods: {
    
    },
  }
</script>

<style>
    .v-pagination__item, .theme--light.v-icon {
        color: #03112e !important;
        background: rgba(255, 255, 255, 0.089) !important;
    }

    .v-input--switch.v-input--is-dirty .v-input--switch__thumb,
    .v-pagination__item.v-pagination__item--active {
        background: #03112e !important;
        color: #fff !important;
    }
    button {
        box-shadow: none !important;
    }
     
</style>
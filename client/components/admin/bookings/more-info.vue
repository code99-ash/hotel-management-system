<template>
    <div>
        <v-dialog
          v-model="moreDialog"
          min-width="650px"
          max-width="750px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">More info about COO3</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="6"
                  >
                        <div class="my-1 p-1">
                            <div>
                                <strong>Customer ID: </strong>COO3
                            </div>
                            <div>
                                <strong>Customer Name: </strong>John Doe
                            </div>
                        </div>
                  </v-col>

                        <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>

                    <div class="my-1 p-1" style="overflow-x: scroll">
                        <v-data-table
                            :headers="headers"
                            :items="more"
                            :search="search"
                        ></v-data-table>
                    </div>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="$emit('closeMoreDialog')"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'MoreInfo',
    props: ['moreDialog'],
    data() {
        return {
            search: '',
            headers: [
                {
                    text: 'Category',
                    align: 'start',
                    value: 'category',
                },
                { text: 'Quantity', value: 'quantity' },
                { text: 'No of Night', value: 'no_of_night' },
                { text: 'Status', value: 'status' },
                { text: 'Date', value: 'date' },
                { text: 'Release by', value: 'released_by' },
            ],

            more: [
                {
                    category: 'Executive',
                    quantity: 1,
                    no_of_night: 2,
                    status: 'booked',
                    date: '31/12/2020',
                    released_by: 'Alex J'
                },
                {
                    category: 'Executive',
                    quantity: 1,
                    no_of_night: 2,
                    status: 'booked',
                    date: '12/11/2020',
                    released_by: 'Alex J'
                },
                {
                    category: 'Regular',
                    quantity: 1,
                    no_of_night: 2,
                    status: 'expired',
                    date: '02/01/2021',
                    released_by: 'Alex J'
                },
                {
                    category: 'Executive',
                    quantity: 1,
                    no_of_night: 2,
                    status: 'booked',
                    date: '31/12/2020',
                    released_by: 'Alex J'
                },
                {
                    category: 'Executive',
                    quantity: 1,
                    no_of_night: 2,
                    status: 'booked',
                    date: '12/11/2020',
                    released_by: 'Alex J'
                },
                {
                    category: 'Regular',
                    quantity: 1,
                    no_of_night: 2,
                    status: 'expired',
                    date: '02/01/2021',
                    released_by: 'Alex J'
                },
                {
                    category: 'Executive',
                    quantity: 1,
                    no_of_night: 2,
                    status: 'booked',
                    date: '31/12/2020',
                    released_by: 'Alex J'
                },
                {
                    category: 'Executive',
                    quantity: 1,
                    no_of_night: 2,
                    status: 'booked',
                    date: '12/11/2020',
                    released_by: 'Alex J'
                },
                {
                    category: 'Regular',
                    quantity: 1,
                    no_of_night: 2,
                    status: 'expired',
                    date: '02/01/2021',
                    released_by: 'Alex J'
                }
            ]
        }
    }
}
</script>
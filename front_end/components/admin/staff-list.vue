<template>
    <div>
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
                            @click="moreDialog = !moreDialog"
                        >
                            mdi-eye
                        </v-icon>
                        <button class="btn btn-sm btn-outline-success">
                            <v-icon small>mdi-thumb-up</v-icon>
                        </button>
                    </template>
                </v-data-table>

                <v-pagination
                    v-if="pageCount > 1"
                    v-model="page"
                    :length="pageCount"
                    class="my-3"
                ></v-pagination>
    </div>
</template>

<script>
export default {
    name: 'StaffList',
    props: [
        'search',
        'headers',
        'staffs',
        'selected',
        'page',
        'itemsPerPage',
        'pageCount',
        'moreDialog',
    ]
}
</script>
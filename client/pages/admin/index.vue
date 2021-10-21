<template>
  <div class="container-fluid">
    <div class="row my-3">
      <div class="col-md-4">
        <Card>
          <!-- <Icon type="md-naira" size="30" /> -->
          <v-icon class="h3">NGN</v-icon>
          <div class="card-body border-left">
            <div class="h6 text-default">Revenue</div>
            <span class="float-right h5"># {{counts.revenue}}</span>
          </div>
        </Card>
      </div>
      <div class="col-md-4">
        <Card>
          <Icon type="ios-people" size="30" />
          <div class="card-body border-left">
            <div class="h6 text-default">Customers</div>
            <span class="float-right h5">{{counts.customers}}</span>
          </div>
        </Card>
      </div>
      <div class="col-md-4">
        <Card>
          <Icon type="ios-book" size="30" />
          <div class="card-body border-left">
            <div class="h6 text-default">Bookings</div>
            <span class="float-right h5">{{counts.bookings}}</span>
          </div>
        </Card>
      </div>
    </div>

    <Divider :dashed="isdashed" />

    <div class="row">
      <div class="col-md-4">
        <div class="bg-white p-3">Booking by Category</div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Bookings
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in categCounts"
                :key="item.name"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.count }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <div class="col-md-8"> <!-- Chart -->
        <div class="bg-white p-2">
          <barChart :data="barChartData" :options="barChartOptions" :height="200" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import RoleList from '../../components/admin/role-list.vue';
import staffList from '../../components/admin/staff-list.vue';
import barChart from '@/components/admin/charts/barChart.js';

export default {
    components: { staffList, RoleList, barChart },
    layout: 'Admin',
    
    async asyncData({$axios, $config}) {
        const counts = await $axios.$get(`/api/request.php?fetchCounts=true`);
        // console.log(counts)
        return {counts} 
    },
    data() {
        return {
          isdashed: true,
          fixedHeader: true,
          size: "medium",
          categCounts: null,
          barChartData: {
            labels: [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'Septempber',
              'October',
              'November',
              'December'
            ],
            datasets: [
              {
                label: 'Bookings',
                data: this.$store.state.charts.chart1,
                backgroundColor: '#03112e'
              },
            ]
          },

          barChartOptions: {
            responsive: true,
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'Annual bookings made',
              fontSize: 15,
              fontColor: '#6b7280'
            },
            tooltips: {
              backgroundColor: '#f7730e'
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    display: false
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  },
                  gridLines: {
                    display: false
                  }
                }
              ]
            }
          }
    
        }
    },
    created() {
      this.getCategCounts();
      // this.getChartData();
      // this.$store.dispatch('getChartData');
    },

    mounted() {
      this.success(true);
      // this.getChartData();
    },

    methods: {
      getCategCounts() {
        this.$axios.get(`/api/raw/categ-counts.php?categCounts=true`).then(res => {
          // console.log(res.data)
          this.categCounts = res.data;
        });
      },
      // getChartData() {
      //   this.$axios.get(`/api/raw/categ-counts.php?bookingChartdata=true`).then(res => {
      //    let data = res.data;
      //    var arr = new Array();

      //       for(let i=0; i<this.barChartData.labels.length; i++) {
      //         // console.log(data[i]);
      //         if(data[i] !== undefined) {
      //           let sum = parseInt(data[i].sum)
      //           // console.log(typeof sum)
      //           arr[i] = sum;
      //         } else  {
      //           arr[i] = 0;
      //         }
      //       }
            
      //       this.$store.state.charts.chart1 = arr;
      //       // console.log(this.barChartData.datasets.data)
      //   });
      // },
      success (nodesc) {
          this.$Notice.success({
              title: 'Welcome to Dashboard',
              desc: nodesc ? 'Here is the notification description. Here is the notification description. ' : ''
          });
      },
    }
}
</script>

<style>
  .ivu-notice-notice {
    background: rgba(120, 241, 120, 0.65) !important;
  }
  .ivu-card {
    border-left: 8px solid #f7730e !important;
  }
</style>
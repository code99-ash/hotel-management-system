<template>
  <div class="container-fluid">
    <Row :gutter="16">
      <Col :md="8">
        <Card class="overview">
          <div class="h5">NGN</div>
          <div class="card-body border-left">
            <div class="h6 text-default">Revenue</div>
            <span class="float-right h5"># {{counts.revenue}}</span>
          </div>
        </Card>
      </Col>
      <Col :md="8">
        <Card class="overview">
          <Icon type="ios-people" size="30" />
          <div class="card-body border-left">
            <div class="h6 text-default">Customers</div>
            <span class="float-right h5">{{counts.customers}}</span>
          </div>
        </Card>
      </Col>
      <Col :md="8">
        <Card class="overview">
          <Icon type="ios-book" size="30" />
          <div class="card-body border-left">
            <div class="h6 text-default">Bookings</div>
            <span class="float-right h5">{{counts.bookings}}</span>
          </div>
        </Card>
      </Col>
    </Row>

    <Divider :dashed="true" />

    <Row>
      <Col :md="24">
        <Card dis-hover class="mb-3">
          <barChart :data="barChartData" :options="barChartOptions" :height="200" />
        </Card>
      </Col>
    </Row>

  </div>
</template>

<script>
// import staffList from '../../components/admin/staff-list.vue';
import barChart from '@/components/admin/charts/barChart.js';

export default {
    components: { barChart },
    layout: 'Admin',
    
    // async asyncData({$axios, $config}) {
    //     const counts = await $axios.$get(`/api/request.php?fetchCounts=true`);
    //     // console.log(counts)
    //     return {counts} 
    // },
    data() {
        return {
          counts: {revenue: "200K", customers: "5K", bookings: "100"},
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
                data: [],
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

    mounted() {
      // this.success(true);
    },

    methods: {
      getCategCounts() {
        this.$axios.get(`/api/raw/categ-counts.php?categCounts=true`).then(res => {
          // console.log(res.data)
          this.categCounts = res.data;
        });
      },
      // success (nodesc) {
      //     this.$Notice.success({
      //         title: 'Welcome to Dashboard',
      //         desc: nodesc ? 'Here is the notification description. Here is the notification description. ' : ''
      //     });
      // },
    }
}
</script>

<style>
  .ivu-notice-notice {
    background: rgba(120, 241, 120, 0.65) !important;
  }
  .ivu-card.overview {
    border-left: 8px solid #f7730e !important;
  }
</style>
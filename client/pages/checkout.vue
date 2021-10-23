<template>
    <div>

        <div class="overlay"></div>
        <div class="banner"></div>
        <div class="sub-banner">
            <h3 class="text-center text-light title">
                Lego<span class="text-primary">.</span> Checkout
            </h3>
        </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="c-btm">
                <path fill="#fff" fill-opacity="1" d="M0,192L60,170.7C120,149,240,107,360,112C480,117,600,171,720,192C840,213,960,203,1080,213.3C1200,224,1320,256,1380,272L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>

        <div class="container mb-5">
            <div class="row">
                <div class="col-12 mb-5">
                    <div class="card shadow-sm cartCard">
                        <div class="row cardRow">
                            <div class="d-none d-md-inline col-md-6 h-100" style="overflow:hidden">
                                <img src="/images/home/vip/vip2.jpg" class="cartImg">
                            </div>
                            <div class="col-12 col-md-6 h-100 p-5">
                                <div>
                                    <table class="table table-dark">
                                        <tbody>
                                            <tr>
                                                <td class="font-weight-bold">Category</td>
                                                <td>
                                                    <select v-model="category" @change="setCheckoutCateg" class="form-control">
                                                        <option :key="i" v-for="(categ,i) in categories" :value="categ.id">{{categ.name}}</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">Number of Nights</td>
                                                <td><input type="number" @keyup="totalPrice" @change="totalPrice" min="1" class="form-control" v-model="checkout.nights"></td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">Quantity</td>
                                                <td><input type="number" @keyup="totalPrice" @change="totalPrice" v-model="checkout.quantity" class="form-control"></td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">Total</td>
                                                <td>#{{checkout.total}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <button @click.prevent="makePayment" class="btn btn-lg rounded-pill btn-warning__default float-right">Purchase Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 mx-auto mb-5 mt-3">
                    <div class="card-headers h4 text-warning__default">Your Bookings</div>
                    <Table border ref="selection" size="large" 
                        :columns="columns4" 
                        :data="myBookings"
                        :height="false ? 450 : ''" >
                    </Table>
                </div>
            </div>
        </div>
        <md-dialog :md-active.sync="showDialog">

                <div class="p-5 pb-2">
                    <h4 class="text-danger">{{log}}</h4>
                    <h5>{{logSuccess}}</h5>
                </div> 

            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
            </md-dialog-actions>
        </md-dialog>
    </div>
</template>

<script>
import "~/assets/css/style.css";

export default {
    layout: 'Customer',
    // middleware: 'userAuth',
    // async asyncData({$axios, $config}) {
    //     const categories = await $axios.$get(`/api/request.php?getCategories=true`);
    //     // console.log(categories)
    //     return {categories}
    // },
    computed: {
        user() {
            return this.$store.state.auth.user
        },
        reference(){
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
            for( let i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));
    
            return text;
        }
    },
    created() {
        this.fetchBookings();
    },
    data() {
        return {
            showDialog: false,
            log: '', 
            logSuccess: '',
            checkout: {cat_id: null, nights: 1, quantity: 1, price: 0, total: 0},
            category: 'Regular',
            paystackkey: "pk_test_8f9db213a8199cf8b178fe7ab65a463ff4e4a0d0", //paystack public key
        
            columns4: [
              {
                  title: 'Category',
                  key: 'cat_name'
              },
              {
                  title: 'Amount',
                  key: 'amount'
              },
              {
                  title: 'Quantity',
                  key: 'quantity'
              },
              {
                  title: 'Status',
                  key: 'status'
              },
              {
                  title: 'Paid with',
                  key: 'paid_with'
              },
              {
                  title: 'Date',
                  key: 'created_at'
              },
            ],
            myBookings: [],
        }
    },
    methods: {
        fetchBookings() {
            this.$axios.$get(`/api/cust-request.php?bookings=true&&userId=${this.user.id}`)
                    .then(res => {
                        // console.log(res)
                        this.myBookings = res;
                    }).catch(e => {
                        console.log(e)
                    })
        },
        setCheckoutCateg() {
            this.checkout.cat_id = this.category;
            let price = this.categories.filter(c => c.id == this.category)[0]['price'];
            this.checkout.price = price;
            this.totalPrice();
        },
        totalPrice() {
            this.checkout.total = (this.checkout.price*this.checkout.quantity) * this.checkout.nights;
        },
        
        makePayment() {
            if(!window.FlutterwaveCheckout) {
                this.log = 'There is an error connecting to the server';
                this.showDialog = true
            } else {
                this.$launchFlutterwave({
                    tx_ref: Date.now(),
                    amount: this.checkout.total,
                    currency: 'NGN',
                    payment_options: 'card,mobilemoney,ussd',
                    customer: {
                    email: this.user.email,
                    phonenumber: this.user.phone_no,
                    name: this.user.fullname
                    },
                    callback: (data) => {
                        // specified callback function
                        console.log(data)
                        
                        this.paymentReference = data.tx_ref;
                        console.log("[ayment ref", this.user.email);
                        this.transactionId = data.transaction_id;
                        let fd = new FormData();
                            fd.append('customerId', this.user.id)
                            fd.append('categoryId', this.checkout.cat_id);
                            fd.append('quantity', this.checkout.quantity);
                            fd.append('amount', this.checkout.total);
                            fd.append('paidWith', 'credit card');
                            fd.append('paymentReference', data.tx_ref);
                            fd.append('transactionId', data.transaction_id);
                            fd.append('bookRoom', true);
                        // Make a post request to submit booking
                        this.$axios.post(`/api/request.php`, fd).then(response => {
                            this.logSuccess = response.data;
                            this.log = '';
                            this.showDialog = true;
                        });
                    },
                    customizations: {
                    title: 'My store',
                    description: 'Payment for items in cart',
                    logo: 'https://assets.piedpiper.com/logo.png'
                    }
                })
            }
        }
    }
}
</script>

<style>
    .cartImg {
        height: 100%;
        width: 100%;
        transform: scale(1.8);
        transition: .8s ease-in-out;
    }
    .cartImg:hover {
        transform: scale(1.4);
    }
    .cartCard, .cardRow {
        height: 380px;
        overflow: hidden;
    }
    .text-md {
        font-weight: bold;
    }
    .overlay {
        width: 100vw;
        height: 60vh;
        background: #000;
        position: absolute;
    }
    .banner {
        width: 100vw;
        height: 60vh;
        background: url('/images/home/vip/vip4.jpg');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        opacity: .4;
    }
    .sub-banner {
        position: absolute;
        top: 50px;
        left: 0;
        padding-top: 50px;
        width: 100vw;
        height: 100%;
    }
    .c-btm {
        position: absolute;
        bottom: 50vh;
        fill: #ffffff !important;
    }
    .title {
        font-size: 75px;
        text-shadow: 8px 4px 4px rgb(3, 1, 12);
    }
    .custom__input {
        min-width: 80px !important;
        max-width: 100px !important;
    }
    .btn-warning__default {
        background: rgb(243, 113, 7);
    }
    .text-warning__default {
        color: rgb(243, 113, 7);
    }
    .checkout {
        background: rgba(37, 36, 36, 0.274) !important;
    }
</style>
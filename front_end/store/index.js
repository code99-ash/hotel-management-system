import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './auth'
import custModule from './customer'
import adminModule from './customer'

Vue.use(Vuex);

const vuexStore = () => {
    return new Vuex.Store({
        namespaced: true,
        modules: {
            auth: authModule,
            customer: custModule,
            admin: adminModule
        },
        state: () => ({
            staffData: {},
            roleData: {},
            charts: {
                chart1: [125, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            }
        }),
        mutations: {
            SET_STAFF_DATA: (state, data) => {
                state.staffData = data;
            },
            SET_ROLE_DATA: (state, data) => {
                state.roleData = data;
            },
            GET_CHART_DATA: (state, data) => {
                state.charts.chart1 = data;
            }
        },
        actions: {
            setStaffData({commit}, data) {
                commit('SET_STAFF_DATA', data)
            },
            setRoleData({commit}, data) {
                commit('SET_ROLE_DATA', data)
            },
            nuxtServerInit({commit}) {
                    this.$axios.get(`/api/raw/categ-counts.php?bookingChartdata=true`).then(res => {
                    let data = res.data;
                    var arr = new Array();
            
                        for(let i=0; i<12; i++) {
                            if(data[i] !== undefined) {
                            let sum = parseInt(data[i].sum)
                            arr[i] = sum;
                            } else  {
                            arr[i] = 0;
                            }
                        }
                        commit('GET_CHART_DATA', arr);
                    })
            },
            
    } 
    
        
    });
} 

export default vuexStore
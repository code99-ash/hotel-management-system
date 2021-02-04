import userAuth from "../middleware/userAuth";

export default {
    state: () => ({
        user: {email: null},
        cart: [],
        cartQty: 0,
        cartTotal: 0,
    }),
      
    mutations: {
        ADD_TO_CART: (state, item) => {
            let check = state.cart.find(i => i.id == item.id);
            if(check) {
                check.quantity += 1;
                let UnfixedPrice = check.quantity * check.price;
                check.total = parseFloat(UnfixedPrice.toFixed(2))
            } else {
                let newItem = {
                    'id': item.id,
                    'category': item.category,
                    'price': item.price,
                    'quantity': 1,
                    'nights': 1,
                    'total' : item.price 
                } 
                state.cart = [...state.cart, newItem];
            }
        },

        CHANGE_NIGHTS: (state, num, id) => {
            let check = state.card.find(i => i.id == id);
            if(check) {
                check.night = num;
            }
        },


        NEW_QTY: (state) => {
            let qtyArr = new Array();
    
            //Push all quantity in cart into this array
            state.cart.forEach(i => {
                qtyArr.push(parseInt(i.quantity));
            });
            
            if(qtyArr.length > 0) {
                state.cartQty = qtyArr.reduce(function(x, y) {
                    let a = x + y;
                    return a
                })
            }
        },
    
    
        NEW_TOTAL: (state) => {
            //get all price in the cart
            let allPrice = new Array();
    
            state.cart.forEach(i => {
                allPrice.push(parseFloat(i.total))
            });
    
            let UnfixedValue = allPrice.reduce(function(a,b) {
                let x = a + b;
                return x;
            });
    
            state.cartTotal = UnfixedValue.toFixed(2);
        },
    
        CHANGE_QTY: (state, payload) => {
            let num = payload.event.target.value; // New quantity
            state.cart.forEach(p => {
                if(p.id == payload.id) {
                    p.quantity = num;
                }
    
                let UnfixedTotal = p.price * p.quantity
                p.total = UnfixedTotal.toFixed(2)
            });
            console.log("payload", payload)
            console.log("cart", state.cart)
    
                mutations.NEW_QTY(state);      // Add all quantity in cart
                mutations.NEW_TOTAL(state); // Add all price in cart
        },
    },
      
    actions: {
        async nuxtServerInit() {
            
        },

        async fetch_active_products({ commit }) {
            const response = await this.$axios.get(`/api/customer-request.php?bookings=true&&userId=${state.user}`);
            const data = response.data;
            commit("FETCH_ACTIVE_PRODUCTS", data);
        },
        addToCart({ commit }, item) {
            commit('ADD_TO_CART', item)
        },
        changeQty({commit}, payload) {
            commit('CHANGE_QTY', payload)
        },
        changeNights({commit}, num, id) {
            commit('CHANGE_NIGHTS', num, id)
        }
    }
}

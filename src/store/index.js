import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
    state: { // data
        products: []
    },

    getters: {
        availableProducts: state => {
            return state.products.filter(product => product.inventory > 2)
        }
    },

    actions: {
        fetchProduct() {
            // make the call

        }
    },

    mutations: {
        setProducts(state, products) {
            // update products

            state.products = products
        }
    }
})
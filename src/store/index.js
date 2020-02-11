import Vuex from 'vuex'
import Vue from 'vue'
import shop from "@/api/shop";


Vue.use(Vuex);

export default new Vuex.Store({
    state: { // data
        products: [],
        // {id, quanity }
        cart: []
    },

    getters: {
        availableProducts: state => {
            return state.products.filter(product => product.inventory > 0)
        },

        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.id === cartItem.id);
                return {
                    title: product.title,
                    price: product.price,
                    quantity: cartItem.quantity
                }
            })
        },

        cartTotal (state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        }
    },

    actions: { // = methods
        fetchProducts({ commit }) {
            return new Promise((resolve) => {
                // call setProducts mutation
                // call setProducts mutation
                shop.getProducts(products => {
                    commit('setProducts', products);
                    resolve()
                })
            })
        },

       addProductToCart( context, product) {
            if (product.inventory > 0) {
                const cartItem = context.state.cart.find(item => item.id === product.id);
                // find cartItem
                if (!cartItem) {
                    // push Product to cart
                    context.commit('pushProductToCart', product.id)
                } else {
                    // incrementItemQuantity
                    context.commit('incrementItemQuantity', cartItem)
                }
                context.commit('decrementProductInventory', product)
            }

       }
    },

    mutations: {
        setProducts(state, products) {
            // update products
            state.products = products
        },

        // const cartItem = {id: 123, quantity: 2}
        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        decrementProductInventory(state, product) {
            product.inventory--
        }

    }
})
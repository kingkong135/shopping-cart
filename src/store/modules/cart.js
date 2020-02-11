import shop from '@/api/shop'

export default {
    state: {
        // {id, quanity }
        items: [],
        checkoutStatus: null
    },

    getters: {
        cartProducts (state, getters, rootState) {
            return state.items.map(cartItem => {
                const product = rootState.products.items.find(product => product.id === cartItem.id)
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

    mutations: {
        // const cartItem = {id: 123, quantity: 2}
        pushProductToCart(state, productId) {
            state.items.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },

        emptyCart(state) {
            state.items = []
        }
    },

    actions: {
        addProductToCart({state, getters, commit}, product) {
            if (getters.productIsInStock) {
                const cartItem = state.items.find(item => item.id === product.id);
                // find cartItem
                if (!cartItem) {
                    // push Product to cart
                    commit('pushProductToCart', product.id)
                } else {
                    // incrementItemQuantity
                    commit('incrementItemQuantity', cartItem)
                }
                commit('decrementProductInventory', product)
            }

        },

        checkout({state, commit}) {
            shop.buyProducts(
                state.items,
                () => {
                    commit('emptyCart');
                    commit('setCheckoutStatus', 'success')
                },

                () => {
                    commit('setCheckoutStatus', 'fail')
                }
            )
        }
    }
}
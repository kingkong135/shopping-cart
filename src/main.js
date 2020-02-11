import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import {currency} from './currency'

Vue.config.productionTip = false;
Vue.filter('currency', currency);

new Vue({
    el: '#app',
    store,
    render: h => h(App)
});
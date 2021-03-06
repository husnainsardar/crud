/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
import Vue from 'vue';
window.Vue = require('vue');
import VueSimpleAlert from "vue-simple-alert";

Vue.use(VueSimpleAlert);

// import axios from 'axios';
// import { routes } from './routes';
//  Vue.component('index-component', require('./components/index.vue').default);
Vue.component('home-component', require('./components/home.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// Vue.component('modal', {
//     template: '#modal-template'
var app = new Vue({
    el: '#app',

});
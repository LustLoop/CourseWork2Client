import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

export const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = 'http://localhost:8080';
    },

    get(resource, options) {
        return Vue.axios.get(resource, options);
    },

    post(resource, value) {
        return Vue.axios.post(resource, value)
    }
}
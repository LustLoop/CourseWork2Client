import Vue from "vue";
import axios from "axios";

export const ApiService = {
    get(resource) {
        return axios.get('http://localhost:8080/' + resource)
    },

    post(resource, value) {
        return Vue.axios.post(resource, value)
    }
}
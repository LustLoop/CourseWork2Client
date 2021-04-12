import Vue from "vue";
import axios from "axios";

const url = 'http://localhost:8080/';

export const ApiService = {
    getAll(resource) {
        return axios.get(url + resource)
    },
    get(resource, params) {
        return axios.get(url + resource, {
            params: params
        })
    },

    post(resource, value) {
        return Vue.axios.post(url + resource, value)
    }
}
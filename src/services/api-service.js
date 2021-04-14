import axios from "axios";

const url = 'http://localhost:8080/';

export const ApiService = {
    get(resource, params) {
        return axios.get(url + resource, {
            params: {
                id: params
            }
        })
    },

    post(resource, value) {
        console.log(value)
        return axios.post(url + resource, value)
    }
}
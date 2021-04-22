import axios from "axios";
import qs from 'qs'

const url = 'http://localhost:8080/';

export const ApiService = {
    get(resource, id, filters, sortType) {
        return axios.get(url + resource, {
            params: {
                id,
                ...filters,
                sortType
            },
            paramsSerializer: params => {
                return qs.stringify(params, {arrayFormat: "repeat"})
            }
        })
    },

    post(resource, value) {
        console.log(value)
        return axios.post(url + resource, value)
    }
}
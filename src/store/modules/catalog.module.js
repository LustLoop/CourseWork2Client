import {FETCH_PRODUCTS} from "../actions.type";
import {ApiService} from "@/services/api-service";
import {SET_PRODUCTS} from "../mutations.type";

const initialState = {
    products: []
};

export const state = { ...initialState };

export const actions = {
    async [FETCH_PRODUCTS](context) {
        ApiService.get('products')
            .then((response) => {
                context.commit(SET_PRODUCTS, response.data)
            });
    }
};

export const mutations = {
    [SET_PRODUCTS](state, products) {
        state.products = products;
    }
}

export const getters = {
    products(state) {
        return state.products;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
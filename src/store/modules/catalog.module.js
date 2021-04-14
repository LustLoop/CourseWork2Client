import {ADD_NEW_PRODUCT, FETCH_PRODUCTS, GET_PRODUCT_INFO} from "../actions.type";
import {ApiService} from "@/services/api-service";
import {SET_ACTIVE_PRODUCT, SET_NEW_PRODUCT, SET_PRODUCTS} from "../mutations.type";

const initialState = {
    products: [],
    activeProduct: {}
};

export const state = { ...initialState };

export const actions = {
    async [FETCH_PRODUCTS](context) {
        ApiService.get('products')
            .then((response) => {
                context.commit(SET_PRODUCTS, response.data)
            });
    },
    async [GET_PRODUCT_INFO](context, payload) {
        ApiService.get('products/product', payload)
            .then((response) => {
                context.commit(SET_ACTIVE_PRODUCT, response.data)
            });
    },
    async [ADD_NEW_PRODUCT](context, payload) {
        ApiService.post('products', payload)
            .then((response) => {
                context.commit(SET_ACTIVE_PRODUCT, response.data)
            });
    }
};

export const mutations = {
    [SET_PRODUCTS](state, products) {
        state.products = products;
    },
    [SET_ACTIVE_PRODUCT](state, activeProduct) {
        state.activeProduct = activeProduct;
    },
    [SET_NEW_PRODUCT](state, newProduct) {
        state.products = state.products.push(newProduct)
    }
}

export const getters = {
    products(state) {
        return state.products;
    },
    activeProduct(state) {
        return state.activeProduct;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
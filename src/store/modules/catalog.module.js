import {ADD_FILTERS, ADD_NEW_PRODUCT, FETCH_PRODUCTS, GET_PRODUCT_INFO} from "../actions.type";
import {ApiService} from "@/services/api-service";
import {RESET_FILTERS, SET_ACTIVE_PRODUCT, SET_FILTERS, SET_NEW_PRODUCT, SET_PRODUCTS} from "../mutations.type";

const initialState = {
    products: [],
    activeProduct: {},
    filters: {}
};

export const state = { ...initialState };

export const actions = {
    async [FETCH_PRODUCTS]({getters, commit}, payload) {
        console.log(getters.filters)
        ApiService.get('products/page', payload, getters.filters)
            .then((response) => {
                commit(SET_PRODUCTS, response.data)
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
    },
    async [ADD_FILTERS](context, payload) {
        context.commit(SET_FILTERS, payload)
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
        state.products = state.products.push(newProduct);
    },
    [SET_FILTERS](state, filters) {
        console.log(filters)
        let filter = {
            title: filters.title,
            types: []
        };
        filters.tool ? filter.types.push('tool') : null;
        filters.worktable ? filter.types.push('worktable') : null;
        filters.priceRange !== undefined ||  filters.priceRange !== [0, 0] ? filter.startPriceRange = filters.priceRange[0] : null;
        filters.priceRange !== undefined ||  filters.priceRange !== [0, 0] ? filter.endPriceRange = filters.priceRange[1] : null;
        state.filters = filter;
    },
    [RESET_FILTERS](state) {
        state.filters = {};
    }
}

export const getters = {
    products(state) {
        return state.products;
    },
    activeProduct(state) {
        return state.activeProduct;
    },
    filters(state) {
        return state.filters;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
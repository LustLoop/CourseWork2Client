import {ADD_FILTERS, ADD_NEW_PRODUCT, CHANGE_SORT_TYPE, FETCH_PRODUCTS, GET_PRODUCT_INFO} from "../actions.type";
import {ApiService} from "@/services/api-service";
import {
    RESET_FILTERS,
    SET_ACTIVE_PRODUCT,
    SET_FILTERS,
    SET_NEW_PRODUCT,
    SET_PRODUCTS,
    SET_SORT_TYPE
} from "../mutations.type";

const initialState = {
    products: [],
    activeProduct: {},
    filters: {},
    sortType: 'name'
};

export const state = { ...initialState };

export const actions = {
    async [FETCH_PRODUCTS]({getters, commit}, payload) {
        ApiService.get('products/page', payload, getters.filters, getters.sortType)
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
    },
    async [CHANGE_SORT_TYPE](context, payload) {
        context.commit(SET_SORT_TYPE, payload)
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
        let filter = {
            title: filters.title,
            types: []
        };
        filters.tool ? filter.types.push('1') : null;
        filters.worktable ? filter.types.push('2') : null;
        filters.priceRange !== undefined ? filter.startPriceRange = filters.priceRange[0] : null;
        filters.priceRange !== undefined ? filter.endPriceRange = filters.priceRange[1] : null;
        state.filters = filter;
    },
    [RESET_FILTERS](state) {
        state.filters = {};
    },
    [SET_SORT_TYPE](state, sortType) {
        state.sortType = sortType;
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
    },
    sortType(state) {
        return state.sortType;
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
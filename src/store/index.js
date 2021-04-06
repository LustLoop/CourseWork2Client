import Vue from "vue";
import Vuex from "vuex";
import catalog from './modules/catalog.module'


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        catalog
    }
});
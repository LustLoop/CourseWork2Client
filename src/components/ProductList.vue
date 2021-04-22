<template>
  <div>
    <SearchField />
    <a-button type="primary" v-on:click="switchAddFormVisibility"> Add new product </a-button>
    <AddProductForm v-if="formVisible" />
    <br />
    <a-select default-value="name" @change="changeTypeOfSort" style="width: 10rem;">
      <a-select-option value="name">
        By name
      </a-select-option>
      <a-select-option value="price">
        By price
      </a-select-option>
      <a-select-option value="efficiency">
        By efficiency
      </a-select-option>
    </a-select>
    <div class="product-list">
      <Product v-for="(product, index) in products" :product="product" :key="index" />
    </div>
    <a-pagination :total="50" show-less-items @change="updatePageProducts" />
  </div>
</template>

<script>

import store from "../store/index";
import {mapGetters} from "vuex";
import {CHANGE_SORT_TYPE, FETCH_PRODUCTS} from "@/store/actions.type";
import Product from "@/components/ProductListItem";
import AddProductForm from "@/components/AddProductForm";
import SearchField from "@/components/SearchField";

export default {
  name: "ProductList",
  data() {
    return {
      formVisible: false,
      visibleProducts: []
    }
  },
  components: {
    Product,
    AddProductForm,
    SearchField
  },
  store,
  computed: {
    ...mapGetters([
        'products'
    ]),
    prods() {
      return this.products;
    },
  },
  methods: {
    switchAddFormVisibility() {
      this.formVisible = !this.formVisible
    },
    updatePageProducts(pageNumber) {
      this.$store.dispatch(FETCH_PRODUCTS, pageNumber);
    },
    changeTypeOfSort(sortType) {
      this.$store.dispatch(CHANGE_SORT_TYPE, sortType);
      this.$store.dispatch(FETCH_PRODUCTS, 1);
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_PRODUCTS, 1);
  }
}
</script>

<style scoped>
  .product-list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 3rem 15%;
  }
</style>
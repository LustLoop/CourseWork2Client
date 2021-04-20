<template>
  <div>
    <SearchField />
    <a-button type="primary" v-on:click="switchAddFormVisibility"> Add new product </a-button>
    <AddProductForm v-if="formVisible" />
    <div class="product-list">
      <Product v-for="(product, index) in products" :product="product" :key="index" />
    </div>
    <a-pagination :total="50" show-less-items @change="updatePageProducts" />
  </div>
</template>

<script>

import store from "../store/index";
import {mapGetters} from "vuex";
import {FETCH_PRODUCTS} from "@/store/actions.type";
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
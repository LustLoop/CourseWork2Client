<template>
  <div>
    <a-button type="primary" v-on:click="writeShit"> Add new product </a-button>
    <AddProductForm />
    <div class="product-list">
      <Product v-for="(product, index) in products" :product="product" :key="index" />
    </div>
  </div>
</template>

<script>

import store from "../store/index";
import {mapGetters} from "vuex";
import {FETCH_PRODUCTS} from "@/store/actions.type";
import Product from "@/components/ProductListItem";
import AddProductForm from "@/components/AddProductForm";

export default {
  name: "ProductList",
  components: {
    Product,
    AddProductForm
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
    writeShit() {
      console.log('Shit')
    }
  },
  mounted() {
    this.$store.dispatch(FETCH_PRODUCTS);
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
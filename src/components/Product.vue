<template>
  <div class="product">
    <p>{{activeProduct.title}}</p>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Product",
  computed: {
    ...mapGetters([
      'activeProduct'
    ]),
    title() {
      return this.activeProduct?.title
    }
  }
}
</script>

<style scoped>
  .product {
    width: 80%;
    height: 70rem;
    background-color: #234234;
    margin: 0 auto;
  }
</style>
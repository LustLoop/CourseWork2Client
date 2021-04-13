<template>
  <div class="product">
    <p>{{activeProduct.title}}</p>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {GET_PRODUCT_INFO} from "@/store/actions.type";

export default {
  name: "Product",
  computed: {
    ...mapGetters([
      'activeProduct'
    ]),
    title() {
      return this.activeProduct?.title
    }
  },
  mounted() {
    this.$store.dispatch(GET_PRODUCT_INFO, this.$route.query.id);
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
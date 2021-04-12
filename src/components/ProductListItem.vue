<template>
    <Card class="product-card" :title=product.title @click="testRouter">
      <p class="product-type" v-if="getProductType" v-text="getProductType" />
      <p v-text="'Price: ' + product.price + ' UAH'" />
      <p v-if="getWorkType" v-text="'Type of work: ' + getWorkType" />
      <router-view />
    </Card>
</template>

<script>
import { Card } from 'ant-design-vue';
import store from "@/store";
import {GET_PRODUCT_INFO} from "@/store/actions.type";

export default {
  name: "ProductListItem",
  store,
  props: {
    product: {type: Object}
  },
  components: {
    Card
  },
  computed: {
    getProductType() {
      switch (this.product.typeOfProduct) {
        case 'WORKTABLE':
          return 'Worktable';
        case 'TOOL':
          return 'Tool';
        default:
          return null
      }
    },
    getWorkType() {
      switch (this.product.worktableType) {
        case 'PLASMIC':
          return 'Plasmic';
        case 'HYDRAULIC':
          return 'Hydraulic';
        case 'LASER':
          return 'Laser';
        default:
          return null
      }
    }
  },
  methods: {
    testRouter() {
      this.$store.dispatch(GET_PRODUCT_INFO, this.product.id);
      this.$router.push('product/' + this.product.id);
    }
  }
}
</script>

<style scoped>
  .product-card {
    margin: 2rem 0;
    width: 40%;
    text-align: left;
  }

  .product-type {
    float: right;
    position: relative;
    background-color: #F64C74;
    padding: 0.5rem;
    width: auto;
    border-radius: 1rem;
  }

</style>
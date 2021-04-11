<template>
    <Card class="product-card" :title=product.title onclick="">
      <p class="product-type" v-if="getProductType" v-text="getProductType" />
      <p v-text="'Price: ' + product.price + ' UAH'" />
      <p v-if="getWorkType" v-text="'Type of work: ' + getWorkType" />
    </Card>
</template>

<script>
import { Card } from 'ant-design-vue';

export default {
  name: "ProductListItem",
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
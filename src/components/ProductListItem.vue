<template>
    <Card class="product-card" :title=product.title>
      <a-tag slot="extra" color="red" v-if="getProductType" v-text="getProductType" />
      <img :src="product.image" alt="" style="float: right; margin: 0 0 1rem 2rem" width="40%"/>
      <p v-text="'Price: ' + product.price + ' UAH'" />
      <p v-if="getWorkType" v-text="'Type of work: ' + getWorkType" />
      <p v-text="'Description: ' + formatDescription(product.description)" />
      <a-button @click="goToDetails">Details</a-button>
      <router-view />
    </Card>
</template>

<script>
import { Card } from 'ant-design-vue';
import store from "@/store";

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
    goToDetails() {
      this.$router.push({path: 'products', query: {id: this.product.id}});
    },
    formatDescription(description) {
      if (description.length > 250)
      {
        return description.slice(0, 250) + "...";
      } else {
        return description;
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
    border-radius: 3px;
  }

</style>
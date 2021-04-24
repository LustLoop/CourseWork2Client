<template>
  <div class="product">
    <h1>Title: {{activeProduct.title}}</h1>
    <h2>Price: {{activeProduct.price}}</h2>
    <p>Accuracy: {{activeProduct.accuracy}} </p>
    <p>Features: <span class="feature" v-for="feature in features" :key="feature.title">{{feature.title}}</span> </p>
    <p v-if="activeProduct.typeOfProduct === 'WORKTABLE'">Efficiency coefficient: {{activeProduct.efficiency}}</p>
    <p v-if="activeProduct.typeOfProduct === 'WORKTABLE'">Average electricity consumes for one product unit: {{activeProduct.electricityConsumes}}</p>
    <p v-if="activeProduct.typeOfProduct === 'WORKTABLE'">Average time consumes for one product unit: {{activeProduct.timeConsumesForOneUnit}}</p>
    <p v-if="activeProduct.worktableType === 'LASER'">Average consumes for one cartridge: {{activeProduct.cartridgeConsumes}}</p>
    <p v-if="activeProduct.worktableType === 'LASER'">Times one cartridge can be used: {{activeProduct.cartridgeUsageTimes}}</p>
    <p v-if="activeProduct.worktableType === 'PLASMIC'">Average gas consumes for one product unit: {{activeProduct.gasConsumes}}</p>
    <p>Description: {{activeProduct.description}}</p>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {GET_PRODUCT_INFO} from "@/store/actions.type";

export default {
  name: "Product",
  data() {
    return {
      features: []
    }
  },
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
    this.$nextTick(() => {
      if (this.activeProduct.portable) {
        this.features.push({title: 'Portable'})
      }
      if (this.activeProduct.consumable) {
        this.features.push({title: 'Consumable'})
      }
      if (this.activeProduct.rechargeable) {
        this.features.push({title: 'Rechargeable'})
      }
    })
  },
}
</script>

<style scoped>
  .product {
    width: 60%;
    background-color: white;
    padding: 5rem 10rem;
    margin: 0 auto;
    border-radius: 1rem;
    text-align: left;
  }

  .feature {
    background-color: lightgreen;
    padding: 0.5rem;
    margin: 0.2rem;
    border-radius: 1rem;
  }
</style>
<template>
  <a-form class="search-form" :form="form" @submit="handleSubmit">
    <a-form-item class="search-field">
      <a-input
          style="width: 90%"
          v-decorator="[
          'title',
          { rules: [{ required: false, message: 'Enter the title' }] }
        ]"
          placeholder="Search by title"
      >
        <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
    <a-button type="dashed" class="advanced-search-button" @click="changeSearchType">{{advancedSearchButtonTitle}}</a-button>
    <div v-if="this.advancedSearch" class="advanced-search-form">
      <p style="width: 100%">By product type:</p>
      <a-form-item class="checkbox-item">
        <a-checkbox
            v-decorator="[
            'tool',
            {
              valuePropName: 'checked',
              initialValue: false,
            },
          ]"
        >
          Tool
        </a-checkbox>
      </a-form-item>
      <a-form-item class="checkbox-item">
        <a-checkbox
            v-decorator="[
            'worktable',
            {
              valuePropName: 'checked',
              initialValue: false,
            },
          ]"
        >
          Worktable
        </a-checkbox>
      </a-form-item>
      <p style="width: 100%">By price:</p>
      <a-form-item class="slider">
        <a-slider
            range
            :min="0"
            :max="1000000"
            v-decorator="['priceRange']"
            @change="changePriceRange"
        />
      </a-form-item>
      <p class="slider-value" style="text-align: left">{{sliderValue[0]}} UAH</p>
      <p class="slider-value" style="text-align: right">{{sliderValue[1]}} UAH</p>
    </div>
  </a-form>
</template>

<script>


import {ADD_FILTERS, FETCH_PRODUCTS} from "@/store/actions.type";

export default {
  name: "SearchField",
  data() {
    return {
      sliderValue: [0, 1000000],
      advancedSearch: false,
      advancedSearchButtonTitle: "Advanced search",
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.advancedSearch) {
            this.$store.dispatch(ADD_FILTERS, values);
            this.$store.dispatch(FETCH_PRODUCTS, 1);
          } else {
            console.log(values.title)
            this.$store.dispatch(ADD_FILTERS, {title: values.title===undefined?"":values.title});
            this.$store.dispatch(FETCH_PRODUCTS, 1);
          }
        }
      })
    },
    handleChangeOfSearchMode(value) {
      this.type = value
    },
    changeSearchType() {
      if (this.advancedSearch) {
        this.advancedSearchButtonTitle = "Advanced search";
      } else {
        this.advancedSearchButtonTitle = "Close advanced search"
      }
      this.advancedSearch = !this.advancedSearch;
    },
    changePriceRange(value) {
      this.sliderValue = value;
    }
  },
}
</script>

<style scoped>
form {
  width: 50%;
  margin: 3rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
}

.search-field {
  width: 60%;
}

.search-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.advanced-search-button {
  width: 40%;
  margin: 0 30%;
}

.advanced-search-form {
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
  padding: 1rem 1rem 1rem 1rem;
}

.checkbox-item {
  width: 50%;
}

.slider {
  width: 100%;
  margin-bottom: 0;
}

.slider-value {
  width: 50%;
}
</style>
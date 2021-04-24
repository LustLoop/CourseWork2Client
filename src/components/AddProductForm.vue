<template>
  <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 10 }" @submit="handleSubmit">
    <a-form-item label="Title">
      <a-input
        v-decorator="[
          'title',
          { rules: [{ required: true, message: 'Please enter title' }] }
        ]"
          placeholder="Grinding machine 2000"
      />
    </a-form-item>
    <a-form-item label="Price">
      <a-input
          @keypress="onlyForNumbers"
          v-decorator="[
          'price',
          { rules: [{ required: true, message: 'Please enter the price' }] }
        ]"
          placeholder="420.69"
      />
    </a-form-item>
    <a-form-item label="Energy resource">
      <a-input
          v-decorator="[
        'energyResource',
        { rules: [{ required: true, message: 'Please enter the source of energy' }] },
        ]"
          placeholder="socket"
      />
    </a-form-item>
    <a-form-item label="Accuracy">
      <a-input
          v-decorator="[
        'accuracy',
        { rules: [{ required: true, message: 'Please enter how accurate is this product' }] },
        ]"
          placeholder="not too accurate"
      />
    </a-form-item>
    <a-form-item label="Type">
      <a-select
        v-decorator="[
        'typeOfProduct',
        { rules: [{ required: true, message: 'Please select the type of product' }] },
        ]"
        placeholder="Select an option"
        @change="handleSelectTypeChange"
      >
        <a-select-option value="WORKTABLE">
          Worktable
        </a-select-option>
        <a-select-option value="TOOL">
          Tool
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-if="this.type === 'WORKTABLE'" label="Electricity consumes">
      <a-input
          @keypress="onlyForNumbers"
          v-decorator="[
        'electricityConsumes',
        { rules: [{ required: this.type === 'WORKTABLE', message: 'Please enter electricity consumes of this product' }] },
        ]"
          placeholder="Select an option"
      >
      </a-input>
    </a-form-item>
    <a-form-item v-if="this.type === 'WORKTABLE'" label="Time consumes (hours)">
      <a-input
          @keypress="onlyForNumbers"
          v-decorator="[
        'timeConsumes',
        { rules: [{ required: this.type === 'WORKTABLE', message: 'Please enter time needed for one unit of product' }] },
        ]"
          placeholder="Select an option"
      >
      </a-input>
    </a-form-item>
    <a-form-item v-if="this.type === 'WORKTABLE'" label="Worktable type">
      <a-select
          v-decorator="[
        'worktableType',
        { rules: [{ required: this.type === 'WORKTABLE', message: 'Please select type of worktable' }] },
        ]"
          placeholder="Select an option"
          @change="handleSelectWorktableTypeChange"
      >
        <a-select-option value="LASER">
          Laser
        </a-select-option>
        <a-select-option value="PLASMIC">
          Plasmic
        </a-select-option>
        <a-select-option value="HYDRAULIC">
          Hydraulic
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-if="this.worktableType === 'PLASMIC'" label="Gas consumes">
      <a-input
          @keypress="onlyForNumbers"
          v-decorator="[
        'gasConsumes',
        { rules: [{ required: this.worktableType === 'PLASMIC', message: 'Please gas usage for one unit' }] },
        ]"
          placeholder="Select an option"
      >
      </a-input>
    </a-form-item>
    <a-form-item v-if="this.worktableType === 'LASER'" label="Cartridge consumes">
      <a-input
          @keypress="onlyForNumbers"
          v-decorator="[
        'cartridgeConsumes',
        { rules: [{ required: this.worktableType === 'LASER', message: 'Please enter cost of cartridge' }] },
        ]"
          placeholder="Select an option"
      >
      </a-input>
    </a-form-item>
    <a-form-item v-if="this.worktableType === 'LASER'" label="Cartridge usage times">
      <a-input
          @keypress="onlyForNumbers"
          v-decorator="[
        'cartridgeUsageTimes',
        { rules: [{ required: this.worktableType === 'LASER', message: 'Please enter how many times cartridge can be used' }] },
        ]"
          placeholder="Select an option"
      >
      </a-input>
    </a-form-item>
    <a-form-item v-if="this.type === 'TOOL'" label="Worktable type">
      <a-select
          v-decorator="[
        'toolType',
        { rules: [{ required: this.type === 'TOOL', message: 'Please select type of tool' }] },
        ]"
          placeholder="Select an option"
          @change="handleSelectToolTypeChange"
      >
        <a-select-option value="HAND_TOOL">
          Hand tool
        </a-select-option>
        <a-select-option value="MARKUP_TOOL">
          Markup tool
        </a-select-option>
        <a-select-option value="MEASURING_TOOL">
          Measuring tool
        </a-select-option>
        <a-select-option value="OTHER">
          Other
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item v-if="this.type === 'WORKTABLE'">
      <a-checkbox
          v-decorator="[
          'portable',
          {
            valuePropName: 'checked',
            initialValue: false,
          },
        ]"
      >
        Portable
      </a-checkbox>
    </a-form-item>
    <a-form-item v-if="this.type === 'TOOL'">
      <a-checkbox
          v-decorator="[
          'consumable',
          {
            valuePropName: 'checked',
            initialValue: false,
          },
        ]"
      >
        Consumable
      </a-checkbox>
    </a-form-item>
    <a-form-item v-if="this.type === 'TOOL'">
      <a-checkbox
          v-decorator="[
          'rechargeable',
          {
            valuePropName: 'checked',
            initialValue: false,
          },
        ]"
      >
        Rechargeable
      </a-checkbox>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-button type="primary" html-type="submit">
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import {ADD_NEW_PRODUCT} from "@/store/actions.type";

export default {
  name: "AddProductForm",
  data() {
    return {
      type: null,
      worktableType: null,
      toolType: null,
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          this.$store.dispatch(ADD_NEW_PRODUCT, values);
        }
      });
    },
    handleSelectTypeChange(value) {
      this.type = value
    },
    handleSelectWorktableTypeChange(value) {
      this.worktableType = value
    },
    handleSelectToolTypeChange(value) {
      this.toolType = value
    },
    onlyForNumbers ($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

      if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 )) {
        $event.preventDefault();
      }
    }
  },
}
</script>

<style scoped>
  form {
    width: 60%;
    margin: 3rem auto;
    padding: 2rem 2rem 2rem 8rem;
    background-color: white;
    border-radius: 1rem;
  }
</style>
<template>
  <div class="field">
    <label class="label">{{ props.label }}</label>
    <input type="text" class="input" />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  // Tarvitaanko, kun v-model?
  value: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "",
  },
  // Readonly separately?
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: null,
  },
});
</script>
<style lang="scss" scoped>
.field {
  display: flex;
  align-items: center;
}
.label {
  //transform: translateY(-50%);
  z-index: 1;
  position: absolute;
  margin: 15px;
}
.input {
  padding: 15px;
  border: 1px solid black !important;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  border: 0px transparent;
  width: 100%;
  height: 100%;
  background-color: transparent;
  &:focus {
    border: 5px solid red !important;
    outline: none !important;
  }
}
</style>

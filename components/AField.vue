<template>
  <div class="afield">
    <input
      v-model="value"
      class="input"
      type="text"
      :placeholder="props.label"
      :disabled="props.disabled"
    />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  label: {
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
  disabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array,
    default: null,
  },
});

const value = defineModel();
</script>
<style lang="scss" scoped>
.afield {
  display: flex;
  align-items: center;
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

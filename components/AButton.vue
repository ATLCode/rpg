<template>
  <button class="button" type="button" :disabled="props.disabled">
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
// Pure type annotations or not?

const props = defineProps({
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
</script>
<style lang="scss" scoped>
.button {
  padding: 1rem;
  background-color: red;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
</style>

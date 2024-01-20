<template>
  <button
    class="button"
    type="button"
    :disabled="props.disabled"
    :style="`color: var(--${color})`"
  >
    <slot></slot>
  </button>
</template>
<script lang="ts" setup>
// Pure type annotations or not?

const props = defineProps({
  color: {
    type: String,
    default: "text",
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
// Do style object here
// Put things like disabled effects on style there, should it be computed?
</script>
<style lang="scss" scoped>
.button {
  padding: 1rem;
  background-color: red;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
</style>

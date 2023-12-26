<template>
  <button type="button">{{ props.text }}</button>
</template>
<script lang="ts" setup>
// Pure type annotations or not?

const props = defineProps({
  text: {
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
<style lang="scss" scoped></style>

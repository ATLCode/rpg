<template>
  <input type="text" />
</template>
<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
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
<style lang="scss" scoped></style>

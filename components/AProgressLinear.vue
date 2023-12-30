<template>
  <div class="aprogress">
    <progress :value="value" :max="props.max"></progress>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  height: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  // Later do loader variant
  variant: {
    type: String,
    default: "",
  },
  max: {
    type: Number,
    default: 100,
  },
});

const value = defineModel<number>();
</script>
<style lang="scss" scoped></style>

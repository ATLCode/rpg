<template>
  <input
    v-model="value"
    :min="props.min"
    :max="props.max"
    type="range"
    class="aslider"
  />
</template>
<script lang="ts" setup>
// Props: Min, Max, Steps etc.

const props = defineProps({
  height: {
    type: String,
    default: "",
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 1,
  },
});

const value = defineModel<number>();
</script>
<style lang="scss" scoped></style>

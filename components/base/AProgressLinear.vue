<template>
  <div class="aprogress">
    <progress :value="value" :max="props.max" class="progress"></progress>
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
<style lang="scss" scoped>
progress {
  height: 1.5rem;
  border-radius: 5px;
}
progress::-webkit-progress-bar {
  border-radius: 5px;
  background-color: var(--elevation2);
}
progress::-webkit-progress-value {
  background-color: var(--success);
  border-radius: 5px;
}
</style>

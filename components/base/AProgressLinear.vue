<template>
  <progress
    :value="model || value"
    :max="props.max"
    :style="style"
    class="progress"
  ></progress>
</template>
<script lang="ts" setup>
const props = defineProps({
  height: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "100%",
  },
  value: {
    type: Number,
    default: undefined,
  },
  color: {
    type: String,
    default: "var(--success)",
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

const style = reactive({
  color: props.color,
  height: props.height,
  width: props.width,
});

const model = defineModel<number | undefined>(undefined);
</script>
<style lang="scss" scoped>
progress {
  border-radius: 5px;
}
progress::-webkit-progress-bar {
  border-radius: 5px;
  background-color: var(--elevation2);
}
progress::-webkit-progress-value {
  background-color: v-bind(color);
  border-radius: 5px;
}
</style>

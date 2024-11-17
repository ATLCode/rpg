<template>
  <div class="aprogress">
    <progress
      :value="value"
      :max="props.max"
      :style="style"
      class="progress"
    ></progress>
  </div>
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

const value = defineModel<number>();
</script>
<style lang="scss" scoped>
.aprogress {
  display: flex;
}

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

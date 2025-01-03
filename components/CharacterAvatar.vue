<template>
  <div class="avatar-container">
    <img :src="props.avatar" class="img-avatar" :style="styleAvatar" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { Size } from "~/types/general.types";

const props = defineProps({
  avatar: {
    type: String,
    default: null,
  },
  size: {
    type: String as PropType<Size>,
    default: "Medium",
  },
  borderColor: {
    type: String,
    default: "black",
  },
});

const sizeChart = computed(() => {
  if (props.size === Size.Small) {
    return {
      height: "72px",
      width: "72px",
      borderWidth: "5px",
    };
  }
  if (props.size === Size.Medium) {
    return {
      height: "72px",
      width: "72px",
      borderWidth: "8px",
    };
  }
  if (props.size === Size.Large) {
    return {
      height: "128px",
      width: "128px",
      borderWidth: "12px",
    };
  }
});

const styleAvatar = computed(() => {
  return {
    height: sizeChart.value?.height,
    width: sizeChart.value?.width,
    border: "solid",
    "border-radius": "100%",
    "border-width": `${sizeChart.value?.borderWidth}`,
    "border-color": props.borderColor,
  };
});
</script>

<style lang="scss" scoped>
.avatar-container {
  .img-avatar {
    object-fit: contain;
    z-index: 3;
    border-radius: 100%;
    background-color: gray;
  }
}
</style>

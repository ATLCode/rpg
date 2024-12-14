<template>
  <div class="resting-container">
    <div class="image-container">
      <img :src="props.spot.img" class="unit-img" alt="" />
    </div>
    <div class="actions-container">
      <ASpacer />
      <div><AButton>Rest (4 Hours)</AButton></div>
      <ASpacer />
      <div><AButton>Sleep (8 Hours)</AButton></div>
      <ASpacer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Spot } from "~/types/spot.types";

const props = defineProps({
  spot: {
    type: Object as PropType<Spot>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.resting-container {
  height: calc(100% - 59px);
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.actions-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

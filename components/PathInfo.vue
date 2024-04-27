<template>
  <div class="travel-container">
    <div v-if="$props.path" class="path">
      <div class="path-name">{{ $props.path.name }}</div>
      <AButton @click="locationStore.travelPath($props.path)">Travel</AButton>
    </div>
    <div v-else>You can't get here from your current location</div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { type Path } from "~/game/paths";
import { useLocationStore } from "@/stores/location";
const locationStore = useLocationStore();
defineProps({
  path: {
    type: Object as PropType<Path> | null,
    default: null,
  },
});
</script>

<style lang="scss" scoped>
.travel-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.path {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .path-name {
    font-size: 2rem;
  }
}
</style>

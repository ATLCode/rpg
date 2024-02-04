<template>
  <div class="travel-container">
    <div v-if="$props.path" class="path">
      <div class="path-name">{{ $props.path.name }}</div>
      <AButton @click="travelPath($props.path)">Travel</AButton>
    </div>
    <div v-else>You can't get here from your current location</div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { type Path } from "~/game/paths";
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();
defineProps({
  path: {
    type: Object as PropType<Path> | null,
    default: null,
  },
});

function travelPath(path: Path) {
  const targetLocations = path.locations.filter(
    (endPoint) => endPoint !== playerStore.currentLocation.id
  );
  if (targetLocations.length === 1) {
    const targetLocation = playerStore.getLocationById(targetLocations[0]);
    playerStore.currentLocation = targetLocation;
  } else {
    console.log("Something went wrong");
  }
}
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
</style>

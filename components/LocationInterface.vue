<template>
  <div class="interface-container">
    <div class="interface-bar">
      <AButton
        class="exit-btn"
        background-color="--elevation1"
        @click="$emit('back')"
        >Back to {{ locationStore.currentArea.name }}</AButton
      >
      <h1>
        {{ locationStore.currentArea.name }} -
        {{ locationStore.currentLocation.name }}
      </h1>
    </div>
    <div class="interface-content">
      {{ locationStore.currentResourceSpots }}
      <CardSpot
        v-for="spot in locationStore.currentResourceSpots"
        :key="spot.name"
        :spot="spot"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
// import type { SpotResource, SpotCooking, SpotSleeping } from "@/game/spots";

const locationStore = useLocationStore();

/*
const resourceSpots = ref(null);
const cookingSpots = ref(null);
const sleepingSpots = ref(null);
*/

defineEmits(["back"]);
</script>

<style lang="scss" scoped>
.interface-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.interface-bar {
  display: flex;
  justify-content: center;
  height: 100px;
}
.interface-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  gap: 1rem;
  padding: 1rem;
}
.exit-btn {
  position: absolute;
  left: 1rem;
}
</style>

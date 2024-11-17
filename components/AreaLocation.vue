<template>
  <div class="area-container">
    <div class="location-map">
      <MapSub v-if="locationStore.playerLocation.subLocation" />
      <MapArea v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";

const locationStore = useLocationStore();
</script>

<style lang="scss" scoped>
.area-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.locations {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}
.location-card {
  height: 100px;
  width: 30vw;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  &:hover {
    background-color: var(--elevation1);
    cursor: pointer;
  }
  .location-name {
    text-align: center;
  }
}
.location-map {
  height: 100%;
  width: 100%;
}
</style>

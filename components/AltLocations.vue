<template>
  <div class="locations">
    <div
      v-for="location in playerStore.currentLocations"
      :key="location.id"
      class="location-card"
      :class="{
        active: location.id === selectedLocation.id,
      }"
      @click="$emit('changeSelectedLocation', location.id)"
    >
      <div>{{ location.name }}</div>
      <div v-if="location.id === playerStore.currentLocation.id">
        <img src="../assets/icons/helmet.svg" class="character" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();

const props = defineProps(["selectedLocation"]);
</script>

<style lang="scss" scoped>
.locations {
  padding: 1rem;
}
.location-card {
  height: 100px;
  width: 30vw;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  &.active {
    font-weight: bold;
    background-color: var(--elevation1);
  }
  &.path {
    filter: drop-shadow(0 0 5px white);
  }
  .character {
    height: 50px;
  }
}
</style>

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
    <div>{{ locationStore.currentResourceSpots }}</div>
    <div class="interface-content">
      <CardSpot
        v-for="spotId in locationStore.currentLocation.resourceSpots"
        :key="spotId"
        :spot-id="spotId"
        :current-action-spot-id="currentActionSpotId"
        @new-current-action="newCurrentAction"
      />
      <div v-if="locationStore.currentLocationId === LocationId.Arena">
        <AButton @click="playerStore.gameState = GameState.Combat"
          >Test Combat</AButton
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { LocationId } from "~/game/locations";
import type { ResourceSpotId } from "~/game/spots";
import { usePlayerStore, GameState } from "@/stores/player";

const locationStore = useLocationStore();
const playerStore = usePlayerStore();

defineEmits(["back"]);

const currentActionSpotId = ref<ResourceSpotId | undefined>(undefined);

function newCurrentAction(id: ResourceSpotId) {
  currentActionSpotId.value = id;
}
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

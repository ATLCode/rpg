<template>
  <div class="game-container">
    <NavBar />
    <div class="area">
      <AreaWorld
        v-if="playerStore.currentArea.type === 'world'"
        :selected-location="selectedLocation"
        @change-selected-location="changeSelectedLocation"
      />
      <AreaContainer v-if="playerStore.currentArea.type === 'container'" />
    </div>
    <ADialog v-model="showUi">
      <GameUi />
    </ADialog>
  </div>
</template>
<script lang="ts" setup>
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();

const showUi = ref(true);

const selectedLocation = ref(playerStore.currentLocation);
function changeSelectedLocation(locationId: number) {
  selectedLocation.value = playerStore.getLocationById(locationId);
}

definePageMeta({ middleware: ["auth"], layout: "game" });
</script>
<style lang="scss" scoped>
.game-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
}

.area {
  height: 100%;
  width: 100%;
}
</style>

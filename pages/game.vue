<template>
  <div class="game-container">
    <NavBar v-if="!(gameStore.gameState === GameState.Combat)" />
    <GameBar
      v-if="!(gameStore.gameState === GameState.Combat)"
      class="game-bar"
    />
    <div class="game-content">
      <div v-if="gameStore.gameState === GameState.Normal" class="area">
        <AreaWorld
          v-if="locationStore.currentArea.type === LocationType.World"
        />
        <AreaLocation
          v-if="locationStore.currentArea.type === LocationType.Container"
        />
      </div>
      <div v-if="gameStore.gameState === GameState.Travel" class="travel">
        <GameTravel />
      </div>
      <div v-if="gameStore.gameState === GameState.Combat" class="combat">
        <GameCombat />
      </div>
      <div v-if="gameStore.gameState === GameState.Encounter" class="encounter">
        <GameEncounter />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { useGameStore } from "@/stores/game";
import { LocationType } from "~/game/locations";
const locationStore = useLocationStore();
const gameStore = useGameStore();

definePageMeta({ middleware: ["auth"], layout: "game" });
</script>
<style lang="scss" scoped>
.game-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.game-bar {
  height: 4.5rem;
}
.game-content {
  height: 100%;
  width: 100%;
}
.area {
  height: 100%;
  width: 100%;
}
.travel {
  height: 100%;
  width: 100%;
}
.combat {
  height: 100%;
  width: 100%;
}
</style>

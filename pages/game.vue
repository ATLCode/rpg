<template>
  <div class="game-container">
    <NavBar v-if="!(playerStore.gameState === GameState.Combat)" />
    <GameBar
      v-if="!(playerStore.gameState === GameState.Combat)"
      class="game-bar"
    />
    <div class="game-content">
      <div v-if="playerStore.gameState === GameState.Normal" class="area">
        <AreaWorld
          v-if="locationStore.currentArea.type === LocationType.World"
        />
        <AreaLocation
          v-if="locationStore.currentArea.type === LocationType.Container"
        />
      </div>
      <div v-if="playerStore.gameState === GameState.Travel" class="travel">
        <GameTravel />
      </div>
      <div v-if="playerStore.gameState === GameState.Combat" class="combat">
        <GameCombat />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { usePlayerStore, GameState } from "@/stores/player";
import { LocationType } from "~/game/locations";
const locationStore = useLocationStore();
const playerStore = usePlayerStore();

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

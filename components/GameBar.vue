<template>
  <div class="gamebar-container">
    <div class="bar-header">
      <h1 v-if="playerStore.gameState === GameState.Normal">
        {{ locationStore.currentArea.name }}
      </h1>
      <h1 v-if="playerStore.gameState === GameState.Travel">Traveling</h1>
      <h1 v-if="playerStore.gameState === GameState.Combat">Combat</h1>
    </div>

    <div class="options">
      <AMenu>
        <template #activator>
          <AButton padding="1rem" background-color="--elevation1">
            {{ playerStore.characterName || "Character Name" }}</AButton
          >
        </template>
        <template #menu>
          <div>Settings</div>
          <div @click="saveStore.updateSave()">Save</div>
          <div @click="toMenu()">Save and Menu</div>
          <div @click="saveStore.logOut">Log Out</div>
        </template>
      </AMenu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { usePlayerStore, GameState } from "@/stores/player";
import { useSaveStore } from "@/stores/save";
const locationStore = useLocationStore();
const playerStore = usePlayerStore();
const saveStore = useSaveStore();

async function toMenu() {
  await saveStore.updateSave();
  navigateTo("/saves");
}
</script>
<style lang="scss" scoped>
.gamebar-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.options {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 500;
}
</style>

<template>
  <div class="gamebar-container">
    <div class="resources">
      <div>
        Day: {{ worldStore.time.day }}, Week: {{ worldStore.time.week }},
        Season: {{ worldStore.time.season }}, Year:
        {{ worldStore.time.year }} (Day Count: {{ worldStore.time.dayCount }})
      </div>
      <div>Energy: {{ playerStore.energy }}</div>
    </div>

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
      <AButton @click="worldStore.sleep(100)">Test</AButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { usePlayerStore, GameState } from "@/stores/player";
import { useSaveStore } from "@/stores/save";
import { useWorldStore } from "@/stores/world";
const locationStore = useLocationStore();
const playerStore = usePlayerStore();
const saveStore = useSaveStore();
const worldStore = useWorldStore();

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
.resources {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 500;
}

.options {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 500;
}
</style>

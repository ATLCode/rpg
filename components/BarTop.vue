<template>
  <div class="gamebar-container">
    <div class="resources">
      <div>
        Day: {{ worldStore.time.day }}, Week: {{ worldStore.time.week }},
        Season: {{ worldStore.time.season }}, Year:
        {{ worldStore.time.year }} (Day Count: {{ worldStore.time.dayCount }})
      </div>
      <div>{{ worldStore.showTime() }}</div>
      <div>
        Energy: {{ playerStore.energy }} {{ encounterStore.activeEncounter }}
        {{ locationStore.activePath }}
      </div>
    </div>

    <div class="bar-header">
      <h1 v-if="gameStore.gameState === GameState.Normal">
        {{ maps[locationStore.playerLocation.mapId].name }}
      </h1>
      <h1 v-if="gameStore.gameState === GameState.Travel">Traveling</h1>
      <h1 v-if="gameStore.gameState === GameState.Combat">Combat</h1>
    </div>

    <div class="options">
      <AMenu>
        <template #activator>
          <AButton padding="1rem" background-color="--elevation1">
            {{ playerStore.characterName || "Character Name" }}</AButton
          >
        </template>
        <template #menu>
          <div @click="devToolsOpen = true">Dev Tools</div>
          <div>Settings</div>
          <div @click="toMenu()">Save and Menu</div>
          <div @click="saveStore.logOut">Log Out</div>
        </template>
      </AMenu>
    </div>
    <AModal v-model="devToolsOpen" title="DevTools" closable>
      <DevTools />
    </AModal>
  </div>
</template>
<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { usePlayerStore } from "@/stores/player";
import { useSaveStore } from "@/stores/save";
import { useWorldStore } from "@/stores/world";
import { useGameStore } from "@/stores/game";
import { useEncounterStore } from "@/stores/encounter";
import { maps } from "~/game/locations";
const locationStore = useLocationStore();
const playerStore = usePlayerStore();
const saveStore = useSaveStore();
const worldStore = useWorldStore();
const gameStore = useGameStore();
const encounterStore = useEncounterStore();

const devToolsOpen = ref(false);

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

<template>
  <div class="cContainer">
    <h1>Character Creation</h1>
    <AField v-model="characterName" label="Choose your name"></AField>
    <AButton :disabled="!characterName" @click="startGame(characterName)"
      >Create Character</AButton
    >
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from "@/stores/player";
const playerStore = usePlayerStore();

definePageMeta({ middleware: ["auth"] });
const characterName = ref("");

function startGame(characterName: string) {
  playerStore.name = characterName;
  navigateTo("/game");
}
</script>

<style lang="scss" scoped>
.cContainer {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--text);
  gap: 1rem;
}
</style>

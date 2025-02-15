<template>
  <div class="encounter-container">
    <div v-if="dev">
      <div>Encounter Debug</div>

      <div>Active path: {{ locationStore.activePath?.name }}</div>
      <div>Current Encounter: {{ encounterStore.activeEncounter }}</div>
      <AButton @click="encounterStore.finishEncounter"
        >Complete Encounter</AButton
      >
    </div>
    <div v-else class="encounter">
      <GameDialogue
        v-model="testasd"
        :dialogue="dialogue"
        :default-image="encounterStore.activeEncounter?.img"
        @close="encounterStore.finishEncounter"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { useEncounterStore } from "@/stores/encounter";
import { dialogues } from "~/game/dialogue";
const locationStore = useLocationStore();
const encounterStore = useEncounterStore();

const dev = false;

const testasd = ref(true);

const dialogue = computed(() => {
  if (encounterStore.activeEncounter) {
    return dialogues[encounterStore.activeEncounter?.dialogueId];
  } else {
    return null;
  }
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
.encounter-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.encounter {
  height: 100%;
  width: 100%;
}
</style>

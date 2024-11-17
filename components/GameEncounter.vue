<template>
  <div class="encounter-container">
    <div v-if="dev">
      <div>Encounter Debug</div>

      <div>Active path: {{ locationStore.activePath?.name }}</div>
      <div>
        Current Location: {{ locationStore.playerLocation.worldLocation.name }}
      </div>
      <div>Current Encounter: {{ encounterStore.activeEncounter }}</div>
      <AButton @click="encounterStore.finishEncounter"
        >Complete Encounter</AButton
      >
    </div>
    <div v-else>Actual Encounter</div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { useEncounterStore } from "@/stores/encounter";
const locationStore = useLocationStore();
const encounterStore = useEncounterStore();

const dev = true;

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
</style>

<template>
  <div class="interface-container">
    <div class="interface-bar">
      <AButton
        class="exit-btn"
        background-color="--elevation1"
        @click="$emit('back')"
        >Back to {{ locationStore.currentArea.name }}</AButton
      >
      <h2>
        {{ locationStore.currentLocation.name }}
      </h2>
    </div>

    <div class="interface-content">
      <CardResourceSpot
        v-for="spotId in locationStore.currentLocation.resourceSpots"
        :key="spotId"
        :spot-id="spotId"
        :current-action-spot-id="currentActionSpotId"
        @new-current-action="newCurrentAction"
      />
      <div v-if="locationStore.currentLocationId === LocationId.Arena">
        <AButton @click="startRandomCombat">Random Encounter</AButton>
      </div>
      <CardNpc
        v-for="npcId in locationStore.currentLocation.npcs"
        :key="npcId"
        :npc-id="npcId"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { LocationId } from "~/game/locations";
import type { ResourceSpotId } from "~/game/spots";
import { useCombatStore } from "@/stores/combat";
import { encounters } from "~/game/encounters";

const locationStore = useLocationStore();
const combatStore = useCombatStore();

defineEmits(["back"]);

const currentActionSpotId = ref<ResourceSpotId | undefined>(undefined);

function newCurrentAction(id: ResourceSpotId) {
  currentActionSpotId.value = id;
}

function startRandomCombat() {
  const encountersArray = Object.values(encounters);
  const randomEncounterIndex = randomIntFromInterval(
    0,
    encountersArray.length - 1
  );

  combatStore.startCombat(encountersArray[randomEncounterIndex]);
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

<template>
  <div class="travel-container">
    <div v-if="locationStore.targetLocationId" class="travel-text">
      Traveling to {{ worldLocations[locationStore.targetLocationId].name }}
    </div>
    <AProgressLinear
      v-model="progress"
      :max="travelLength"
      height="2rem"
      width="33vw"
    />
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { useEncounterStore } from "~/stores/encounter";
import { useGameStore } from "@/stores/game";
import { useWorldStore } from "@/stores/world";
import { worldLocations } from "~/game/locations";
import { EncounterId } from "@/game/encounters";

const locationStore = useLocationStore();
const gameStore = useGameStore();
const encounterStore = useEncounterStore();
const worldStore = useWorldStore();

onMounted(() => {
  if (!locationStore.activePath || !locationStore.targetLocationId) {
    console.log("Can't find active path or target location");
    return;
  }
  travelLength.value = locationStore.activePath.travelTime * 100;
  if (encounterStore.encounterReturnState) {
    progress.value = encounterStore.encounterReturnState.progress;
    encounterStore.$reset();
  }
  startTravel();
});

const progress = ref(0);
const travelLength = ref(0);
const selectedEncounterId = ref<EncounterId | null>(null);

const travelInterval = ref<ReturnType<typeof setTimeout> | undefined>(
  undefined
);

const finishedInterval = computed(() => {
  if (progress.value >= travelLength.value) {
    return true;
  }
  return false;
});

function startTravel() {
  travelInterval.value = setInterval(() => {
    progressTravel(1);
  }, 10);
}

function checkEncounter() {
  selectedEncounterId.value = chooseRandomWeightedObject(
    locationStore.activePath!.encounters
  );
  console.log(selectedEncounterId.value);

  if (selectedEncounterId.value === EncounterId.Empty) {
    console.log("No encounter");
    locationStore.encountersChecked = locationStore.encountersChecked + 1;
  } else {
    console.log("Starting Encounter");
    console.log(progress.value);
    locationStore.encountersChecked = locationStore.encountersChecked + 1;
    const returnState = {
      gameState: GameState.Travel,
      progress: progress.value,
    };
    encounterStore.startEncounter(selectedEncounterId.value, returnState);
    clearInterval(travelInterval.value);
    gameStore.gameState = GameState.Encounter;
  }
}

function progressTravel(num: number) {
  console.log("progressing travel");

  const halfWwayPoint = travelLength.value / 2;
  if (
    locationStore.encountersChecked <
      locationStore.activePath!.encounterChecks &&
    progress.value > halfWwayPoint
  ) {
    checkEncounter();
  }
  // Add Time
  progress.value = progress.value + num;
}

watch(finishedInterval, () => {
  if (finishedInterval.value === true) {
    console.log("Travel is finished");
    endTravel();
  }
});

function endTravel() {
  clearInterval(travelInterval.value);
  locationStore.playerLocation.worldLocation =
    worldLocations[locationStore.targetLocationId!];
  if (locationStore.activePath) {
    worldStore.addTime(locationStore.activePath?.timeCost);
  }
  locationStore.activePath = null;
  locationStore.encountersChecked = 0;
  progress.value = 0;

  gameStore.gameState = GameState.Normal;
}
</script>

<style lang="scss" scoped>
.travel-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

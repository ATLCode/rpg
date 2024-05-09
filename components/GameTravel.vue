<template>
  <div class="travel-container">
    <div v-if="locationStore.targetLocationId" class="travel-text">
      Traveling to {{ locations[locationStore.targetLocationId].name }}
    </div>
    <AProgressLinear v-model="progress" :max="totalSeconds" />
  </div>
</template>

<script lang="ts" setup>
import { useLocationStore } from "@/stores/location";
import { usePlayerStore, GameState } from "@/stores/player";
import { locations } from "~/game/locations";
const locationStore = useLocationStore();
const playerStore = usePlayerStore();

onMounted(() => {
  if (!locationStore.activePath || !locationStore.targetLocationId) {
    console.log("Can't find active path or target location");
    return;
  }
  totalSeconds.value = locationStore.activePath.travelTime;
  startTravel();
});

const progress = ref(0);
const totalSeconds = ref(0);

const travelInterval = ref<ReturnType<typeof setTimeout> | undefined>(
  undefined
);

const finishedInterval = computed(() => {
  if (progress.value >= totalSeconds.value) {
    return true;
  }
  return false;
});

function startTravel() {
  travelInterval.value = setInterval(() => {
    addTime(1);
  }, 1000);
}

function addTime(num: number) {
  progress.value = progress.value + num;
}

watch(finishedInterval, () => {
  if (finishedInterval.value === true) {
    console.log("Travel is finished");
    endTravel();
  }
});

function endTravel() {
  locationStore.currentLocationId = locationStore.targetLocationId!;
  playerStore.gameState = GameState.Normal;
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

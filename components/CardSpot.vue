<template>
  <div class="spot-container" @click="clickCard">
    <div class="spot-header">
      <div>{{ spot.name }}</div>
      <ASpacer />
      <!--
        <div>{{ skillStore.getSkillById(spot.skillId)?.name }}</div>
      -->
      <div>{{ spot.levelReq }}</div>
    </div>
    <AProgressLinear v-model="timer" :max="totalSeconds" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { SpotResource, SpotCooking, SpotSleeping } from "@/game/spots";
import { useSkillStore } from "@/stores/skill";

const skillStore = useSkillStore();

const props = defineProps({
  spot: {
    type: Object as PropType<SpotResource | SpotCooking | SpotSleeping>,
    default: null,
  },
});

const actionOngoing = ref(false);
const timer = ref(0);
const totalSeconds = ref(props.spot.interval * 10);

function addTimer(num: number) {
  timer.value = timer.value + num;
}

function stopInterval() {
  clearInterval(window.myInterval);
  timer.value = 0;
  actionOngoing.value = false;
}

function clickCard() {
  if (actionOngoing.value === true) {
    stopInterval();
  } else {
    cardAction();
  }
}

function cardAction() {
  actionOngoing.value = true;

  window.myInterval = setInterval(addTimer, 100, 1);
}

const finishedInterval = computed(() => {
  if (timer.value >= totalSeconds.value) {
    return true;
  }
  return false;
});

watch(finishedInterval, () => {
  console.log("test");
  if (finishedInterval.value === true) {
    getResource();
    timer.value = 0;
  }
});

function getResource() {
  console.log("got resource");
  skillStore.giveSkillExp(props.spot.skillId, 10);
}
</script>

<style lang="scss" scoped>
.spot-container {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--elevation1);
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  .spot-header {
    display: flex;
  }
}
</style>

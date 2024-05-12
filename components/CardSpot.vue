<template>
  <div
    class="spot-container"
    :class="{ disabled: isDisabled }"
    @click="clickCard"
  >
    <div class="spot-header">
      <div>{{ spot.name }}</div>
      <ASpacer />
      <div>{{ spot.levelReq }}</div>
    </div>
    <div>{{ skillStore.skills[spot.skillId].name }}</div>
    <div class="spot-img">
      <img :src="spot.img" alt="image" />
    </div>
    <AProgressLinear v-model="progress" :max="totalSeconds" />
    <div>{{ isDisabled }}</div>
    <div>{{ props.currentActionSpotId || "undefined" }}</div>
    <div>{{ props.spotId }}</div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { ResourceSpotId, resourceSpots } from "@/game/spots";
import { useSkillStore } from "@/stores/skill";
import { usePlayerStore } from "@/stores/player";
const skillStore = useSkillStore();
const playerStore = usePlayerStore();

const props = defineProps({
  spotId: {
    type: Number as PropType<ResourceSpotId>,
    required: true,
  },
  currentActionSpotId: {
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits(["newCurrentAction"]);

const spot = computed(() => {
  return resourceSpots[props.spotId];
});

const totalSeconds = ref(spot.value.interval);
const progress = ref(0);
const isDisabled = computed(() => {
  if (
    props.currentActionSpotId !== undefined &&
    props.currentActionSpotId !== props.spotId
  ) {
    return true;
  } else {
    return false;
  }
});

function clickCard() {
  if (isDisabled.value) {
    return;
  }
  startAction();
}

const actionInterval = ref<ReturnType<typeof setTimeout> | undefined>(
  undefined
);

function startAction() {
  if (props.currentActionSpotId !== undefined) {
    stopAction();
    return;
  }
  emit("newCurrentAction", props.spotId);
  actionInterval.value = setInterval(() => {
    addTime(1);
  }, 1000);
}

function stopAction() {
  console.log("Stopping Action");
  clearInterval(actionInterval.value);
  progress.value = 0;
  emit("newCurrentAction", undefined);
}

function addTime(num: number) {
  progress.value = progress.value + num;
}

const finishedInterval = computed(() => {
  if (progress.value >= totalSeconds.value) {
    return true;
  }
  return false;
});

watch(finishedInterval, () => {
  if (finishedInterval.value === true) {
    getResource();
    progress.value = 0;
  }
});

function getResource() {
  console.log("got resource");
  skillStore.giveSkillExp(spot.value.skillId, 500);
  if (spot.value.products) {
    try {
      playerStore.addItemToInventory(
        playerStore.chooseWeightedItem(spot.value.products)
      );
    } catch (error) {
      console.log("Inventory is full");
    }
  }
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
  gap: 0.5rem;
  .spot-header {
    display: flex;
  }
}
.disabled {
  color: grey;
}
.spot-img {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
}
</style>

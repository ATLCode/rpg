<template>
  <div
    class="spot-container"
    :class="{ disabled: isDisabled }"
    @click="clickCard"
  >
    <div class="spot-header">
      <div>
        <h4>{{ spot.name }}</h4>
      </div>
    </div>
    <div>{{ skillStore.skills[spot.skillId].name }}</div>
    <div class="spot-img">
      <img :src="spot.img" alt="image" />
    </div>
    <AProgressLinear v-model="progress" :max="totalSeconds" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { chooseRandomWeightedObject } from "~/utils/weight-calculation";
import { useNotificationStore, NotificationType } from "@/stores/notification";
import { ResourceSpotId, resourceSpots } from "@/game/spots";
import { useSkillStore } from "@/stores/skill";
import { usePlayerStore } from "@/stores/player";
const skillStore = useSkillStore();
const playerStore = usePlayerStore();
const notificationStore = useNotificationStore();

const props = defineProps({
  spotId: {
    type: String as PropType<ResourceSpotId>,
    required: true,
  },
  currentActionSpotId: {
    type: String,
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
  console.log("Starting action");
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
  try {
    if (finishedInterval.value === true) {
      playerStore.useEnergy(spot.value.energy);
      getResource();
      progress.value = 0;
    }
  } catch (error) {
    let message = "Unknown Error";

    if (error instanceof Error) message = error.message;

    notificationStore.showNotification(
      NotificationType.Game,
      message,
      false,
      1000
    );

    stopAction();

    console.log(message);
  }
});

// Refactor xp to separate function if going with ability idea for everything

function getResource() {
  console.log("Getting resource");
  if (spot.value.products) {
    const chosenGameItem = chooseRandomWeightedObject(spot.value.products);
    const itemXp = chosenGameItem.item.xp;
    try {
      playerStore.addItemsToInventory(chosenGameItem);
    } catch (error) {
      console.log("Inventory is full");
    }
    if (itemXp) {
      skillStore.giveSkillExp(spot.value.skillId, itemXp);
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
img {
  max-height: 100px;
  max-width: 100px;
}
</style>

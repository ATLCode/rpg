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
    <div class="spot-img">
      <img :src="spot.img" alt="image" />
    </div>
    <AProgressLinear v-model="progress" :max="totalSeconds" />
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import { useNotificationStore, NotificationType } from "@/stores/notification";
import { SleepingSpotId, sleepingSpots } from "@/game/spots";
import { useWorldStore } from "@/stores/world";

const worldStore = useWorldStore();
const notificationStore = useNotificationStore();

const props = defineProps({
  spotId: {
    type: String as PropType<SleepingSpotId>,
    required: true,
  },
  currentActionSpotId: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits(["newCurrentAction"]);

const spot = computed(() => {
  return sleepingSpots[props.spotId];
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
      worldStore.sleep(spot.value.energyRestore);
      stopAction();
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
